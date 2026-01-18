// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import Link from 'next/link';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import { useAuth } from '@/lib/AuthProvider';
// // // // import { Search, Calendar, User, ArrowRight, BookOpen, Loader2, PenTool, Eye, MessageCircle } from 'lucide-react';

// // // // export default function BlogPage() {
// // // //   const { user } = useAuth();
// // // //   const [blogs, setBlogs] = useState<any[]>([]); // Pastikan init array
// // // //   const [content, setContent] = useState<any>(null);
// // // //   const [currentSlide, setCurrentSlide] = useState(0);
  
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [search, setSearch] = useState('');
  
// // // //   // Fetch Data
// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         setLoading(true);
        
// // // //         // Panggil API
// // // //         const [contentData, blogsRes] = await Promise.all([
// // // //             api('/api/content').catch(() => null), 
// // // //             api(`/api/blog/public?search=${search}`)
// // // //         ]);

// // // //         setContent(contentData);

// // // //         // [FIX LOGIC] Cek struktur response
// // // //         if (blogsRes && blogsRes.data && Array.isArray(blogsRes.data)) {
// // // //             // Format baru: { data: [...], pagination: ... }
// // // //             setBlogs(blogsRes.data);
// // // //         } else if (Array.isArray(blogsRes)) {
// // // //             // Format lama (fallback): [...]
// // // //             setBlogs(blogsRes);
// // // //         } else {
// // // //             setBlogs([]); // Default kosong jika error/format salah
// // // //         }
        
// // // //       } catch (err) {
// // // //         console.error("Gagal memuat data:", err);
// // // //         setBlogs([]);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     const timer = setTimeout(() => {
// // // //         fetchData();
// // // //     }, 500);

// // // //     return () => clearTimeout(timer);
// // // //   }, [search]);

// // // //   // Timer Slide
// // // //   useEffect(() => {
// // // //     if (content?.slides?.length > 1) {
// // // //       const timer = setInterval(() => {
// // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // //       }, 5000);
// // // //       return () => clearInterval(timer);
// // // //     }
// // // //   }, [content]);

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 font-sans">
      
// // // //       {/* 1. HERO HEADER (Background Slideshow) */}
// // // //       <div className="relative text-white py-24 md:py-32 px-6 overflow-hidden shadow-xl transition-all duration-500 bg-[#990000]">
// // // //         <div className="absolute inset-0 z-0 pointer-events-none">
// // // //             {content?.slides && content.slides.length > 0 ? (
// // // //                 content.slides.map((slide: string, index: number) => (
// // // //                     <div 
// // // //                         key={index} 
// // // //                         className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
// // // //                     >
// // // //                         <img 
// // // //                             src={getImageUrl(slide)} 
// // // //                             alt={`Hero Slide ${index}`} 
// // // //                             className="w-full h-full object-cover object-center" 
// // // //                         />
// // // //                     </div>
// // // //                 ))
// // // //             ) : (
// // // //                 <img 
// // // //                     src={content?.heroBgUrl ? getImageUrl(content.heroBgUrl) : "/pmi-logo.png"} 
// // // //                     alt="Hero Default" 
// // // //                     className="w-full h-full object-cover object-center opacity-50" 
// // // //                 />
// // // //             )}
// // // //             <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/85 to-[#7a0000]/70 z-10 mix-blend-multiply"></div>
// // // //             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
// // // //         </div>

// // // //         <div className="max-w-7xl mx-auto relative z-20 text-center">
// // // //             <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-md">Cerita Relawan</h1>
// // // //             <p className="text-red-100 text-base md:text-lg max-w-2xl mx-auto drop-shadow-sm mb-6 font-light">
// // // //                 Berita terbaru, kisah inspiratif, dan wawasan dari lapangan.
// // // //             </p>

// // // //             {user && (
// // // //                 <div className="flex justify-center mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
// // // //                     <Link href="/blog/create" className="bg-white/95 backdrop-blur-sm text-[#990000] px-6 py-2.5 rounded-full font-bold hover:bg-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 group border-2 border-transparent hover:border-red-100 text-sm">
// // // //                         <PenTool size={16} className="group-hover:-rotate-12 transition-transform"/> 
// // // //                         Tulis Cerita Saya
// // // //                     </Link>
// // // //                 </div>
// // // //             )}

// // // //             <div className="max-w-lg mx-auto relative">
// // // //                 <input 
// // // //                     type="text" 
// // // //                     placeholder="Cari artikel atau berita..." 
// // // //                     className="w-full pl-10 pr-4 py-3 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all border-2 border-white/80 focus:border-red-300 placeholder:text-gray-400 text-sm bg-white/95 backdrop-blur-md"
// // // //                     value={search}
// // // //                     onChange={(e) => setSearch(e.target.value)}
// // // //                 />
// // // //                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18}/>
// // // //             </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* 2. BLOG GRID */}
// // // //       <div className="max-w-7xl mx-auto px-6 -mt-16 pb-24 relative z-20">
// // // //         {loading ? (
// // // //             <div className="flex flex-col items-center justify-center py-24 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 min-h-[400px]">
// // // //                 <Loader2 className="animate-spin text-[#990000] mb-4" size={48}/>
// // // //                 <p className="text-gray-500 font-medium">Sedang memuat cerita...</p>
// // // //             </div>
// // // //         ) : blogs.length > 0 ? (
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // // //                 {blogs.map((blog, idx) => (
// // // //                     <Link href={`/blog/${blog._id}`} key={blog._id || idx} className="group bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative">
// // // //                         <div className="h-56 bg-gray-200 relative overflow-hidden">
// // // //                             {blog.coverUrl ? (
// // // //                                 <img 
// // // //                                     src={getImageUrl(blog.coverUrl)} 
// // // //                                     alt={blog.title} 
// // // //                                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
// // // //                                 />
// // // //                             ) : (
// // // //                                 <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
// // // //                                     <BookOpen size={48} opacity={0.2}/>
// // // //                                 </div>
// // // //                             )}
// // // //                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
// // // //                             <div className="absolute top-4 left-4 flex gap-1 flex-wrap">
// // // //                                 {blog.tags && Array.isArray(blog.tags) && blog.tags.slice(0, 2).map((tag: string, i: number) => (
// // // //                                     <span key={i} className="bg-[#990000]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
// // // //                                         {tag}
// // // //                                     </span>
// // // //                                 ))}
// // // //                                 {(!blog.tags || blog.tags.length === 0) && (
// // // //                                      <span className="bg-[#990000]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">Umum</span>
// // // //                                 )}
// // // //                             </div>
// // // //                         </div>

// // // //                         <div className="p-8 flex-1 flex flex-col">
// // // //                             <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium border-b border-gray-100 pb-4">
// // // //                                 <span className="flex items-center gap-1.5">
// // // //                                     <Calendar size={14} className="text-[#990000]"/> 
// // // //                                     {new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
// // // //                                 </span>
// // // //                                 {/* STATISTIK: Dilihat */}
// // // //                                 <span className="flex items-center gap-1.5" title="Dilihat">
// // // //                                     <Eye size={14} className="text-[#990000]"/> 
// // // //                                     {blog.views || 0}
// // // //                                 </span>
// // // //                                 {/* STATISTIK: Komentar */}
// // // //                                 <span className="flex items-center gap-1.5" title="Komentar">
// // // //                                     <MessageCircle size={14} className="text-[#990000]"/> 
// // // //                                     {blog.commentCount || 0}
// // // //                                 </span>
// // // //                             </div>
                            
// // // //                             <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#990000] transition-colors leading-tight line-clamp-2">
// // // //                                 {blog.title}
// // // //                             </h3>
                            
// // // //                             <div 
// // // //                                 className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed flex-1"
// // // //                                 dangerouslySetInnerHTML={{ 
// // // //                                     __html: blog.content ? blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..." : "Tidak ada deskripsi singkat." 
// // // //                                 }}
// // // //                             ></div>

// // // //                             <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
// // // //                                 <span className="text-[#990000] font-bold text-sm group-hover:underline flex items-center gap-1">
// // // //                                     Baca Selengkapnya <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
// // // //                                 </span>
// // // //                                 <span className="flex items-center gap-1.5 text-xs text-gray-400">
// // // //                                     <User size={14} className="text-gray-400"/> 
// // // //                                     <span className="truncate max-w-[100px]">{blog.author?.name || 'Admin'}</span>
// // // //                                 </span>
// // // //                             </div>
// // // //                         </div>
// // // //                     </Link>
// // // //                 ))}
// // // //             </div>
// // // //         ) : (
// // // //             <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
// // // //                 <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
// // // //                     <BookOpen className="text-gray-300" size={40}/>
// // // //                 </div>
// // // //                 <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada cerita ditemukan</h3>
// // // //                 <p className="text-gray-500 text-sm max-w-md mx-auto">
// // // //                     {search ? `Tidak ada hasil untuk kata kunci "${search}".` : "Belum ada konten yang dipublikasikan saat ini."}
// // // //                 </p>
// // // //                 {search && (
// // // //                     <button onClick={() => setSearch('')} className="mt-6 text-[#990000] font-bold hover:underline text-sm">Hapus pencarian</button>
// // // //                 )}
// // // //             </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import Link from 'next/link';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import { Search, Calendar, User, ArrowRight, BookOpen, Loader2, PenTool, Eye, MessageCircle } from 'lucide-react';

// // // export default function BlogPage() {
// // //   const { user } = useAuth();
// // //   const [blogs, setBlogs] = useState<any[]>([]); 
// // //   const [content, setContent] = useState<any>(null);
// // //   const [currentSlide, setCurrentSlide] = useState(0);
  
// // //   const [loading, setLoading] = useState(true);
// // //   const [search, setSearch] = useState('');
  
// // //   // Fetch Data
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         setLoading(true);
        
// // //         // Panggil API
// // //         const [contentData, blogsRes] = await Promise.all([
// // //             api('/api/content').catch(() => null), 
// // //             api(`/api/blog/public?search=${search}`)
// // //         ]);

// // //         setContent(contentData);

// // //         if (blogsRes && blogsRes.data && Array.isArray(blogsRes.data)) {
// // //             // Format baru: { data: [...], pagination: ... }
// // //             setBlogs(blogsRes.data);
// // //         } else if (Array.isArray(blogsRes)) {
// // //             // Format lama (fallback): [...]
// // //             setBlogs(blogsRes);
// // //         } else {
// // //             setBlogs([]); 
// // //         }
        
// // //       } catch (err) {
// // //         console.error("Gagal memuat data:", err);
// // //         setBlogs([]);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     const timer = setTimeout(() => {
// // //         fetchData();
// // //     }, 500);

// // //     return () => clearTimeout(timer);
// // //   }, [search]);

// // //   // Timer Slide
// // //   useEffect(() => {
// // //     if (content?.slides?.length > 1) {
// // //       const timer = setInterval(() => {
// // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // //       }, 5000);
// // //       return () => clearInterval(timer);
// // //     }
// // //   }, [content]);

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 font-sans">
      
// // //       {/* 1. HERO HEADER (Background Slideshow) */}
// // //       <div className="relative text-white py-24 md:py-32 px-6 overflow-hidden shadow-xl transition-all duration-500 bg-[#990000]">
// // //         <div className="absolute inset-0 z-0 pointer-events-none">
// // //             {content?.slides && content.slides.length > 0 ? (
// // //                 content.slides.map((slide: string, index: number) => (
// // //                     <div 
// // //                         key={index} 
// // //                         className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
// // //                     >
// // //                         <img 
// // //                             src={getImageUrl(slide)} 
// // //                             alt={`Hero Slide ${index}`} 
// // //                             className="w-full h-full object-cover object-center" 
// // //                         />
// // //                     </div>
// // //                 ))
// // //             ) : (
// // //                 <img 
// // //                     src={content?.heroBgUrl ? getImageUrl(content.heroBgUrl) : "/pmi-logo.png"} 
// // //                     alt="Hero Default" 
// // //                     className="w-full h-full object-cover object-center opacity-50" 
// // //                 />
// // //             )}
// // //             <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/85 to-[#7a0000]/70 z-10 mix-blend-multiply"></div>
// // //             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
// // //         </div>

// // //         <div className="max-w-7xl mx-auto relative z-20 text-center">
// // //             <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-md">Cerita Relawan</h1>
// // //             <p className="text-red-100 text-base md:text-lg max-w-2xl mx-auto drop-shadow-sm mb-6 font-light">
// // //                 Berita terbaru, kisah inspiratif, dan wawasan dari lapangan.
// // //             </p>

// // //             {user && (
// // //                 <div className="flex justify-center mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
// // //                     <Link href="/blog/create" className="bg-white/95 backdrop-blur-sm text-[#990000] px-6 py-2.5 rounded-full font-bold hover:bg-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 group border-2 border-transparent hover:border-red-100 text-sm">
// // //                         <PenTool size={16} className="group-hover:-rotate-12 transition-transform"/> 
// // //                         Tulis Cerita Saya
// // //                     </Link>
// // //                 </div>
// // //             )}

// // //             <div className="max-w-lg mx-auto relative">
// // //                 <input 
// // //                     type="text" 
// // //                     placeholder="Cari artikel atau berita..." 
// // //                     className="w-full pl-10 pr-4 py-3 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all border-2 border-white/80 focus:border-red-300 placeholder:text-gray-400 text-sm bg-white/95 backdrop-blur-md"
// // //                     value={search}
// // //                     onChange={(e) => setSearch(e.target.value)}
// // //                 />
// // //                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18}/>
// // //             </div>
// // //         </div>
// // //       </div>

// // //       {/* 2. BLOG GRID */}
// // //       <div className="max-w-7xl mx-auto px-6 -mt-16 pb-24 relative z-20">
// // //         {loading ? (
// // //             <div className="flex flex-col items-center justify-center py-24 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 min-h-[400px]">
// // //                 <Loader2 className="animate-spin text-[#990000] mb-4" size={48}/>
// // //                 <p className="text-gray-500 font-medium">Sedang memuat cerita...</p>
// // //             </div>
// // //         ) : blogs.length > 0 ? (
// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //                 {blogs.map((blog, idx) => (
// // //                     <Link href={`/blog/${blog._id}`} key={blog._id || idx} className="group bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative">
// // //                         <div className="h-56 bg-gray-200 relative overflow-hidden">
// // //                             {blog.coverUrl ? (
// // //                                 <img 
// // //                                     src={getImageUrl(blog.coverUrl)} 
// // //                                     alt={blog.title} 
// // //                                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
// // //                                 />
// // //                             ) : (
// // //                                 <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
// // //                                     <BookOpen size={48} opacity={0.2}/>
// // //                                 </div>
// // //                             )}
// // //                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
// // //                             <div className="absolute top-4 left-4 flex gap-1 flex-wrap">
// // //                                 {blog.tags && Array.isArray(blog.tags) && blog.tags.slice(0, 2).map((tag: string, i: number) => (
// // //                                     <span key={i} className="bg-[#990000]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
// // //                                         {tag}
// // //                                     </span>
// // //                                 ))}
// // //                                 {(!blog.tags || blog.tags.length === 0) && (
// // //                                      <span className="bg-[#990000]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">Umum</span>
// // //                                 )}
// // //                             </div>
// // //                         </div>

// // //                         <div className="p-8 flex-1 flex flex-col">
// // //                             <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium border-b border-gray-100 pb-4">
// // //                                 <span className="flex items-center gap-1.5">
// // //                                     <Calendar size={14} className="text-[#990000]"/> 
// // //                                     {new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
// // //                                 </span>
// // //                                 {/* STATISTIK: Dilihat */}
// // //                                 <span className="flex items-center gap-1.5" title="Dilihat">
// // //                                     <Eye size={14} className="text-[#990000]"/> 
// // //                                     {blog.views || 0}
// // //                                 </span>
// // //                                 {/* STATISTIK: Komentar */}
// // //                                 <span className="flex items-center gap-1.5" title="Komentar">
// // //                                     <MessageCircle size={14} className="text-[#990000]"/> 
// // //                                     {blog.commentCount || 0}
// // //                                 </span>
// // //                             </div>
                            
// // //                             <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#990000] transition-colors leading-tight line-clamp-2">
// // //                                 {blog.title}
// // //                             </h3>
                            
// // //                             <div 
// // //                                 className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed flex-1"
// // //                                 dangerouslySetInnerHTML={{ 
// // //                                     __html: blog.content ? blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..." : "Tidak ada deskripsi singkat." 
// // //                                 }}
// // //                             ></div>

// // //                             <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
// // //                                 <span className="text-[#990000] font-bold text-sm group-hover:underline flex items-center gap-1">
// // //                                     Baca Selengkapnya <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
// // //                                 </span>
// // //                                 <span className="flex items-center gap-1.5 text-xs text-gray-400">
// // //                                     <User size={14} className="text-gray-400"/> 
// // //                                     <span className="truncate max-w-[100px]">{blog.author?.name || 'Admin'}</span>
// // //                                 </span>
// // //                             </div>
// // //                         </div>
// // //                     </Link>
// // //                 ))}
// // //             </div>
// // //         ) : (
// // //             <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
// // //                 <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
// // //                     <BookOpen className="text-gray-300" size={40}/>
// // //                 </div>
// // //                 <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada cerita ditemukan</h3>
// // //                 <p className="text-gray-500 text-sm max-w-md mx-auto">
// // //                     {search ? `Tidak ada hasil untuk kata kunci "${search}".` : "Belum ada konten yang dipublikasikan saat ini."}
// // //                 </p>
// // //                 {search && (
// // //                     <button onClick={() => setSearch('')} className="mt-6 text-[#990000] font-bold hover:underline text-sm">Hapus pencarian</button>
// // //                 )}
// // //             </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import { api, getImageUrl } from '@/lib/api';
// // import { useAuth } from '@/lib/AuthProvider';
// // import { Search, Calendar, User, ArrowRight, BookOpen, Loader2, PenTool, Eye, MessageCircle } from 'lucide-react';

// // export default function BlogPage() {
// //   const { user } = useAuth();
// //   const [blogs, setBlogs] = useState<any[]>([]); 
// //   const [content, setContent] = useState<any>(null);
// //   const [currentSlide, setCurrentSlide] = useState(0);
  
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState('');
  
// //   // Default fallback images jika CMS kosong
// //   const defaultImages = ["/pmi-logo.png"];

// //   // Fetch Data
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
        
// //         // Panggil API Content & Blog sekaligus
// //         const [contentData, blogsRes] = await Promise.all([
// //             api('/api/content').catch(() => null), 
// //             api(`/api/blog/public?search=${search}`)
// //         ]);

// //         setContent(contentData);

// //         if (blogsRes && blogsRes.data && Array.isArray(blogsRes.data)) {
// //             setBlogs(blogsRes.data);
// //         } else if (Array.isArray(blogsRes)) {
// //             setBlogs(blogsRes);
// //         } else {
// //             setBlogs([]); 
// //         }
        
// //       } catch (err) {
// //         console.error("Gagal memuat data:", err);
// //         setBlogs([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     const timer = setTimeout(() => {
// //         fetchData();
// //     }, 500);

// //     return () => clearTimeout(timer);
// //   }, [search]);

// //   // --- LOGIKA SLIDE & TEXT KHUSUS BLOG ---
// //   // Prioritas: 1. Data BlogPage -> 2. Data Home (slides only) -> 3. Default
// //   const activeTitle = content?.blogPage?.title || "Cerita Relawan";
// //   const activeDesc = content?.blogPage?.description || "Berita terbaru, kisah inspiratif, dan wawasan dari lapangan.";
  
// //   const activeSlides = (content?.blogPage?.slides && content.blogPage.slides.length > 0) 
// //       ? content.blogPage.slides 
// //       : (content?.slides && content.slides.length > 0 ? content.slides : defaultImages);

// //   // Timer Slide (Carousel Otomatis)
// //   useEffect(() => {
// //     if (activeSlides.length > 1) {
// //       const timer = setInterval(() => {
// //         setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
// //       }, 5000); // Ganti gambar setiap 5 detik
// //       return () => clearInterval(timer);
// //     }
// //   }, [activeSlides]);

// //   return (
// //     <div className="min-h-screen bg-gray-50 font-sans">
      
// //       {/* 1. HERO HEADER (Background Slideshow) */}
// //       <div className="relative text-white py-16 md:py-20 px-6 overflow-hidden shadow-xl transition-all duration-500 bg-[#990000]">
// //         <div className="absolute inset-0 z-0 pointer-events-none">
// //             {activeSlides.map((slide: string, index: number) => (
// //                 <div 
// //                     key={index} 
// //                     className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
// //                 >
// //                     <img 
// //                         src={getImageUrl(slide)} 
// //                         alt={`Hero Slide ${index}`} 
// //                         className="w-full h-full object-cover object-center" 
// //                     />
// //                 </div>
// //             ))}
            
// //             {/* Gradient Overlay agar teks terbaca */}
// //             <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/85 to-[#7a0000]/70 z-10 mix-blend-multiply"></div>
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
// //         </div>

// //         <div className="max-w-7xl mx-auto relative z-20 text-center">
// //             <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-md">{activeTitle}</h1>
// //             <p className="text-red-100 text-base md:text-lg max-w-2xl mx-auto drop-shadow-sm mb-6 font-light">
// //                 {activeDesc}
// //             </p>

// //             {user && (
// //                 <div className="flex justify-center mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
// //                     <Link href="/blog/create" className="bg-white/95 backdrop-blur-sm text-[#990000] px-6 py-2.5 rounded-full font-bold hover:bg-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 group border-2 border-transparent hover:border-red-100 text-sm">
// //                         <PenTool size={16} className="group-hover:-rotate-12 transition-transform"/> 
// //                         Tulis Cerita Saya
// //                     </Link>
// //                 </div>
// //             )}

// //             <div className="max-w-lg mx-auto relative">
// //                 <input 
// //                     type="text" 
// //                     placeholder="Cari artikel atau berita..." 
// //                     className="w-full pl-10 pr-4 py-3 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all border-2 border-white/80 focus:border-red-300 placeholder:text-gray-400 text-sm bg-white/95 backdrop-blur-md"
// //                     value={search}
// //                     onChange={(e) => setSearch(e.target.value)}
// //                 />
// //                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18}/>
// //             </div>
// //         </div>
// //       </div>

// //       {/* 2. BLOG GRID */}
// //       <div className="max-w-7xl mx-auto px-6 -mt-10 pb-24 relative z-20">
// //         {loading ? (
// //             <div className="flex flex-col items-center justify-center py-24 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 min-h-[400px]">
// //                 <Loader2 className="animate-spin text-[#990000] mb-4" size={48}/>
// //                 <p className="text-gray-500 font-medium">Sedang memuat cerita...</p>
// //             </div>
// //         ) : blogs.length > 0 ? (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                 {blogs.map((blog, idx) => (
// //                     <Link href={`/blog/${blog._id}`} key={blog._id || idx} className="group bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative">
// //                         <div className="h-56 bg-gray-200 relative overflow-hidden">
// //                             {blog.coverUrl ? (
// //                                 <img 
// //                                     src={getImageUrl(blog.coverUrl)} 
// //                                     alt={blog.title} 
// //                                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
// //                                 />
// //                             ) : (
// //                                 <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
// //                                     <BookOpen size={48} opacity={0.2}/>
// //                                 </div>
// //                             )}
// //                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
// //                             <div className="absolute top-4 left-4 flex gap-1 flex-wrap">
// //                                 {blog.tags && Array.isArray(blog.tags) && blog.tags.slice(0, 2).map((tag: string, i: number) => (
// //                                     <span key={i} className="bg-[#990000]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
// //                                         {tag}
// //                                     </span>
// //                                 ))}
// //                                 {(!blog.tags || blog.tags.length === 0) && (
// //                                     <span className="bg-[#990000]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">Umum</span>
// //                                 )}
// //                             </div>
// //                         </div>

// //                         <div className="p-8 flex-1 flex flex-col">
// //                             <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium border-b border-gray-100 pb-4">
// //                                 <span className="flex items-center gap-1.5">
// //                                     <Calendar size={14} className="text-[#990000]"/> 
// //                                     {new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
// //                                 </span>
// //                                 <span className="flex items-center gap-1.5" title="Dilihat">
// //                                     <Eye size={14} className="text-[#990000]"/> 
// //                                     {blog.views || 0}
// //                                 </span>
// //                                 <span className="flex items-center gap-1.5" title="Komentar">
// //                                     <MessageCircle size={14} className="text-[#990000]"/> 
// //                                     {blog.commentCount || 0}
// //                                 </span>
// //                             </div>
                            
// //                             <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#990000] transition-colors leading-tight line-clamp-2">
// //                                 {blog.title}
// //                             </h3>
                            
// //                             <div 
// //                                 className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed flex-1"
// //                                 dangerouslySetInnerHTML={{ 
// //                                     __html: blog.content ? blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..." : "Tidak ada deskripsi singkat." 
// //                                 }}
// //                             ></div>

// //                             <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
// //                                 <span className="text-[#990000] font-bold text-sm group-hover:underline flex items-center gap-1">
// //                                     Baca Selengkapnya <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
// //                                 </span>
// //                                 <span className="flex items-center gap-1.5 text-xs text-gray-400">
// //                                     <User size={14} className="text-gray-400"/> 
// //                                     <span className="truncate max-w-[100px]">{blog.author?.name || 'Admin'}</span>
// //                                 </span>
// //                             </div>
// //                         </div>
// //                     </Link>
// //                 ))}
// //             </div>
// //         ) : (
// //             <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
// //                 <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
// //                     <BookOpen className="text-gray-300" size={40}/>
// //                 </div>
// //                 <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada cerita ditemukan</h3>
// //                 <p className="text-gray-500 text-sm max-w-md mx-auto">
// //                     {search ? `Tidak ada hasil untuk kata kunci "${search}".` : "Belum ada konten yang dipublikasikan saat ini."}
// //                 </p>
// //                 {search && (
// //                     <button onClick={() => setSearch('')} className="mt-6 text-[#990000] font-bold hover:underline text-sm">Hapus pencarian</button>
// //                 )}
// //             </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { api, getImageUrl } from '@/lib/api';
// import { 
//     Eye, 
//     MessageCircle, 
//     Calendar, 
//     User, 
//     ArrowRight, 
//     Search,
//     BookOpen
// } from 'lucide-react';

// export default function BlogPage() {
//     const [blogs, setBlogs] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState('');
//     const [debouncedSearch, setDebouncedSearch] = useState('');

//     // Debounce search agar tidak request setiap ketik
//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedSearch(search);
//         }, 500);
//         return () => clearTimeout(handler);
//     }, [search]);

//     useEffect(() => {
//         fetchBlogs();
//     }, [debouncedSearch]);

//     const fetchBlogs = async () => {
//         setLoading(true);
//         try {
//             // Panggil API Public Blog
//             const params = debouncedSearch ? `?search=${debouncedSearch}` : '';
//             const res = await api(`/api/blog/public${params}`);
//             setBlogs(res.data || []);
//         } catch (e) {
//             console.error("Gagal memuat blog", e);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Helper untuk strip HTML tags dari konten untuk preview/excerpt
//     const getExcerpt = (htmlContent: string) => {
//         const div = document.createElement('div');
//         div.innerHTML = htmlContent;
//         const text = div.textContent || div.innerText || '';
//         return text.length > 120 ? text.substring(0, 120) + '...' : text;
//     };

//     // Helper Format Tanggal (Contoh: 14 Januari 2026)
//     const formatDate = (dateString: string) => {
//         return new Date(dateString).toLocaleDateString('id-ID', { 
//             day: 'numeric', 
//             month: 'long', 
//             year: 'numeric' 
//         });
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 pb-20">
//             {/* --- HEADER --- */}
//             <div className="bg-red-900 text-white py-20 px-6 text-center relative overflow-hidden">
//                 <div className="absolute inset-0 bg-pattern opacity-10"></div>
//                 <div className="relative z-10 max-w-2xl mx-auto">
//                     <h1 className="text-4xl font-bold mb-4">Cerita Relawan</h1>
//                     <p className="text-red-100 mb-8 text-lg">Berita terbaru, kisah inspiratif, dan wawasan dari lapangan.</p>
                    
//                     {/* Search Bar */}
//                     <div className="relative max-w-lg mx-auto">
//                         <input 
//                             type="text" 
//                             className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-red-500/30 shadow-lg"
//                             placeholder="Cari artikel atau berita..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />
//                         <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
//                     </div>

//                     <div className="mt-8">
//                         <Link href="/admin/blog" className="inline-flex items-center gap-2 bg-white text-red-700 px-6 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-md">
//                             <span className="text-lg">✍️</span> Tulis Cerita Saya
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             {/* --- CONTENT GRID --- */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
//                 {loading ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {[1, 2, 3].map((i) => (
//                             <div key={i} className="bg-white rounded-xl shadow-sm h-96 animate-pulse">
//                                 <div className="h-48 bg-gray-200 rounded-t-xl"></div>
//                                 <div className="p-6 space-y-3">
//                                     <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                                     <div className="h-6 bg-gray-200 rounded w-3/4"></div>
//                                     <div className="h-4 bg-gray-200 rounded w-full"></div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : blogs.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {blogs.map((blog) => (
//                             <div key={blog._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group">
//                                 {/* Image Cover */}
//                                 <div className="relative h-56 overflow-hidden">
//                                     <Link href={`/blog/${blog._id}`}>
//                                         <img 
//                                             src={getImageUrl(blog.coverUrl)} 
//                                             alt={blog.title} 
//                                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                                         />
//                                     </Link>
//                                     {/* Tags Overlay */}
//                                     <div className="absolute top-4 left-4 flex flex-wrap gap-2">
//                                         {blog.tags?.map((tag: string, idx: number) => (
//                                             <span key={idx} className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
//                                                 {tag}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Content */}
//                                 <div className="p-6 flex-1 flex flex-col">
//                                     {/* Meta Info (Date, Views, Comments) */}
//                                     <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 border-b border-gray-50 pb-3">
//                                         <div className="flex items-center gap-1.5">
//                                             <Calendar size={14} className="text-red-500"/>
//                                             <span>{formatDate(blog.createdAt)}</span>
//                                         </div>
                                        
//                                         {/* [FITUR BARU] View Count */}
//                                         <div className="flex items-center gap-1.5" title={`${blog.views || 0} Dilihat`}>
//                                             <Eye size={14} className="text-red-500"/>
//                                             <span>{blog.views || 0}</span>
//                                         </div>

//                                         {/* Comment Count */}
//                                         <div className="flex items-center gap-1.5" title={`${blog.commentCount || 0} Komentar`}>
//                                             <MessageCircle size={14} className="text-red-500"/>
//                                             <span>{blog.commentCount || 0}</span>
//                                         </div>
//                                     </div>

//                                     <Link href={`/blog/${blog._id}`} className="block mb-3">
//                                         <h2 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
//                                             {blog.title}
//                                         </h2>
//                                     </Link>

//                                     <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
//                                         {getExcerpt(blog.content)}
//                                     </p>

//                                     {/* Footer: Author & Link */}
//                                     <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
//                                         <Link href={`/blog/${blog._id}`} className="text-red-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
//                                             Baca Selengkapnya <ArrowRight size={16}/>
//                                         </Link>
                                        
//                                         <div className="flex items-center gap-2 text-xs text-gray-500">
//                                             <User size={14}/>
//                                             <span className="truncate max-w-[100px]">{blog.author?.name || 'Admin'}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
//                         <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//                             <BookOpen size={40} className="text-gray-300"/>
//                         </div>
//                         <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada cerita ditemukan</h3>
//                         <p className="text-gray-500 mb-6">Belum ada konten yang dipublikasikan saat ini.</p>
//                         {search && (
//                             <button onClick={() => { setSearch(''); }} className="text-red-600 font-bold hover:underline">
//                                 Hapus pencarian
//                             </button>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, getImageUrl } from '@/lib/api';
import { 
    Eye, MessageCircle, Calendar, User, ArrowRight, Search, BookOpen, PenTool
} from 'lucide-react';

export default function BlogPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    
    // [SLIDESHOW STATE]
    const [content, setContent] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const defaultSlides = [
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1920", 
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=1920", 
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=1920" 
    ];

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = debouncedSearch ? `?search=${debouncedSearch}` : '';
                const [blogRes, contentRes] = await Promise.all([
                    api(`/api/blog/public${params}`),
                    api('/api/content')
                ]);

                setBlogs(blogRes.data || []);
                setContent(contentRes);
            } catch (e) { 
                console.error("Gagal memuat data", e); 
            } finally { 
                setLoading(false); 
            }
        };
        fetchData();
    }, [debouncedSearch]);

    const activeSlides = (content?.blogPage?.slides && content.blogPage.slides.length > 0) 
        ? content.blogPage.slides 
        : defaultSlides;

    useEffect(() => {
        if (activeSlides.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [activeSlides]);

    const getExcerpt = (html: string) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        return text.length > 120 ? text.substring(0, 120) + '...' : text;
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            
            {/* --- HERO SECTION (SERAGAM) --- */}
            <div className="relative h-[400px] md:h-[450px] flex items-center justify-center text-center text-white px-4 overflow-hidden pb-40">
                <div className="absolute inset-0 z-0 bg-gray-900">
                    {activeSlides.map((slide: string, index: number) => (
                        <div 
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img src={getImageUrl(slide)} alt="Slide" className="w-full h-full object-cover opacity-60" />
                        </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 via-red-900/60 to-gray-50"></div>
                </div>

                <div className="relative z-10 max-w-3xl mx-auto -mt-10">
                    <div className="inline-flex items-center justify-center p-2.5 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20 shadow-lg">
                        <BookOpen size={24} className="text-red-100"/>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-lg tracking-tight">
                        Cerita Relawan
                    </h1>
                    <p className="text-red-100 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                        Berita terbaru, kisah inspiratif, dan wawasan langsung dari lapangan pengabdian.
                    </p>
                </div>
            </div>

            {/* --- SEARCH & ACTION (CARD MENINDIH HERO) --- */}
            <div className="max-w-7xl mx-auto px-6 -mt-40 relative z-20">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-3 mb-8 flex flex-col md:flex-row items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative w-full flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                        <input 
                            type="text" 
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-gray-400 text-sm bg-gray-50 focus:bg-white" 
                            placeholder="Cari artikel inspiratif..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    
                    {/* Action Button */}
                    <Link href="/blog/create" className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-md flex items-center justify-center gap-2 text-xs shrink-0">
                        <PenTool size={16}/> Tulis Cerita
                    </Link>
                </div>

                {/* --- CONTENT GRID --- */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-md h-96 animate-pulse p-4">
                                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
                                    <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
                                    <div className="h-4 bg-gray-200 w-full rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : blogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group transform hover:-translate-y-1">
                                <div className="relative h-60 overflow-hidden">
                                    <Link href={`/blog/${blog._id}`}>
                                        <img src={getImageUrl(blog.coverUrl)} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </Link>
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                        {blog.tags?.slice(0,2).map((tag: string, idx: number) => (
                                            <span key={idx} className="bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-3 border-b border-gray-50 pb-3">
                                        <div className="flex items-center gap-1.5 text-gray-500">
                                            <Calendar size={14} className="text-red-500"/>
                                            <span>{formatDate(blog.createdAt)}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5"><Eye size={14} className="text-red-500"/><span>{blog.views || 0}</span></div>
                                        <div className="flex items-center gap-1.5"><MessageCircle size={14} className="text-red-500"/><span>{blog.commentCount || 0}</span></div>
                                    </div>

                                    <Link href={`/blog/${blog._id}`} className="block mb-3">
                                        <h2 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h2>
                                    </Link>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                        {getExcerpt(blog.content)}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                                        <Link href={`/blog/${blog._id}`} className="text-red-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                            Baca Selengkapnya <ArrowRight size={16}/>
                                        </Link>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded-lg">
                                            <User size={14}/>
                                            <span className="truncate max-w-[80px]">{blog.author?.name || 'Admin'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-16 text-center shadow-lg border border-gray-100">
                        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen size={48} className="text-gray-300"/>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada cerita ditemukan</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Coba kata kunci lain atau mulai tulis ceritamu sendiri.</p>
                        <div className="flex justify-center gap-4">
                            {search && <button onClick={() => setSearch('')} className="text-red-600 font-bold hover:underline">Hapus pencarian</button>}
                            <Link href="/blog/create" className="text-white bg-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors">
                                Tulis Cerita Baru
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
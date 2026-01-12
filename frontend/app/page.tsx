
// // // // // // // // // // // // 'use client';

// // // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // // // // // // // // export default function Dashboard() {
// // // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     const loadDashboardData = async () => {
// // // // // // // // // // // //       try {
// // // // // // // // // // // //         setLoading(true);
// // // // // // // // // // // //         const data = await api('/api/content');
// // // // // // // // // // // //         setContent(data);
// // // // // // // // // // // //       } catch (err) {
// // // // // // // // // // // //         console.error("Gagal memuat konten dashboard:", err);
// // // // // // // // // // // //       } finally {
// // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     };
// // // // // // // // // // // //     loadDashboardData();
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (content?.slides?.length > 1) {
// // // // // // // // // // // //       const timer = setInterval(() => {
// // // // // // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // // // // // //       }, 5000);
// // // // // // // // // // // //       return () => clearInterval(timer);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }, [content]);

// // // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Loading...</div>;

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="bg-gray-50 min-h-screen flex flex-col">
      
// // // // // // // // // // // //       {/* HERO SECTION */}
// // // // // // // // // // // //       {/* UNTUK GANTI WARNA MERAH: Ubah bg-[#990000] di bawah ini ke warna lain (misal bg-blue-800) */}
// // // // // // // // // // // //       <div className="bg-[#990000] text-white py-16 px-6 relative overflow-hidden shadow-xl">
        
// // // // // // // // // // // //         <div className="max-w-6xl mx-auto relative z-10">
// // // // // // // // // // // //           <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{content?.heroTitle}</h1>
// // // // // // // // // // // //           <p className="text-red-100 max-w-2xl text-lg mb-8 leading-relaxed">{content?.heroDescription}</p>
          
// // // // // // // // // // // //           <div className="flex flex-wrap gap-4">
// // // // // // // // // // // //             <Link href="/courses" className="bg-white text-red-800 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">Lihat Kursus</Link>
// // // // // // // // // // // //             {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // // // // // // //               <Link href="/admin/content" className="bg-black/30 text-white px-8 py-3 rounded-xl font-bold hover:bg-black/50 transition-all border border-white/20">Kelola Tampilan</Link>
// // // // // // // // // // // //             )}
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>

// // // // // // // // // // // //         {/* GAMBAR BACKGROUND DINAMIS */}
// // // // // // // // // // // //         <div className="absolute inset-0 pointer-events-none">
// // // // // // // // // // // //           {/* Layer gelap agar tulisan terbaca */}
// // // // // // // // // // // //           <div className="absolute inset-0 bg-black/20 z-10"></div>

// // // // // // // // // // // //           {content?.heroBgUrl ? (
// // // // // // // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero Background" className="w-full h-full object-cover object-center opacity-40" />
// // // // // // // // // // // //           ) : (
// // // // // // // // // // // //              <img src="/pmi-logo.png" alt="Hero Background Default" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // // // // // // //           )}
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* SECTION SLIDE */}
// // // // // // // // // // // //       <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20 w-full">
// // // // // // // // // // // //         {content?.slides && content.slides.length > 0 ? (
// // // // // // // // // // // //           <div className="relative h-[300px] md:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-800 group border-4 border-white">
// // // // // // // // // // // //             {content.slides.map((slide: string, index: number) => (
// // // // // // // // // // // //               <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
// // // // // // // // // // // //                 <img src={getImageUrl(slide)} alt={`Slide ${index}`} className="w-full h-full object-cover" />
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             ))}
// // // // // // // // // // // //             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
// // // // // // // // // // // //               {content.slides.map((_: any, i: number) => (
// // // // // // // // // // // //                 <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 transition-all rounded-full ${i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} aria-label={`Slide ${i+1}`} />
// // // // // // // // // // // //               ))}
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         ) : (
// // // // // // // // // // // //           <div className="h-[300px] md:h-[400px] bg-white rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-4 shadow-sm">
// // // // // // // // // // // //             <p>Belum ada foto slide.</p>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         )}
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       {/* FEATURES */}
// // // // // // // // // // // //       <div className="max-w-6xl mx-auto px-6 py-20">
// // // // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // // // // // //           {content?.features?.map((feat: any, idx: number) => (
// // // // // // // // // // // //             <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-red-500 transition-all group">
// // // // // // // // // // // //               <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-red-700 transition-colors">{feat.title}</h3>
// // // // // // // // // // // //               <p className="text-gray-600 text-sm leading-relaxed">{feat.description}</p>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           ))}
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }


// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // // import { 
// // // // // // // // // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // // // // // // // // //     Award, FileText, CheckCircle 
// // // // // // // // // // // } from 'lucide-react';

// // // // // // // // // // // export default function Dashboard() {
// // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // // // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // // // // // // // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const loadData = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         setLoading(true);
        
// // // // // // // // // // //         // 1. Load Content CMS
// // // // // // // // // // //         const contentData = await api('/api/content');
// // // // // // // // // // //         setContent(contentData);

// // // // // // // // // // //         // 2. Track Visitor (Tetap jalan di background)
// // // // // // // // // // //         api('/api/stats/visit', { method: 'POST' }).catch(console.error);

// // // // // // // // // // //         // 3. Load Blog Terbaru
// // // // // // // // // // //         try {
// // // // // // // // // // //             const blogsData = await api('/api/blog/public');
// // // // // // // // // // //             setRecentBlogs(blogsData?.slice(0, 3) || []);
// // // // // // // // // // //         } catch(e) { console.log("Blog error", e); }

// // // // // // // // // // //         // 4. Load Wall of Fame
// // // // // // // // // // //         try {
// // // // // // // // // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // // // // // // // // //             setWallOfFame(wofData || []);
// // // // // // // // // // //         } catch(e) { console.log("WoF error", e); }

// // // // // // // // // // //       } catch (err) {
// // // // // // // // // // //         console.error("Gagal memuat data:", err);
// // // // // // // // // // //       } finally {
// // // // // // // // // // //         setLoading(false);
// // // // // // // // // // //       }
// // // // // // // // // // //     };
// // // // // // // // // // //     loadData();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // Timer Slide Carousel
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (content?.slides?.length > 1) {
// // // // // // // // // // //       const timer = setInterval(() => {
// // // // // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // // // // //       }, 5000);
// // // // // // // // // // //       return () => clearInterval(timer);
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [content]);

// // // // // // // // // // //   // Default Features fallback (Agar card tidak hilang jika CMS kosong)
// // // // // // // // // // //   const features = content?.features?.length ? content.features : [
// // // // // // // // // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // // // // // // // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // // // // // // // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // // // // // // // // //   ];

// // // // // // // // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // // // // // // // // //       {/* 1. HERO SECTION (HEADER MERAH) */}
// // // // // // // // // // //       <div className="relative bg-[#990000] text-white shadow-2xl pb-40 pt-10 md:pt-14 overflow-hidden">
// // // // // // // // // // //         {/* Background Overlay */}
// // // // // // // // // // //         <div className="absolute inset-0 z-0 pointer-events-none">
// // // // // // // // // // //           <div className="absolute inset-0 bg-gradient-to-r from-[#990000] via-[#990000]/95 to-transparent z-10"></div>
// // // // // // // // // // //           {content?.heroBgUrl ? (
// // // // // // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero" className="w-full h-full object-cover object-center opacity-40" />
// // // // // // // // // // //           ) : (
// // // // // // // // // // //              <img src="/pmi-logo.png" alt="Default Hero" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // // // // // //           )}
// // // // // // // // // // //         </div>

// // // // // // // // // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-10">
// // // // // // // // // // //             {/* Teks Hero */}
// // // // // // // // // // //             <div className="flex-1 space-y-5 text-center md:text-left">
// // // // // // // // // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
// // // // // // // // // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // // // // // // // // //                 </h1>
// // // // // // // // // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-90">
// // // // // // // // // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // // // // // // // // //                 </p>
                
// // // // // // // // // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // // // // // // // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // // // // // // // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // // // // // // // // //                     </Link>
// // // // // // // // // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // // // // // //                         <Link href="/admin/content" className="bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // // // // // // // // //                             Kelola Tampilan
// // // // // // // // // // //                         </Link>
// // // // // // // // // // //                     )}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             {/* Slide Carousel (KEMBALI KE LOGIKA LAMA) */}
// // // // // // // // // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // // // // // // // // //                 {content?.slides && content.slides.length > 0 ? (
// // // // // // // // // // //                     <div className="relative h-[250px] md:h-[350px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group bg-gray-900">
// // // // // // // // // // //                         {content.slides.map((slide: string, index: number) => (
// // // // // // // // // // //                             <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
// // // // // // // // // // //                                 {/* [FIX] Menggunakan getImageUrl langsung agar gambar muncul */}
// // // // // // // // // // //                                 <img 
// // // // // // // // // // //                                     src={getImageUrl(slide)} 
// // // // // // // // // // //                                     alt={`Slide ${index}`} 
// // // // // // // // // // //                                     className="w-full h-full object-cover" 
// // // // // // // // // // //                                 />
// // // // // // // // // // //                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30 pointer-events-none"></div>
// // // // // // // // // // //                             </div>
// // // // // // // // // // //                         ))}
                        
// // // // // // // // // // //                         {/* Indikator Slide */}
// // // // // // // // // // //                         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
// // // // // // // // // // //                             {content.slides.map((_: any, i: number) => (
// // // // // // // // // // //                                 <button 
// // // // // // // // // // //                                     key={i} 
// // // // // // // // // // //                                     onClick={() => setCurrentSlide(i)} 
// // // // // // // // // // //                                     className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`} 
// // // // // // // // // // //                                     aria-label={`Slide ${i+1}`} 
// // // // // // // // // // //                                 />
// // // // // // // // // // //                             ))}
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 ) : (
// // // // // // // // // // //                     <div className="h-[250px] md:h-[350px] w-full bg-white/10 backdrop-blur-md rounded-2xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 gap-3">
// // // // // // // // // // //                         <div className="p-3 bg-white/10 rounded-full"><BookOpen size={28}/></div>
// // // // // // // // // // //                         <p className="text-xs font-medium">Slide Belum Ditambahkan</p>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 )}
// // // // // // // // // // //             </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER) - FIXED */}
// // // // // // // // // // //       {/* Margin negatif -mt-32 menarik card ke atas menutupi header */}
// // // // // // // // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-32 mb-16">
// // // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // // // // // // // //           {features.map((feat: any, idx: number) => (
// // // // // // // // // // //             <div key={idx} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full relative z-40">
// // // // // // // // // // //                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // // // // // // // //                     {idx === 0 ? <BookOpen size={32}/> : idx === 1 ? <Users size={32}/> : <Calendar size={32}/>}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //                 <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-[#990000] transition-colors">{feat.title || "Judul Fitur"}</h3>
// // // // // // // // // // //                 <p className="text-gray-500 text-base leading-relaxed">{feat.description || "Deskripsi fitur singkat akan muncul di sini."}</p>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           ))}
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* 3. WALL OF FAME (REALTIME) */}
// // // // // // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-20">
// // // // // // // // // // //           <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
// // // // // // // // // // //               <div className="flex items-center gap-4">
// // // // // // // // // // //                   <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shadow-sm"><Award size={28}/></div>
// // // // // // // // // // //                   <div>
// // // // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Wall of Fame</h2>
// // // // // // // // // // //                     <p className="text-gray-500 text-sm mt-1">Apresiasi untuk lulusan terbaik yang baru saja menyelesaikan pelatihan.</p>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //               </div>
// // // // // // // // // // //           </div>
          
// // // // // // // // // // //           {wallOfFame.length > 0 ? (
// // // // // // // // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // // // // // // //                   {wallOfFame.map((winner, idx) => (
// // // // // // // // // // //                       <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all group relative overflow-hidden flex items-center gap-4">
// // // // // // // // // // //                           <div className="absolute top-0 right-0 bg-yellow-400 w-10 h-10 rounded-bl-2xl flex items-center justify-center text-white text-sm font-black shadow-sm z-10">
// // // // // // // // // // //                               #{idx+1}
// // // // // // // // // // //                           </div>
                          
// // // // // // // // // // //                           <div className="w-16 h-16 rounded-full bg-gray-50 p-1 border-2 border-dashed border-yellow-200 group-hover:border-yellow-400 transition-colors flex-shrink-0">
// // // // // // // // // // //                                 <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
// // // // // // // // // // //                                     {winner.avatar ? (
// // // // // // // // // // //                                         <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // // // // // // // // //                                     ) : (
// // // // // // // // // // //                                         <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">{winner.name?.charAt(0)}</div>
// // // // // // // // // // //                                     )}
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                           </div>
                          
// // // // // // // // // // //                           <div className="flex-1 min-w-0 pr-6">
// // // // // // // // // // //                               <h3 className="font-bold text-gray-900 truncate text-sm" title={winner.name}>{winner.name}</h3>
// // // // // // // // // // //                               <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mb-1 truncate">{winner.course}</p>
// // // // // // // // // // //                               <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-green-100">
// // // // // // // // // // //                                   <CheckCircle size={8}/> LULUS
// // // // // // // // // // //                               </span>
// // // // // // // // // // //                           </div>
// // // // // // // // // // //                       </div>
// // // // // // // // // // //                   ))}
// // // // // // // // // // //               </div>
// // // // // // // // // // //           ) : (
// // // // // // // // // // //               <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // // // // // // // // // //                   <Award className="mx-auto text-gray-300 mb-2" size={48}/>
// // // // // // // // // // //                   <p className="text-gray-500 font-bold">Belum ada lulusan terbaru.</p>
// // // // // // // // // // //                   <p className="text-gray-400 text-xs">Jadilah yang pertama lulus!</p>
// // // // // // // // // // //               </div>
// // // // // // // // // // //           )}
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* 4. CERITA RELAWAN (BLOG) */}
// // // // // // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // // // // // // // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // // // // // // // // //               <div className="flex items-center gap-4">
// // // // // // // // // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // // // // // // // // //                   <div>
// // // // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // // // // // // // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // // // // // // // // //                   </div>
// // // // // // // // // // //               </div>
// // // // // // // // // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // // // // // // // // //                   Lihat Semua <ChevronRight size={16}/>
// // // // // // // // // // //               </Link>
// // // // // // // // // // //           </div>
          
// // // // // // // // // // //           {recentBlogs.length === 0 ? (
// // // // // // // // // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
// // // // // // // // // // //                   Belum ada cerita terbaru yang dipublikasikan.
// // // // // // // // // // //               </div>
// // // // // // // // // // //           ) : (
// // // // // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // // // // //                   {recentBlogs.map((blog, idx) => (
// // // // // // // // // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
// // // // // // // // // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // // // // // // //                               {blog.coverUrl ? (
// // // // // // // // // // //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// // // // // // // // // // //                               ) : (
// // // // // // // // // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
// // // // // // // // // // //                               )}
// // // // // // // // // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // // // // // // // // //                               <div className="absolute top-3 left-3 flex gap-1">
// // // // // // // // // // //                                   {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
// // // // // // // // // // //                               </div>
// // // // // // // // // // //                           </div>
// // // // // // // // // // //                           <div className="p-6 flex-1 flex flex-col">
// // // // // // // // // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // // // // // // // // //                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // // // // // // // // //                               </p>
// // // // // // // // // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
// // // // // // // // // // //                               <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
                              
// // // // // // // // // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // // // // // // // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // // // // // // //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
// // // // // // // // // // //                                   </div>
// // // // // // // // // // //                                   <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// // // // // // // // // // //                               </div>
// // // // // // // // // // //                           </div>
// // // // // // // // // // //                       </Link>
// // // // // // // // // // //                   ))}
// // // // // // // // // // //               </div>
// // // // // // // // // // //           )}
// // // // // // // // // // //       </div>

// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }


















































// // // // // // // // // // 'use client';

// // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // import { 
// // // // // // // // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // // // // // // // //     Award, FileText, CheckCircle, GraduationCap, Globe 
// // // // // // // // // // } from 'lucide-react';

// // // // // // // // // // export default function Dashboard() {
// // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // // // //   const [stats, setStats] = useState({ users: 0, courses: 0, visitors: 0, startYear: 2025 });
// // // // // // // // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // // // // // // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const loadData = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         setLoading(true);
        
// // // // // // // // // //         // 1. Load Content & Stats
// // // // // // // // // //         const [contentData, statsData] = await Promise.all([
// // // // // // // // // //             api('/api/content'),
// // // // // // // // // //             api('/api/stats/public')
// // // // // // // // // //         ]);
// // // // // // // // // //         setContent(contentData);
// // // // // // // // // //         setStats(statsData || { users: 0, courses: 0, visitors: 0, startYear: 2025 });

// // // // // // // // // //         // 2. Track Visitor
// // // // // // // // // //         await api('/api/stats/visit', { method: 'POST' });

// // // // // // // // // //         // 3. Load Blog Terbaru
// // // // // // // // // //         try {
// // // // // // // // // //             const blogsData = await api('/api/blog/public');
// // // // // // // // // //             setRecentBlogs(blogsData?.slice(0, 3) || []);
// // // // // // // // // //         } catch(e) { console.log("Blog error", e); }

// // // // // // // // // //         // 4. Load Wall of Fame
// // // // // // // // // //         try {
// // // // // // // // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // // // // // // // //             setWallOfFame(wofData || []);
// // // // // // // // // //         } catch(e) { console.log("WoF error", e); }

// // // // // // // // // //       } catch (err) {
// // // // // // // // // //         console.error("Gagal memuat data:", err);
// // // // // // // // // //       } finally {
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       }
// // // // // // // // // //     };
// // // // // // // // // //     loadData();
// // // // // // // // // //   }, []);

// // // // // // // // // //   // Timer Slide Carousel
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (content?.slides?.length > 1) {
// // // // // // // // // //       const timer = setInterval(() => {
// // // // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // // // //       }, 5000);
// // // // // // // // // //       return () => clearInterval(timer);
// // // // // // // // // //     }
// // // // // // // // // //   }, [content]);

// // // // // // // // // //   // Default Features fallback
// // // // // // // // // //   const features = content?.features?.length ? content.features : [
// // // // // // // // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // // // // // // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // // // // // // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // // // // // // // //   ];

// // // // // // // // // //   // Helper untuk memastikan URL gambar valid
// // // // // // // // // //   const getSlideUrl = (url: string) => {
// // // // // // // // // //       if (!url) return '';
// // // // // // // // // //       // Jika URL sudah lengkap (http/https), pakai langsung. Jika tidak, pakai getImageUrl
// // // // // // // // // //       if (url.startsWith('http')) return url;
// // // // // // // // // //       return getImageUrl(url);
// // // // // // // // // //   };

// // // // // // // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // // // // // // // //       {/* 1. HERO SECTION */}
// // // // // // // // // //       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-32 pt-10 md:pt-14">
// // // // // // // // // //         {/* Background Overlay */}
// // // // // // // // // //         <div className="absolute inset-0 z-0">
// // // // // // // // // //           <div className="absolute inset-0 bg-gradient-to-r from-[#990000] via-[#990000]/95 to-transparent z-10"></div>
// // // // // // // // // //           {content?.heroBgUrl ? (
// // // // // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero" className="w-full h-full object-cover object-center opacity-40 animate-in fade-in duration-1000" />
// // // // // // // // // //           ) : (
// // // // // // // // // //              <img src="/pmi-logo.png" alt="Default Hero" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // // // // //           )}
// // // // // // // // // //         </div>

// // // // // // // // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-10">
// // // // // // // // // //             {/* Teks Hero */}
// // // // // // // // // //             <div className="flex-1 space-y-5 text-center md:text-left">
// // // // // // // // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
// // // // // // // // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // // // // // // // //                 </h1>
// // // // // // // // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-90">
// // // // // // // // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // // // // // // // //                 </p>
                
// // // // // // // // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // // // // // // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // // // // // // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // // // // // // // //                     </Link>
// // // // // // // // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // // // // //                         <Link href="/admin/content" className="bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // // // // // // // //                             Kelola Tampilan
// // // // // // // // // //                         </Link>
// // // // // // // // // //                     )}
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* Slide Carousel (FIXED) */}
// // // // // // // // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // // // // // // // //                 {content?.slides && content.slides.length > 0 ? (
// // // // // // // // // //                     <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 group bg-gray-900">
// // // // // // // // // //                         {content.slides.map((slide: string, index: number) => (
// // // // // // // // // //                             <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
// // // // // // // // // //                                 <img 
// // // // // // // // // //                                     src={getImageUrl(slide)} 
// // // // // // // // // //                                     alt={`Slide ${index}`} 
// // // // // // // // // //                                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[5000ms]" 
// // // // // // // // // //                                     onError={(e) => (e.currentTarget.style.display = 'none')}
// // // // // // // // // //                                 />
// // // // // // // // // //                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30 pointer-events-none"></div>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         ))}
                        
// // // // // // // // // //                         {/* Indikator Slide */}
// // // // // // // // // //                         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
// // // // // // // // // //                             {content.slides.map((_: any, i: number) => (
// // // // // // // // // //                                 <button 
// // // // // // // // // //                                     key={i} 
// // // // // // // // // //                                     onClick={() => setCurrentSlide(i)} 
// // // // // // // // // //                                     className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`} 
// // // // // // // // // //                                     aria-label={`Slide ${i+1}`} 
// // // // // // // // // //                                 />
// // // // // // // // // //                             ))}
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 ) : (
// // // // // // // // // //                     <div className="aspect-video bg-white/10 backdrop-blur-md rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 gap-3">
// // // // // // // // // //                         <div className="p-3 bg-white/10 rounded-full"><BookOpen size={28}/></div>
// // // // // // // // // //                         <p className="text-xs font-medium">Slide Belum Ditambahkan</p>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER) */}
// // // // // // // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-24 mb-16">
// // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // // // // // // //           {features.map((feat: any, idx: number) => (
// // // // // // // // // //             <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full">
// // // // // // // // // //                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // // // // // // //                     {idx === 0 ? <BookOpen size={28}/> : idx === 1 ? <Users size={28}/> : <Calendar size={28}/>}
// // // // // // // // // //                 </div>
// // // // // // // // // //                 <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#990000] transition-colors">{feat.title || "Judul Fitur"}</h3>
// // // // // // // // // //                 <p className="text-gray-500 text-sm leading-relaxed">{feat.description || "Deskripsi fitur singkat akan muncul di sini."}</p>
// // // // // // // // // //             </div>
// // // // // // // // // //           ))}
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* 3. WALL OF FAME (REALTIME LULUSAN) */}
// // // // // // // // // //       {wallOfFame.length > 0 && (
// // // // // // // // // //           <div className="max-w-7xl mx-auto px-6 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
// // // // // // // // // //               <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
// // // // // // // // // //                   <div className="flex items-center gap-4">
// // // // // // // // // //                       <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shadow-sm"><Award size={28}/></div>
// // // // // // // // // //                       <div>
// // // // // // // // // //                         <h2 className="text-2xl font-bold text-gray-900">Wall of Fame</h2>
// // // // // // // // // //                         <p className="text-gray-500 text-sm mt-1">Apresiasi untuk lulusan terbaik yang baru saja menyelesaikan pelatihan.</p>
// // // // // // // // // //                       </div>
// // // // // // // // // //                   </div>
// // // // // // // // // //               </div>
              
// // // // // // // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // // // // // //                   {wallOfFame.map((winner, idx) => (
// // // // // // // // // //                       <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all group relative overflow-hidden flex items-center gap-4">
// // // // // // // // // //                           <div className="absolute top-0 right-0 bg-yellow-400 w-10 h-10 rounded-bl-2xl flex items-center justify-center text-white text-sm font-black shadow-sm group-hover:w-12 group-hover:h-12 transition-all z-10">
// // // // // // // // // //                               #{idx+1}
// // // // // // // // // //                           </div>
                          
// // // // // // // // // //                           <div className="w-16 h-16 rounded-full bg-gray-50 p-1 border-2 border-dashed border-yellow-200 group-hover:border-yellow-400 transition-colors flex-shrink-0">
// // // // // // // // // //                                 <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
// // // // // // // // // //                                     {winner.avatar ? (
// // // // // // // // // //                                         <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // // // // // // // //                                     ) : (
// // // // // // // // // //                                         <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">{winner.name?.charAt(0)}</div>
// // // // // // // // // //                                     )}
// // // // // // // // // //                                 </div>
// // // // // // // // // //                           </div>
                          
// // // // // // // // // //                           <div className="flex-1 min-w-0 pr-6">
// // // // // // // // // //                               <h3 className="font-bold text-gray-900 truncate text-sm" title={winner.name}>{winner.name}</h3>
// // // // // // // // // //                               <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mb-1 truncate">{winner.course}</p>
// // // // // // // // // //                               <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-green-100">
// // // // // // // // // //                                   <CheckCircle size={8}/> LULUS
// // // // // // // // // //                               </span>
// // // // // // // // // //                           </div>
// // // // // // // // // //                       </div>
// // // // // // // // // //                   ))}
// // // // // // // // // //               </div>
// // // // // // // // // //           </div>
// // // // // // // // // //       )}

// // // // // // // // // //       {/* 4. CERITA RELAWAN (BLOG) */}
// // // // // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // // // // // // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // // // // // // // //               <div className="flex items-center gap-4">
// // // // // // // // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // // // // // // // //                   <div>
// // // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // // // // // // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // // // // // // // //                   </div>
// // // // // // // // // //               </div>
// // // // // // // // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // // // // // // // //                   Lihat Semua <ChevronRight size={16}/>
// // // // // // // // // //               </Link>
// // // // // // // // // //           </div>
          
// // // // // // // // // //           {recentBlogs.length === 0 ? (
// // // // // // // // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
// // // // // // // // // //                   Belum ada cerita terbaru yang dipublikasikan.
// // // // // // // // // //               </div>
// // // // // // // // // //           ) : (
// // // // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // // // //                   {recentBlogs.map((blog, idx) => (
// // // // // // // // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
// // // // // // // // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // // // // // //                               {blog.coverUrl ? (
// // // // // // // // // //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// // // // // // // // // //                               ) : (
// // // // // // // // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
// // // // // // // // // //                               )}
// // // // // // // // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // // // // // // // //                               <div className="absolute top-3 left-3 flex gap-1">
// // // // // // // // // //                                   {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
// // // // // // // // // //                               </div>
// // // // // // // // // //                           </div>
// // // // // // // // // //                           <div className="p-6 flex-1 flex flex-col">
// // // // // // // // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // // // // // // // //                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // // // // // // // //                               </p>
// // // // // // // // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
// // // // // // // // // //                               <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
                              
// // // // // // // // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // // // // // // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // // // // // //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
// // // // // // // // // //                                   </div>
// // // // // // // // // //                                   <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// // // // // // // // // //                               </div>
// // // // // // // // // //                           </div>
// // // // // // // // // //                       </Link>
// // // // // // // // // //                   ))}
// // // // // // // // // //               </div>
// // // // // // // // // //           )}
// // // // // // // // // //       </div>


// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }



// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // // // // // // // export default function Dashboard() {
// // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const loadDashboardData = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         setLoading(true);
// // // // // // // // // // //         const data = await api('/api/content');
// // // // // // // // // // //         setContent(data);
// // // // // // // // // // //       } catch (err) {
// // // // // // // // // // //         console.error("Gagal memuat konten dashboard:", err);
// // // // // // // // // // //       } finally {
// // // // // // // // // // //         setLoading(false);
// // // // // // // // // // //       }
// // // // // // // // // // //     };
// // // // // // // // // // //     loadDashboardData();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (content?.slides?.length > 1) {
// // // // // // // // // // //       const timer = setInterval(() => {
// // // // // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // // // // //       }, 5000);
// // // // // // // // // // //       return () => clearInterval(timer);
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [content]);

// // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Loading...</div>;

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="bg-gray-50 min-h-screen flex flex-col">
      
// // // // // // // // // // //       {/* HERO SECTION */}
// // // // // // // // // // //       {/* UNTUK GANTI WARNA MERAH: Ubah bg-[#990000] di bawah ini ke warna lain (misal bg-blue-800) */}
// // // // // // // // // // //       <div className="bg-[#990000] text-white py-16 px-6 relative overflow-hidden shadow-xl">
        
// // // // // // // // // // //         <div className="max-w-6xl mx-auto relative z-10">
// // // // // // // // // // //           <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{content?.heroTitle}</h1>
// // // // // // // // // // //           <p className="text-red-100 max-w-2xl text-lg mb-8 leading-relaxed">{content?.heroDescription}</p>
          
// // // // // // // // // // //           <div className="flex flex-wrap gap-4">
// // // // // // // // // // //             <Link href="/courses" className="bg-white text-red-800 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">Lihat Kursus</Link>
// // // // // // // // // // //             {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // // // // // //               <Link href="/admin/content" className="bg-black/30 text-white px-8 py-3 rounded-xl font-bold hover:bg-black/50 transition-all border border-white/20">Kelola Tampilan</Link>
// // // // // // // // // // //             )}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* GAMBAR BACKGROUND DINAMIS */}
// // // // // // // // // // //         <div className="absolute inset-0 pointer-events-none">
// // // // // // // // // // //           {/* Layer gelap agar tulisan terbaca */}
// // // // // // // // // // //           <div className="absolute inset-0 bg-black/20 z-10"></div>

// // // // // // // // // // //           {content?.heroBgUrl ? (
// // // // // // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero Background" className="w-full h-full object-cover object-center opacity-40" />
// // // // // // // // // // //           ) : (
// // // // // // // // // // //              <img src="/pmi-logo.png" alt="Hero Background Default" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // // // // // //           )}
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* SECTION SLIDE */}
// // // // // // // // // // //       <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20 w-full">
// // // // // // // // // // //         {content?.slides && content.slides.length > 0 ? (
// // // // // // // // // // //           <div className="relative h-[300px] md:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-800 group border-4 border-white">
// // // // // // // // // // //             {content.slides.map((slide: string, index: number) => (
// // // // // // // // // // //               <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
// // // // // // // // // // //                 <img src={getImageUrl(slide)} alt={`Slide ${index}`} className="w-full h-full object-cover" />
// // // // // // // // // // //               </div>
// // // // // // // // // // //             ))}
// // // // // // // // // // //             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
// // // // // // // // // // //               {content.slides.map((_: any, i: number) => (
// // // // // // // // // // //                 <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 transition-all rounded-full ${i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} aria-label={`Slide ${i+1}`} />
// // // // // // // // // // //               ))}
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         ) : (
// // // // // // // // // // //           <div className="h-[300px] md:h-[400px] bg-white rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-4 shadow-sm">
// // // // // // // // // // //             <p>Belum ada foto slide.</p>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         )}
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* FEATURES */}
// // // // // // // // // // //       <div className="max-w-6xl mx-auto px-6 py-20">
// // // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // // // // //           {content?.features?.map((feat: any, idx: number) => (
// // // // // // // // // // //             <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-red-500 transition-all group">
// // // // // // // // // // //               <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-red-700 transition-colors">{feat.title}</h3>
// // // // // // // // // // //               <p className="text-gray-600 text-sm leading-relaxed">{feat.description}</p>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           ))}
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }


// // // // // // // // // // 'use client';

// // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // import { 
// // // // // // // // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // // // // // // // //     Award, FileText, CheckCircle 
// // // // // // // // // // } from 'lucide-react';

// // // // // // // // // // export default function Dashboard() {
// // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // // // // // // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const loadData = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         setLoading(true);
        
// // // // // // // // // //         // 1. Load Content CMS
// // // // // // // // // //         const contentData = await api('/api/content');
// // // // // // // // // //         setContent(contentData);

// // // // // // // // // //         // 2. Track Visitor (Tetap jalan di background)
// // // // // // // // // //         api('/api/stats/visit', { method: 'POST' }).catch(console.error);

// // // // // // // // // //         // 3. Load Blog Terbaru
// // // // // // // // // //         try {
// // // // // // // // // //             const blogsData = await api('/api/blog/public');
// // // // // // // // // //             setRecentBlogs(blogsData?.slice(0, 3) || []);
// // // // // // // // // //         } catch(e) { console.log("Blog error", e); }

// // // // // // // // // //         // 4. Load Wall of Fame
// // // // // // // // // //         try {
// // // // // // // // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // // // // // // // //             setWallOfFame(wofData || []);
// // // // // // // // // //         } catch(e) { console.log("WoF error", e); }

// // // // // // // // // //       } catch (err) {
// // // // // // // // // //         console.error("Gagal memuat data:", err);
// // // // // // // // // //       } finally {
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       }
// // // // // // // // // //     };
// // // // // // // // // //     loadData();
// // // // // // // // // //   }, []);

// // // // // // // // // //   // Timer Slide Carousel
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (content?.slides?.length > 1) {
// // // // // // // // // //       const timer = setInterval(() => {
// // // // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // // // //       }, 5000);
// // // // // // // // // //       return () => clearInterval(timer);
// // // // // // // // // //     }
// // // // // // // // // //   }, [content]);

// // // // // // // // // //   // Default Features fallback (Agar card tidak hilang jika CMS kosong)
// // // // // // // // // //   const features = content?.features?.length ? content.features : [
// // // // // // // // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // // // // // // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // // // // // // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // // // // // // // //   ];

// // // // // // // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // // // // // // // //       {/* 1. HERO SECTION (HEADER MERAH) */}
// // // // // // // // // //       <div className="relative bg-[#990000] text-white shadow-2xl pb-40 pt-10 md:pt-14 overflow-hidden">
// // // // // // // // // //         {/* Background Overlay */}
// // // // // // // // // //         <div className="absolute inset-0 z-0 pointer-events-none">
// // // // // // // // // //           <div className="absolute inset-0 bg-gradient-to-r from-[#990000] via-[#990000]/95 to-transparent z-10"></div>
// // // // // // // // // //           {content?.heroBgUrl ? (
// // // // // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero" className="w-full h-full object-cover object-center opacity-40" />
// // // // // // // // // //           ) : (
// // // // // // // // // //              <img src="/pmi-logo.png" alt="Default Hero" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // // // // //           )}
// // // // // // // // // //         </div>

// // // // // // // // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-10">
// // // // // // // // // //             {/* Teks Hero */}
// // // // // // // // // //             <div className="flex-1 space-y-5 text-center md:text-left">
// // // // // // // // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
// // // // // // // // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // // // // // // // //                 </h1>
// // // // // // // // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-90">
// // // // // // // // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // // // // // // // //                 </p>
                
// // // // // // // // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // // // // // // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // // // // // // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // // // // // // // //                     </Link>
// // // // // // // // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // // // // //                         <Link href="/admin/content" className="bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // // // // // // // //                             Kelola Tampilan
// // // // // // // // // //                         </Link>
// // // // // // // // // //                     )}
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* Slide Carousel (KEMBALI KE LOGIKA LAMA) */}
// // // // // // // // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // // // // // // // //                 {content?.slides && content.slides.length > 0 ? (
// // // // // // // // // //                     <div className="relative h-[250px] md:h-[350px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group bg-gray-900">
// // // // // // // // // //                         {content.slides.map((slide: string, index: number) => (
// // // // // // // // // //                             <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
// // // // // // // // // //                                 {/* [FIX] Menggunakan getImageUrl langsung agar gambar muncul */}
// // // // // // // // // //                                 <img 
// // // // // // // // // //                                     src={getImageUrl(slide)} 
// // // // // // // // // //                                     alt={`Slide ${index}`} 
// // // // // // // // // //                                     className="w-full h-full object-cover" 
// // // // // // // // // //                                 />
// // // // // // // // // //                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30 pointer-events-none"></div>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         ))}
                        
// // // // // // // // // //                         {/* Indikator Slide */}
// // // // // // // // // //                         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
// // // // // // // // // //                             {content.slides.map((_: any, i: number) => (
// // // // // // // // // //                                 <button 
// // // // // // // // // //                                     key={i} 
// // // // // // // // // //                                     onClick={() => setCurrentSlide(i)} 
// // // // // // // // // //                                     className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`} 
// // // // // // // // // //                                     aria-label={`Slide ${i+1}`} 
// // // // // // // // // //                                 />
// // // // // // // // // //                             ))}
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 ) : (
// // // // // // // // // //                     <div className="h-[250px] md:h-[350px] w-full bg-white/10 backdrop-blur-md rounded-2xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 gap-3">
// // // // // // // // // //                         <div className="p-3 bg-white/10 rounded-full"><BookOpen size={28}/></div>
// // // // // // // // // //                         <p className="text-xs font-medium">Slide Belum Ditambahkan</p>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER) - FIXED */}
// // // // // // // // // //       {/* Margin negatif -mt-32 menarik card ke atas menutupi header */}
// // // // // // // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-32 mb-16">
// // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // // // // // // //           {features.map((feat: any, idx: number) => (
// // // // // // // // // //             <div key={idx} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full relative z-40">
// // // // // // // // // //                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // // // // // // //                     {idx === 0 ? <BookOpen size={32}/> : idx === 1 ? <Users size={32}/> : <Calendar size={32}/>}
// // // // // // // // // //                 </div>
// // // // // // // // // //                 <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-[#990000] transition-colors">{feat.title || "Judul Fitur"}</h3>
// // // // // // // // // //                 <p className="text-gray-500 text-base leading-relaxed">{feat.description || "Deskripsi fitur singkat akan muncul di sini."}</p>
// // // // // // // // // //             </div>
// // // // // // // // // //           ))}
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* 3. WALL OF FAME (REALTIME) */}
// // // // // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-20">
// // // // // // // // // //           <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
// // // // // // // // // //               <div className="flex items-center gap-4">
// // // // // // // // // //                   <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shadow-sm"><Award size={28}/></div>
// // // // // // // // // //                   <div>
// // // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Wall of Fame</h2>
// // // // // // // // // //                     <p className="text-gray-500 text-sm mt-1">Apresiasi untuk lulusan terbaik yang baru saja menyelesaikan pelatihan.</p>
// // // // // // // // // //                   </div>
// // // // // // // // // //               </div>
// // // // // // // // // //           </div>
          
// // // // // // // // // //           {wallOfFame.length > 0 ? (
// // // // // // // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // // // // // //                   {wallOfFame.map((winner, idx) => (
// // // // // // // // // //                       <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all group relative overflow-hidden flex items-center gap-4">
// // // // // // // // // //                           <div className="absolute top-0 right-0 bg-yellow-400 w-10 h-10 rounded-bl-2xl flex items-center justify-center text-white text-sm font-black shadow-sm z-10">
// // // // // // // // // //                               #{idx+1}
// // // // // // // // // //                           </div>
                          
// // // // // // // // // //                           <div className="w-16 h-16 rounded-full bg-gray-50 p-1 border-2 border-dashed border-yellow-200 group-hover:border-yellow-400 transition-colors flex-shrink-0">
// // // // // // // // // //                                 <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
// // // // // // // // // //                                     {winner.avatar ? (
// // // // // // // // // //                                         <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // // // // // // // //                                     ) : (
// // // // // // // // // //                                         <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">{winner.name?.charAt(0)}</div>
// // // // // // // // // //                                     )}
// // // // // // // // // //                                 </div>
// // // // // // // // // //                           </div>
                          
// // // // // // // // // //                           <div className="flex-1 min-w-0 pr-6">
// // // // // // // // // //                               <h3 className="font-bold text-gray-900 truncate text-sm" title={winner.name}>{winner.name}</h3>
// // // // // // // // // //                               <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mb-1 truncate">{winner.course}</p>
// // // // // // // // // //                               <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-green-100">
// // // // // // // // // //                                   <CheckCircle size={8}/> LULUS
// // // // // // // // // //                               </span>
// // // // // // // // // //                           </div>
// // // // // // // // // //                       </div>
// // // // // // // // // //                   ))}
// // // // // // // // // //               </div>
// // // // // // // // // //           ) : (
// // // // // // // // // //               <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // // // // // // // // //                   <Award className="mx-auto text-gray-300 mb-2" size={48}/>
// // // // // // // // // //                   <p className="text-gray-500 font-bold">Belum ada lulusan terbaru.</p>
// // // // // // // // // //                   <p className="text-gray-400 text-xs">Jadilah yang pertama lulus!</p>
// // // // // // // // // //               </div>
// // // // // // // // // //           )}
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* 4. CERITA RELAWAN (BLOG) */}
// // // // // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // // // // // // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // // // // // // // //               <div className="flex items-center gap-4">
// // // // // // // // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // // // // // // // //                   <div>
// // // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // // // // // // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // // // // // // // //                   </div>
// // // // // // // // // //               </div>
// // // // // // // // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // // // // // // // //                   Lihat Semua <ChevronRight size={16}/>
// // // // // // // // // //               </Link>
// // // // // // // // // //           </div>
          
// // // // // // // // // //           {recentBlogs.length === 0 ? (
// // // // // // // // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
// // // // // // // // // //                   Belum ada cerita terbaru yang dipublikasikan.
// // // // // // // // // //               </div>
// // // // // // // // // //           ) : (
// // // // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // // // //                   {recentBlogs.map((blog, idx) => (
// // // // // // // // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
// // // // // // // // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // // // // // //                               {blog.coverUrl ? (
// // // // // // // // // //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// // // // // // // // // //                               ) : (
// // // // // // // // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
// // // // // // // // // //                               )}
// // // // // // // // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // // // // // // // //                               <div className="absolute top-3 left-3 flex gap-1">
// // // // // // // // // //                                   {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
// // // // // // // // // //                               </div>
// // // // // // // // // //                           </div>
// // // // // // // // // //                           <div className="p-6 flex-1 flex flex-col">
// // // // // // // // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // // // // // // // //                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // // // // // // // //                               </p>
// // // // // // // // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
// // // // // // // // // //                               <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
                              
// // // // // // // // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // // // // // // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // // // // // //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
// // // // // // // // // //                                   </div>
// // // // // // // // // //                                   <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// // // // // // // // // //                               </div>
// // // // // // // // // //                           </div>
// // // // // // // // // //                       </Link>
// // // // // // // // // //                   ))}
// // // // // // // // // //               </div>
// // // // // // // // // //           )}
// // // // // // // // // //       </div>

// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }


















































// // // // // // // // // 'use client';

// // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // import Link from 'next/link';
// // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // import { 
// // // // // // // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // // // // // // //     Award, FileText, CheckCircle, GraduationCap, Globe 
// // // // // // // // // } from 'lucide-react';

// // // // // // // // // export default function Dashboard() {
// // // // // // // // //   const { user } = useAuth();
// // // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // // //   const [stats, setStats] = useState({ users: 0, courses: 0, visitors: 0, startYear: 2025 });
// // // // // // // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // // // // // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const loadData = async () => {
// // // // // // // // //       try {
// // // // // // // // //         setLoading(true);
        
// // // // // // // // //         // 1. Load Content & Stats
// // // // // // // // //         const [contentData, statsData] = await Promise.all([
// // // // // // // // //             api('/api/content'),
// // // // // // // // //             api('/api/stats/public')
// // // // // // // // //         ]);
// // // // // // // // //         setContent(contentData);
// // // // // // // // //         setStats(statsData || { users: 0, courses: 0, visitors: 0, startYear: 2025 });

// // // // // // // // //         // 2. Track Visitor
// // // // // // // // //         await api('/api/stats/visit', { method: 'POST' });

// // // // // // // // //         // 3. Load Blog Terbaru
// // // // // // // // //         try {
// // // // // // // // //             const blogsData = await api('/api/blog/public');
// // // // // // // // //             setRecentBlogs(blogsData?.slice(0, 3) || []);
// // // // // // // // //         } catch(e) { console.log("Blog error", e); }

// // // // // // // // //         // 4. Load Wall of Fame
// // // // // // // // //         try {
// // // // // // // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // // // // // // //             setWallOfFame(wofData || []);
// // // // // // // // //         } catch(e) { console.log("WoF error", e); }

// // // // // // // // //       } catch (err) {
// // // // // // // // //         console.error("Gagal memuat data:", err);
// // // // // // // // //       } finally {
// // // // // // // // //         setLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     loadData();
// // // // // // // // //   }, []);

// // // // // // // // //   // Timer Slide Carousel
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (content?.slides?.length > 1) {
// // // // // // // // //       const timer = setInterval(() => {
// // // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // // //       }, 5000);
// // // // // // // // //       return () => clearInterval(timer);
// // // // // // // // //     }
// // // // // // // // //   }, [content]);

// // // // // // // // //   // Default Features fallback
// // // // // // // // //   const features = content?.features?.length ? content.features : [
// // // // // // // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // // // // // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // // // // // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // // // // // // //   ];

// // // // // // // // //   // Helper untuk memastikan URL gambar valid
// // // // // // // // //   const getSlideUrl = (url: string) => {
// // // // // // // // //       if (!url) return '';
// // // // // // // // //       // Jika URL sudah lengkap (http/https), pakai langsung. Jika tidak, pakai getImageUrl
// // // // // // // // //       if (url.startsWith('http')) return url;
// // // // // // // // //       return getImageUrl(url);
// // // // // // // // //   };

// // // // // // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // // // // // // //   return (
// // // // // // // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // // // // // // //       {/* 1. HERO SECTION */}
// // // // // // // // //       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-32 pt-10 md:pt-14">
// // // // // // // // //         {/* Background Overlay */}
// // // // // // // // //         <div className="absolute inset-0 z-0">
// // // // // // // // //           <div className="absolute inset-0 bg-gradient-to-r from-[#990000] via-[#990000]/95 to-transparent z-10"></div>
// // // // // // // // //           {content?.heroBgUrl ? (
// // // // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero" className="w-full h-full object-cover object-center opacity-40 animate-in fade-in duration-1000" />
// // // // // // // // //           ) : (
// // // // // // // // //              <img src="/pmi-logo.png" alt="Default Hero" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // // // //           )}
// // // // // // // // //         </div>

// // // // // // // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-10">
// // // // // // // // //             {/* Teks Hero */}
// // // // // // // // //             <div className="flex-1 space-y-5 text-center md:text-left">
// // // // // // // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
// // // // // // // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // // // // // // //                 </h1>
// // // // // // // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-90">
// // // // // // // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // // // // // // //                 </p>
                
// // // // // // // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // // // // // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // // // // // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // // // // // // //                     </Link>
// // // // // // // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // // // //                         <Link href="/admin/content" className="bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // // // // // // //                             Kelola Tampilan
// // // // // // // // //                         </Link>
// // // // // // // // //                     )}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* Slide Carousel (FIXED) */}
// // // // // // // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // // // // // // //                 {content?.slides && content.slides.length > 0 ? (
// // // // // // // // //                     <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 group bg-gray-900">
// // // // // // // // //                         {content.slides.map((slide: string, index: number) => (
// // // // // // // // //                             <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
// // // // // // // // //                                 <img 
// // // // // // // // //                                     src={getImageUrl(slide)} 
// // // // // // // // //                                     alt={`Slide ${index}`} 
// // // // // // // // //                                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[5000ms]" 
// // // // // // // // //                                     onError={(e) => (e.currentTarget.style.display = 'none')}
// // // // // // // // //                                 />
// // // // // // // // //                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30 pointer-events-none"></div>
// // // // // // // // //                             </div>
// // // // // // // // //                         ))}
                        
// // // // // // // // //                         {/* Indikator Slide */}
// // // // // // // // //                         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
// // // // // // // // //                             {content.slides.map((_: any, i: number) => (
// // // // // // // // //                                 <button 
// // // // // // // // //                                     key={i} 
// // // // // // // // //                                     onClick={() => setCurrentSlide(i)} 
// // // // // // // // //                                     className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`} 
// // // // // // // // //                                     aria-label={`Slide ${i+1}`} 
// // // // // // // // //                                 />
// // // // // // // // //                             ))}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 ) : (
// // // // // // // // //                     <div className="aspect-video bg-white/10 backdrop-blur-md rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 gap-3">
// // // // // // // // //                         <div className="p-3 bg-white/10 rounded-full"><BookOpen size={28}/></div>
// // // // // // // // //                         <p className="text-xs font-medium">Slide Belum Ditambahkan</p>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER) */}
// // // // // // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-24 mb-16">
// // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // // // // // //           {features.map((feat: any, idx: number) => (
// // // // // // // // //             <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full">
// // // // // // // // //                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // // // // // //                     {idx === 0 ? <BookOpen size={28}/> : idx === 1 ? <Users size={28}/> : <Calendar size={28}/>}
// // // // // // // // //                 </div>
// // // // // // // // //                 <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#990000] transition-colors">{feat.title || "Judul Fitur"}</h3>
// // // // // // // // //                 <p className="text-gray-500 text-sm leading-relaxed">{feat.description || "Deskripsi fitur singkat akan muncul di sini."}</p>
// // // // // // // // //             </div>
// // // // // // // // //           ))}
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 3. WALL OF FAME (REALTIME LULUSAN) */}
// // // // // // // // //       {wallOfFame.length > 0 && (
// // // // // // // // //           <div className="max-w-7xl mx-auto px-6 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
// // // // // // // // //               <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
// // // // // // // // //                   <div className="flex items-center gap-4">
// // // // // // // // //                       <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shadow-sm"><Award size={28}/></div>
// // // // // // // // //                       <div>
// // // // // // // // //                         <h2 className="text-2xl font-bold text-gray-900">Wall of Fame</h2>
// // // // // // // // //                         <p className="text-gray-500 text-sm mt-1">Apresiasi untuk lulusan terbaik yang baru saja menyelesaikan pelatihan.</p>
// // // // // // // // //                       </div>
// // // // // // // // //                   </div>
// // // // // // // // //               </div>
              
// // // // // // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // // // // //                   {wallOfFame.map((winner, idx) => (
// // // // // // // // //                       <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all group relative overflow-hidden flex items-center gap-4">
// // // // // // // // //                           <div className="absolute top-0 right-0 bg-yellow-400 w-10 h-10 rounded-bl-2xl flex items-center justify-center text-white text-sm font-black shadow-sm group-hover:w-12 group-hover:h-12 transition-all z-10">
// // // // // // // // //                               #{idx+1}
// // // // // // // // //                           </div>
                          
// // // // // // // // //                           <div className="w-16 h-16 rounded-full bg-gray-50 p-1 border-2 border-dashed border-yellow-200 group-hover:border-yellow-400 transition-colors flex-shrink-0">
// // // // // // // // //                                 <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
// // // // // // // // //                                     {winner.avatar ? (
// // // // // // // // //                                         <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // // // // // // //                                     ) : (
// // // // // // // // //                                         <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">{winner.name?.charAt(0)}</div>
// // // // // // // // //                                     )}
// // // // // // // // //                                 </div>
// // // // // // // // //                           </div>
                          
// // // // // // // // //                           <div className="flex-1 min-w-0 pr-6">
// // // // // // // // //                               <h3 className="font-bold text-gray-900 truncate text-sm" title={winner.name}>{winner.name}</h3>
// // // // // // // // //                               <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mb-1 truncate">{winner.course}</p>
// // // // // // // // //                               <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-green-100">
// // // // // // // // //                                   <CheckCircle size={8}/> LULUS
// // // // // // // // //                               </span>
// // // // // // // // //                           </div>
// // // // // // // // //                       </div>
// // // // // // // // //                   ))}
// // // // // // // // //               </div>
// // // // // // // // //           </div>
// // // // // // // // //       )}

// // // // // // // // //       {/* 4. CERITA RELAWAN (BLOG) */}
// // // // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // // // // // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // // // // // // //               <div className="flex items-center gap-4">
// // // // // // // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // // // // // // //                   <div>
// // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // // // // // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // // // // // // //                   </div>
// // // // // // // // //               </div>
// // // // // // // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // // // // // // //                   Lihat Semua <ChevronRight size={16}/>
// // // // // // // // //               </Link>
// // // // // // // // //           </div>
          
// // // // // // // // //           {recentBlogs.length === 0 ? (
// // // // // // // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
// // // // // // // // //                   Belum ada cerita terbaru yang dipublikasikan.
// // // // // // // // //               </div>
// // // // // // // // //           ) : (
// // // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // // //                   {recentBlogs.map((blog, idx) => (
// // // // // // // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
// // // // // // // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // // // // //                               {blog.coverUrl ? (
// // // // // // // // //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// // // // // // // // //                               ) : (
// // // // // // // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
// // // // // // // // //                               )}
// // // // // // // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // // // // // // //                               <div className="absolute top-3 left-3 flex gap-1">
// // // // // // // // //                                   {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
// // // // // // // // //                               </div>
// // // // // // // // //                           </div>
// // // // // // // // //                           <div className="p-6 flex-1 flex flex-col">
// // // // // // // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // // // // // // //                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // // // // // // //                               </p>
// // // // // // // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
// // // // // // // // //                               <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
                              
// // // // // // // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // // // // // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // // // // //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
// // // // // // // // //                                   </div>
// // // // // // // // //                                   <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// // // // // // // // //                               </div>
// // // // // // // // //                           </div>
// // // // // // // // //                       </Link>
// // // // // // // // //                   ))}
// // // // // // // // //               </div>
// // // // // // // // //           )}
// // // // // // // // //       </div>


// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }



// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // // // // // // // export default function Dashboard() {
// // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const loadDashboardData = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         setLoading(true);
// // // // // // // // // // //         const data = await api('/api/content');
// // // // // // // // // // //         setContent(data);
// // // // // // // // // // //       } catch (err) {
// // // // // // // // // // //         console.error("Gagal memuat konten dashboard:", err);
// // // // // // // // // // //       } finally {
// // // // // // // // // // //         setLoading(false);
// // // // // // // // // // //       }
// // // // // // // // // // //     };
// // // // // // // // // // //     loadDashboardData();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (content?.slides?.length > 1) {
// // // // // // // // // // //       const timer = setInterval(() => {
// // // // // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // // // // //       }, 5000);
// // // // // // // // // // //       return () => clearInterval(timer);
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [content]);

// // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Loading...</div>;

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="bg-gray-50 min-h-screen flex flex-col">
      
// // // // // // // // // // //       {/* HERO SECTION */}
// // // // // // // // // // //       {/* UNTUK GANTI WARNA MERAH: Ubah bg-[#990000] di bawah ini ke warna lain (misal bg-blue-800) */}
// // // // // // // // // // //       <div className="bg-[#990000] text-white py-16 px-6 relative overflow-hidden shadow-xl">
        
// // // // // // // // // // //         <div className="max-w-6xl mx-auto relative z-10">
// // // // // // // // // // //           <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{content?.heroTitle}</h1>
// // // // // // // // // // //           <p className="text-red-100 max-w-2xl text-lg mb-8 leading-relaxed">{content?.heroDescription}</p>
          
// // // // // // // // // // //           <div className="flex flex-wrap gap-4">
// // // // // // // // // // //             <Link href="/courses" className="bg-white text-red-800 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">Lihat Kursus</Link>
// // // // // // // // // // //             {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // // // // // //               <Link href="/admin/content" className="bg-black/30 text-white px-8 py-3 rounded-xl font-bold hover:bg-black/50 transition-all border border-white/20">Kelola Tampilan</Link>
// // // // // // // // // // //             )}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>

// // // // // // // // // // //         {/* GAMBAR BACKGROUND DINAMIS */}
// // // // // // // // // // //         <div className="absolute inset-0 pointer-events-none">
// // // // // // // // // // //           {/* Layer gelap agar tulisan terbaca */}
// // // // // // // // // // //           <div className="absolute inset-0 bg-black/20 z-10"></div>

// // // // // // // // // // //           {content?.heroBgUrl ? (
// // // // // // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero Background" className="w-full h-full object-cover object-center opacity-40" />
// // // // // // // // // // //           ) : (
// // // // // // // // // // //              <img src="/pmi-logo.png" alt="Hero Background Default" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // // // // // //           )}
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* SECTION SLIDE */}
// // // // // // // // // // //       <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20 w-full">
// // // // // // // // // // //         {content?.slides && content.slides.length > 0 ? (
// // // // // // // // // // //           <div className="relative h-[300px] md:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-800 group border-4 border-white">
// // // // // // // // // // //             {content.slides.map((slide: string, index: number) => (
// // // // // // // // // // //               <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
// // // // // // // // // // //                 <img src={getImageUrl(slide)} alt={`Slide ${index}`} className="w-full h-full object-cover" />
// // // // // // // // // // //               </div>
// // // // // // // // // // //             ))}
// // // // // // // // // // //             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
// // // // // // // // // // //               {content.slides.map((_: any, i: number) => (
// // // // // // // // // // //                 <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 transition-all rounded-full ${i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} aria-label={`Slide ${i+1}`} />
// // // // // // // // // // //               ))}
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         ) : (
// // // // // // // // // // //           <div className="h-[300px] md:h-[400px] bg-white rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-4 shadow-sm">
// // // // // // // // // // //             <p>Belum ada foto slide.</p>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         )}
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* FEATURES */}
// // // // // // // // // // //       <div className="max-w-6xl mx-auto px-6 py-20">
// // // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // // // // //           {content?.features?.map((feat: any, idx: number) => (
// // // // // // // // // // //             <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-red-500 transition-all group">
// // // // // // // // // // //               <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-red-700 transition-colors">{feat.title}</h3>
// // // // // // // // // // //               <p className="text-gray-600 text-sm leading-relaxed">{feat.description}</p>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           ))}
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // }


// // // // // // // // // // 'use client';

// // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // import { 
// // // // // // // // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // // // // // // // //     Award, FileText, CheckCircle 
// // // // // // // // // // } from 'lucide-react';

// // // // // // // // // // export default function Dashboard() {
// // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // // // // // // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const loadData = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         setLoading(true);
        
// // // // // // // // // //         // 1. Load Content CMS
// // // // // // // // // //         const contentData = await api('/api/content');
// // // // // // // // // //         setContent(contentData);

// // // // // // // // // //         // 2. Track Visitor (Tetap jalan di background)
// // // // // // // // // //         api('/api/stats/visit', { method: 'POST' }).catch(console.error);

// // // // // // // // // //         // 3. Load Blog Terbaru
// // // // // // // // // //         try {
// // // // // // // // // //             const blogsData = await api('/api/blog/public');
// // // // // // // // // //             setRecentBlogs(blogsData?.slice(0, 3) || []);
// // // // // // // // // //         } catch(e) { console.log("Blog error", e); }

// // // // // // // // // //         // 4. Load Wall of Fame
// // // // // // // // // //         try {
// // // // // // // // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // // // // // // // //             setWallOfFame(wofData || []);
// // // // // // // // // //         } catch(e) { console.log("WoF error", e); }

// // // // // // // // // //       } catch (err) {
// // // // // // // // // //         console.error("Gagal memuat data:", err);
// // // // // // // // // //       } finally {
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       }
// // // // // // // // // //     };
// // // // // // // // // //     loadData();
// // // // // // // // // //   }, []);

// // // // // // // // // //   // Timer Slide Carousel
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (content?.slides?.length > 1) {
// // // // // // // // // //       const timer = setInterval(() => {
// // // // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // // // //       }, 5000);
// // // // // // // // // //       return () => clearInterval(timer);
// // // // // // // // // //     }
// // // // // // // // // //   }, [content]);

// // // // // // // // // //   // Default Features fallback (Agar card tidak hilang jika CMS kosong)
// // // // // // // // // //   const features = content?.features?.length ? content.features : [
// // // // // // // // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // // // // // // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // // // // // // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // // // // // // // //   ];

// // // // // // // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // // // // // // // //       {/* 1. HERO SECTION (HEADER MERAH) */}
// // // // // // // // // //       <div className="relative bg-[#990000] text-white shadow-2xl pb-40 pt-10 md:pt-14 overflow-hidden">
// // // // // // // // // //         {/* Background Overlay */}
// // // // // // // // // //         <div className="absolute inset-0 z-0 pointer-events-none">
// // // // // // // // // //           <div className="absolute inset-0 bg-gradient-to-r from-[#990000] via-[#990000]/95 to-transparent z-10"></div>
// // // // // // // // // //           {content?.heroBgUrl ? (
// // // // // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero" className="w-full h-full object-cover object-center opacity-40" />
// // // // // // // // // //           ) : (
// // // // // // // // // //              <img src="/pmi-logo.png" alt="Default Hero" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // // // // //           )}
// // // // // // // // // //         </div>

// // // // // // // // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-10">
// // // // // // // // // //             {/* Teks Hero */}
// // // // // // // // // //             <div className="flex-1 space-y-5 text-center md:text-left">
// // // // // // // // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
// // // // // // // // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // // // // // // // //                 </h1>
// // // // // // // // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-90">
// // // // // // // // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // // // // // // // //                 </p>
                
// // // // // // // // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // // // // // // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // // // // // // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // // // // // // // //                     </Link>
// // // // // // // // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // // // // //                         <Link href="/admin/content" className="bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // // // // // // // //                             Kelola Tampilan
// // // // // // // // // //                         </Link>
// // // // // // // // // //                     )}
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* Slide Carousel (KEMBALI KE LOGIKA LAMA) */}
// // // // // // // // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // // // // // // // //                 {content?.slides && content.slides.length > 0 ? (
// // // // // // // // // //                     <div className="relative h-[250px] md:h-[350px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group bg-gray-900">
// // // // // // // // // //                         {content.slides.map((slide: string, index: number) => (
// // // // // // // // // //                             <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
// // // // // // // // // //                                 {/* [FIX] Menggunakan getImageUrl langsung agar gambar muncul */}
// // // // // // // // // //                                 <img 
// // // // // // // // // //                                     src={getImageUrl(slide)} 
// // // // // // // // // //                                     alt={`Slide ${index}`} 
// // // // // // // // // //                                     className="w-full h-full object-cover" 
// // // // // // // // // //                                 />
// // // // // // // // // //                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30 pointer-events-none"></div>
// // // // // // // // // //                             </div>
// // // // // // // // // //                         ))}
                        
// // // // // // // // // //                         {/* Indikator Slide */}
// // // // // // // // // //                         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
// // // // // // // // // //                             {content.slides.map((_: any, i: number) => (
// // // // // // // // // //                                 <button 
// // // // // // // // // //                                     key={i} 
// // // // // // // // // //                                     onClick={() => setCurrentSlide(i)} 
// // // // // // // // // //                                     className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`} 
// // // // // // // // // //                                     aria-label={`Slide ${i+1}`} 
// // // // // // // // // //                                 />
// // // // // // // // // //                             ))}
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 ) : (
// // // // // // // // // //                     <div className="h-[250px] md:h-[350px] w-full bg-white/10 backdrop-blur-md rounded-2xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 gap-3">
// // // // // // // // // //                         <div className="p-3 bg-white/10 rounded-full"><BookOpen size={28}/></div>
// // // // // // // // // //                         <p className="text-xs font-medium">Slide Belum Ditambahkan</p>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 )}
// // // // // // // // // //             </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER) - FIXED */}
// // // // // // // // // //       {/* Margin negatif -mt-32 menarik card ke atas menutupi header */}
// // // // // // // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-32 mb-16">
// // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // // // // // // //           {features.map((feat: any, idx: number) => (
// // // // // // // // // //             <div key={idx} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full relative z-40">
// // // // // // // // // //                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // // // // // // //                     {idx === 0 ? <BookOpen size={32}/> : idx === 1 ? <Users size={32}/> : <Calendar size={32}/>}
// // // // // // // // // //                 </div>
// // // // // // // // // //                 <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-[#990000] transition-colors">{feat.title || "Judul Fitur"}</h3>
// // // // // // // // // //                 <p className="text-gray-500 text-base leading-relaxed">{feat.description || "Deskripsi fitur singkat akan muncul di sini."}</p>
// // // // // // // // // //             </div>
// // // // // // // // // //           ))}
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* 3. WALL OF FAME (REALTIME) */}
// // // // // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-20">
// // // // // // // // // //           <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
// // // // // // // // // //               <div className="flex items-center gap-4">
// // // // // // // // // //                   <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shadow-sm"><Award size={28}/></div>
// // // // // // // // // //                   <div>
// // // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Wall of Fame</h2>
// // // // // // // // // //                     <p className="text-gray-500 text-sm mt-1">Apresiasi untuk lulusan terbaik yang baru saja menyelesaikan pelatihan.</p>
// // // // // // // // // //                   </div>
// // // // // // // // // //               </div>
// // // // // // // // // //           </div>
          
// // // // // // // // // //           {wallOfFame.length > 0 ? (
// // // // // // // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // // // // // //                   {wallOfFame.map((winner, idx) => (
// // // // // // // // // //                       <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all group relative overflow-hidden flex items-center gap-4">
// // // // // // // // // //                           <div className="absolute top-0 right-0 bg-yellow-400 w-10 h-10 rounded-bl-2xl flex items-center justify-center text-white text-sm font-black shadow-sm z-10">
// // // // // // // // // //                               #{idx+1}
// // // // // // // // // //                           </div>
                          
// // // // // // // // // //                           <div className="w-16 h-16 rounded-full bg-gray-50 p-1 border-2 border-dashed border-yellow-200 group-hover:border-yellow-400 transition-colors flex-shrink-0">
// // // // // // // // // //                                 <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
// // // // // // // // // //                                     {winner.avatar ? (
// // // // // // // // // //                                         <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // // // // // // // //                                     ) : (
// // // // // // // // // //                                         <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">{winner.name?.charAt(0)}</div>
// // // // // // // // // //                                     )}
// // // // // // // // // //                                 </div>
// // // // // // // // // //                           </div>
                          
// // // // // // // // // //                           <div className="flex-1 min-w-0 pr-6">
// // // // // // // // // //                               <h3 className="font-bold text-gray-900 truncate text-sm" title={winner.name}>{winner.name}</h3>
// // // // // // // // // //                               <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mb-1 truncate">{winner.course}</p>
// // // // // // // // // //                               <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-green-100">
// // // // // // // // // //                                   <CheckCircle size={8}/> LULUS
// // // // // // // // // //                               </span>
// // // // // // // // // //                           </div>
// // // // // // // // // //                       </div>
// // // // // // // // // //                   ))}
// // // // // // // // // //               </div>
// // // // // // // // // //           ) : (
// // // // // // // // // //               <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // // // // // // // // //                   <Award className="mx-auto text-gray-300 mb-2" size={48}/>
// // // // // // // // // //                   <p className="text-gray-500 font-bold">Belum ada lulusan terbaru.</p>
// // // // // // // // // //                   <p className="text-gray-400 text-xs">Jadilah yang pertama lulus!</p>
// // // // // // // // // //               </div>
// // // // // // // // // //           )}
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* 4. CERITA RELAWAN (BLOG) */}
// // // // // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // // // // // // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // // // // // // // //               <div className="flex items-center gap-4">
// // // // // // // // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // // // // // // // //                   <div>
// // // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // // // // // // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // // // // // // // //                   </div>
// // // // // // // // // //               </div>
// // // // // // // // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // // // // // // // //                   Lihat Semua <ChevronRight size={16}/>
// // // // // // // // // //               </Link>
// // // // // // // // // //           </div>
          
// // // // // // // // // //           {recentBlogs.length === 0 ? (
// // // // // // // // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
// // // // // // // // // //                   Belum ada cerita terbaru yang dipublikasikan.
// // // // // // // // // //               </div>
// // // // // // // // // //           ) : (
// // // // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // // // //                   {recentBlogs.map((blog, idx) => (
// // // // // // // // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
// // // // // // // // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // // // // // //                               {blog.coverUrl ? (
// // // // // // // // // //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// // // // // // // // // //                               ) : (
// // // // // // // // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
// // // // // // // // // //                               )}
// // // // // // // // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // // // // // // // //                               <div className="absolute top-3 left-3 flex gap-1">
// // // // // // // // // //                                   {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
// // // // // // // // // //                               </div>
// // // // // // // // // //                           </div>
// // // // // // // // // //                           <div className="p-6 flex-1 flex flex-col">
// // // // // // // // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // // // // // // // //                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // // // // // // // //                               </p>
// // // // // // // // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
// // // // // // // // // //                               <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
                              
// // // // // // // // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // // // // // // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // // // // // //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
// // // // // // // // // //                                   </div>
// // // // // // // // // //                                   <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// // // // // // // // // //                               </div>
// // // // // // // // // //                           </div>
// // // // // // // // // //                       </Link>
// // // // // // // // // //                   ))}
// // // // // // // // // //               </div>
// // // // // // // // // //           )}
// // // // // // // // // //       </div>

// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }


















































// // // // // // // // // 'use client';

// // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // import Link from 'next/link';
// // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // import { 
// // // // // // // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // // // // // // //     Award, FileText, CheckCircle, GraduationCap, Globe 
// // // // // // // // // } from 'lucide-react';

// // // // // // // // // export default function Dashboard() {
// // // // // // // // //   const { user } = useAuth();
// // // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // // //   const [stats, setStats] = useState({ users: 0, courses: 0, visitors: 0, startYear: 2025 });
// // // // // // // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // // // // // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const loadData = async () => {
// // // // // // // // //       try {
// // // // // // // // //         setLoading(true);
        
// // // // // // // // //         // 1. Load Content & Stats
// // // // // // // // //         const [contentData, statsData] = await Promise.all([
// // // // // // // // //             api('/api/content'),
// // // // // // // // //             api('/api/stats/public')
// // // // // // // // //         ]);
// // // // // // // // //         setContent(contentData);
// // // // // // // // //         setStats(statsData || { users: 0, courses: 0, visitors: 0, startYear: 2025 });

// // // // // // // // //         // 2. Track Visitor
// // // // // // // // //         await api('/api/stats/visit', { method: 'POST' });

// // // // // // // // //         // 3. Load Blog Terbaru
// // // // // // // // //         try {
// // // // // // // // //             const blogsData = await api('/api/blog/public');
// // // // // // // // //             setRecentBlogs(blogsData?.slice(0, 3) || []);
// // // // // // // // //         } catch(e) { console.log("Blog error", e); }

// // // // // // // // //         // 4. Load Wall of Fame
// // // // // // // // //         try {
// // // // // // // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // // // // // // //             setWallOfFame(wofData || []);
// // // // // // // // //         } catch(e) { console.log("WoF error", e); }

// // // // // // // // //       } catch (err) {
// // // // // // // // //         console.error("Gagal memuat data:", err);
// // // // // // // // //       } finally {
// // // // // // // // //         setLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     loadData();
// // // // // // // // //   }, []);

// // // // // // // // //   // Timer Slide Carousel
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (content?.slides?.length > 1) {
// // // // // // // // //       const timer = setInterval(() => {
// // // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // // //       }, 5000);
// // // // // // // // //       return () => clearInterval(timer);
// // // // // // // // //     }
// // // // // // // // //   }, [content]);

// // // // // // // // //   // Default Features fallback
// // // // // // // // //   const features = content?.features?.length ? content.features : [
// // // // // // // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // // // // // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // // // // // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // // // // // // //   ];

// // // // // // // // //   // Helper untuk memastikan URL gambar valid
// // // // // // // // //   const getSlideUrl = (url: string) => {
// // // // // // // // //       if (!url) return '';
// // // // // // // // //       // Jika URL sudah lengkap (http/https), pakai langsung. Jika tidak, pakai getImageUrl
// // // // // // // // //       if (url.startsWith('http')) return url;
// // // // // // // // //       return getImageUrl(url);
// // // // // // // // //   };

// // // // // // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // // // // // // //   return (
// // // // // // // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // // // // // // //       {/* 1. HERO SECTION */}
// // // // // // // // //       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-32 pt-10 md:pt-14">
// // // // // // // // //         {/* Background Overlay */}
// // // // // // // // //         <div className="absolute inset-0 z-0">
// // // // // // // // //           <div className="absolute inset-0 bg-gradient-to-r from-[#990000] via-[#990000]/95 to-transparent z-10"></div>
// // // // // // // // //           {content?.heroBgUrl ? (
// // // // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero" className="w-full h-full object-cover object-center opacity-40 animate-in fade-in duration-1000" />
// // // // // // // // //           ) : (
// // // // // // // // //              <img src="/pmi-logo.png" alt="Default Hero" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // // // //           )}
// // // // // // // // //         </div>

// // // // // // // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-10">
// // // // // // // // //             {/* Teks Hero */}
// // // // // // // // //             <div className="flex-1 space-y-5 text-center md:text-left">
// // // // // // // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
// // // // // // // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // // // // // // //                 </h1>
// // // // // // // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-90">
// // // // // // // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // // // // // // //                 </p>
                
// // // // // // // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // // // // // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // // // // // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // // // // // // //                     </Link>
// // // // // // // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // // // //                         <Link href="/admin/content" className="bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // // // // // // //                             Kelola Tampilan
// // // // // // // // //                         </Link>
// // // // // // // // //                     )}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* Slide Carousel (FIXED) */}
// // // // // // // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // // // // // // //                 {content?.slides && content.slides.length > 0 ? (
// // // // // // // // //                     <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 group bg-gray-900">
// // // // // // // // //                         {content.slides.map((slide: string, index: number) => (
// // // // // // // // //                             <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
// // // // // // // // //                                 <img 
// // // // // // // // //                                     src={getImageUrl(slide)} 
// // // // // // // // //                                     alt={`Slide ${index}`} 
// // // // // // // // //                                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[5000ms]" 
// // // // // // // // //                                     onError={(e) => (e.currentTarget.style.display = 'none')}
// // // // // // // // //                                 />
// // // // // // // // //                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30 pointer-events-none"></div>
// // // // // // // // //                             </div>
// // // // // // // // //                         ))}
                        
// // // // // // // // //                         {/* Indikator Slide */}
// // // // // // // // //                         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
// // // // // // // // //                             {content.slides.map((_: any, i: number) => (
// // // // // // // // //                                 <button 
// // // // // // // // //                                     key={i} 
// // // // // // // // //                                     onClick={() => setCurrentSlide(i)} 
// // // // // // // // //                                     className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`} 
// // // // // // // // //                                     aria-label={`Slide ${i+1}`} 
// // // // // // // // //                                 />
// // // // // // // // //                             ))}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 ) : (
// // // // // // // // //                     <div className="aspect-video bg-white/10 backdrop-blur-md rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 gap-3">
// // // // // // // // //                         <div className="p-3 bg-white/10 rounded-full"><BookOpen size={28}/></div>
// // // // // // // // //                         <p className="text-xs font-medium">Slide Belum Ditambahkan</p>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER) */}
// // // // // // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-24 mb-16">
// // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // // // // // //           {features.map((feat: any, idx: number) => (
// // // // // // // // //             <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full">
// // // // // // // // //                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // // // // // //                     {idx === 0 ? <BookOpen size={28}/> : idx === 1 ? <Users size={28}/> : <Calendar size={28}/>}
// // // // // // // // //                 </div>
// // // // // // // // //                 <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#990000] transition-colors">{feat.title || "Judul Fitur"}</h3>
// // // // // // // // //                 <p className="text-gray-500 text-sm leading-relaxed">{feat.description || "Deskripsi fitur singkat akan muncul di sini."}</p>
// // // // // // // // //             </div>
// // // // // // // // //           ))}
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 3. WALL OF FAME (REALTIME LULUSAN) */}
// // // // // // // // //       {wallOfFame.length > 0 && (
// // // // // // // // //           <div className="max-w-7xl mx-auto px-6 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
// // // // // // // // //               <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
// // // // // // // // //                   <div className="flex items-center gap-4">
// // // // // // // // //                       <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shadow-sm"><Award size={28}/></div>
// // // // // // // // //                       <div>
// // // // // // // // //                         <h2 className="text-2xl font-bold text-gray-900">Wall of Fame</h2>
// // // // // // // // //                         <p className="text-gray-500 text-sm mt-1">Apresiasi untuk lulusan terbaik yang baru saja menyelesaikan pelatihan.</p>
// // // // // // // // //                       </div>
// // // // // // // // //                   </div>
// // // // // // // // //               </div>
              
// // // // // // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // // // // //                   {wallOfFame.map((winner, idx) => (
// // // // // // // // //                       <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all group relative overflow-hidden flex items-center gap-4">
// // // // // // // // //                           <div className="absolute top-0 right-0 bg-yellow-400 w-10 h-10 rounded-bl-2xl flex items-center justify-center text-white text-sm font-black shadow-sm group-hover:w-12 group-hover:h-12 transition-all z-10">
// // // // // // // // //                               #{idx+1}
// // // // // // // // //                           </div>
                          
// // // // // // // // //                           <div className="w-16 h-16 rounded-full bg-gray-50 p-1 border-2 border-dashed border-yellow-200 group-hover:border-yellow-400 transition-colors flex-shrink-0">
// // // // // // // // //                                 <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
// // // // // // // // //                                     {winner.avatar ? (
// // // // // // // // //                                         <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // // // // // // //                                     ) : (
// // // // // // // // //                                         <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">{winner.name?.charAt(0)}</div>
// // // // // // // // //                                     )}
// // // // // // // // //                                 </div>
// // // // // // // // //                           </div>
                          
// // // // // // // // //                           <div className="flex-1 min-w-0 pr-6">
// // // // // // // // //                               <h3 className="font-bold text-gray-900 truncate text-sm" title={winner.name}>{winner.name}</h3>
// // // // // // // // //                               <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mb-1 truncate">{winner.course}</p>
// // // // // // // // //                               <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-green-100">
// // // // // // // // //                                   <CheckCircle size={8}/> LULUS
// // // // // // // // //                               </span>
// // // // // // // // //                           </div>
// // // // // // // // //                       </div>
// // // // // // // // //                   ))}
// // // // // // // // //               </div>
// // // // // // // // //           </div>
// // // // // // // // //       )}

// // // // // // // // //       {/* 4. CERITA RELAWAN (BLOG) */}
// // // // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // // // // // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // // // // // // //               <div className="flex items-center gap-4">
// // // // // // // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // // // // // // //                   <div>
// // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // // // // // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // // // // // // //                   </div>
// // // // // // // // //               </div>
// // // // // // // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // // // // // // //                   Lihat Semua <ChevronRight size={16}/>
// // // // // // // // //               </Link>
// // // // // // // // //           </div>
          
// // // // // // // // //           {recentBlogs.length === 0 ? (
// // // // // // // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
// // // // // // // // //                   Belum ada cerita terbaru yang dipublikasikan.
// // // // // // // // //               </div>
// // // // // // // // //           ) : (
// // // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // // //                   {recentBlogs.map((blog, idx) => (
// // // // // // // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
// // // // // // // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // // // // //                               {blog.coverUrl ? (
// // // // // // // // //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// // // // // // // // //                               ) : (
// // // // // // // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
// // // // // // // // //                               )}
// // // // // // // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // // // // // // //                               <div className="absolute top-3 left-3 flex gap-1">
// // // // // // // // //                                   {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
// // // // // // // // //                               </div>
// // // // // // // // //                           </div>
// // // // // // // // //                           <div className="p-6 flex-1 flex flex-col">
// // // // // // // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // // // // // // //                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // // // // // // //                               </p>
// // // // // // // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
// // // // // // // // //                               <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
                              
// // // // // // // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // // // // // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // // // // //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
// // // // // // // // //                                   </div>
// // // // // // // // //                                   <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// // // // // // // // //                               </div>
// // // // // // // // //                           </div>
// // // // // // // // //                       </Link>
// // // // // // // // //                   ))}
// // // // // // // // //               </div>
// // // // // // // // //           )}
// // // // // // // // //       </div>


// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }



// // // // // // // // // // 'use client';

// // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // // // // // // export default function Dashboard() {
// // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     const loadDashboardData = async () => {
// // // // // // // // // //       try {
// // // // // // // // // //         setLoading(true);
// // // // // // // // // //         const data = await api('/api/content');
// // // // // // // // // //         setContent(data);
// // // // // // // // // //       } catch (err) {
// // // // // // // // // //         console.error("Gagal memuat konten dashboard:", err);
// // // // // // // // // //       } finally {
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       }
// // // // // // // // // //     };
// // // // // // // // // //     loadDashboardData();
// // // // // // // // // //   }, []);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (content?.slides?.length > 1) {
// // // // // // // // // //       const timer = setInterval(() => {
// // // // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // // // //       }, 5000);
// // // // // // // // // //       return () => clearInterval(timer);
// // // // // // // // // //     }
// // // // // // // // // //   }, [content]);

// // // // // // // // // //   if (loading) return <div className="p-20 text-center">Loading...</div>;

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="bg-gray-50 min-h-screen flex flex-col">
      
// // // // // // // // // //       {/* HERO SECTION */}
// // // // // // // // // //       {/* UNTUK GANTI WARNA MERAH: Ubah bg-[#990000] di bawah ini ke warna lain (misal bg-blue-800) */}
// // // // // // // // // //       <div className="bg-[#990000] text-white py-16 px-6 relative overflow-hidden shadow-xl">
        
// // // // // // // // // //         <div className="max-w-6xl mx-auto relative z-10">
// // // // // // // // // //           <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{content?.heroTitle}</h1>
// // // // // // // // // //           <p className="text-red-100 max-w-2xl text-lg mb-8 leading-relaxed">{content?.heroDescription}</p>
          
// // // // // // // // // //           <div className="flex flex-wrap gap-4">
// // // // // // // // // //             <Link href="/courses" className="bg-white text-red-800 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">Lihat Kursus</Link>
// // // // // // // // // //             {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // // // // //               <Link href="/admin/content" className="bg-black/30 text-white px-8 py-3 rounded-xl font-bold hover:bg-black/50 transition-all border border-white/20">Kelola Tampilan</Link>
// // // // // // // // // //             )}
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* GAMBAR BACKGROUND DINAMIS */}
// // // // // // // // // //         <div className="absolute inset-0 pointer-events-none">
// // // // // // // // // //           {/* Layer gelap agar tulisan terbaca */}
// // // // // // // // // //           <div className="absolute inset-0 bg-black/20 z-10"></div>

// // // // // // // // // //           {content?.heroBgUrl ? (
// // // // // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero Background" className="w-full h-full object-cover object-center opacity-40" />
// // // // // // // // // //           ) : (
// // // // // // // // // //              <img src="/pmi-logo.png" alt="Hero Background Default" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // // // // //           )}
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* SECTION SLIDE */}
// // // // // // // // // //       <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20 w-full">
// // // // // // // // // //         {content?.slides && content.slides.length > 0 ? (
// // // // // // // // // //           <div className="relative h-[300px] md:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-800 group border-4 border-white">
// // // // // // // // // //             {content.slides.map((slide: string, index: number) => (
// // // // // // // // // //               <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
// // // // // // // // // //                 <img src={getImageUrl(slide)} alt={`Slide ${index}`} className="w-full h-full object-cover" />
// // // // // // // // // //               </div>
// // // // // // // // // //             ))}
// // // // // // // // // //             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
// // // // // // // // // //               {content.slides.map((_: any, i: number) => (
// // // // // // // // // //                 <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 transition-all rounded-full ${i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} aria-label={`Slide ${i+1}`} />
// // // // // // // // // //               ))}
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         ) : (
// // // // // // // // // //           <div className="h-[300px] md:h-[400px] bg-white rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-4 shadow-sm">
// // // // // // // // // //             <p>Belum ada foto slide.</p>
// // // // // // // // // //           </div>
// // // // // // // // // //         )}
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* FEATURES */}
// // // // // // // // // //       <div className="max-w-6xl mx-auto px-6 py-20">
// // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // // // //           {content?.features?.map((feat: any, idx: number) => (
// // // // // // // // // //             <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-red-500 transition-all group">
// // // // // // // // // //               <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-red-700 transition-colors">{feat.title}</h3>
// // // // // // // // // //               <p className="text-gray-600 text-sm leading-relaxed">{feat.description}</p>
// // // // // // // // // //             </div>
// // // // // // // // // //           ))}
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }


// // // // // // // // // 'use client';

// // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // import Link from 'next/link';
// // // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // import { 
// // // // // // // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // // // // // // //     Award, FileText, CheckCircle 
// // // // // // // // // } from 'lucide-react';

// // // // // // // // // export default function Dashboard() {
// // // // // // // // //   const { user } = useAuth();
// // // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // // // // // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const loadData = async () => {
// // // // // // // // //       try {
// // // // // // // // //         setLoading(true);
        
// // // // // // // // //         // 1. Load Content CMS
// // // // // // // // //         const contentData = await api('/api/content');
// // // // // // // // //         setContent(contentData);

// // // // // // // // //         // 2. Track Visitor (Tetap jalan di background)
// // // // // // // // //         api('/api/stats/visit', { method: 'POST' }).catch(console.error);

// // // // // // // // //         // 3. Load Blog Terbaru
// // // // // // // // //         try {
// // // // // // // // //             const blogsData = await api('/api/blog/public');
// // // // // // // // //             setRecentBlogs(blogsData?.slice(0, 3) || []);
// // // // // // // // //         } catch(e) { console.log("Blog error", e); }

// // // // // // // // //         // 4. Load Wall of Fame
// // // // // // // // //         try {
// // // // // // // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // // // // // // //             setWallOfFame(wofData || []);
// // // // // // // // //         } catch(e) { console.log("WoF error", e); }

// // // // // // // // //       } catch (err) {
// // // // // // // // //         console.error("Gagal memuat data:", err);
// // // // // // // // //       } finally {
// // // // // // // // //         setLoading(false);
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //     loadData();
// // // // // // // // //   }, []);

// // // // // // // // //   // Timer Slide Carousel
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (content?.slides?.length > 1) {
// // // // // // // // //       const timer = setInterval(() => {
// // // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // // //       }, 5000);
// // // // // // // // //       return () => clearInterval(timer);
// // // // // // // // //     }
// // // // // // // // //   }, [content]);

// // // // // // // // //   // Default Features fallback (Agar card tidak hilang jika CMS kosong)
// // // // // // // // //   const features = content?.features?.length ? content.features : [
// // // // // // // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // // // // // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // // // // // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // // // // // // //   ];

// // // // // // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // // // // // // //   return (
// // // // // // // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // // // // // // //       {/* 1. HERO SECTION (HEADER MERAH) */}
// // // // // // // // //       <div className="relative bg-[#990000] text-white shadow-2xl pb-40 pt-10 md:pt-14 overflow-hidden">
// // // // // // // // //         {/* Background Overlay */}
// // // // // // // // //         <div className="absolute inset-0 z-0 pointer-events-none">
// // // // // // // // //           <div className="absolute inset-0 bg-gradient-to-r from-[#990000] via-[#990000]/95 to-transparent z-10"></div>
// // // // // // // // //           {content?.heroBgUrl ? (
// // // // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero" className="w-full h-full object-cover object-center opacity-40" />
// // // // // // // // //           ) : (
// // // // // // // // //              <img src="/pmi-logo.png" alt="Default Hero" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // // // //           )}
// // // // // // // // //         </div>

// // // // // // // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-10">
// // // // // // // // //             {/* Teks Hero */}
// // // // // // // // //             <div className="flex-1 space-y-5 text-center md:text-left">
// // // // // // // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
// // // // // // // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // // // // // // //                 </h1>
// // // // // // // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-90">
// // // // // // // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // // // // // // //                 </p>
                
// // // // // // // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // // // // // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // // // // // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // // // // // // //                     </Link>
// // // // // // // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // // // //                         <Link href="/admin/content" className="bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // // // // // // //                             Kelola Tampilan
// // // // // // // // //                         </Link>
// // // // // // // // //                     )}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* Slide Carousel (KEMBALI KE LOGIKA LAMA) */}
// // // // // // // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // // // // // // //                 {content?.slides && content.slides.length > 0 ? (
// // // // // // // // //                     <div className="relative h-[250px] md:h-[350px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group bg-gray-900">
// // // // // // // // //                         {content.slides.map((slide: string, index: number) => (
// // // // // // // // //                             <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
// // // // // // // // //                                 {/* [FIX] Menggunakan getImageUrl langsung agar gambar muncul */}
// // // // // // // // //                                 <img 
// // // // // // // // //                                     src={getImageUrl(slide)} 
// // // // // // // // //                                     alt={`Slide ${index}`} 
// // // // // // // // //                                     className="w-full h-full object-cover" 
// // // // // // // // //                                 />
// // // // // // // // //                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30 pointer-events-none"></div>
// // // // // // // // //                             </div>
// // // // // // // // //                         ))}
                        
// // // // // // // // //                         {/* Indikator Slide */}
// // // // // // // // //                         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
// // // // // // // // //                             {content.slides.map((_: any, i: number) => (
// // // // // // // // //                                 <button 
// // // // // // // // //                                     key={i} 
// // // // // // // // //                                     onClick={() => setCurrentSlide(i)} 
// // // // // // // // //                                     className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`} 
// // // // // // // // //                                     aria-label={`Slide ${i+1}`} 
// // // // // // // // //                                 />
// // // // // // // // //                             ))}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 ) : (
// // // // // // // // //                     <div className="h-[250px] md:h-[350px] w-full bg-white/10 backdrop-blur-md rounded-2xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 gap-3">
// // // // // // // // //                         <div className="p-3 bg-white/10 rounded-full"><BookOpen size={28}/></div>
// // // // // // // // //                         <p className="text-xs font-medium">Slide Belum Ditambahkan</p>
// // // // // // // // //                     </div>
// // // // // // // // //                 )}
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER) - FIXED */}
// // // // // // // // //       {/* Margin negatif -mt-32 menarik card ke atas menutupi header */}
// // // // // // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-32 mb-16">
// // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // // // // // //           {features.map((feat: any, idx: number) => (
// // // // // // // // //             <div key={idx} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full relative z-40">
// // // // // // // // //                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // // // // // //                     {idx === 0 ? <BookOpen size={32}/> : idx === 1 ? <Users size={32}/> : <Calendar size={32}/>}
// // // // // // // // //                 </div>
// // // // // // // // //                 <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-[#990000] transition-colors">{feat.title || "Judul Fitur"}</h3>
// // // // // // // // //                 <p className="text-gray-500 text-base leading-relaxed">{feat.description || "Deskripsi fitur singkat akan muncul di sini."}</p>
// // // // // // // // //             </div>
// // // // // // // // //           ))}
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* 3. WALL OF FAME (REALTIME) */}
// // // // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-20">
// // // // // // // // //           <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
// // // // // // // // //               <div className="flex items-center gap-4">
// // // // // // // // //                   <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shadow-sm"><Award size={28}/></div>
// // // // // // // // //                   <div>
// // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Wall of Fame</h2>
// // // // // // // // //                     <p className="text-gray-500 text-sm mt-1">Apresiasi untuk lulusan terbaik yang baru saja menyelesaikan pelatihan.</p>
// // // // // // // // //                   </div>
// // // // // // // // //               </div>
// // // // // // // // //           </div>
          
// // // // // // // // //           {wallOfFame.length > 0 ? (
// // // // // // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // // // // //                   {wallOfFame.map((winner, idx) => (
// // // // // // // // //                       <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all group relative overflow-hidden flex items-center gap-4">
// // // // // // // // //                           <div className="absolute top-0 right-0 bg-yellow-400 w-10 h-10 rounded-bl-2xl flex items-center justify-center text-white text-sm font-black shadow-sm z-10">
// // // // // // // // //                               #{idx+1}
// // // // // // // // //                           </div>
                          
// // // // // // // // //                           <div className="w-16 h-16 rounded-full bg-gray-50 p-1 border-2 border-dashed border-yellow-200 group-hover:border-yellow-400 transition-colors flex-shrink-0">
// // // // // // // // //                                 <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
// // // // // // // // //                                     {winner.avatar ? (
// // // // // // // // //                                         <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // // // // // // //                                     ) : (
// // // // // // // // //                                         <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">{winner.name?.charAt(0)}</div>
// // // // // // // // //                                     )}
// // // // // // // // //                                 </div>
// // // // // // // // //                           </div>
                          
// // // // // // // // //                           <div className="flex-1 min-w-0 pr-6">
// // // // // // // // //                               <h3 className="font-bold text-gray-900 truncate text-sm" title={winner.name}>{winner.name}</h3>
// // // // // // // // //                               <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mb-1 truncate">{winner.course}</p>
// // // // // // // // //                               <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-green-100">
// // // // // // // // //                                   <CheckCircle size={8}/> LULUS
// // // // // // // // //                               </span>
// // // // // // // // //                           </div>
// // // // // // // // //                       </div>
// // // // // // // // //                   ))}
// // // // // // // // //               </div>
// // // // // // // // //           ) : (
// // // // // // // // //               <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // // // // // // // //                   <Award className="mx-auto text-gray-300 mb-2" size={48}/>
// // // // // // // // //                   <p className="text-gray-500 font-bold">Belum ada lulusan terbaru.</p>
// // // // // // // // //                   <p className="text-gray-400 text-xs">Jadilah yang pertama lulus!</p>
// // // // // // // // //               </div>
// // // // // // // // //           )}
// // // // // // // // //       </div>

// // // // // // // // //       {/* 4. CERITA RELAWAN (BLOG) */}
// // // // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // // // // // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // // // // // // //               <div className="flex items-center gap-4">
// // // // // // // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // // // // // // //                   <div>
// // // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // // // // // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // // // // // // //                   </div>
// // // // // // // // //               </div>
// // // // // // // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // // // // // // //                   Lihat Semua <ChevronRight size={16}/>
// // // // // // // // //               </Link>
// // // // // // // // //           </div>
          
// // // // // // // // //           {recentBlogs.length === 0 ? (
// // // // // // // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
// // // // // // // // //                   Belum ada cerita terbaru yang dipublikasikan.
// // // // // // // // //               </div>
// // // // // // // // //           ) : (
// // // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // // //                   {recentBlogs.map((blog, idx) => (
// // // // // // // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
// // // // // // // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // // // // //                               {blog.coverUrl ? (
// // // // // // // // //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// // // // // // // // //                               ) : (
// // // // // // // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
// // // // // // // // //                               )}
// // // // // // // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // // // // // // //                               <div className="absolute top-3 left-3 flex gap-1">
// // // // // // // // //                                   {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
// // // // // // // // //                               </div>
// // // // // // // // //                           </div>
// // // // // // // // //                           <div className="p-6 flex-1 flex flex-col">
// // // // // // // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // // // // // // //                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // // // // // // //                               </p>
// // // // // // // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
// // // // // // // // //                               <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
                              
// // // // // // // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // // // // // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // // // // //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
// // // // // // // // //                                   </div>
// // // // // // // // //                                   <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// // // // // // // // //                               </div>
// // // // // // // // //                           </div>
// // // // // // // // //                       </Link>
// // // // // // // // //                   ))}
// // // // // // // // //               </div>
// // // // // // // // //           )}
// // // // // // // // //       </div>

// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }


















































// // // // // // // // 'use client';

// // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // import Link from 'next/link';
// // // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // import { 
// // // // // // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // // // // // //     Award, FileText, CheckCircle, GraduationCap, Globe 
// // // // // // // // } from 'lucide-react';

// // // // // // // // export default function Dashboard() {
// // // // // // // //   const { user } = useAuth();
// // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // //   const [stats, setStats] = useState({ users: 0, courses: 0, visitors: 0, startYear: 2025 });
// // // // // // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // // // // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // //   useEffect(() => {
// // // // // // // //     const loadData = async () => {
// // // // // // // //       try {
// // // // // // // //         setLoading(true);
        
// // // // // // // //         // 1. Load Content & Stats
// // // // // // // //         const [contentData, statsData] = await Promise.all([
// // // // // // // //             api('/api/content'),
// // // // // // // //             api('/api/stats/public')
// // // // // // // //         ]);
// // // // // // // //         setContent(contentData);
// // // // // // // //         setStats(statsData || { users: 0, courses: 0, visitors: 0, startYear: 2025 });

// // // // // // // //         // 2. Track Visitor
// // // // // // // //         await api('/api/stats/visit', { method: 'POST' });

// // // // // // // //         // 3. Load Blog Terbaru
// // // // // // // //         try {
// // // // // // // //             const blogsData = await api('/api/blog/public');
// // // // // // // //             setRecentBlogs(blogsData?.slice(0, 3) || []);
// // // // // // // //         } catch(e) { console.log("Blog error", e); }

// // // // // // // //         // 4. Load Wall of Fame
// // // // // // // //         try {
// // // // // // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // // // // // //             setWallOfFame(wofData || []);
// // // // // // // //         } catch(e) { console.log("WoF error", e); }

// // // // // // // //       } catch (err) {
// // // // // // // //         console.error("Gagal memuat data:", err);
// // // // // // // //       } finally {
// // // // // // // //         setLoading(false);
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //     loadData();
// // // // // // // //   }, []);

// // // // // // // //   // Timer Slide Carousel
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (content?.slides?.length > 1) {
// // // // // // // //       const timer = setInterval(() => {
// // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // //       }, 5000);
// // // // // // // //       return () => clearInterval(timer);
// // // // // // // //     }
// // // // // // // //   }, [content]);

// // // // // // // //   // Default Features fallback
// // // // // // // //   const features = content?.features?.length ? content.features : [
// // // // // // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // // // // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // // // // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // // // // // //   ];

// // // // // // // //   // Helper untuk memastikan URL gambar valid
// // // // // // // //   const getSlideUrl = (url: string) => {
// // // // // // // //       if (!url) return '';
// // // // // // // //       // Jika URL sudah lengkap (http/https), pakai langsung. Jika tidak, pakai getImageUrl
// // // // // // // //       if (url.startsWith('http')) return url;
// // // // // // // //       return getImageUrl(url);
// // // // // // // //   };

// // // // // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // // // // // //   return (
// // // // // // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // // // // // //       {/* 1. HERO SECTION */}
// // // // // // // //       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-32 pt-10 md:pt-14">
// // // // // // // //         {/* Background Overlay */}
// // // // // // // //         <div className="absolute inset-0 z-0">
// // // // // // // //           <div className="absolute inset-0 bg-gradient-to-r from-[#990000] via-[#990000]/95 to-transparent z-10"></div>
// // // // // // // //           {content?.heroBgUrl ? (
// // // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero" className="w-full h-full object-cover object-center opacity-40 animate-in fade-in duration-1000" />
// // // // // // // //           ) : (
// // // // // // // //              <img src="/pmi-logo.png" alt="Default Hero" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // // //           )}
// // // // // // // //         </div>

// // // // // // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-10">
// // // // // // // //             {/* Teks Hero */}
// // // // // // // //             <div className="flex-1 space-y-5 text-center md:text-left">
// // // // // // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
// // // // // // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // // // // // //                 </h1>
// // // // // // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-90">
// // // // // // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // // // // // //                 </p>
                
// // // // // // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // // // // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // // // // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // // // // // //                     </Link>
// // // // // // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // // //                         <Link href="/admin/content" className="bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // // // // // //                             Kelola Tampilan
// // // // // // // //                         </Link>
// // // // // // // //                     )}
// // // // // // // //                 </div>
// // // // // // // //             </div>

// // // // // // // //             {/* Slide Carousel (FIXED) */}
// // // // // // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // // // // // //                 {content?.slides && content.slides.length > 0 ? (
// // // // // // // //                     <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 group bg-gray-900">
// // // // // // // //                         {content.slides.map((slide: string, index: number) => (
// // // // // // // //                             <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
// // // // // // // //                                 <img 
// // // // // // // //                                     src={getImageUrl(slide)} 
// // // // // // // //                                     alt={`Slide ${index}`} 
// // // // // // // //                                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[5000ms]" 
// // // // // // // //                                     onError={(e) => (e.currentTarget.style.display = 'none')}
// // // // // // // //                                 />
// // // // // // // //                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30 pointer-events-none"></div>
// // // // // // // //                             </div>
// // // // // // // //                         ))}
                        
// // // // // // // //                         {/* Indikator Slide */}
// // // // // // // //                         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
// // // // // // // //                             {content.slides.map((_: any, i: number) => (
// // // // // // // //                                 <button 
// // // // // // // //                                     key={i} 
// // // // // // // //                                     onClick={() => setCurrentSlide(i)} 
// // // // // // // //                                     className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`} 
// // // // // // // //                                     aria-label={`Slide ${i+1}`} 
// // // // // // // //                                 />
// // // // // // // //                             ))}
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 ) : (
// // // // // // // //                     <div className="aspect-video bg-white/10 backdrop-blur-md rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 gap-3">
// // // // // // // //                         <div className="p-3 bg-white/10 rounded-full"><BookOpen size={28}/></div>
// // // // // // // //                         <p className="text-xs font-medium">Slide Belum Ditambahkan</p>
// // // // // // // //                     </div>
// // // // // // // //                 )}
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER) */}
// // // // // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-24 mb-16">
// // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // // // // //           {features.map((feat: any, idx: number) => (
// // // // // // // //             <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full">
// // // // // // // //                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // // // // //                     {idx === 0 ? <BookOpen size={28}/> : idx === 1 ? <Users size={28}/> : <Calendar size={28}/>}
// // // // // // // //                 </div>
// // // // // // // //                 <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#990000] transition-colors">{feat.title || "Judul Fitur"}</h3>
// // // // // // // //                 <p className="text-gray-500 text-sm leading-relaxed">{feat.description || "Deskripsi fitur singkat akan muncul di sini."}</p>
// // // // // // // //             </div>
// // // // // // // //           ))}
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* 3. WALL OF FAME (REALTIME LULUSAN) */}
// // // // // // // //       {wallOfFame.length > 0 && (
// // // // // // // //           <div className="max-w-7xl mx-auto px-6 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
// // // // // // // //               <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
// // // // // // // //                   <div className="flex items-center gap-4">
// // // // // // // //                       <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shadow-sm"><Award size={28}/></div>
// // // // // // // //                       <div>
// // // // // // // //                         <h2 className="text-2xl font-bold text-gray-900">Wall of Fame</h2>
// // // // // // // //                         <p className="text-gray-500 text-sm mt-1">Apresiasi untuk lulusan terbaik yang baru saja menyelesaikan pelatihan.</p>
// // // // // // // //                       </div>
// // // // // // // //                   </div>
// // // // // // // //               </div>
              
// // // // // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // // // //                   {wallOfFame.map((winner, idx) => (
// // // // // // // //                       <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all group relative overflow-hidden flex items-center gap-4">
// // // // // // // //                           <div className="absolute top-0 right-0 bg-yellow-400 w-10 h-10 rounded-bl-2xl flex items-center justify-center text-white text-sm font-black shadow-sm group-hover:w-12 group-hover:h-12 transition-all z-10">
// // // // // // // //                               #{idx+1}
// // // // // // // //                           </div>
                          
// // // // // // // //                           <div className="w-16 h-16 rounded-full bg-gray-50 p-1 border-2 border-dashed border-yellow-200 group-hover:border-yellow-400 transition-colors flex-shrink-0">
// // // // // // // //                                 <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
// // // // // // // //                                     {winner.avatar ? (
// // // // // // // //                                         <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // // // // // //                                     ) : (
// // // // // // // //                                         <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">{winner.name?.charAt(0)}</div>
// // // // // // // //                                     )}
// // // // // // // //                                 </div>
// // // // // // // //                           </div>
                          
// // // // // // // //                           <div className="flex-1 min-w-0 pr-6">
// // // // // // // //                               <h3 className="font-bold text-gray-900 truncate text-sm" title={winner.name}>{winner.name}</h3>
// // // // // // // //                               <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mb-1 truncate">{winner.course}</p>
// // // // // // // //                               <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-green-100">
// // // // // // // //                                   <CheckCircle size={8}/> LULUS
// // // // // // // //                               </span>
// // // // // // // //                           </div>
// // // // // // // //                       </div>
// // // // // // // //                   ))}
// // // // // // // //               </div>
// // // // // // // //           </div>
// // // // // // // //       )}

// // // // // // // //       {/* 4. CERITA RELAWAN (BLOG) */}
// // // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // // // // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // // // // // //               <div className="flex items-center gap-4">
// // // // // // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // // // // // //                   <div>
// // // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // // // // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // // // // // //                   </div>
// // // // // // // //               </div>
// // // // // // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // // // // // //                   Lihat Semua <ChevronRight size={16}/>
// // // // // // // //               </Link>
// // // // // // // //           </div>
          
// // // // // // // //           {recentBlogs.length === 0 ? (
// // // // // // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
// // // // // // // //                   Belum ada cerita terbaru yang dipublikasikan.
// // // // // // // //               </div>
// // // // // // // //           ) : (
// // // // // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // //                   {recentBlogs.map((blog, idx) => (
// // // // // // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
// // // // // // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // // // //                               {blog.coverUrl ? (
// // // // // // // //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// // // // // // // //                               ) : (
// // // // // // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
// // // // // // // //                               )}
// // // // // // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // // // // // //                               <div className="absolute top-3 left-3 flex gap-1">
// // // // // // // //                                   {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
// // // // // // // //                               </div>
// // // // // // // //                           </div>
// // // // // // // //                           <div className="p-6 flex-1 flex flex-col">
// // // // // // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // // // // // //                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // // // // // //                               </p>
// // // // // // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
// // // // // // // //                               <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
                              
// // // // // // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // // // // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // // // //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
// // // // // // // //                                   </div>
// // // // // // // //                                   <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// // // // // // // //                               </div>
// // // // // // // //                           </div>
// // // // // // // //                       </Link>
// // // // // // // //                   ))}
// // // // // // // //               </div>
// // // // // // // //           )}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // 'use client';

// // // // // // // import { useEffect, useState } from 'react';
// // // // // // // import Link from 'next/link';
// // // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // import { 
// // // // // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // // // // //     Award, FileText, CheckCircle, GraduationCap, Globe 
// // // // // // // } from 'lucide-react';

// // // // // // // export default function Dashboard() {
// // // // // // //   const { user } = useAuth();
// // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // //   const [stats, setStats] = useState({ users: 0, courses: 0, visitors: 0, startYear: 2025 });
// // // // // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // // // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // //   useEffect(() => {
// // // // // // //     const loadData = async () => {
// // // // // // //       try {
// // // // // // //         setLoading(true);
// // // // // // //         const [contentData, statsData] = await Promise.all([
// // // // // // //             api('/api/content'),
// // // // // // //             api('/api/stats/public')
// // // // // // //         ]);
        
// // // // // // //         // Cek apakah slides ada dalam data
// // // // // // //         console.log("DEBUG CONTENT SLIDES:", contentData?.slides);
        
// // // // // // //         setContent(contentData);
// // // // // // //         setStats(statsData || { users: 0, courses: 0, visitors: 0, startYear: 2025 });

// // // // // // //         await api('/api/stats/visit', { method: 'POST' });

// // // // // // //         try {
// // // // // // //             const blogsData = await api('/api/blog/public');
// // // // // // //             setRecentBlogs(blogsData?.slice(0, 3) || []);
// // // // // // //         } catch(e) { console.log("Blog error", e); }

// // // // // // //         try {
// // // // // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // // // // //             setWallOfFame(wofData || []);
// // // // // // //         } catch(e) { console.log("WoF error", e); }

// // // // // // //       } catch (err) {
// // // // // // //         console.error("Gagal memuat data:", err);
// // // // // // //       } finally {
// // // // // // //         setLoading(false);
// // // // // // //       }
// // // // // // //     };
// // // // // // //     loadData();
// // // // // // //   }, []);

// // // // // // //   useEffect(() => {
// // // // // // //     if (content?.slides?.length > 1) {
// // // // // // //       const timer = setInterval(() => {
// // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // //       }, 5000);
// // // // // // //       return () => clearInterval(timer);
// // // // // // //     }
// // // // // // //   }, [content]);

// // // // // // //   const features = content?.features?.length ? content.features : [
// // // // // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // // // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // // // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // // // // //   ];

// // // // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // // // // //   return (
// // // // // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // // // // //       {/* 1. HERO SECTION */}
// // // // // // //       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-32 pt-10 md:pt-14">
// // // // // // //         <div className="absolute inset-0 z-0">
// // // // // // //           <div className="absolute inset-0 bg-gradient-to-r from-[#990000] via-[#990000]/95 to-transparent z-10"></div>
// // // // // // //           {content?.heroBgUrl ? (
// // // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero" className="w-full h-full object-cover object-center opacity-40 animate-in fade-in duration-1000" />
// // // // // // //           ) : (
// // // // // // //              <img src="/pmi-logo.png" alt="Default Hero" className="w-full h-full object-cover object-right opacity-10" />
// // // // // // //           )}
// // // // // // //         </div>

// // // // // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-10">
// // // // // // //             <div className="flex-1 space-y-5 text-center md:text-left">
// // // // // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
// // // // // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // // // // //                 </h1>
// // // // // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-90">
// // // // // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // // // // //                 </p>
                
// // // // // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // // // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // // // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // // // // //                     </Link>
// // // // // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // // //                         <Link href="/admin/content" className="bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // // // // //                             Kelola Tampilan
// // // // // // //                         </Link>
// // // // // // //                     )}
// // // // // // //                 </div>
// // // // // // //             </div>

// // // // // // //             {/* Slide Carousel - PERBAIKAN UTAMA: Langsung menggunakan getImageUrl(slide) */}
// // // // // // //             {/* <div className="w-full md:w-1/2 lg:w-5/12">
// // // // // // //                 {content?.slides && content.slides.length > 0 ? (
// // // // // // //                     <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 group bg-gray-900">
// // // // // // //                         {content.slides.map((slide: string, index: number) => (
// // // // // // //                             <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
// // // // // // //                                 <img 
// // // // // // //                                     src={getImageUrl(slide)} 
// // // // // // //                                     alt={`Slide ${index}`} 
// // // // // // //                                     className="w-full h-full object-cover" 
// // // // // // //                                     onError={(e) => (e.currentTarget.style.display = 'none')}
// // // // // // //                                 />
// // // // // // //                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-30 pointer-events-none"></div>
// // // // // // //                             </div>
// // // // // // //                         ))}
                        
// // // // // // //                         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
// // // // // // //                             {content.slides.map((_: any, i: number) => (
// // // // // // //                                 <button 
// // // // // // //                                     key={i} 
// // // // // // //                                     onClick={() => setCurrentSlide(i)} 
// // // // // // //                                     className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`} 
// // // // // // //                                     aria-label={`Slide ${i+1}`} 
// // // // // // //                                 />
// // // // // // //                             ))}
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 ) : (
// // // // // // //                     <div className="aspect-video bg-white/10 backdrop-blur-md rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 gap-3">
// // // // // // //                         <div className="p-3 bg-white/10 rounded-full"><BookOpen size={28}/></div>
// // // // // // //                         <p className="text-xs font-medium">Slide Belum Ditambahkan</p>
// // // // // // //                     </div>
// // // // // // //                 )}
// // // // // // //             </div> */}
// // // // // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // // // // //     {content?.slides && content.slides.length > 0 ? (
// // // // // // //         <div className="relative group">
// // // // // // //             {/* Layer Blur di Belakang (Glow Effect) */}
// // // // // // //             <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
            
// // // // // // //             {/* Kontainer Utama Slide */}
// // // // // // //             <div className="relative aspect-video rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)] border-4 border-white/20 bg-gray-900">
// // // // // // //                 {content.slides.map((slide: string, index: number) => (
// // // // // // //                     <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
// // // // // // //                         <img 
// // // // // // //                             src={getImageUrl(slide)} 
// // // // // // //                             alt={`Slide ${index}`} 
// // // // // // //                             className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[5000ms]" 
// // // // // // //                             onError={(e) => (e.currentTarget.style.display = 'none')}
// // // // // // //                         />
// // // // // // //                         {/* Overlay Gradient Halus */}
// // // // // // //                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 pointer-events-none"></div>
// // // // // // //                     </div>
// // // // // // //                 ))}
                
// // // // // // //                 {/* Indikator Slide */}
// // // // // // //                 <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
// // // // // // //                     {content.slides.map((_: any, i: number) => (
// // // // // // //                         <button 
// // // // // // //                             key={i} 
// // // // // // //                             onClick={() => setCurrentSlide(i)} 
// // // // // // //                             className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/40 hover:bg-white/60'}`} 
// // // // // // //                             aria-label={`Slide ${i+1}`} 
// // // // // // //                         />
// // // // // // //                     ))}
// // // // // // //                 </div>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     ) : (
// // // // // // //         /* Tampilan saat slide kosong tetap sama agar konsisten */
// // // // // // //         <div className="aspect-video bg-white/10 backdrop-blur-md rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 gap-3">
// // // // // // //             <div className="p-3 bg-white/10 rounded-full"><BookOpen size={28}/></div>
// // // // // // //             <p className="text-xs font-medium">Slide Belum Ditambahkan</p>
// // // // // // //         </div>
// // // // // // //     )}
// // // // // // // </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER)
// // // // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-24 mb-16">
// // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // // // //           {features.map((feat: any, idx: number) => (
// // // // // // //             <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full">
// // // // // // //                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // // // //                     {idx === 0 ? <BookOpen size={28}/> : idx === 1 ? <Users size={28}/> : <Calendar size={28}/>}
// // // // // // //                 </div>
// // // // // // //                 <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#990000] transition-colors">{feat.title || "Judul Fitur"}</h3>
// // // // // // //                 <p className="text-gray-500 text-sm leading-relaxed">{feat.description || "Deskripsi fitur singkat akan muncul di sini."}</p>
// // // // // // //             </div>
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //       </div> */}
// // // // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER) - LEBAR KE SAMPING, TINGGI TETAP */}
// // // // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-24 mb-16">
// // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // // // //           {features.map((feat: any, idx: number) => (
// // // // // // //             <div key={idx} className="bg-white py- px-12 md:px-16 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full min-h-[200px] justify-center">
// // // // // // //                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // // // //                     {idx === 0 ? <BookOpen size={32}/> : idx === 1 ? <Users size={32}/> : <Calendar size={32}/>}
// // // // // // //                 </div>
// // // // // // //                 <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-[#990000] transition-colors line-clamp-1">
// // // // // // //                   {feat.title || "Judul Fitur"}
// // // // // // //                 </h3>
// // // // // // //                 <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
// // // // // // //                   {feat.description || "Deskripsi fitur singkat akan muncul di sini."}
// // // // // // //                 </p>
// // // // // // //             </div>
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* 3. WALL OF FAME (LULUSAN REALTIME) */}
// // // // // // //       {wallOfFame.length > 0 && (
// // // // // // //           <div className="max-w-7xl mx-auto px-6 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
// // // // // // //               <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
// // // // // // //                   <div className="flex items-center gap-4">
// // // // // // //                       <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shadow-sm"><Award size={28}/></div>
// // // // // // //                       <div>
// // // // // // //                         <h2 className="text-2xl font-bold text-gray-900">Wall of Fame</h2>
// // // // // // //                         <p className="text-gray-500 text-sm mt-1">Apresiasi untuk lulusan terbaik yang baru saja menyelesaikan pelatihan.</p>
// // // // // // //                       </div>
// // // // // // //                   </div>
// // // // // // //               </div>
              
// // // // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // // // // // //                   {wallOfFame.map((winner, idx) => (
// // // // // // //                       <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-yellow-200 transition-all group relative overflow-hidden flex items-center gap-4">
// // // // // // //                           <div className="absolute top-0 right-0 bg-yellow-400 w-10 h-10 rounded-bl-2xl flex items-center justify-center text-white text-sm font-black shadow-sm group-hover:w-12 group-hover:h-12 transition-all z-10">
// // // // // // //                               #{idx+1}
// // // // // // //                           </div>
// // // // // // //                           <div className="w-16 h-16 rounded-full bg-gray-50 p-1 border-2 border-dashed border-yellow-200 group-hover:border-yellow-400 transition-colors flex-shrink-0">
// // // // // // //                                 <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
// // // // // // //                                     {winner.avatar ? (
// // // // // // //                                         <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // // // // //                                     ) : (
// // // // // // //                                         <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">{winner.name?.charAt(0)}</div>
// // // // // // //                                     )}
// // // // // // //                                 </div>
// // // // // // //                           </div>
// // // // // // //                           <div className="flex-1 min-w-0 pr-6">
// // // // // // //                               <h3 className="font-bold text-gray-900 truncate text-sm" title={winner.name}>{winner.name}</h3>
// // // // // // //                               <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mb-1 truncate">{winner.course}</p>
// // // // // // //                               <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold border border-green-100">
// // // // // // //                                   <CheckCircle size={8}/> LULUS
// // // // // // //                               </span>
// // // // // // //                           </div>
// // // // // // //                       </div>
// // // // // // //                   ))}
// // // // // // //               </div>
// // // // // // //           </div>
// // // // // // //       )}

// // // // // // //       {/* 4. CERITA RELAWAN (BLOG) */}
// // // // // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // // // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // // // // //               <div className="flex items-center gap-4">
// // // // // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // // // // //                   <div>
// // // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // // // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // // // // //                   </div>
// // // // // // //               </div>
// // // // // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // // // // //                   Lihat Semua <ChevronRight size={16}/>
// // // // // // //               </Link>
// // // // // // //           </div>
          
// // // // // // //           {recentBlogs.length === 0 ? (
// // // // // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
// // // // // // //                   Belum ada cerita terbaru yang dipublikasikan.
// // // // // // //               </div>
// // // // // // //           ) : (
// // // // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // //                   {recentBlogs.map((blog, idx) => (
// // // // // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
// // // // // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // // //                               {blog.coverUrl ? (
// // // // // // //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// // // // // // //                               ) : (
// // // // // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
// // // // // // //                               )}
// // // // // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // // // // //                               <div className="absolute top-3 left-3 flex gap-1">
// // // // // // //                                   {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
// // // // // // //                               </div>
// // // // // // //                           </div>
// // // // // // //                           <div className="p-6 flex-1 flex flex-col">
// // // // // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // // // // //                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // // // // //                               </p>
// // // // // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
// // // // // // //                               <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
// // // // // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // // // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // // //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
// // // // // // //                                   </div>
// // // // // // //                                   <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// // // // // // //                               </div>
// // // // // // //                           </div>
// // // // // // //                       </Link>
// // // // // // //                   ))}
// // // // // // //               </div>
// // // // // // //           )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // 'use client';

// // // // // // import { useEffect, useState } from 'react';
// // // // // // import Link from 'next/link';
// // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // import { 
// // // // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // // // //     Award, FileText, CheckCircle, GraduationCap, Globe, Star 
// // // // // // } from 'lucide-react';

// // // // // // export default function Dashboard() {
// // // // // //   const { user } = useAuth();
// // // // // //   const [content, setContent] = useState<any>(null);
  
// // // // // //   // State Data
// // // // // //   const [stats, setStats] = useState({ users: 0, courses: 0, visitors: 0, startYear: 2025 });
// // // // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   useEffect(() => {
// // // // // //     const loadData = async () => {
// // // // // //       try {
// // // // // //         setLoading(true);
        
// // // // // //         // 1. Load Content & Stats
// // // // // //         const [contentData, statsData] = await Promise.all([
// // // // // //             api('/api/content'),
// // // // // //             api('/api/stats/public')
// // // // // //         ]);
// // // // // //         setContent(contentData);
// // // // // //         setStats(statsData || { users: 0, courses: 0, visitors: 0, startYear: 2025 });

// // // // // //         // 2. Track Visitor
// // // // // //         api('/api/stats/visit', { method: 'POST' }).catch(console.error);

// // // // // //         // 3. Load Blog Terbaru (Ambil 3 untuk grid 3 kolom)
// // // // // //         try {
// // // // // //             const blogsData = await api('/api/blog/public');
// // // // // //             setRecentBlogs(blogsData?.slice(0, 3) || []);
// // // // // //         } catch(e) { console.log("Blog error", e); }

// // // // // //         // 4. Load Wall of Fame
// // // // // //         try {
// // // // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // // // //             setWallOfFame(wofData || []);
// // // // // //         } catch(e) { console.log("WoF error", e); }

// // // // // //       } catch (err) {
// // // // // //         console.error("Gagal memuat data:", err);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };
// // // // // //     loadData();
// // // // // //   }, []);

// // // // // //   // Default Features fallback
// // // // // //   const features = content?.features?.length ? content.features : [
// // // // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // // // //   ];

// // // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // // // //   return (
// // // // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // // // //       {/* 1. HERO SECTION */}
// // // // // //       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-32 pt-10 md:pt-14">
// // // // // //         {/* Background Overlay */}
// // // // // //         <div className="absolute inset-0 z-0 pointer-events-none">
// // // // // //           <div className="absolute inset-0 bg-gradient-to-r from-[#990000] via-[#990000]/95 to-transparent z-10"></div>
// // // // // //           {content?.heroBgUrl ? (
// // // // // //              <img src={getImageUrl(content.heroBgUrl)} alt="Hero Background" className="w-full h-full object-cover object-center opacity-40" />
// // // // // //           ) : (
// // // // // //              <img src="/pmi-logo.png" alt="Default Hero" className="w-full h-full object-cover object-right opacity-10" />
// // // // // //           )}
// // // // // //         </div>

// // // // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-12">
            
// // // // // //             {/* KIRI: Teks Hero */}
// // // // // //             <div className="flex-1 space-y-6 text-center md:text-left py-4">
// // // // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
// // // // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // // // //                 </h1>
// // // // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-90">
// // // // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // // // //                 </p>
                
// // // // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // // // //                     </Link>
// // // // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // //                         <Link href="/admin/content" className="bg-black/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // // // //                             Kelola Tampilan
// // // // // //                         </Link>
// // // // // //                     )}
// // // // // //                 </div>
// // // // // //             </div>

// // // // // //             {/* KANAN: WALL OF FAME (MENGGANTIKAN SLIDE) */}
// // // // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // // // //                 <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
// // // // // //                     {/* Header WoF */}
// // // // // //                     <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
// // // // // //                         <h2 className="text-xl font-bold text-white flex items-center gap-2">
// // // // // //                              <Award className="text-yellow-300 fill-yellow-300" /> Wall of Fame
// // // // // //                         </h2>
// // // // // //                         <span className="text-[10px] bg-yellow-400 text-[#990000] font-black px-2 py-1 rounded-md uppercase tracking-wider">Top Lulusan</span>
// // // // // //                     </div>

// // // // // //                     {/* List Lulusan */}
// // // // // //                     <div className="space-y-3">
// // // // // //                         {wallOfFame.length > 0 ? (
// // // // // //                             wallOfFame.slice(0, 3).map((winner, idx) => (
// // // // // //                                 <div key={idx} className="bg-white p-3 rounded-xl shadow-lg flex items-center gap-3 hover:scale-[1.02] transition-transform duration-300 cursor-default group">
// // // // // //                                     {/* Ranking Badge */}
// // // // // //                                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0 ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : idx === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
// // // // // //                                         #{idx + 1}
// // // // // //                                     </div>
                                    
// // // // // //                                     {/* Avatar */}
// // // // // //                                     <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex-shrink-0">
// // // // // //                                         {winner.avatar ? (
// // // // // //                                             <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // // // //                                         ) : (
// // // // // //                                             <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">{winner.name?.charAt(0)}</div>
// // // // // //                                         )}
// // // // // //                                     </div>
                                    
// // // // // //                                     {/* Info */}
// // // // // //                                     <div className="flex-1 min-w-0">
// // // // // //                                         <h3 className="font-bold text-gray-900 text-sm truncate">{winner.name}</h3>
// // // // // //                                         <p className="text-[10px] text-gray-500 truncate">{winner.course}</p>
// // // // // //                                     </div>

// // // // // //                                     {/* Status Icon */}
// // // // // //                                     <div className="text-green-500">
// // // // // //                                         <CheckCircle size={18} className="fill-green-100"/>
// // // // // //                                     </div>
// // // // // //                                 </div>
// // // // // //                             ))
// // // // // //                         ) : (
// // // // // //                             <div className="text-center py-8 text-white/60">
// // // // // //                                 <Star className="w-10 h-10 mx-auto mb-2 opacity-50"/>
// // // // // //                                 <p className="text-sm">Belum ada lulusan.</p>
// // // // // //                             </div>
// // // // // //                         )}
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             </div>

// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER) */}
// // // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-24 mb-16">
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // // //           {features.map((feat: any, idx: number) => (
// // // // // //             <div key={idx} className="bg-white py-8 px-12 md:px-16 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full min-h-[280px] justify-center">
// // // // // //                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // // //                     {idx === 0 ? <BookOpen size={32}/> : idx === 1 ? <Users size={32}/> : <Calendar size={32}/>}
// // // // // //                 </div>
// // // // // //                 <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-[#990000] transition-colors line-clamp-1">
// // // // // //                   {feat.title || "Judul Fitur"}
// // // // // //                 </h3>
// // // // // //                 <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
// // // // // //                   {feat.description || "Deskripsi fitur singkat akan muncul di sini."}
// // // // // //                 </p>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* 3. CERITA RELAWAN (BLOG - 3 CARD) */}
// // // // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // // // //               <div className="flex items-center gap-4">
// // // // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // // // //                   <div>
// // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // // // //                   </div>
// // // // // //               </div>
// // // // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // // // //                   Lihat Semua <ChevronRight size={16}/>
// // // // // //               </Link>
// // // // // //           </div>
          
// // // // // //           {recentBlogs.length === 0 ? (
// // // // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
// // // // // //                   Belum ada cerita terbaru yang dipublikasikan.
// // // // // //               </div>
// // // // // //           ) : (
// // // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // //                   {recentBlogs.map((blog, idx) => (
// // // // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
// // // // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // //                               {blog.coverUrl ? (
// // // // // //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// // // // // //                               ) : (
// // // // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
// // // // // //                               )}
// // // // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // // // //                               <div className="absolute top-3 left-3 flex gap-1">
// // // // // //                                   {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
// // // // // //                               </div>
// // // // // //                           </div>
// // // // // //                           <div className="p-6 flex-1 flex flex-col">
// // // // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // // // //                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // // // //                               </p>
// // // // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
// // // // // //                               <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
// // // // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
// // // // // //                                   </div>
// // // // // //                                   <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// // // // // //                               </div>
// // // // // //                           </div>
// // // // // //                       </Link>
// // // // // //                   ))}
// // // // // //               </div>
// // // // // //           )}
// // // // // //       </div>

// // // // // //       {/* 4. FOOTER STATS BAR */}
// // // // // //       <div className="bg-[#7a0000] text-white py-12 border-t-4 border-[#5c0000]">
// // // // // //           <div className="max-w-7xl mx-auto px-6">
// // // // // //               <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-x border-white/10">
// // // // // //                   <div className="py-2 text-center hover:bg-white/5 transition-colors group cursor-default">
// // // // // //                       <div className="flex items-center justify-center gap-2 mb-2 text-red-300 group-hover:text-white transition-colors"><Globe size={24}/></div>
// // // // // //                       <div className="text-4xl font-black mb-1 text-white tracking-tight">{stats.visitors}</div>
// // // // // //                       <div className="text-[10px] font-bold uppercase tracking-widest text-red-200 group-hover:text-white transition-colors">Total Visitor</div>
// // // // // //                   </div>
// // // // // //                   <div className="py-2 text-center hover:bg-white/5 transition-colors group cursor-default">
// // // // // //                       <div className="flex items-center justify-center gap-2 mb-2 text-red-300 group-hover:text-white transition-colors"><Users size={24}/></div>
// // // // // //                       <div className="text-4xl font-black mb-1 text-white tracking-tight">{stats.users}</div>
// // // // // //                       <div className="text-[10px] font-bold uppercase tracking-widest text-red-200 group-hover:text-white transition-colors">Pengguna</div>
// // // // // //                   </div>
// // // // // //                   <div className="py-2 text-center hover:bg-white/5 transition-colors group cursor-default">
// // // // // //                       <div className="flex items-center justify-center gap-2 mb-2 text-red-300 group-hover:text-white transition-colors"><BookOpen size={24}/></div>
// // // // // //                       <div className="text-4xl font-black mb-1 text-white tracking-tight">{stats.courses}</div>
// // // // // //                       <div className="text-[10px] font-bold uppercase tracking-widest text-red-200 group-hover:text-white transition-colors">Kursus</div>
// // // // // //                   </div>
// // // // // //                   <div className="py-2 text-center hover:bg-white/5 transition-colors group cursor-default">
// // // // // //                       <div className="flex items-center justify-center gap-2 mb-2 text-red-300 group-hover:text-white transition-colors"><GraduationCap size={24}/></div>
// // // // // //                       <div className="text-4xl font-black mb-1 text-white tracking-tight">{stats.startYear}</div>
// // // // // //                       <div className="text-[10px] font-bold uppercase tracking-widest text-red-200 group-hover:text-white transition-colors">Tahun Mulai</div>
// // // // // //                   </div>
// // // // // //               </div>
// // // // // //           </div>
// // // // // //       </div>

// // // // // //     </div>
// // // // // //   );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useEffect, useState } from 'react';
// // // // // // import Link from 'next/link';
// // // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // import { 
// // // // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // // // //     Award, FileText, CheckCircle, GraduationCap, Globe, Star 
// // // // // // } from 'lucide-react';

// // // // // // export default function Dashboard() {
// // // // // //   const { user } = useAuth();
// // // // // //   const [content, setContent] = useState<any>(null);
  
// // // // // //   // State Data
// // // // // //   const [stats, setStats] = useState({ users: 0, courses: 0, visitors: 0, startYear: 2025 });
// // // // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [currentSlide, setCurrentSlide] = useState(0); // State untuk index slide background

// // // // // //   useEffect(() => {
// // // // // //     const loadData = async () => {
// // // // // //       try {
// // // // // //         setLoading(true);
        
// // // // // //         // 1. Load Content & Stats
// // // // // //         const [contentData, statsData] = await Promise.all([
// // // // // //             api('/api/content'),
// // // // // //             api('/api/stats/public')
// // // // // //         ]);
// // // // // //         setContent(contentData);
// // // // // //         setStats(statsData || { users: 0, courses: 0, visitors: 0, startYear: 2025 });

// // // // // //         // 2. Track Visitor
// // // // // //         api('/api/stats/visit', { method: 'POST' }).catch(console.error);

// // // // // //         // 3. Load Blog Terbaru
// // // // // //         try {
// // // // // //             const blogsData = await api('/api/blog/public');
// // // // // //             setRecentBlogs(blogsData?.slice(0, 3) || []);
// // // // // //         } catch(e) { console.log("Blog error", e); }

// // // // // //         // 4. Load Wall of Fame
// // // // // //         try {
// // // // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // // // //             setWallOfFame(wofData || []);
// // // // // //         } catch(e) { console.log("WoF error", e); }

// // // // // //       } catch (err) {
// // // // // //         console.error("Gagal memuat data:", err);
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };
// // // // // //     loadData();
// // // // // //   }, []);

// // // // // //   // Timer untuk Mengganti Background Hero
// // // // // //   useEffect(() => {
// // // // // //     if (content?.slides?.length > 1) {
// // // // // //       const timer = setInterval(() => {
// // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // //       }, 5000); // Ganti setiap 5 detik
// // // // // //       return () => clearInterval(timer);
// // // // // //     }
// // // // // //   }, [content]);

// // // // // //   // Default Features fallback
// // // // // //   const features = content?.features?.length ? content.features : [
// // // // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // // // //   ];

// // // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // // // //   return (
// // // // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // // // //       {/* 1. HERO SECTION (BACKGROUND SLIDESHOW) */}
// // // // // //       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-32 pt-10 md:pt-14 transition-all duration-500">
        
// // // // // //         {/* === BACKGROUND SLIDESHOW LAYER === */}
// // // // // //         <div className="absolute inset-0 z-0 pointer-events-none">
// // // // // //             {content?.slides && content.slides.length > 0 ? (
// // // // // //                 content.slides.map((slide: string, index: number) => (
// // // // // //                     <div 
// // // // // //                         key={index} 
// // // // // //                         className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
// // // // // //                     >
// // // // // //                         <img 
// // // // // //                             src={getImageUrl(slide)} 
// // // // // //                             alt={`Hero Slide ${index}`} 
// // // // // //                             className="w-full h-full object-cover object-center" 
// // // // // //                         />
// // // // // //                     </div>
// // // // // //                 ))
// // // // // //             ) : (
// // // // // //                 /* Fallback jika tidak ada slide, pakai heroBgUrl atau default */
// // // // // //                 <img 
// // // // // //                     src={content?.heroBgUrl ? getImageUrl(content.heroBgUrl) : "/pmi-logo.png"} 
// // // // // //                     alt="Hero Default" 
// // // // // //                     className="w-full h-full object-cover object-center opacity-50" 
// // // // // //                 />
// // // // // //             )}
            
// // // // // //             {/* GRADIENT OVERLAY (Agar teks tetap terbaca di atas foto) */}
// // // // // //             <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/80 to-[#500000]/60 z-10 mix-blend-multiply"></div>
// // // // // //             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
// // // // // //         </div>

// // // // // //         {/* CONTENT HERO */}
// // // // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-12">
            
// // // // // //             {/* KIRI: Teks Hero */}
// // // // // //             <div className="flex-1 space-y-6 text-center md:text-left py-4">
// // // // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
// // // // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // // // //                 </h1>
// // // // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-95 drop-shadow-md">
// // // // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // // // //                 </p>
                
// // // // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // // // //                     </Link>
// // // // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // // //                         <Link href="/admin/content" className="bg-black/30 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // // // //                             Kelola Tampilan
// // // // // //                         </Link>
// // // // // //                     )}
// // // // // //                 </div>
// // // // // //             </div>

// // // // // //             {/* KANAN: WALL OF FAME (Static Box over Dynamic Background) */}
// // // // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // // // //                 <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
// // // // // //                     {/* Header WoF */}
// // // // // //                     <div className="flex items-center justify-between mb-5 border-b border-white/20 pb-3">
// // // // // //                         <h2 className="text-xl font-bold text-white flex items-center gap-2 drop-shadow-md">
// // // // // //                              <Award className="text-yellow-300 fill-yellow-300" /> Wall of Fame
// // // // // //                         </h2>
// // // // // //                         <span className="text-[10px] bg-yellow-400 text-[#990000] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">Top Lulusan</span>
// // // // // //                     </div>

// // // // // //                     {/* List Lulusan */}
// // // // // //                     <div className="space-y-3">
// // // // // //                         {wallOfFame.length > 0 ? (
// // // // // //                             wallOfFame.slice(0, 3).map((winner, idx) => (
// // // // // //                                 <div key={idx} className="bg-white p-3 rounded-xl shadow-lg flex items-center gap-3 hover:scale-[1.02] transition-transform duration-300 cursor-default group">
// // // // // //                                     {/* Ranking Badge */}
// // // // // //                                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0 ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : idx === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
// // // // // //                                         #{idx + 1}
// // // // // //                                     </div>
                                    
// // // // // //                                     {/* Avatar */}
// // // // // //                                     <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex-shrink-0">
// // // // // //                                         {winner.avatar ? (
// // // // // //                                             <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // // // //                                         ) : (
// // // // // //                                             <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">{winner.name?.charAt(0)}</div>
// // // // // //                                         )}
// // // // // //                                     </div>
                                    
// // // // // //                                     {/* Info */}
// // // // // //                                     <div className="flex-1 min-w-0">
// // // // // //                                         <h3 className="font-bold text-gray-900 text-sm truncate">{winner.name}</h3>
// // // // // //                                         <p className="text-[10px] text-gray-500 truncate">{winner.course}</p>
// // // // // //                                     </div>

// // // // // //                                     {/* Status Icon */}
// // // // // //                                     <div className="text-green-500">
// // // // // //                                         <CheckCircle size={18} className="fill-green-100"/>
// // // // // //                                     </div>
// // // // // //                                 </div>
// // // // // //                             ))
// // // // // //                         ) : (
// // // // // //                             <div className="text-center py-8 text-white/60">
// // // // // //                                 <Star className="w-10 h-10 mx-auto mb-2 opacity-50"/>
// // // // // //                                 <p className="text-sm">Belum ada lulusan.</p>
// // // // // //                             </div>
// // // // // //                         )}
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             </div>

// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER) */}
// // // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-24 mb-16">
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // // //           {features.map((feat: any, idx: number) => (
// // // // // //             <div key={idx} className="bg-white py-8 px-12 md:px-16 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full min-h-[280px] justify-center">
// // // // // //                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // // //                     {idx === 0 ? <BookOpen size={32}/> : idx === 1 ? <Users size={32}/> : <Calendar size={32}/>}
// // // // // //                 </div>
// // // // // //                 <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-[#990000] transition-colors line-clamp-1">
// // // // // //                   {feat.title || "Judul Fitur"}
// // // // // //                 </h3>
// // // // // //                 <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
// // // // // //                   {feat.description || "Deskripsi fitur singkat akan muncul di sini."}
// // // // // //                 </p>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* 3. CERITA RELAWAN (BLOG - 3 CARD) */}
// // // // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // // // //               <div className="flex items-center gap-4">
// // // // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // // // //                   <div>
// // // // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // // // //                   </div>
// // // // // //               </div>
// // // // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // // // //                   Lihat Semua <ChevronRight size={16}/>
// // // // // //               </Link>
// // // // // //           </div>
          
// // // // // //           {recentBlogs.length === 0 ? (
// // // // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
// // // // // //                   Belum ada cerita terbaru yang dipublikasikan.
// // // // // //               </div>
// // // // // //           ) : (
// // // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // //                   {recentBlogs.map((blog, idx) => (
// // // // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
// // // // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // // //                               {blog.coverUrl ? (
// // // // // //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// // // // // //                               ) : (
// // // // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={40} opacity={0.2}/></div>
// // // // // //                               )}
// // // // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // // // //                               <div className="absolute top-3 left-3 flex gap-1">
// // // // // //                                   {blog.tags?.slice(0,1).map((t:any, i:number)=>(<span key={i} className="bg-white/90 text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">{t}</span>))}
// // // // // //                               </div>
// // // // // //                           </div>
// // // // // //                           <div className="p-6 flex-1 flex flex-col">
// // // // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // // // //                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // // // //                               </p>
// // // // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
// // // // // //                               <div className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content?.replace(/<[^>]+>/g, '') }}></div>
// // // // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // // //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name}`} className="w-full h-full object-cover" alt="Author"/>
// // // // // //                                   </div>
// // // // // //                                   <span className="text-xs font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// // // // // //                               </div>
// // // // // //                           </div>
// // // // // //                       </Link>
// // // // // //                   ))}
// // // // // //               </div>
// // // // // //           )}
// // // // // //       </div>

// // // // // //       {/* 4. FOOTER STATS BAR */}
// // // // // //       {/* <div className="bg-[#7a0000] text-white py-12 border-t-4 border-[#5c0000]">
// // // // // //           <div className="max-w-7xl mx-auto px-6">
// // // // // //               <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-x border-white/10">
// // // // // //                   <div className="py-2 text-center hover:bg-white/5 transition-colors group cursor-default">
// // // // // //                       <div className="flex items-center justify-center gap-2 mb-2 text-red-300 group-hover:text-white transition-colors"><Globe size={24}/></div>
// // // // // //                       <div className="text-4xl font-black mb-1 text-white tracking-tight">{stats.visitors}</div>
// // // // // //                       <div className="text-[10px] font-bold uppercase tracking-widest text-red-200 group-hover:text-white transition-colors">Total Visitor</div>
// // // // // //                   </div>
// // // // // //                   <div className="py-2 text-center hover:bg-white/5 transition-colors group cursor-default">
// // // // // //                       <div className="flex items-center justify-center gap-2 mb-2 text-red-300 group-hover:text-white transition-colors"><Users size={24}/></div>
// // // // // //                       <div className="text-4xl font-black mb-1 text-white tracking-tight">{stats.users}</div>
// // // // // //                       <div className="text-[10px] font-bold uppercase tracking-widest text-red-200 group-hover:text-white transition-colors">Pengguna</div>
// // // // // //                   </div>
// // // // // //                   <div className="py-2 text-center hover:bg-white/5 transition-colors group cursor-default">
// // // // // //                       <div className="flex items-center justify-center gap-2 mb-2 text-red-300 group-hover:text-white transition-colors"><BookOpen size={24}/></div>
// // // // // //                       <div className="text-4xl font-black mb-1 text-white tracking-tight">{stats.courses}</div>
// // // // // //                       <div className="text-[10px] font-bold uppercase tracking-widest text-red-200 group-hover:text-white transition-colors">Kursus</div>
// // // // // //                   </div>
// // // // // //                   <div className="py-2 text-center hover:bg-white/5 transition-colors group cursor-default">
// // // // // //                       <div className="flex items-center justify-center gap-2 mb-2 text-red-300 group-hover:text-white transition-colors"><GraduationCap size={24}/></div>
// // // // // //                       <div className="text-4xl font-black mb-1 text-white tracking-tight">{stats.startYear}</div>
// // // // // //                       <div className="text-[10px] font-bold uppercase tracking-widest text-red-200 group-hover:text-white transition-colors">Tahun Mulai</div>
// // // // // //                   </div>
// // // // // //               </div>
// // // // // //           </div>
// // // // // //       </div> */}

// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // 'use client';

// // // // // import { useEffect, useState } from 'react';
// // // // // import Link from 'next/link';
// // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // import { 
// // // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // // //     Award, FileText, CheckCircle, GraduationCap, Globe, Star, PenTool
// // // // // } from 'lucide-react';

// // // // // export default function Dashboard() {
// // // // //   const { user } = useAuth();
// // // // //   const [content, setContent] = useState<any>(null);
  
// // // // //   // State Data
// // // // //   const [stats, setStats] = useState({ users: 0, courses: 0, visitors: 0, startYear: 2025 });
// // // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [currentSlide, setCurrentSlide] = useState(0); // State untuk index slide background

// // // // //   useEffect(() => {
// // // // //     const loadData = async () => {
// // // // //       try {
// // // // //         setLoading(true);
        
// // // // //         // 1. Load Content & Stats
// // // // //         const [contentData, statsData] = await Promise.all([
// // // // //             api('/api/content').catch(() => null),
// // // // //             api('/api/stats/public').catch(() => null)
// // // // //         ]);
// // // // //         setContent(contentData);
// // // // //         setStats(statsData || { users: 0, courses: 0, visitors: 0, startYear: 2025 });

// // // // //         // 2. Track Visitor
// // // // //         api('/api/stats/visit', { method: 'POST' }).catch(console.error);

// // // // //         // 3. Load Blog Terbaru (3 item untuk Grid)
// // // // //         try {
// // // // //             const blogsRes = await api('/api/blog/public?limit=3');
// // // // //             // Cek struktur response (apakah array langsung atau object {data: []})
// // // // //             if (blogsRes.data && Array.isArray(blogsRes.data)) {
// // // // //                 setRecentBlogs(blogsRes.data);
// // // // //             } else if (Array.isArray(blogsRes)) {
// // // // //                 setRecentBlogs(blogsRes.slice(0, 3));
// // // // //             } else {
// // // // //                 setRecentBlogs([]);
// // // // //             }
// // // // //         } catch(e) { console.log("Blog error", e); }

// // // // //         // 4. Load Wall of Fame
// // // // //         try {
// // // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // // //             setWallOfFame(wofData || []);
// // // // //         } catch(e) { console.log("WoF error", e); }

// // // // //       } catch (err) {
// // // // //         console.error("Gagal memuat data:", err);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     loadData();
// // // // //   }, []);

// // // // //   // Timer untuk Mengganti Background Hero
// // // // //   useEffect(() => {
// // // // //     if (content?.slides?.length > 1) {
// // // // //       const timer = setInterval(() => {
// // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // //       }, 5000); // Ganti setiap 5 detik
// // // // //       return () => clearInterval(timer);
// // // // //     }
// // // // //   }, [content]);

// // // // //   // Default Features fallback
// // // // //   const features = content?.features?.length ? content.features : [
// // // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // // //   ];

// // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // // //   return (
// // // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // // //       {/* 1. HERO SECTION (BACKGROUND SLIDESHOW) */}
// // // // //       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-32 pt-10 md:pt-14 transition-all duration-500">
        
// // // // //         {/* === BACKGROUND SLIDESHOW LAYER === */}
// // // // //         <div className="absolute inset-0 z-0 pointer-events-none">
// // // // //             {content?.slides && content.slides.length > 0 ? (
// // // // //                 content.slides.map((slide: string, index: number) => (
// // // // //                     <div 
// // // // //                         key={index} 
// // // // //                         className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
// // // // //                     >
// // // // //                         <img 
// // // // //                             src={getImageUrl(slide)} 
// // // // //                             alt={`Hero Slide ${index}`} 
// // // // //                             className="w-full h-full object-cover object-center" 
// // // // //                         />
// // // // //                     </div>
// // // // //                 ))
// // // // //             ) : (
// // // // //                 /* Fallback jika tidak ada slide, pakai heroBgUrl atau default */
// // // // //                 <img 
// // // // //                     src={content?.heroBgUrl ? getImageUrl(content.heroBgUrl) : "/pmi-logo.png"} 
// // // // //                     alt="Hero Default" 
// // // // //                     className="w-full h-full object-cover object-center opacity-50" 
// // // // //                 />
// // // // //             )}
            
// // // // //             {/* GRADIENT OVERLAY (Agar teks tetap terbaca di atas foto) */}
// // // // //             <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/80 to-[#500000]/60 z-10 mix-blend-multiply"></div>
// // // // //             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
// // // // //         </div>

// // // // //         {/* CONTENT HERO */}
// // // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-12">
            
// // // // //             {/* KIRI: Teks Hero */}
// // // // //             <div className="flex-1 space-y-6 text-center md:text-left py-4">
// // // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
// // // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // // //                 </h1>
// // // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-95 drop-shadow-md">
// // // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // // //                 </p>
                
// // // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // // //                     </Link>
// // // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // // //                         <Link href="/admin/content" className="bg-black/30 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // // //                             Kelola Tampilan
// // // // //                         </Link>
// // // // //                     )}
// // // // //                 </div>
// // // // //             </div>

// // // // //             {/* KANAN: WALL OF FAME (Static Box over Dynamic Background) */}
// // // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // // //                 <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
// // // // //                     {/* Header WoF */}
// // // // //                     <div className="flex items-center justify-between mb-5 border-b border-white/20 pb-3">
// // // // //                         <h2 className="text-xl font-bold text-white flex items-center gap-2 drop-shadow-md">
// // // // //                              <Award className="text-yellow-300 fill-yellow-300" /> Wall of Fame
// // // // //                         </h2>
// // // // //                         <span className="text-[10px] bg-yellow-400 text-[#990000] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">Top Lulusan</span>
// // // // //                     </div>

// // // // //                     {/* List Lulusan */}
// // // // //                     <div className="space-y-3">
// // // // //                         {wallOfFame.length > 0 ? (
// // // // //                             wallOfFame.slice(0, 3).map((winner, idx) => (
// // // // //                                 <div key={idx} className="bg-white p-3 rounded-xl shadow-lg flex items-center gap-3 hover:scale-[1.02] transition-transform duration-300 cursor-default group">
// // // // //                                     {/* Ranking Badge */}
// // // // //                                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0 ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : idx === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
// // // // //                                         #{idx + 1}
// // // // //                                     </div>
                                    
// // // // //                                     {/* Avatar */}
// // // // //                                     <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex-shrink-0">
// // // // //                                         {winner.avatar ? (
// // // // //                                             <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // // //                                         ) : (
// // // // //                                             <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">{winner.name?.charAt(0)}</div>
// // // // //                                         )}
// // // // //                                     </div>
                                    
// // // // //                                     {/* Info */}
// // // // //                                     <div className="flex-1 min-w-0">
// // // // //                                         <h3 className="font-bold text-gray-900 text-sm truncate">{winner.name}</h3>
// // // // //                                         <p className="text-[10px] text-gray-500 truncate">{winner.course}</p>
// // // // //                                     </div>

// // // // //                                     {/* Status Icon */}
// // // // //                                     <div className="text-green-500">
// // // // //                                         <CheckCircle size={18} className="fill-green-100"/>
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                             ))
// // // // //                         ) : (
// // // // //                             <div className="text-center py-8 text-white/60">
// // // // //                                 <Star className="w-10 h-10 mx-auto mb-2 opacity-50"/>
// // // // //                                 <p className="text-sm">Belum ada lulusan.</p>
// // // // //                             </div>
// // // // //                         )}
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>

// // // // //         </div>
// // // // //       </div>

// // // // //       {/* 2. INFO CARDS (OVERLAPPING HEADER) */}
// // // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-24 mb-16">
// // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // // //           {features.map((feat: any, idx: number) => (
// // // // //             <div key={idx} className="bg-white py-8 px-12 md:px-16 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full min-h-[280px] justify-center">
// // // // //                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // // //                     {idx === 0 ? <BookOpen size={32}/> : idx === 1 ? <Users size={32}/> : <Calendar size={32}/>}
// // // // //                 </div>
// // // // //                 <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-[#990000] transition-colors line-clamp-1">
// // // // //                   {feat.title || "Judul Fitur"}
// // // // //                 </h3>
// // // // //                 <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
// // // // //                   {feat.description || "Deskripsi fitur singkat akan muncul di sini."}
// // // // //                 </p>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* 3. CERITA RELAWAN (BLOG - 3 CARD) */}
// // // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // // //               <div className="flex items-center gap-4">
// // // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // // //                   <div>
// // // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // // //                   </div>
// // // // //               </div>
// // // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // // //                   Lihat Semua <ChevronRight size={16}/>
// // // // //               </Link>
// // // // //           </div>
          
// // // // //           {recentBlogs.length === 0 ? (
// // // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // // // //                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
// // // // //                       <PenTool className="text-gray-300" size={24} />
// // // // //                   </div>
// // // // //                   <p className="text-gray-400 font-medium">Belum ada cerita terbaru yang dipublikasikan.</p>
// // // // //               </div>
// // // // //           ) : (
// // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // //                   {recentBlogs.map((blog, idx) => (
// // // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
                          
// // // // //                           {/* Gambar Cover */}
// // // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // // //                               {blog.coverUrl ? (
// // // // //                                   <img 
// // // // //                                       src={getImageUrl(blog.coverUrl)} 
// // // // //                                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
// // // // //                                       alt={blog.title}
// // // // //                                   />
// // // // //                               ) : (
// // // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
// // // // //                                       <BookOpen size={40} opacity={0.2}/>
// // // // //                                   </div>
// // // // //                               )}
                              
// // // // //                               {/* Overlay Gradient */}
// // // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              
// // // // //                               {/* Tag Kategori (Diambil dari tags[0]) */}
// // // // //                               {blog.tags && blog.tags.length > 0 && (
// // // // //                                   <div className="absolute top-3 left-3 flex gap-1">
// // // // //                                       <span className="bg-white/95 backdrop-blur-sm text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm tracking-wider">
// // // // //                                           {blog.tags[0]}
// // // // //                                       </span>
// // // // //                                   </div>
// // // // //                               )}
// // // // //                           </div>
                          
// // // // //                           {/* Konten Text */}
// // // // //                           <div className="p-6 flex-1 flex flex-col">
// // // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // // //                                   <Calendar size={10}/> 
// // // // //                                   {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // // //                               </p>
                              
// // // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-[#990000] transition-colors line-clamp-2 leading-snug">
// // // // //                                   {blog.title}
// // // // //                               </h3>
                              
// // // // //                               {/* Ringkasan (Strip HTML Tags) */}
// // // // //                               <div 
// // // // //                                   className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" 
// // // // //                                   dangerouslySetInnerHTML={{ __html: blog.content ? blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..." : "Tidak ada ringkasan." }}
// // // // //                               ></div>
                              
// // // // //                               {/* Footer Card: Author */}
// // // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // // //                                       <img 
// // // // //                                           src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'Admin'}`} 
// // // // //                                           className="w-full h-full object-cover" 
// // // // //                                           alt="Author"
// // // // //                                       />
// // // // //                                   </div>
// // // // //                                   <span className="text-xs font-bold text-gray-600 truncate">
// // // // //                                       {blog.author?.name || 'Admin'}
// // // // //                                   </span>
// // // // //                               </div>
// // // // //                           </div>
// // // // //                       </Link>
// // // // //                   ))}
// // // // //               </div>
// // // // //           )}
// // // // //       </div>

// // // // //     </div>
// // // // //   );
// // // // // }

// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import Link from 'next/link';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import { useAuth } from '@/lib/AuthProvider';
// // // // import { 
// // // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // // //     Award, FileText, CheckCircle, GraduationCap, Globe, Star, PenTool
// // // // } from 'lucide-react';

// // // // export default function Dashboard() {
// // // //   const { user } = useAuth();
// // // //   const [content, setContent] = useState<any>(null);
  
// // // //   // State Data
// // // //   const [stats, setStats] = useState({ users: 0, courses: 0, visitors: 0, startYear: 2025 });
// // // //   const [wallOfFame, setWallOfFame] = useState<any[]>([]);
// // // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [currentSlide, setCurrentSlide] = useState(0); 

// // // //   useEffect(() => {
// // // //     const loadData = async () => {
// // // //       try {
// // // //         setLoading(true);
        
// // // //         // 1. Load Content & Stats
// // // //         const [contentData, statsData] = await Promise.all([
// // // //             api('/api/content').catch(() => null),
// // // //             api('/api/stats/public').catch(() => null)
// // // //         ]);
// // // //         setContent(contentData);
// // // //         setStats(statsData || { users: 0, courses: 0, visitors: 0, startYear: 2025 });

// // // //         // 2. Track Visitor
// // // //         api('/api/stats/visit', { method: 'POST' }).catch(console.error);

// // // //         // 3. Load Blog Terbaru (3 item untuk Grid)
// // // //         try {
// // // //             const blogsRes = await api('/api/blog/public?limit=3');
// // // //             if (blogsRes.data && Array.isArray(blogsRes.data)) {
// // // //                 setRecentBlogs(blogsRes.data);
// // // //             } else if (Array.isArray(blogsRes)) {
// // // //                 setRecentBlogs(blogsRes.slice(0, 3));
// // // //             } else {
// // // //                 setRecentBlogs([]);
// // // //             }
// // // //         } catch(e) { console.log("Blog error", e); }

// // // //         // 4. Load Wall of Fame
// // // //         try {
// // // //             const wofData = await api('/api/stats/wall-of-fame');
// // // //             setWallOfFame(wofData || []);
// // // //         } catch(e) { console.log("WoF error", e); }

// // // //       } catch (err) {
// // // //         console.error("Gagal memuat data:", err);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     loadData();
// // // //   }, []);

// // // //   // Timer untuk Mengganti Background Hero
// // // //   useEffect(() => {
// // // //     if (content?.slides?.length > 1) {
// // // //       const timer = setInterval(() => {
// // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // //       }, 5000); 
// // // //       return () => clearInterval(timer);
// // // //     }
// // // //   }, [content]);

// // // //   // Default Features fallback
// // // //   const features = content?.features?.length ? content.features : [
// // // //       { title: 'Selamat Datang', description: 'Platform pembelajaran digital terbaik.' },
// // // //       { title: 'Tutorial Penggunaan', description: 'Panduan lengkap cara menggunakan sistem.' },
// // // //       { title: 'Pendaftaran', description: 'Daftar pelatihan dan kursus dengan mudah.' }
// // // //   ];

// // // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // // //   return (
// // // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // // //       {/* 1. HERO SECTION */}
// // // //       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-32 pt-10 md:pt-14 transition-all duration-500">
        
// // // //         {/* === BACKGROUND SLIDESHOW LAYER === */}
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
            
// // // //             <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/80 to-[#500000]/60 z-10 mix-blend-multiply"></div>
// // // //             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
// // // //         </div>

// // // //         {/* CONTENT HERO */}
// // // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-12">
            
// // // //             {/* KIRI: Teks Hero */}
// // // //             <div className="flex-1 space-y-6 text-center md:text-left py-4">
// // // //                 <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
// // // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // // //                 </h1>
// // // //                 <p className="text-red-50 text-base md:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 font-light opacity-95 drop-shadow-md">
// // // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // // //                 </p>
                
// // // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // // //                     <Link href="/courses" className="bg-white text-[#990000] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center gap-2 group">
// // // //                         Mulai Belajar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
// // // //                     </Link>
// // // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // // //                         <Link href="/admin/content" className="bg-black/30 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 flex items-center gap-2">
// // // //                             Kelola Tampilan
// // // //                         </Link>
// // // //                     )}
// // // //                 </div>
// // // //             </div>

// // // //             {/* KANAN: WALL OF FAME (TOP TERAKTIF) */}
// // // //             <div className="w-full md:w-1/2 lg:w-5/12">
// // // //                 <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
                    
// // // //                     {/* Header WoF - DIUBAH DISINI */}
// // // //                     <div className="flex items-center justify-between mb-5 border-b border-white/20 pb-3">
// // // //                         <h2 className="text-xl font-bold text-white flex items-center gap-2 drop-shadow-md">
// // // //                              <Award className="text-yellow-300 fill-yellow-300" /> Wall of Fame
// // // //                         </h2>
// // // //                         {/* Ubah Label Badge */}
// // // //                         <span className="text-[10px] bg-yellow-400 text-[#990000] font-black px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
// // // //                             TOP TERAKTIF
// // // //                         </span>
// // // //                     </div>

// // // //                     {/* List Pemenang */}
// // // //                     <div className="space-y-3">
// // // //                         {wallOfFame.length > 0 ? (
// // // //                             wallOfFame.slice(0, 3).map((winner, idx) => (
// // // //                                 <div key={idx} className="bg-white p-3 rounded-xl shadow-lg flex items-center gap-3 hover:scale-[1.02] transition-transform duration-300 cursor-default group">
// // // //                                     {/* Ranking Badge */}
// // // //                                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0 ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : idx === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
// // // //                                         #{idx + 1}
// // // //                                     </div>
                                    
// // // //                                     {/* Avatar */}
// // // //                                     <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex-shrink-0">
// // // //                                         {winner.avatar ? (
// // // //                                             <img src={getImageUrl(winner.avatar)} className="w-full h-full object-cover" alt={winner.name}/>
// // // //                                         ) : (
// // // //                                             <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">{winner.name?.charAt(0)}</div>
// // // //                                         )}
// // // //                                     </div>
                                    
// // // //                                     {/* Info */}
// // // //                                     <div className="flex-1 min-w-0">
// // // //                                         <h3 className="font-bold text-gray-900 text-sm truncate">{winner.name}</h3>
// // // //                                         {/* Ini akan menampilkan label dinamis dari backend (Contoh: "Penulis Aktif" atau "2 Kursus") */}
// // // //                                         <p className="text-[10px] text-gray-500 truncate font-medium">{winner.course}</p>
// // // //                                     </div>

// // // //                                     {/* Status Icon */}
// // // //                                     <div className="text-green-500">
// // // //                                         <CheckCircle size={18} className="fill-green-100"/>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             ))
// // // //                         ) : (
// // // //                             <div className="text-center py-8 text-white/60">
// // // //                                 <Star className="w-10 h-10 mx-auto mb-2 opacity-50"/>
// // // //                                 <p className="text-sm">Belum ada aktivitas.</p>
// // // //                             </div>
// // // //                         )}
// // // //                     </div>
// // // //                 </div>
// // // //             </div>

// // // //         </div>
// // // //       </div>

// // // //       {/* 2. INFO CARDS */}
// // // //       <div className="relative z-30 max-w-7xl mx-auto px-6 -mt-24 mb-16">
// // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
// // // //           {features.map((feat: any, idx: number) => (
// // // //             <div key={idx} className="bg-white py-8 px-12 md:px-16 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group h-full min-h-[280px] justify-center">
// // // //                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // // //                     {idx === 0 ? <BookOpen size={32}/> : idx === 1 ? <Users size={32}/> : <Calendar size={32}/>}
// // // //                 </div>
// // // //                 <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-[#990000] transition-colors line-clamp-1">
// // // //                   {feat.title || "Judul Fitur"}
// // // //                 </h3>
// // // //                 <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
// // // //                   {feat.description || "Deskripsi fitur singkat akan muncul di sini."}
// // // //                 </p>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* 3. CERITA RELAWAN (BLOG) */}
// // // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // // //           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
// // // //               <div className="flex items-center gap-4">
// // // //                   <div className="bg-red-50 p-3 rounded-xl text-[#990000]"><FileText size={28}/></div>
// // // //                   <div>
// // // //                     <h2 className="text-2xl font-bold text-gray-900">Cerita Relawan</h2>
// // // //                     <p className="text-gray-500 text-sm mt-1">Kisah inspiratif dan berita terbaru dari lapangan.</p>
// // // //                   </div>
// // // //               </div>
// // // //               <Link href="/blog" className="text-sm font-bold text-[#990000] hover:underline flex items-center gap-1 transition-colors">
// // // //                   Lihat Semua <ChevronRight size={16}/>
// // // //               </Link>
// // // //           </div>
          
// // // //           {recentBlogs.length === 0 ? (
// // // //               <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // // //                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
// // // //                       <PenTool className="text-gray-300" size={24} />
// // // //                   </div>
// // // //                   <p className="text-gray-400 font-medium">Belum ada cerita terbaru yang dipublikasikan.</p>
// // // //               </div>
// // // //           ) : (
// // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // // //                   {recentBlogs.map((blog, idx) => (
// // // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
                          
// // // //                           {/* Gambar Cover */}
// // // //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// // // //                               {blog.coverUrl ? (
// // // //                                   <img 
// // // //                                       src={getImageUrl(blog.coverUrl)} 
// // // //                                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
// // // //                                       alt={blog.title}
// // // //                                   />
// // // //                               ) : (
// // // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
// // // //                                       <BookOpen size={40} opacity={0.2}/>
// // // //                                   </div>
// // // //                               )}
// // // //                               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // //                               {blog.tags && blog.tags.length > 0 && (
// // // //                                   <div className="absolute top-3 left-3 flex gap-1">
// // // //                                       <span className="bg-white/95 backdrop-blur-sm text-gray-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm tracking-wider">
// // // //                                           {blog.tags[0]}
// // // //                                       </span>
// // // //                                   </div>
// // // //                               )}
// // // //                           </div>
                          
// // // //                           {/* Konten Text */}
// // // //                           <div className="p-6 flex-1 flex flex-col">
// // // //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1 tracking-wider">
// // // //                                   <Calendar size={10}/> 
// // // //                                   {new Date(blog.createdAt).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}
// // // //                               </p>
// // // //                               <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-[#990000] transition-colors line-clamp-2 leading-snug">
// // // //                                   {blog.title}
// // // //                               </h3>
// // // //                               <div 
// // // //                                   className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1 leading-relaxed" 
// // // //                                   dangerouslySetInnerHTML={{ __html: blog.content ? blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..." : "Tidak ada ringkasan." }}
// // // //                               ></div>
// // // //                               <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
// // // //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
// // // //                                       <img 
// // // //                                           src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'Admin'}`} 
// // // //                                           className="w-full h-full object-cover" 
// // // //                                           alt="Author"
// // // //                                       />
// // // //                                   </div>
// // // //                                   <span className="text-xs font-bold text-gray-600 truncate">
// // // //                                       {blog.author?.name || 'Admin'}
// // // //                                   </span>
// // // //                               </div>
// // // //                           </div>
// // // //                       </Link>
// // // //                   ))}
// // // //               </div>
// // // //           )}
// // // //       </div>

// // // //     </div>
// // // //   );
// // // // }



// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import Link from 'next/link';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import { 
// // //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// // //     Award, FileText, CheckCircle, Zap, Star, PenTool, Mic2
// // // } from 'lucide-react';

// // // export default function Dashboard() {
// // //   const { user } = useAuth();
// // //   const [content, setContent] = useState<any>(null);
  
// // //   // State Data
// // //   const [wofData, setWofData] = useState({ learners: [], contributors: [], facilitators: [] });
// // //   const [activeTab, setActiveTab] = useState<'learners' | 'contributors' | 'facilitators'>('learners'); 

// // //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [currentSlide, setCurrentSlide] = useState(0); 

// // //   useEffect(() => {
// // //     const loadData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const contentData = await api('/api/content').catch(() => null);
// // //         setContent(contentData);

// // //         api('/api/stats/visit', { method: 'POST' }).catch(console.error);

// // //         // Load Blog (3 Item)
// // //         try {
// // //             const blogsRes = await api('/api/blog/public?limit=3');
// // //             setRecentBlogs(Array.isArray(blogsRes.data) ? blogsRes.data : []);
// // //         } catch(e) { console.log("Blog error", e); }

// // //         // Load Wall of Fame
// // //         try {
// // //             const wofRes = await api('/api/stats/wall-of-fame');
// // //             setWofData({
// // //                 learners: wofRes.learners || [],
// // //                 contributors: wofRes.contributors || [],
// // //                 facilitators: wofRes.facilitators || []
// // //             });
// // //             // Auto switch tab jika default kosong tapi yang lain ada isi
// // //             if ((!wofRes.learners || wofRes.learners.length === 0) && wofRes.contributors?.length > 0) {
// // //                 setActiveTab('contributors');
// // //             }
// // //         } catch(e) { console.log("WoF error", e); }

// // //       } catch (err) { console.error(err); } finally { setLoading(false); }
// // //     };
// // //     loadData();
// // //   }, []);

// // //   useEffect(() => {
// // //     if (content?.slides?.length > 1) {
// // //       const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % content.slides.length), 5000);
// // //       return () => clearInterval(timer);
// // //     }
// // //   }, [content]);

// // //   // Fitur Info Cards (Compact)
// // //   const features = content?.features?.length ? content.features : [
// // //       { title: 'Katalog Kelas', description: 'Akses modul pelatihan digital.', link: '/courses', icon: 'book' },
// // //       { title: 'Panduan', description: 'Cara penggunaan sistem.', link: '/guide', icon: 'users' }, // Ganti link sesuai kebutuhan
// // //       { title: 'Pendaftaran', description: 'Jadwal kegiatan terbaru.', link: '/courses', icon: 'calendar' }
// // //   ];

// // //   const activeList: any[] = wofData[activeTab] || [];
  
// // //   const getTabLabel = () => {
// // //       if(activeTab === 'learners') return 'PESERTA';
// // //       if(activeTab === 'contributors') return 'PENULIS';
// // //       return 'FASILITATOR';
// // //   }

// // //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// // //   return (
// // //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// // //       {/* 1. HERO SECTION */}
// // //       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-24 pt-8 md:pt-12 transition-all duration-500">
        
// // //         {/* Background Layer */}
// // //         <div className="absolute inset-0 z-0 pointer-events-none">
// // //             {content?.slides && content.slides.length > 0 ? (
// // //                 content.slides.map((slide: string, index: number) => (
// // //                     <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
// // //                         <img src={getImageUrl(slide)} alt="Hero" className="w-full h-full object-cover object-center" />
// // //                     </div>
// // //                 ))
// // //             ) : (
// // //                 <img src={content?.heroBgUrl ? getImageUrl(content.heroBgUrl) : "/pmi-logo.png"} alt="Hero" className="w-full h-full object-cover object-center opacity-50" />
// // //             )}
// // //             <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/80 to-[#500000]/60 z-10 mix-blend-multiply"></div>
// // //         </div>

// // //         {/* CONTENT HERO FLEX */}
// // //         <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center gap-8 lg:gap-16">
            
// // //             {/* KIRI: Teks (Lebih Sempit 40%) */}
// // //             <div className="w-full md:w-5/12 space-y-4 text-center md:text-left py-2">
// // //                 <h1 className="text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-lg">
// // //                     {content?.heroTitle || "Selamat Datang di LMS"}
// // //                 </h1>
// // //                 <p className="text-red-50 text-sm md:text-base leading-relaxed font-light opacity-95 drop-shadow-md">
// // //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// // //                 </p>
// // //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// // //                     <Link href="/courses" className="bg-white text-[#990000] px-5 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg text-sm flex items-center gap-2">
// // //                         Mulai Belajar <ArrowRight size={16}/>
// // //                     </Link>
// // //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// // //                         <Link href="/admin/content" className="bg-black/30 text-white px-5 py-2.5 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 text-sm">
// // //                             Kelola
// // //                         </Link>
// // //                     )}
// // //                 </div>
// // //             </div>

// // //             {/* KANAN: WALL OF FAME (Lebih Lebar 60% & Pendek) */}
// // //             <div className="w-full md:w-7/12">
// // //                 <div className="bg-white/10 backdrop-blur-md border border-white/30 p-5 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
                    
// // //                     {/* Header WoF Compact */}
// // //                     <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
// // //                         <h2 className="text-lg font-bold text-white flex items-center gap-2 drop-shadow-md">
// // //                              <Award size={20} className="text-yellow-300 fill-yellow-300" /> Wall of Fame
// // //                         </h2>
// // //                         <span className="text-[10px] bg-yellow-400 text-[#990000] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
// // //                             {getTabLabel()} TOP 3
// // //                         </span>
// // //                     </div>

// // //                     {/* Tabs Navigation Compact */}
// // //                     <div className="flex p-1 bg-black/20 rounded-lg mb-3">
// // //                         {['learners', 'contributors', 'facilitators'].map((tab) => (
// // //                             <button 
// // //                                 key={tab}
// // //                                 onClick={() => setActiveTab(tab as any)}
// // //                                 className={`flex-1 py-1 text-[10px] font-bold rounded transition-all flex items-center justify-center gap-1 ${activeTab === tab ? 'bg-white text-[#990000] shadow-sm' : 'text-white/70 hover:text-white'}`}
// // //                             >
// // //                                 {tab === 'learners' && <><Users size={12}/> Peserta</>}
// // //                                 {tab === 'contributors' && <><PenTool size={12}/> Penulis</>}
// // //                                 {tab === 'facilitators' && <><Mic2 size={12}/> Fasilitator</>}
// // //                             </button>
// // //                         ))}
// // //                     </div>

// // //                     {/* List Content (Fixed Height, No Scroll if 3 items) */}
// // //                     <div className="space-y-2.5 min-h-[180px]"> 
// // //                         {activeList.length > 0 ? (
// // //                             activeList.map((member: any, idx: number) => (
// // //                                 <div key={idx} className="bg-white/95 p-2.5 rounded-lg shadow-sm flex items-center gap-3 hover:bg-white transition-colors cursor-default animate-in fade-in slide-in-from-right-4 duration-500" style={{animationDelay: `${idx*100}ms`}}>
                                    
// // //                                     {/* Ranking #1 #2 #3 */}
// // //                                     <div className={`w-6 h-6 rounded flex items-center justify-center font-black text-xs shadow-sm flex-shrink-0 ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : idx === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
// // //                                         #{idx + 1}
// // //                                     </div>
                                    
// // //                                     <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex-shrink-0">
// // //                                         <img src={member.avatar ? getImageUrl(member.avatar) : `https://ui-avatars.com/api/?name=${member.name}`} className="w-full h-full object-cover" alt={member.name}/>
// // //                                     </div>
                                    
// // //                                     <div className="flex-1 min-w-0">
// // //                                         <h3 className="font-bold text-gray-900 text-xs truncate">{member.name}</h3>
// // //                                         <p className="text-[10px] text-gray-500 truncate font-medium">{member.desc}</p>
// // //                                     </div>

// // //                                     <div className="text-green-500"><CheckCircle size={14} className="fill-green-100"/></div>
// // //                                 </div>
// // //                             ))
// // //                         ) : (
// // //                             <div className="text-center py-10 text-white/50 flex flex-col items-center justify-center">
// // //                                 <Star className="w-8 h-8 mx-auto mb-2 opacity-40"/>
// // //                                 <p className="text-xs">Belum ada data Top 3.</p>
// // //                             </div>
// // //                         )}
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //         </div>
// // //       </div>

// // //       {/* 2. INFO CARDS (COMPACT & CLICKABLE) */}
// // //       <div className="relative z-30 max-w-6xl mx-auto px-6 -mt-16 mb-16">
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
// // //           {features.map((feat: any, idx: number) => {
// // //              // Tentukan Icon berdasarkan index atau data
// // //              let Icon = BookOpen;
// // //              if(idx === 1) Icon = Users;
// // //              if(idx === 2) Icon = Calendar;

// // //              return (
// // //                 <Link 
// // //                     href={feat.link || '#'} 
// // //                     key={idx} 
// // //                     className="bg-white py-6 px-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group h-full justify-center"
// // //                 >
// // //                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// // //                         <Icon size={24}/>
// // //                     </div>
// // //                     <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-[#990000] transition-colors line-clamp-1">
// // //                       {feat.title || "Menu"}
// // //                     </h3>
// // //                     <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
// // //                       {feat.description || "Klik untuk melihat detail."}
// // //                     </p>
// // //                 </Link>
// // //              );
// // //           })}
// // //         </div>
// // //       </div>

// // //       {/* 3. CERITA RELAWAN */}
// // //       <div className="max-w-7xl mx-auto px-6 mb-24">
// // //           <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
// // //               <div className="flex items-center gap-3">
// // //                   <div className="bg-red-50 p-2 rounded-lg text-[#990000]"><FileText size={24}/></div>
// // //                   <div>
// // //                     <h2 className="text-xl font-bold text-gray-900">Cerita Relawan</h2>
// // //                     <p className="text-gray-500 text-xs mt-0.5">Kabar terbaru dari lapangan.</p>
// // //                   </div>
// // //               </div>
// // //               <Link href="/blog" className="text-xs font-bold text-[#990000] hover:underline flex items-center gap-1">
// // //                   Lihat Semua <ChevronRight size={14}/>
// // //               </Link>
// // //           </div>
          
// // //           {recentBlogs.length === 0 ? (
// // //               <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // //                   <PenTool className="text-gray-300 mx-auto mb-2" size={24} />
// // //                   <p className="text-gray-400 text-sm">Belum ada cerita dipublikasikan.</p>
// // //               </div>
// // //           ) : (
// // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //                   {recentBlogs.map((blog, idx) => (
// // //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col">
// // //                           <div className="h-40 bg-gray-200 relative overflow-hidden">
// // //                               {blog.coverUrl ? (
// // //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// // //                               ) : (
// // //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={32} opacity={0.2}/></div>
// // //                               )}
// // //                               <div className="absolute top-2 left-2 flex gap-1">
// // //                                   {blog.tags && blog.tags[0] && <span className="bg-white/90 text-gray-900 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase shadow-sm">{blog.tags[0]}</span>}
// // //                               </div>
// // //                           </div>
// // //                           <div className="p-4 flex-1 flex flex-col">
// // //                               <p className="text-[9px] font-bold text-[#990000] uppercase mb-1 flex items-center gap-1">
// // //                                   <Calendar size={9}/> {new Date(blog.createdAt).toLocaleDateString('id-ID')}
// // //                               </p>
// // //                               <h3 className="font-bold text-sm text-gray-900 mb-2 group-hover:text-[#990000] transition-colors line-clamp-2">
// // //                                   {blog.title}
// // //                               </h3>
// // //                               <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-50">
// // //                                   <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden">
// // //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'Admin'}`} className="w-full h-full object-cover" alt="Au"/>
// // //                                   </div>
// // //                                   <span className="text-[10px] font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// // //                               </div>
// // //                           </div>
// // //                       </Link>
// // //                   ))}
// // //               </div>
// // //           )}
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // 'use client';

// // import { useEffect, useState } from 'react';
// // import Link from 'next/link';
// // import { api, getImageUrl } from '@/lib/api';
// // import { useAuth } from '@/lib/AuthProvider';
// // import { 
// //     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
// //     Award, FileText, CheckCircle, PenTool, Mic2, Star
// // } from 'lucide-react';

// // export default function Dashboard() {
// //   const { user } = useAuth();
// //   const [content, setContent] = useState<any>(null);
  
// //   // State Data
// //   const [wofData, setWofData] = useState({ learners: [], contributors: [], facilitators: [] });
// //   const [activeTab, setActiveTab] = useState<'learners' | 'contributors' | 'facilitators'>('learners'); 

// //   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [currentSlide, setCurrentSlide] = useState(0); 

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         setLoading(true);
// //         const contentData = await api('/api/content').catch(() => null);
// //         setContent(contentData);

// //         api('/api/stats/visit', { method: 'POST' }).catch(console.error);

// //         // Load Blog (3 Item)
// //         try {
// //             const blogsRes = await api('/api/blog/public?limit=3');
// //             setRecentBlogs(Array.isArray(blogsRes.data) ? blogsRes.data : []);
// //         } catch(e) { console.log("Blog error", e); }

// //         // Load Wall of Fame
// //         try {
// //             const wofRes = await api('/api/stats/wall-of-fame');
// //             setWofData({
// //                 learners: wofRes.learners || [],
// //                 contributors: wofRes.contributors || [],
// //                 facilitators: wofRes.facilitators || []
// //             });
// //             // Auto switch tab jika default kosong
// //             if ((!wofRes.learners || wofRes.learners.length === 0) && wofRes.contributors?.length > 0) {
// //                 setActiveTab('contributors');
// //             }
// //         } catch(e) { console.log("WoF error", e); }

// //       } catch (err) { console.error(err); } finally { setLoading(false); }
// //     };
// //     loadData();
// //   }, []);

// //   useEffect(() => {
// //     if (content?.slides?.length > 1) {
// //       const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % content.slides.length), 5000);
// //       return () => clearInterval(timer);
// //     }
// //   }, [content]);

// //   // Fitur Info Cards
// //   const features = content?.features?.length ? content.features : [
// //       { title: 'Katalog Kelas', description: 'Akses modul pelatihan digital.', link: '/courses', icon: 'book' },
// //       { title: 'Panduan', description: 'Cara penggunaan sistem.', link: '/guide', icon: 'users' }, 
// //       { title: 'Pendaftaran', description: 'Jadwal kegiatan terbaru.', link: '/courses', icon: 'calendar' }
// //   ];

// //   const activeList: any[] = wofData[activeTab] || [];
  
// //   const getTabLabel = () => {
// //       if(activeTab === 'learners') return 'PESERTA';
// //       if(activeTab === 'contributors') return 'PENULIS';
// //       return 'FASILITATOR';
// //   }

// //   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

// //   return (
// //     <div className="bg-white min-h-screen flex flex-col font-sans">
      
// //       {/* 1. HERO SECTION */}
// //       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-32 pt-8 md:pt-12 transition-all duration-500">
        
// //         {/* Background Layer */}
// //         <div className="absolute inset-0 z-0 pointer-events-none">
// //             {content?.slides && content.slides.length > 0 ? (
// //                 content.slides.map((slide: string, index: number) => (
// //                     <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
// //                         <img src={getImageUrl(slide)} alt="Hero" className="w-full h-full object-cover object-center" />
// //                     </div>
// //                 ))
// //             ) : (
// //                 <img src={content?.heroBgUrl ? getImageUrl(content.heroBgUrl) : "/pmi-logo.png"} alt="Hero" className="w-full h-full object-cover object-center opacity-50" />
// //             )}
// //             <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/80 to-[#500000]/60 z-10 mix-blend-multiply"></div>
// //         </div>

// //         {/* CONTENT HERO FLEX */}
// //         {/* [UPDATE] Menggunakan max-w-[85rem] agar proporsional (Tengah-tengah antara lebar & sempit) */}
// //         <div className="max-w-[85rem] mx-auto px-8 relative z-20 flex flex-col md:flex-row items-center gap-8 lg:gap-16">
            
// //             {/* KIRI: Teks (1/2) */}
// //             <div className="w-full md:w-1/2 space-y-4 text-center md:text-left py-2">
// //                 <h1 className="text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-lg">
// //                     {content?.heroTitle || "Selamat Datang di LMS"}
// //                 </h1>
// //                 <p className="text-red-50 text-sm md:text-base leading-relaxed font-light opacity-95 drop-shadow-md">
// //                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
// //                 </p>
// //                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
// //                     <Link href="/courses" className="bg-white text-[#990000] px-5 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg text-sm flex items-center gap-2">
// //                         Mulai Belajar <ArrowRight size={16}/>
// //                     </Link>
// //                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
// //                         <Link href="/admin/content" className="bg-black/30 text-white px-5 py-2.5 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 text-sm">
// //                             Kelola
// //                         </Link>
// //                     )}
// //                 </div>
// //             </div>

// //             {/* KANAN: WALL OF FAME (1/2) */}
// //             <div className="w-full md:w-1/2">
// //                 <div className="bg-white/10 backdrop-blur-md border border-white/30 p-5 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
                    
// //                     <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
// //                         <h2 className="text-lg font-bold text-white flex items-center gap-2 drop-shadow-md">
// //                              <Award size={20} className="text-yellow-300 fill-yellow-300" /> Wall of Fame
// //                         </h2>
// //                         <span className="text-[10px] bg-yellow-400 text-[#990000] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
// //                             {getTabLabel()} TOP 3
// //                         </span>
// //                     </div>

// //                     <div className="flex p-1 bg-black/20 rounded-lg mb-3">
// //                         {['learners', 'contributors', 'facilitators'].map((tab) => (
// //                             <button 
// //                                 key={tab}
// //                                 onClick={() => setActiveTab(tab as any)}
// //                                 className={`flex-1 py-1 text-[10px] font-bold rounded transition-all flex items-center justify-center gap-1 ${activeTab === tab ? 'bg-white text-[#990000] shadow-sm' : 'text-white/70 hover:text-white'}`}
// //                             >
// //                                 {tab === 'learners' && <><Users size={12}/> Peserta</>}
// //                                 {tab === 'contributors' && <><PenTool size={12}/> Penulis</>}
// //                                 {tab === 'facilitators' && <><Mic2 size={12}/> Fasilitator</>}
// //                             </button>
// //                         ))}
// //                     </div>

// //                     <div className="space-y-2.5 min-h-[170px]"> 
// //                         {activeList.length > 0 ? (
// //                             activeList.map((member: any, idx: number) => (
// //                                 <div key={idx} className="bg-white/95 p-2.5 rounded-lg shadow-sm flex items-center gap-3 hover:bg-white transition-colors cursor-default animate-in fade-in slide-in-from-right-4 duration-500">
// //                                     <div className={`w-6 h-6 rounded flex items-center justify-center font-black text-xs shadow-sm flex-shrink-0 ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : idx === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
// //                                         #{idx + 1}
// //                                     </div>
// //                                     <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex-shrink-0">
// //                                         <img src={member.avatar ? getImageUrl(member.avatar) : `https://ui-avatars.com/api/?name=${member.name}`} className="w-full h-full object-cover" alt={member.name}/>
// //                                     </div>
// //                                     <div className="flex-1 min-w-0">
// //                                         <h3 className="font-bold text-gray-900 text-xs truncate">{member.name}</h3>
// //                                         <p className="text-[10px] text-gray-500 truncate font-medium">{member.desc}</p>
// //                                     </div>
// //                                     <div className="text-green-500"><CheckCircle size={14} className="fill-green-100"/></div>
// //                                 </div>
// //                             ))
// //                         ) : (
// //                             <div className="text-center py-10 text-white/50 flex flex-col items-center justify-center">
// //                                 <Star className="w-8 h-8 mx-auto mb-2 opacity-40"/>
// //                                 <p className="text-xs">Belum ada data Top 3.</p>
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>

// //         </div>
// //       </div>

// //       {/* 2. INFO CARDS */}
// //       {/* [UPDATE] max-w-[85rem] -> Lebih kecil sedikit dari sebelumnya, tapi tetap lebar */}
// //       <div className="relative z-30 max-w-[75rem] mx-auto px-8 -mt-24 mb-16">
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
// //           {features.map((feat: any, idx: number) => {
// //              let Icon = BookOpen;
// //              if(idx === 1) Icon = Users;
// //              if(idx === 2) Icon = Calendar;

// //              return (
// //                 <Link 
// //                     href={feat.link || '#'} 
// //                     key={idx} 
// //                     className="bg-white py-8 px-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group h-full justify-center w-full"
// //                 >
// //                     <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
// //                         <Icon size={28}/>
// //                     </div>
// //                     <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#990000] transition-colors line-clamp-1">
// //                       {feat.title || "Menu"}
// //                     </h3>
// //                     <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
// //                       {feat.description || "Klik untuk melihat detail."}
// //                     </p>
// //                 </Link>
// //              );
// //           })}
// //         </div>
// //       </div>

// //       {/* 3. CERITA RELAWAN */}
// //       {/* [UPDATE] max-w-[85rem] -> Menyamakan dengan atas agar lurus */}
// //       <div className="max-w-[75rem] mx-auto px-8 mb-24">
// //           <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
// //               <div className="flex items-center gap-3">
// //                   <div className="bg-red-50 p-2 rounded-lg text-[#990000]"><FileText size={24}/></div>
// //                   <div>
// //                     <h2 className="text-xl font-bold text-gray-900">Cerita Relawan</h2>
// //                     <p className="text-gray-500 text-xs mt-0.5">Kabar terbaru dari lapangan.</p>
// //                   </div>
// //               </div>
// //               <Link href="/blog" className="text-xs font-bold text-[#990000] hover:underline flex items-center gap-1">
// //                   Lihat Semua <ChevronRight size={14}/>
// //               </Link>
// //           </div>
          
// //           {recentBlogs.length === 0 ? (
// //               <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// //                   <PenTool className="text-gray-300 mx-auto mb-2" size={24} />
// //                   <p className="text-gray-400 text-sm">Belum ada cerita dipublikasikan.</p>
// //               </div>
// //           ) : (
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
// //                   {recentBlogs.map((blog, idx) => (
// //                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col w-full">
// //                           <div className="h-48 bg-gray-200 relative overflow-hidden">
// //                               {blog.coverUrl ? (
// //                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
// //                               ) : (
// //                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={32} opacity={0.2}/></div>
// //                               )}
// //                               <div className="absolute top-3 left-3 flex gap-1">
// //                                   {blog.tags && blog.tags[0] && <span className="bg-white/90 text-gray-900 text-[10px] px-2 py-1 rounded-full font-bold uppercase shadow-sm">{blog.tags[0]}</span>}
// //                               </div>
// //                           </div>
// //                           <div className="p-5 flex-1 flex flex-col">
// //                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1">
// //                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID')}
// //                               </p>
// //                               <h3 className="font-bold text-base text-gray-900 mb-3 group-hover:text-[#990000] transition-colors line-clamp-2">
// //                                   {blog.title}
// //                               </h3>
// //                               <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
// //                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden">
// //                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'Admin'}`} className="w-full h-full object-cover" alt="Au"/>
// //                                   </div>
// //                                   <span className="text-[11px] font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
// //                               </div>
// //                           </div>
// //                       </Link>
// //                   ))}
// //               </div>
// //           )}
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { api, getImageUrl } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import { 
//     ChevronRight, Users, BookOpen, Calendar, ArrowRight, 
//     Award, FileText, CheckCircle, PenTool, Mic2, Star
// } from 'lucide-react';

// export default function Dashboard() {
//   const { user } = useAuth();
//   const [content, setContent] = useState<any>(null);
  
//   // State Data
//   const [wofData, setWofData] = useState({ learners: [], contributors: [], facilitators: [] });
//   const [activeTab, setActiveTab] = useState<'learners' | 'contributors' | 'facilitators'>('learners'); 

//   const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentSlide, setCurrentSlide] = useState(0); 

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         const contentData = await api('/api/content').catch(() => null);
//         setContent(contentData);

//         api('/api/stats/visit', { method: 'POST' }).catch(console.error);

//         // Load Blog (3 Item)
//         try {
//             const blogsRes = await api('/api/blog/public?limit=3');
//             setRecentBlogs(Array.isArray(blogsRes.data) ? blogsRes.data : []);
//         } catch(e) { console.log("Blog error", e); }

//         // Load Wall of Fame
//         try {
//             const wofRes = await api('/api/stats/wall-of-fame');
//             setWofData({
//                 learners: wofRes.learners || [],
//                 contributors: wofRes.contributors || [],
//                 facilitators: wofRes.facilitators || []
//             });
//             // Auto switch tab jika default kosong
//             if ((!wofRes.learners || wofRes.learners.length === 0) && wofRes.contributors?.length > 0) {
//                 setActiveTab('contributors');
//             }
//         } catch(e) { console.log("WoF error", e); }

//       } catch (err) { console.error(err); } finally { setLoading(false); }
//     };
//     loadData();
//   }, []);

//   useEffect(() => {
//     if (content?.slides?.length > 1) {
//       const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % content.slides.length), 5000);
//       return () => clearInterval(timer);
//     }
//   }, [content]);

//   // Fitur Info Cards
//   const features = content?.features?.length ? content.features : [
//       { title: 'Katalog Kelas', description: 'Akses modul pelatihan digital.', link: '/courses', icon: 'book' },
//       { title: 'Panduan', description: 'Cara penggunaan sistem.', link: '/guide', icon: 'users' }, 
//       { title: 'Pendaftaran', description: 'Jadwal kegiatan terbaru.', link: '/courses', icon: 'calendar' }
//   ];

//   const activeList: any[] = wofData[activeTab] || [];
  
//   const getTabLabel = () => {
//       if(activeTab === 'learners') return 'PESERTA';
//       if(activeTab === 'contributors') return 'PENULIS';
//       return 'FASILITATOR';
//   }

//   if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div></div>;

//   return (
//     <div className="bg-white min-h-screen flex flex-col font-sans">
      
//       {/* 1. HERO SECTION */}
//       <div className="relative bg-[#990000] text-white overflow-hidden shadow-2xl pb-32 pt-8 md:pt-12 transition-all duration-500">
        
//         {/* Background Layer */}
//         <div className="absolute inset-0 z-0 pointer-events-none">
//             {content?.slides && content.slides.length > 0 ? (
//                 content.slides.map((slide: string, index: number) => (
//                     <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
//                         <img src={getImageUrl(slide)} alt="Hero" className="w-full h-full object-cover object-center" />
//                     </div>
//                 ))
//             ) : (
//                 <img src={content?.heroBgUrl ? getImageUrl(content.heroBgUrl) : "/pmi-logo.png"} alt="Hero" className="w-full h-full object-cover object-center opacity-50" />
//             )}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/80 to-[#500000]/60 z-10 mix-blend-multiply"></div>
//         </div>

//         {/* CONTENT HERO FLEX */}
//         {/* [UPDATE] Menggunakan max-w-[75rem] sesuai permintaan */}
//         <div className="max-w-[75rem] mx-auto px-8 relative z-20 flex flex-col md:flex-row items-center gap-8 lg:gap-16">
            
//             {/* KIRI: Teks (1/2) */}
//             <div className="w-full md:w-1/2 space-y-4 text-center md:text-left py-2">
//                 <h1 className="text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-lg">
//                     {content?.heroTitle || "Selamat Datang di LMS"}
//                 </h1>
//                 <p className="text-red-50 text-sm md:text-base leading-relaxed font-light opacity-95 drop-shadow-md">
//                     {content?.heroDescription || "Platform pembelajaran digital terbaik untuk pengembangan kompetensi dan kepalangmerahan."}
//                 </p>
//                 <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
//                     <Link href="/courses" className="bg-white text-[#990000] px-5 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg text-sm flex items-center gap-2">
//                         Mulai Belajar <ArrowRight size={16}/>
//                     </Link>
//                     {user && (user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR') && (
//                         <Link href="/admin/content" className="bg-black/30 text-white px-5 py-2.5 rounded-full font-bold hover:bg-black/40 transition-all border border-white/30 text-sm">
//                             Kelola
//                         </Link>
//                     )}
//                 </div>
//             </div>

//             {/* KANAN: WALL OF FAME (1/2) */}
//             <div className="w-full md:w-1/2">
//                 <div className="bg-white/10 backdrop-blur-md border border-white/30 p-5 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
                    
//                     <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
//                         <h2 className="text-lg font-bold text-white flex items-center gap-2 drop-shadow-md">
//                              <Award size={20} className="text-yellow-300 fill-yellow-300" /> Wall of Fame
//                         </h2>
//                         <span className="text-[10px] bg-yellow-400 text-[#990000] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
//                             {getTabLabel()} TOP 3
//                         </span>
//                     </div>

//                     <div className="flex p-1 bg-black/20 rounded-lg mb-3">
//                         {['learners', 'contributors', 'facilitators'].map((tab) => (
//                             <button 
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab as any)}
//                                 className={`flex-1 py-1 text-[10px] font-bold rounded transition-all flex items-center justify-center gap-1 ${activeTab === tab ? 'bg-white text-[#990000] shadow-sm' : 'text-white/70 hover:text-white'}`}
//                             >
//                                 {tab === 'learners' && <><Users size={12}/> Peserta</>}
//                                 {tab === 'contributors' && <><PenTool size={12}/> Penulis</>}
//                                 {tab === 'facilitators' && <><Mic2 size={12}/> Fasilitator</>}
//                             </button>
//                         ))}
//                     </div>

//                     <div className="space-y-2.5 min-h-[170px]"> 
//                         {activeList.length > 0 ? (
//                             activeList.map((member: any, idx: number) => (
//                                 <div key={idx} className="bg-white/95 p-2.5 rounded-lg shadow-sm flex items-center gap-3 hover:bg-white transition-colors cursor-default animate-in fade-in slide-in-from-right-4 duration-500">
//                                     <div className={`w-6 h-6 rounded flex items-center justify-center font-black text-xs shadow-sm flex-shrink-0 ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : idx === 1 ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
//                                         #{idx + 1}
//                                     </div>
//                                     <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100 flex-shrink-0">
//                                         <img src={member.avatar ? getImageUrl(member.avatar) : `https://ui-avatars.com/api/?name=${member.name}`} className="w-full h-full object-cover" alt={member.name}/>
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <h3 className="font-bold text-gray-900 text-xs truncate">{member.name}</h3>
//                                         <p className="text-[10px] text-gray-500 truncate font-medium">{member.desc}</p>
//                                     </div>
//                                     <div className="text-green-500"><CheckCircle size={14} className="fill-green-100"/></div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="text-center py-10 text-white/50 flex flex-col items-center justify-center">
//                                 <Star className="w-8 h-8 mx-auto mb-2 opacity-40"/>
//                                 <p className="text-xs">Belum ada data Top 3.</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//         </div>
//       </div>

//       {/* 2. INFO CARDS */}
//       {/* [UPDATE] Menggunakan max-w-[75rem] sesuai permintaan */}
//       <div className="relative z-30 max-w-[75rem] mx-auto px-8 -mt-24 mb-16">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
//           {features.map((feat: any, idx: number) => {
//              let Icon = BookOpen;
//              if(idx === 1) Icon = Users;
//              if(idx === 2) Icon = Calendar;

//              return (
//                 <Link 
//                     href={feat.link || '#'} 
//                     key={idx} 
//                     className="bg-white py-8 px-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group h-full justify-center w-full"
//                 >
//                     <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
//                         <Icon size={28}/>
//                     </div>
//                     <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#990000] transition-colors line-clamp-1">
//                       {feat.title || "Menu"}
//                     </h3>
//                     <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
//                       {feat.description || "Klik untuk melihat detail."}
//                     </p>
//                 </Link>
//              );
//           })}
//         </div>
//       </div>

//       {/* 3. CERITA RELAWAN */}
//       {/* [UPDATE] Menggunakan max-w-[75rem] sesuai permintaan */}
//       <div className="max-w-[75rem] mx-auto px-8 mb-24">
//           <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
//               <div className="flex items-center gap-3">
//                   <div className="bg-red-50 p-2 rounded-lg text-[#990000]"><FileText size={24}/></div>
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-900">Cerita Relawan</h2>
//                     <p className="text-gray-500 text-xs mt-0.5">Kabar terbaru dari lapangan.</p>
//                   </div>
//               </div>
//               <Link href="/blog" className="text-xs font-bold text-[#990000] hover:underline flex items-center gap-1">
//                   Lihat Semua <ChevronRight size={14}/>
//               </Link>
//           </div>
          
//           {recentBlogs.length === 0 ? (
//               <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
//                   <PenTool className="text-gray-300 mx-auto mb-2" size={24} />
//                   <p className="text-gray-400 text-sm">Belum ada cerita dipublikasikan.</p>
//               </div>
//           ) : (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
//                   {recentBlogs.map((blog, idx) => (
//                       <Link href={`/blog/${blog._id}`} key={idx} className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col w-full">
//                           <div className="h-48 bg-gray-200 relative overflow-hidden">
//                               {blog.coverUrl ? (
//                                   <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={blog.title}/>
//                               ) : (
//                                   <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100"><BookOpen size={32} opacity={0.2}/></div>
//                               )}
//                               <div className="absolute top-3 left-3 flex gap-1">
//                                   {blog.tags && blog.tags[0] && <span className="bg-white/90 text-gray-900 text-[10px] px-2 py-1 rounded-full font-bold uppercase shadow-sm">{blog.tags[0]}</span>}
//                               </div>
//                           </div>
//                           <div className="p-5 flex-1 flex flex-col">
//                               <p className="text-[10px] font-bold text-[#990000] uppercase mb-2 flex items-center gap-1">
//                                   <Calendar size={10}/> {new Date(blog.createdAt).toLocaleDateString('id-ID')}
//                               </p>
//                               <h3 className="font-bold text-base text-gray-900 mb-3 group-hover:text-[#990000] transition-colors line-clamp-2">
//                                   {blog.title}
//                               </h3>
//                               <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
//                                   <div className="w-7 h-7 rounded-full bg-gray-100 overflow-hidden">
//                                       <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'Admin'}`} className="w-full h-full object-cover" alt="Au"/>
//                                   </div>
//                                   <span className="text-[11px] font-bold text-gray-600 truncate">{blog.author?.name || 'Admin'}</span>
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
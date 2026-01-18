// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { api, getImageUrl } from '@/lib/api';
// // import Link from 'next/link';
// // import { 
// //     Search, Filter, BookOpen, Clock, Users, ChevronRight, 
// //     FileText, CheckCircle, AlertCircle, Loader2 
// // } from 'lucide-react';

// // export default function CoursesPage() {
// //     const [courses, setCourses] = useState<any[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [selectedCategory, setSelectedCategory] = useState('All');
// //     const [categories, setCategories] = useState<string[]>(['All']);

// //     // --- STATE UNTUK SLIDESHOW HEADER ---
// //     const [content, setContent] = useState<any>(null);
// //     const [currentSlide, setCurrentSlide] = useState(0);

// //     // Default Images
// //     const defaultHeroImages = [
// //         "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=1920",
// //         "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1920",
// //         "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1920"
// //     ];

// //     // Fetch Data
// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 setLoading(true);
// //                 const [contentData, coursesRes] = await Promise.all([
// //                     api('/api/content').catch(() => null),
// //                     api('/api/courses/published')
// //                 ]);

// //                 setContent(contentData);
// //                 setCourses(coursesRes.courses || []);

// //                 if (contentData?.courseCategories?.length > 0) {
// //                     setCategories(['All', ...contentData.courseCategories]);
// //                 } else {
// //                     setCategories(['All', 'Health', 'Safety', 'General', 'Disaster']);
// //                 }
// //             } catch (e) {
// //                 console.error(e);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         fetchData();
// //     }, []);

// //     // Timer Slide
// //     const activeTitle = content?.coursesPage?.title || "Katalog Pelatihan & Kursus";
// //     const activeDesc = content?.coursesPage?.description || "Tingkatkan kompetensi Anda dengan materi berkualitas dari PMI.";
    
// //     const activeSlides = (content?.coursesPage?.slides && content.coursesPage.slides.length > 0) 
// //         ? content.coursesPage.slides 
// //         : defaultHeroImages;

// //     useEffect(() => {
// //         if (activeSlides.length > 1) {
// //             const interval = setInterval(() => {
// //                 setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
// //             }, 5000);
// //             return () => clearInterval(interval);
// //         }
// //     }, [activeSlides]);

// //     // Helper Functions
// //     const getTotalJP = (modules: any[]) => {
// //         if (!modules) return 0;
// //         let total = 0;
// //         modules.forEach(m => {
// //             if (m.isActive) {
// //                 m.lessons?.forEach((l: any) => {
// //                     if (l.isActive) total += (l.jp || 0);
// //                 });
// //             }
// //         });
// //         return total;
// //     };

// //     const filteredCourses = courses.filter(c => {
// //         const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
// //         const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
// //         return matchSearch && matchCat;
// //     });

// //     if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="flex flex-col items-center gap-2"><Loader2 className="animate-spin text-red-600" size={40}/><span className="text-gray-500 font-medium">Memuat katalog...</span></div></div>;

// //     return (
// //         <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            
// //             {/* --- HERO HEADER (SANGAT COMPACT & CARD MASUK) --- */}
// //             {/* 1. min-h dikurangi jadi 280px/320px. 
// //                 2. pb-32 memberikan ruang kosong di bawah untuk card 'masuk'. */}
// //             <div className="relative text-white px-6 overflow-hidden shadow-xl bg-[#990000] flex items-center justify-center min-h-[280px] md:min-h-[320px] pt-16 pb-32">
                
// //                 {/* Background Slideshow */}
// //                 <div className="absolute inset-0 z-0 pointer-events-none">
// //                     {activeSlides.map((slide: string, index: number) => (
// //                         <div 
// //                             key={index} 
// //                             className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
// //                         >
// //                             <img 
// //                                 src={getImageUrl(slide)} 
// //                                 alt={`Hero Slide ${index}`} 
// //                                 className="w-full h-full object-cover object-center" 
// //                             />
// //                         </div>
// //                     ))}
// //                     <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/95 via-[#990000]/85 to-[#7a0000]/70 z-10 mix-blend-multiply"></div>
// //                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
// //                 </div>

// //                 {/* Content Layer */}
// //                 <div className="relative z-20 max-w-6xl mx-auto text-center -mt-4">
// //                     <h1 className="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-md tracking-tight leading-tight">{activeTitle}</h1>
// //                     <p className="text-red-100 max-w-3xl mx-auto drop-shadow-sm font-medium text-sm md:text-base leading-relaxed opacity-95">
// //                         {activeDesc}
// //                     </p>
// //                 </div>
// //             </div>

// //             {/* --- FILTER BAR (FULL MASUK KE DALAM HERO) --- */}
// //             {/* 1. -mt-24 menarik card sangat tinggi sehingga tumpang tindih dengan area Hero merah. */}
// //             <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-30">
// //                 <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center animate-in slide-in-from-bottom-4 fade-in duration-500">
// //                     <div className="relative flex-1 w-full">
// //                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
// //                         <input 
// //                             className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-gray-400 text-sm bg-gray-50 focus:bg-white" 
// //                             placeholder="Cari judul pelatihan..." 
// //                             value={searchTerm}
// //                             onChange={(e) => setSearchTerm(e.target.value)}
// //                         />
// //                     </div>
// //                     <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
// //                         <Filter size={20} className="text-gray-500 shrink-0 ml-1"/>
// //                         {categories.map(cat => (
// //                             <button 
// //                                 key={cat} 
// //                                 onClick={() => setSelectedCategory(cat)}
// //                                 className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${selectedCategory === cat ? 'bg-red-600 text-white shadow-red-200 ring-2 ring-red-100 transform scale-105' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
// //                             >
// //                                 {cat}
// //                             </button>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* --- COURSE GRID --- */}
// //             {/* pt-8 dikurangi agar jarak antara card search dan grid katalog lebih rapat */}
// //             <div className="max-w-6xl mx-auto px-6 pt-8 pb-20">
// //                 {filteredCourses.length === 0 ? (
// //                     <div className="text-center py-20 text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-sm">
// //                         <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
// //                             <Search size={36} className="text-gray-300"/>
// //                         </div>
// //                         <p className="text-xl font-bold text-gray-600">Tidak ada pelatihan ditemukan.</p>
// //                         <p className="text-sm mt-1 text-gray-400">Coba kata kunci atau kategori lain.</p>
// //                         {searchTerm && (
// //                             <button onClick={() => setSearchTerm('')} className="mt-6 text-red-600 font-bold hover:underline text-sm bg-red-50 px-4 py-2 rounded-lg">Reset Pencarian</button>
// //                         )}
// //                     </div>
// //                 ) : (
// //                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                         {filteredCourses.map((course) => {
// //                             const totalJP = getTotalJP(course.modules);
// //                             const moduleCount = course.modules?.length || 0;
// //                             const isAuto = course.registrationMode === 'automatic';

// //                             return (
// //                                 <div key={course._id} className="bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
// //                                     {/* Image */}
// //                                     <div className="relative h-48 bg-gray-200 overflow-hidden">
// //                                         {course.thumbnailUrl ? (
// //                                             <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={course.title} />
// //                                         ) : (
// //                                             <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 flex-col gap-2">
// //                                                 <div className="opacity-20"><BookOpen size={40}/></div>
// //                                                 <span className="text-xs font-bold opacity-40 uppercase">No Image</span>
// //                                             </div>
// //                                         )}
// //                                         <div className="absolute top-3 left-3 flex gap-2">
// //                                             <span className="bg-white/95 backdrop-blur-md text-gray-800 text-[10px] font-extrabold px-3 py-1 rounded-md uppercase shadow-sm border border-gray-200/50 tracking-wider">
// //                                                 {course.category}
// //                                             </span>
// //                                         </div>
// //                                         <div className="absolute top-3 right-3">
// //                                             <span className={`text-[10px] font-extrabold px-3 py-1 rounded-md uppercase shadow-sm border text-white tracking-wider ${course.programType === 'training' ? 'bg-red-600 border-red-700' : 'bg-blue-600 border-blue-700'}`}>
// //                                                 {course.programType === 'training' ? 'DIKLAT' : 'KURSUS'}
// //                                             </span>
// //                                         </div>
// //                                     </div>

// //                                     {/* Content */}
// //                                     <div className="p-6 flex-1 flex flex-col">
// //                                         <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-red-700 transition-colors">
// //                                             {course.title}
// //                                         </h3>
                                        
// //                                         <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-gray-500 mb-4 mt-1">
// //                                             <div className="flex items-center gap-1.5">
// //                                                 <Users size={14} className="text-gray-400"/> <span className="font-medium">{course.facilitatorIds?.length || 0} Fasilitator</span>
// //                                             </div>
// //                                             <div className="flex items-center gap-1.5">
// //                                                 <BookOpen size={14} className="text-gray-400"/> <span className="font-medium">{moduleCount} Modul</span>
// //                                             </div>
// //                                         </div>

// //                                         {/* INFO DETAIL: JP & PENDAFTARAN */}
// //                                         <div className="grid grid-cols-2 gap-3 mb-6">
// //                                             <div className="bg-gray-50 rounded-lg p-2.5 text-center border border-gray-100 group-hover:border-gray-200 transition-colors">
// //                                                 <p className="text-[10px] text-gray-500 uppercase font-bold mb-0.5 flex items-center justify-center gap-1">
// //                                                     <Clock size={10}/> Total JP
// //                                                 </p>
// //                                                 <p className="text-sm font-black text-gray-800">{totalJP} JP</p>
// //                                             </div>
// //                                             <div className={`rounded-lg p-2.5 text-center border transition-colors ${isAuto ? 'bg-green-50 border-green-100 group-hover:border-green-200' : 'bg-orange-50 border-orange-100 group-hover:border-orange-200'}`}>
// //                                                 <p className={`text-[10px] uppercase font-bold mb-0.5 flex items-center justify-center gap-1 ${isAuto ? 'text-green-600' : 'text-orange-600'}`}>
// //                                                     {isAuto ? <CheckCircle size={10}/> : <AlertCircle size={10}/>} Pendaftaran
// //                                                 </p>
// //                                                 <p className={`text-xs font-bold ${isAuto ? 'text-green-700' : 'text-orange-700'}`}>
// //                                                     {isAuto ? 'Langsung Aktif' : 'Dengan Syarat'}
// //                                                 </p>
// //                                             </div>
// //                                         </div>

// //                                         <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
// //                                             <div>
// //                                                 <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Investasi</p>
// //                                                 <p className={`font-black text-lg ${course.price === 0 ? 'text-green-600' : 'text-gray-900'}`}>
// //                                                     {course.price === 0 ? 'GRATIS' : `Rp ${course.price.toLocaleString('id-ID')}`}
// //                                                 </p>
// //                                             </div>
// //                                             <Link href={`/courses/${course._id}`} className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-all shadow-md group-hover:shadow-lg hover:scale-105 active:scale-95">
// //                                                 Detail <ChevronRight size={16}/>
// //                                             </Link>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             );
// //                         })}
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }



// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { api, getImageUrl } from '@/lib/api';
// import { 
//     Search, GraduationCap, Clock, BookOpen, Star, 
//     Filter, ChevronRight, PlayCircle, Users, CheckCircle, AlertCircle, Loader2 
// } from 'lucide-react';

// export default function CoursesPage() {
//     const [courses, setCourses] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [categories, setCategories] = useState<string[]>(['All']);

//     // --- STATE SLIDESHOW ---
//     const [content, setContent] = useState<any>(null);
//     const [currentSlide, setCurrentSlide] = useState(0);

//     const defaultHeroImages = [
//         "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=1920",
//         "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1920",
//         "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1920"
//     ];

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const [contentData, coursesRes] = await Promise.all([
//                     api('/api/content').catch(() => null),
//                     api('/api/courses/published')
//                 ]);

//                 setContent(contentData);
//                 setCourses(coursesRes.courses || []);

//                 if (contentData?.courseCategories?.length > 0) {
//                     setCategories(['All', ...contentData.courseCategories]);
//                 } else {
//                     setCategories(['All', 'Health', 'Safety', 'General', 'Disaster']);
//                 }
//             } catch (e) {
//                 console.error(e);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     const activeTitle = content?.coursesPage?.title || "Katalog Pelatihan & Kursus";
//     const activeDesc = content?.coursesPage?.description || "Tingkatkan kompetensi Anda dengan materi berkualitas dari PMI.";
//     const activeSlides = (content?.coursesPage?.slides && content.coursesPage.slides.length > 0) 
//         ? content.coursesPage.slides 
//         : defaultHeroImages;

//     useEffect(() => {
//         if (activeSlides.length > 1) {
//             const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % activeSlides.length), 5000);
//             return () => clearInterval(interval);
//         }
//     }, [activeSlides]);

//     const getTotalJP = (modules: any[]) => {
//         if (!modules) return 0;
//         let total = 0;
//         modules.forEach(m => {
//             if (m.isActive) m.lessons?.forEach((l: any) => { if (l.isActive) total += (l.jp || 0); });
//         });
//         return total;
//     };

//     const filteredCourses = courses.filter(c => {
//         const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
//         return matchSearch && matchCat;
//     });

//     if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="flex flex-col items-center gap-2"><Loader2 className="animate-spin text-red-600" size={40}/><span className="text-gray-500 font-medium">Memuat katalog...</span></div></div>;

//     return (
//         <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            
//             {/* --- HERO SECTION --- */}
//             {/* pb-40: Padding bawah besar agar konten hero (teks) tidak tertutup saat filter naik */}
//             <div className="relative h-[400px] md:h-[450px] flex items-center justify-center text-center text-white px-4 overflow-hidden pb-40">
                
//                 {/* Background Slides */}
//                 <div className="absolute inset-0 z-0 bg-gray-900">
//                     {activeSlides.map((slide: string, index: number) => (
//                         <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
//                             <img src={getImageUrl(slide)} alt="Hero" className="w-full h-full object-cover opacity-60" />
//                         </div>
//                     ))}
//                     <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 via-red-900/60 to-gray-50"></div>
//                 </div>

//                 {/* Hero Content */}
//                 <div className="relative z-10 max-w-4xl mx-auto -mt-10">
//                     <div className="inline-flex items-center justify-center p-2.5 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20 shadow-lg">
//                         <GraduationCap size={24} className="text-red-100"/>
//                     </div>
//                     {/* Judul Dikecilkan Sedikit */}
//                     <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-lg tracking-tight">
//                         {activeTitle}
//                     </h1>
//                     <p className="text-red-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
//                         {activeDesc}
//                     </p>
//                 </div>
//             </div>

//             {/* --- FILTER & SEARCH BAR (NAIK TINGGI & LEBIH TIPIS) --- */}
//             {/* -mt-40: Naik drastis menindih hero */}
//             <div className="max-w-7xl mx-auto px-6 -mt-40 relative z-20">
//                 {/* p-3: Padding kotak putih dikecilkan agar lebih tipis */}
//                 <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-3 mb-8 flex flex-col md:flex-row items-center gap-3">
                    
//                     {/* Search Bar (Lebih Compact) */}
//                     <div className="relative w-full md:w-1/3 shrink-0">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
//                         <input 
//                             type="text" 
//                             className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-gray-400 text-sm bg-gray-50 focus:bg-white" 
//                             placeholder="Cari pelatihan..." 
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>

//                     {/* Filter Kategori (Lebih Compact) */}
//                     <div className="flex items-center gap-2 overflow-x-auto w-full md:w-2/3 pb-1 md:pb-0 no-scrollbar">
//                         <Filter size={18} className="text-gray-400 shrink-0 ml-1"/>
//                         {categories.map((cat) => (
//                             <button 
//                                 key={cat}
//                                 onClick={() => setSelectedCategory(cat)}
//                                 className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm border ${
//                                     selectedCategory === cat 
//                                     ? 'bg-red-600 text-white border-red-600 shadow-red-200' 
//                                     : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
//                                 }`}
//                             >
//                                 {cat}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* --- COURSE GRID (POSISI NAIK MENGIKUTI FILTER) --- */}
//                 {filteredCourses.length === 0 ? (
//                     <div className="text-center py-20 text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-sm">
//                         <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
//                             <Search size={36} className="text-gray-300"/>
//                         </div>
//                         <p className="text-xl font-bold text-gray-600">Tidak ada pelatihan ditemukan.</p>
//                         <p className="text-sm mt-1 text-gray-400">Coba kata kunci atau kategori lain.</p>
//                         {searchTerm && (
//                             <button onClick={() => setSearchTerm('')} className="mt-6 text-red-600 font-bold hover:underline text-sm bg-red-50 px-4 py-2 rounded-lg">Reset Pencarian</button>
//                         )}
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {filteredCourses.map((course) => {
//                             const totalJP = getTotalJP(course.modules);
//                             const moduleCount = course.modules?.length || 0;
//                             const isAuto = course.registrationMode === 'automatic';

//                             return (
//                                 <div key={course._id} className="bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
//                                     <div className="relative h-48 bg-gray-200 overflow-hidden shrink-0">
//                                         {course.thumbnailUrl ? (
//                                             <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={course.title} />
//                                         ) : (
//                                             <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 flex-col gap-2">
//                                                 <div className="opacity-20"><BookOpen size={40}/></div>
//                                                 <span className="text-xs font-bold opacity-40 uppercase">No Image</span>
//                                             </div>
//                                         )}
//                                         <div className="absolute top-3 left-3 flex gap-2">
//                                             <span className="bg-white/95 backdrop-blur-md text-gray-800 text-[10px] font-extrabold px-3 py-1 rounded-md uppercase shadow-sm border border-gray-200/50 tracking-wider">
//                                                 {course.category}
//                                             </span>
//                                         </div>
//                                         <div className="absolute top-3 right-3">
//                                             <span className={`text-[10px] font-extrabold px-3 py-1 rounded-md uppercase shadow-sm border text-white tracking-wider ${course.programType === 'training' ? 'bg-red-600 border-red-700' : 'bg-blue-600 border-blue-700'}`}>
//                                                 {course.programType === 'training' ? 'DIKLAT' : 'KURSUS'}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     <div className="p-6 flex-1 flex flex-col">
//                                         <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-red-700 transition-colors">
//                                             {course.title}
//                                         </h3>
                                        
//                                         <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-gray-500 mb-4 mt-1">
//                                             <div className="flex items-center gap-1.5">
//                                                 <Users size={14} className="text-gray-400"/> <span className="font-medium">{course.facilitatorIds?.length || 0} Fasilitator</span>
//                                             </div>
//                                             <div className="flex items-center gap-1.5">
//                                                 <BookOpen size={14} className="text-gray-400"/> <span className="font-medium">{moduleCount} Modul</span>
//                                             </div>
//                                         </div>

//                                         <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
//                                             <div className="bg-gray-50 rounded-lg p-2.5 text-center border border-gray-100 group-hover:border-gray-200 transition-colors">
//                                                 <p className="text-[10px] text-gray-500 uppercase font-bold mb-0.5 flex items-center justify-center gap-1">
//                                                     <Clock size={10}/> Total JP
//                                                 </p>
//                                                 <p className="text-sm font-black text-gray-800">{totalJP} JP</p>
//                                             </div>
//                                             <div className={`rounded-lg p-2.5 text-center border transition-colors ${isAuto ? 'bg-green-50 border-green-100 group-hover:border-green-200' : 'bg-orange-50 border-orange-100 group-hover:border-orange-200'}`}>
//                                                 <p className={`text-[10px] uppercase font-bold mb-0.5 flex items-center justify-center gap-1 ${isAuto ? 'text-green-600' : 'text-orange-600'}`}>
//                                                     {isAuto ? <CheckCircle size={10}/> : <AlertCircle size={10}/>} Pendaftaran
//                                                 </p>
//                                                 <p className={`text-xs font-bold ${isAuto ? 'text-green-700' : 'text-orange-700'}`}>
//                                                     {isAuto ? 'Langsung' : 'Syarat'}
//                                                 </p>
//                                             </div>
//                                         </div>

//                                         <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
//                                             <div>
//                                                 <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Investasi</p>
//                                                 <p className={`font-black text-lg ${course.price === 0 ? 'text-green-600' : 'text-gray-900'}`}>
//                                                     {course.price === 0 ? 'GRATIS' : `Rp ${course.price.toLocaleString('id-ID')}`}
//                                                 </p>
//                                             </div>
//                                             <Link href={`/courses/${course._id}`} className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-all shadow-md group-hover:shadow-lg hover:scale-105 active:scale-95">
//                                                 Detail <ChevronRight size={16}/>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
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
    Search, GraduationCap, Clock, BookOpen, Star, 
    Filter, ChevronRight, PlayCircle, Users, CheckCircle, AlertCircle, Loader2 
} from 'lucide-react';

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState<string[]>(['All']);

    // --- STATE SLIDESHOW ---
    const [content, setContent] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const defaultHeroImages = [
        "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1920"
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // [FIX API] Gunakan endpoint umum lalu filter di client
                // Ini lebih aman daripada menebak endpoint /published
                const [contentData, coursesRes] = await Promise.all([
                    api('/api/content').catch(() => null),
                    api('/api/courses').catch(() => ({ courses: [] })) 
                ]);

                setContent(contentData);

                // [FIX DATA] Filter hanya yang published
                const allCourses = coursesRes.courses || [];
                const publishedCourses = allCourses.filter((c: any) => c.isPublished);
                setCourses(publishedCourses);

                if (contentData?.courseCategories?.length > 0) {
                    setCategories(['All', ...contentData.courseCategories]);
                } else {
                    setCategories(['All', 'Health', 'Safety', 'General', 'Disaster']);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const activeTitle = content?.coursesPage?.title || "Katalog Pelatihan & Kursus";
    const activeDesc = content?.coursesPage?.description || "Tingkatkan kompetensi Anda dengan materi berkualitas dari PMI.";
    const activeSlides = (content?.coursesPage?.slides && content.coursesPage.slides.length > 0) 
        ? content.coursesPage.slides 
        : defaultHeroImages;

    useEffect(() => {
        if (activeSlides.length > 1) {
            const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % activeSlides.length), 5000);
            return () => clearInterval(interval);
        }
    }, [activeSlides]);

    const getTotalJP = (modules: any[]) => {
        if (!modules) return 0;
        let total = 0;
        modules.forEach(m => {
            if (m.isActive) m.lessons?.forEach((l: any) => { if (l.isActive) total += (l.jp || 0); });
        });
        return total;
    };

    const filteredCourses = courses.filter(c => {
        const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
        return matchSearch && matchCat;
    });

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="flex flex-col items-center gap-2"><Loader2 className="animate-spin text-red-600" size={40}/><span className="text-gray-500 font-medium">Memuat katalog...</span></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            
            {/* --- HERO SECTION --- */}
            <div className="relative h-[400px] md:h-[450px] flex items-center justify-center text-center text-white px-4 overflow-hidden pb-40">
                <div className="absolute inset-0 z-0 bg-gray-900">
                    {activeSlides.map((slide: string, index: number) => (
                        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                            <img src={getImageUrl(slide)} alt="Hero" className="w-full h-full object-cover opacity-60" />
                        </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-b from-red-900/80 via-red-900/60 to-gray-50"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto -mt-10">
                    <div className="inline-flex items-center justify-center p-2.5 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20 shadow-lg">
                        <GraduationCap size={24} className="text-red-100"/>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-lg tracking-tight">
                        {activeTitle}
                    </h1>
                    <p className="text-red-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                        {activeDesc}
                    </p>
                </div>
            </div>

            {/* --- FILTER & SEARCH BAR --- */}
            <div className="max-w-7xl mx-auto px-6 -mt-40 relative z-20">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-3 mb-8 flex flex-col md:flex-row items-center gap-3">
                    <div className="relative w-full md:w-1/3 shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                        <input 
                            type="text" 
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-gray-400 text-sm bg-gray-50 focus:bg-white" 
                            placeholder="Cari pelatihan..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-2/3 pb-1 md:pb-0 no-scrollbar">
                        <Filter size={18} className="text-gray-400 shrink-0 ml-1"/>
                        {categories.map((cat) => (
                            <button 
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm border ${
                                    selectedCategory === cat 
                                    ? 'bg-red-600 text-white border-red-600 shadow-red-200' 
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- COURSE GRID --- */}
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-20 text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
                            <Search size={36} className="text-gray-300"/>
                        </div>
                        <p className="text-xl font-bold text-gray-600">Tidak ada pelatihan ditemukan.</p>
                        <p className="text-sm mt-1 text-gray-400">Pastikan pelatihan sudah di-publish.</p>
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="mt-6 text-red-600 font-bold hover:underline text-sm bg-red-50 px-4 py-2 rounded-lg">Reset Pencarian</button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => {
                            const totalJP = getTotalJP(course.modules);
                            const moduleCount = course.modules?.length || 0;
                            const isAuto = course.registrationMode === 'automatic';

                            return (
                                <div key={course._id} className="bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
                                    <div className="relative h-48 bg-gray-200 overflow-hidden shrink-0">
                                        {course.thumbnailUrl ? (
                                            <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={course.title} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 flex-col gap-2">
                                                <div className="opacity-20"><BookOpen size={40}/></div>
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <span className="bg-white/95 backdrop-blur-md text-gray-800 text-[10px] font-extrabold px-3 py-1 rounded-md uppercase shadow-sm border border-gray-200/50 tracking-wider">
                                                {course.category}
                                            </span>
                                        </div>
                                        {/* [FIX LABEL] Konsistensi DIKLAT / KURSUS */}
                                        <div className="absolute top-3 right-3">
                                            <span className={`text-[10px] font-extrabold px-3 py-1 rounded-md uppercase shadow-sm border text-white tracking-wider ${course.programType === 'training' ? 'bg-red-600 border-red-700' : 'bg-blue-600 border-blue-700'}`}>
                                                {course.programType === 'training' ? 'DIKLAT' : 'KURSUS'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-red-700 transition-colors">
                                            {course.title}
                                        </h3>
                                        
                                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-gray-500 mb-4 mt-1">
                                            <div className="flex items-center gap-1.5">
                                                <Users size={14} className="text-gray-400"/> <span className="font-medium">{course.facilitatorIds?.length || 0} Fasilitator</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <BookOpen size={14} className="text-gray-400"/> <span className="font-medium">{moduleCount} Modul</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
                                            <div className="bg-gray-50 rounded-lg p-2.5 text-center border border-gray-100 group-hover:border-gray-200 transition-colors">
                                                <p className="text-[10px] text-gray-500 uppercase font-bold mb-0.5 flex items-center justify-center gap-1">
                                                    <Clock size={10}/> Total JP
                                                </p>
                                                <p className="text-sm font-black text-gray-800">{totalJP} JP</p>
                                            </div>
                                            <div className={`rounded-lg p-2.5 text-center border transition-colors ${isAuto ? 'bg-green-50 border-green-100 group-hover:border-green-200' : 'bg-orange-50 border-orange-100 group-hover:border-orange-200'}`}>
                                                <p className={`text-[10px] uppercase font-bold mb-0.5 flex items-center justify-center gap-1 ${isAuto ? 'text-green-600' : 'text-orange-600'}`}>
                                                    {isAuto ? <CheckCircle size={10}/> : <AlertCircle size={10}/>} Daftar
                                                </p>
                                                {/* [FIX TYPO] Font not-italic */}
                                                <p className={`text-xs font-bold not-italic ${isAuto ? 'text-green-700' : 'text-orange-700'}`}>
                                                    {isAuto ? 'Langsung' : 'Syarat'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Investasi</p>
                                                {/* [FIX HARGA] Font not-italic agar tegak */}
                                                <p className={`font-black text-lg not-italic ${course.price === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                                    {course.price === 0 ? 'GRATIS' : `Rp ${course.price.toLocaleString('id-ID')}`}
                                                </p>
                                            </div>
                                            <Link href={`/courses/${course._id}`} className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-all shadow-md group-hover:shadow-lg hover:scale-105 active:scale-95">
                                                Detail <ChevronRight size={16}/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
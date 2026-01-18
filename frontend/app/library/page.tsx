// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import Protected from '@/components/Protected';
// // // // import { BookOpen, Search, Download, Star } from 'lucide-react';
// // // // import { useSearchParams } from 'next/navigation'; // Wajib ada untuk baca parameter URL

// // // // export default function LibraryPage() {
// // // //   const [books, setBooks] = useState<any[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [search, setSearch] = useState('');
  
// // // //   // 1. Ambil Parameter highlight dari URL
// // // //   const searchParams = useSearchParams();
// // // //   const highlightId = searchParams.get('highlight');

// // // //   useEffect(() => {
// // // //     loadBooks();
// // // //   }, []);

// // // //   // 2. Efek Scroll Otomatis ke Buku yang dituju setelah loading selesai
// // // //   useEffect(() => {
// // // //     if (!loading && highlightId) {
// // // //         // Beri sedikit delay agar DOM render sempurna
// // // //         setTimeout(() => {
// // // //             const element = document.getElementById(`book-${highlightId}`);
// // // //             if (element) {
// // // //                 element.scrollIntoView({ behavior: 'smooth', block: 'center' });
// // // //             }
// // // //         }, 500);
// // // //     }
// // // //   }, [loading, highlightId]);

// // // //   const loadBooks = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await api('/api/library');
// // // //       setBooks(Array.isArray(res) ? res : res.books || []);
// // // //     } catch (e) { console.error(e); } 
// // // //     finally { setLoading(false); }
// // // //   };

// // // //   const filteredBooks = books.filter(b => 
// // // //     b.title.toLowerCase().includes(search.toLowerCase()) ||
// // // //     (b.author && b.author.toLowerCase().includes(search.toLowerCase()))
// // // //   );

// // // //   return (
// // // //     <Protected>
// // // //       <div className="max-w-6xl mx-auto p-6 font-sans min-h-screen">
        
// // // //         {/* HEADER */}
// // // //         <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
// // // //             <div>
// // // //                 <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
// // // //                   <BookOpen className="text-red-700" size={32}/> Perpustakaan Digital
// // // //                 </h1>
// // // //                 <p className="text-gray-500 mt-1">Kumpulan modul dan referensi resmi PMI.</p>
// // // //             </div>
            
// // // //             <div className="relative w-full md:w-72">
// // // //                 <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
// // // //                 <input 
// // // //                     className="w-full pl-10 pr-4 py-2 border rounded-full bg-white focus:ring-2 focus:ring-red-500 outline-none"
// // // //                     placeholder="Cari judul atau penulis..."
// // // //                     value={search}
// // // //                     onChange={(e) => setSearch(e.target.value)}
// // // //                     aria-label="Cari buku"
// // // //                 />
// // // //             </div>
// // // //         </div>

// // // //         {/* LIST BUKU */}
// // // //         {loading ? (
// // // //             <div className="text-center py-20">Memuat pustaka...</div>
// // // //         ) : filteredBooks.length === 0 ? (
// // // //             <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
// // // //                 <p className="text-gray-400">Belum ada materi yang dipublikasikan.</p>
// // // //             </div>
// // // //         ) : (
// // // //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// // // //                 {filteredBooks.map((book) => {
// // // //                     // 3. Cek apakah ini buku yang harus di-highlight
// // // //                     const isHighlighted = book._id === highlightId;

// // // //                     return (
// // // //                         <div 
// // // //                             key={book._id} 
// // // //                             id={`book-${book._id}`} // ID untuk target scroll
// // // //                             className={`
// // // //                                 relative rounded-xl overflow-hidden flex flex-col group h-full transition-all duration-500
// // // //                                 ${isHighlighted 
// // // //                                     ? 'ring-4 ring-red-500 shadow-2xl scale-105 z-10 bg-red-50' // Style untuk buku yang disorot
// // // //                                     : 'bg-white shadow-sm border border-gray-200 hover:shadow-md'
// // // //                                 }
// // // //                             `}
// // // //                         >
// // // //                             {/* LABEL BARU (Hanya muncul jika di-highlight) */}
// // // //                             {isHighlighted && (
// // // //                                 <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20 animate-pulse flex items-center gap-1 shadow-md">
// // // //                                     <Star size={10} fill="white" /> BARU RILIS
// // // //                                 </div>
// // // //                             )}

// // // //                             {/* COVER IMAGE */}
// // // //                             <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden border-b border-gray-100">
// // // //                                 <img 
// // // //                                     src={getImageUrl(book.coverUrl) || 'https://via.placeholder.com/300x400?text=No+Cover'} 
// // // //                                     alt={book.title} 
// // // //                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
// // // //                                     onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Cover'; }}
// // // //                                 />
                                
// // // //                                 {/* Kategori Badge */}
// // // //                                 <div className="absolute top-2 left-2">
// // // //                                     <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-red-700 uppercase tracking-wide shadow-sm border border-gray-200">
// // // //                                         {book.category || 'UMUM'}
// // // //                                     </span>
// // // //                                 </div>

// // // //                                 {/* HOVER OVERLAY */}
// // // //                                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
// // // //                                     <a 
// // // //                                         href={getImageUrl(book.fileUrl)} 
// // // //                                         target="_blank" 
// // // //                                         rel="noopener noreferrer"
// // // //                                         className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg hover:bg-gray-100"
// // // //                                     >
// // // //                                         <Download size={14}/> Unduh PDF
// // // //                                     </a>
// // // //                                 </div>
// // // //                             </div>

// // // //                             {/* INFO BUKU */}
// // // //                             <div className="p-4 flex flex-col flex-1">
// // // //                                 <h3 className="font-bold text-gray-800 leading-snug mb-1 line-clamp-2 text-sm" title={book.title}>
// // // //                                     {book.title}
// // // //                                 </h3>
// // // //                                 <p className="text-xs text-gray-500 mb-2 font-medium">{book.author || 'Tim PMI'}</p>
                                
// // // //                                 <p className="text-[10px] text-gray-400 line-clamp-3 mb-4 flex-1 leading-relaxed">
// // // //                                     {book.description || 'Tidak ada deskripsi.'}
// // // //                                 </p>
                                
// // // //                                 <div className="pt-3 border-t border-gray-100 text-[10px] text-gray-400 flex justify-between items-center font-bold">
// // // //                                     <span>{book.year || new Date().getFullYear()}</span>
// // // //                                     <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">PDF</span>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     );
// // // //                 })}
// // // //             </div>
// // // //         )}
// // // //       </div>
// // // //     </Protected>
// // // //   );
// // // // }


// // // // app/library/page.tsx (Server Component)
// // // import { Suspense } from 'react';
// // // import LibraryClient from './LibraryClient';

// // // // Jika page ini juga melakukan fetch 'no-store' di server, kamu bisa opt-in jadi dinamis.
// // // // Tapi karena semua logic fetch ada di client, baris ini opsional.
// // // export const dynamic = 'force-dynamic';

// // // export default function Page() {
// // //   return (
// // //     <Suspense fallback={<div>Memuat pustaka...</div>}>
// // //       <LibraryClient />
// // //     </Suspense>
// // //   );
// // // }



// 'use client';

// import { useState, useEffect } from 'react';
// import { api, getImageUrl } from '@/lib/api';
// import Protected from '@/components/Protected';
// import { BookOpen, Search, Download, Star, Filter, Loader2, Book } from 'lucide-react';
// import { useSearchParams } from 'next/navigation';

// export default function LibraryPage() {
//   const [books, setBooks] = useState<any[]>([]);
//   const [content, setContent] = useState<any>(null); // State konten CMS
//   const [categories, setCategories] = useState<string[]>(['All']);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Ambil Parameter highlight dari URL
//   const searchParams = useSearchParams();
//   const highlightId = searchParams.get('highlight');

//   // Default Images
//   const defaultSlides = [
//       "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1920",
//       "https://images.unsplash.com/photo-1507842217121-9e9f1479b03e?auto=format&fit=crop&q=80&w=1920"
//   ];

//   useEffect(() => {
//     loadData();
//   }, []);

//   useEffect(() => {
//     if (!loading && highlightId) {
//       setTimeout(() => {
//         const element = document.getElementById(`book-${highlightId}`);
//         if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }, 500);
//     }
//   }, [loading, highlightId]);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [libRes, contentRes] = await Promise.all([
//           api('/api/library'),
//           api('/api/content').catch(() => null)
//       ]);
      
//       setBooks(Array.isArray(libRes) ? libRes : libRes.books || []);
//       setContent(contentRes);

//       if (contentRes?.libraryCategories?.length > 0) {
//           setCategories(['All', ...contentRes.libraryCategories]);
//       }
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Header Logic
//   const activeTitle = content?.libraryPage?.title || "Perpustakaan Digital";
//   const activeDesc = content?.libraryPage?.description || "Kumpulan modul dan referensi resmi PMI.";
//   const activeSlides = (content?.libraryPage?.slides && content.libraryPage.slides.length > 0) 
//       ? content.libraryPage.slides 
//       : defaultSlides;

//   // Timer Slide
//   useEffect(() => {
//       if (activeSlides.length > 1) {
//           const interval = setInterval(() => setCurrentSlide((p) => (p + 1) % activeSlides.length), 5000);
//           return () => clearInterval(interval);
//       }
//   }, [activeSlides]);

//   const filteredBooks = books.filter(b =>
//       (selectedCategory === 'All' || b.category === selectedCategory) &&
//       (b.title.toLowerCase().includes(search.toLowerCase()) || (b.author && b.author.toLowerCase().includes(search.toLowerCase())))
//   );

//   return (
//     <Protected>
//       <div className="min-h-screen bg-gray-50 font-sans pb-20">
        
//         {/* --- 1. HERO SECTION (TINGGI & MERAH) --- */}
//         <div className="relative bg-[#990000] text-white px-6 shadow-xl overflow-hidden flex items-center justify-center min-h-[280px] md:min-h-[320px] pt-12 pb-32">
            
//             {/* Background Slideshow */}
//             <div className="absolute inset-0 z-0 pointer-events-none">
//                 {activeSlides.map((slide: string, index: number) => (
//                     <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
//                         <img src={getImageUrl(slide)} alt="Hero" className="w-full h-full object-cover object-center" />
//                     </div>
//                 ))}
//                 <div className="absolute inset-0 bg-gradient-to-b from-[#990000]/90 to-black/40 mix-blend-multiply"></div>
//             </div>

//             {/* Content */}
//             <div className="relative z-10 max-w-4xl mx-auto text-center -mt-6">
//                 <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-3 backdrop-blur-sm border border-white/20">
//                     <BookOpen size={28} className="text-red-100"/>
//                 </div>
//                 <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight drop-shadow-md">{activeTitle}</h1>
//                 <p className="text-red-100 text-sm md:text-base max-w-2xl mx-auto mb-6 font-medium leading-relaxed opacity-90">{activeDesc}</p>

//                 {/* SEARCH BAR (INSIDE HERO) */}
//                 <div className="max-w-xl mx-auto relative bg-white rounded-full flex items-center p-1.5 shadow-2xl">
//                     <Search className="ml-4 text-gray-400" size={20}/>
//                     <input 
//                         type="text" 
//                         className="flex-1 px-3 py-2.5 outline-none text-gray-700 bg-transparent placeholder:text-gray-400 text-sm" 
//                         placeholder="Cari judul atau penulis..." 
//                         value={search} 
//                         onChange={(e) => setSearch(e.target.value)}
//                         aria-label="Cari buku"
//                     />
//                 </div>
//             </div>
//         </div>

//         {/* --- 2. CATEGORY FILTER (OVERLAP) --- */}
//         <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20">
//             <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex flex-col md:flex-row items-center gap-4 animate-in slide-in-from-bottom-4 duration-500">
//                 <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 no-scrollbar">
//                     <Filter size={20} className="text-gray-400 shrink-0 ml-1"/>
//                     {categories.map((cat, idx) => (
//                         <button 
//                             key={idx} 
//                             onClick={() => setSelectedCategory(cat)} 
//                             className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${selectedCategory === cat ? 'bg-red-600 text-white shadow-red-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
//                         >
//                             {cat}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>

//         {/* --- 3. LIST BUKU --- */}
//         <div className="max-w-6xl mx-auto px-6 py-12">
//             {loading ? (
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                     {[1,2,3,4].map(i => <div key={i} className="bg-white rounded-xl h-64 border border-gray-100 shadow-sm animate-pulse"></div>)}
//                 </div>
//             ) : filteredBooks.length === 0 ? (
//                 <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
//                     <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4"><Book className="text-gray-300" size={32}/></div>
//                     <h3 className="text-lg font-bold text-gray-800">Belum ada buku ditemukan</h3>
//                     <p className="text-gray-500 text-sm">Coba cari dengan kata kunci lain.</p>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
//                     {filteredBooks.map((book) => {
//                         const isHighlighted = book._id === highlightId;
//                         return (
//                             <div 
//                                 key={book._id} 
//                                 id={`book-${book._id}`}
//                                 className={`relative rounded-xl overflow-hidden flex flex-col group h-full transition-all duration-500 ${isHighlighted ? 'ring-4 ring-red-500 shadow-2xl scale-105 z-10 bg-red-50' : 'bg-white shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1'}`}
//                             >
//                                 {isHighlighted && (
//                                     <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20 animate-pulse flex items-center gap-1 shadow-md">
//                                         <Star size={10} fill="white" /> BARU
//                                     </div>
//                                 )}

//                                 <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden border-b border-gray-100 flex items-center justify-center p-4">
//                                     {book.coverUrl ? (
//                                         <img src={getImageUrl(book.coverUrl)} alt={book.title} className="h-full w-auto object-contain shadow-md transition-transform duration-500 group-hover:scale-105" />
//                                     ) : (
//                                         <Book size={48} className="text-gray-300"/>
//                                     )}
//                                     {/* Hover Overlay */}
//                                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 z-20">
//                                         <a href={getImageUrl(book.fileUrl)} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg hover:bg-gray-100">
//                                             <Download size={14} /> Unduh PDF
//                                         </a>
//                                     </div>
//                                     <div className="absolute top-2 left-2 z-10">
//                                         <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-red-700 uppercase tracking-wide shadow-sm border border-gray-200">
//                                             {book.category || 'UMUM'}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div className="p-4 flex-1 flex flex-col">
//                                     <h3 className="font-bold text-gray-800 leading-snug mb-1 line-clamp-2 text-sm md:text-base" title={book.title}>{book.title}</h3>
//                                     <p className="text-xs text-gray-500 mb-2 font-medium">{book.author || 'Tim PMI'}</p>
//                                     <p className="text-[10px] text-gray-400 line-clamp-3 mb-4 flex-1 leading-relaxed">{book.description || 'Tidak ada deskripsi.'}</p>
//                                     <div className="pt-3 border-t border-gray-100 text-[10px] text-gray-400 flex justify-between items-center font-bold">
//                                         <span>{book.year || new Date().getFullYear()}</span>
//                                         <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">PDF</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//       </div>
//     </Protected>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';
import { 
    BookOpen, Search, Download, Star, Filter, Loader2, Book, FileText, Eye 
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function LibraryPage() {
    // --- 1. LOGIKA LAMA (KITA PERTAHANKAN 100%) ---
    const [books, setBooks] = useState<any[]>([]);
    const [content, setContent] = useState<any>(null);
    const [categories, setCategories] = useState<string[]>(['All']);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // State Slideshow (Baru)
    const [currentSlide, setCurrentSlide] = useState(0);

    const searchParams = useSearchParams();
    const highlightId = searchParams.get('highlight');

    // Default Hero Images
    const defaultSlides = [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1507842217121-9e9f14781f27?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1920"
    ];

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!loading && highlightId) {
            setTimeout(() => {
                const element = document.getElementById(`book-${highlightId}`);
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
    }, [loading, highlightId]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [libRes, contentRes] = await Promise.all([
                api('/api/library'), // Gunakan endpoint LAMA yang terbukti jalan
                api('/api/content').catch(() => null)
            ]);
            
            // Handle struktur data lama
            setBooks(Array.isArray(libRes) ? libRes : libRes.books || []);
            setContent(contentRes);

            if (contentRes?.libraryCategories?.length > 0) {
                setCategories(['All', ...contentRes.libraryCategories]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const activeTitle = content?.libraryPage?.title || "Perpustakaan Digital";
    const activeDesc = content?.libraryPage?.description || "Kumpulan modul dan referensi resmi PMI.";
    const activeSlides = (content?.libraryPage?.slides && content.libraryPage.slides.length > 0) 
        ? content.libraryPage.slides 
        : defaultSlides;

    useEffect(() => {
        if (activeSlides.length > 1) {
            const interval = setInterval(() => setCurrentSlide((p) => (p + 1) % activeSlides.length), 5000);
            return () => clearInterval(interval);
        }
    }, [activeSlides]);

    const filteredBooks = books.filter(b =>
        (selectedCategory === 'All' || b.category === selectedCategory) &&
        (b.title.toLowerCase().includes(search.toLowerCase()) || (b.author && b.author.toLowerCase().includes(search.toLowerCase())))
    );

    // --- 2. TAMPILAN BARU (HERO TINGGI & FILTER MENINDIH) ---
    return (
        <Protected>
            <div className="min-h-screen bg-gray-50 font-sans pb-20">
                
                {/* --- HERO SECTION (STYLE BARU: TINGGI 450px) --- */}
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
                            <BookOpen size={24} className="text-red-100"/>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-lg tracking-tight">
                            {activeTitle}
                        </h1>
                        <p className="text-red-100 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                            {activeDesc}
                        </p>
                    </div>
                </div>

                {/* --- FILTER & SEARCH (CARD MENINDIH HERO -40) --- */}
                <div className="max-w-7xl mx-auto px-6 -mt-40 relative z-20">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-3 mb-8 flex flex-col md:flex-row items-center gap-3">
                        
                        {/* Search Bar */}
                        <div className="relative w-full md:w-1/3 shrink-0">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                            <input 
                                type="text" 
                                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-gray-400 text-sm bg-gray-50 focus:bg-white" 
                                placeholder="Cari judul atau penulis..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Filter Kategori */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto flex-1 pb-1 md:pb-0 no-scrollbar">
                            <Filter size={18} className="text-gray-400 shrink-0 ml-1"/>
                            {categories.map((cat, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setSelectedCategory(cat)} 
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm border ${selectedCategory === cat ? 'bg-red-600 text-white border-red-600 shadow-red-200' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- CONTENT GRID (KARTU LAMA) --- */}
                    {loading ? (
                        <div className="text-center py-20 flex flex-col items-center text-gray-500">
                            <Loader2 className="animate-spin text-red-600 mb-2" size={32}/>
                            Memuat pustaka...
                        </div>
                    ) : filteredBooks.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed shadow-sm">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                <Book className="text-gray-300" size={32}/>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Belum ada buku ditemukan</h3>
                            <p className="text-gray-500 text-sm">Coba cari dengan kata kunci lain.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {filteredBooks.map((book) => {
                                const isHighlighted = book._id === highlightId;
                                return (
                                    <div 
                                        key={book._id} 
                                        id={`book-${book._id}`}
                                        className={`relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col group h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isHighlighted ? 'ring-4 ring-red-500 shadow-2xl scale-105 z-10' : ''}`}
                                    >
                                        {/* Highlight Badge */}
                                        {isHighlighted && (
                                            <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20 animate-pulse flex items-center gap-1 shadow-md">
                                                <Star size={10} fill="white" /> BARU
                                            </div>
                                        )}

                                        {/* Cover Image */}
                                        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden border-b border-gray-100 flex items-center justify-center p-4">
                                            {book.coverUrl ? (
                                                <img src={getImageUrl(book.coverUrl)} alt={book.title} className="h-full w-auto object-contain shadow-md transition-transform duration-500 group-hover:scale-105" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-gray-300">
                                                    <Book size={48} opacity={0.5}/>
                                                    <span className="text-[10px] mt-2 font-bold uppercase tracking-wider">No Cover</span>
                                                </div>
                                            )}
                                            
                                            {/* Hover Download */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 z-20">
                                                <a href={getImageUrl(book.fileUrl)} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg hover:bg-gray-100">
                                                    <Download size={14} /> Unduh PDF
                                                </a>
                                            </div>
                                            
                                            {/* Category Label */}
                                            <div className="absolute top-2 left-2 z-10">
                                                <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-red-700 uppercase tracking-wide shadow-sm border border-gray-200">
                                                    {book.category || 'UMUM'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Info Buku */}
                                        <div className="p-4 flex-1 flex flex-col">
                                            <h3 className="font-bold text-gray-800 leading-snug mb-1 line-clamp-2 text-sm" title={book.title}>
                                                {book.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 mb-2 font-medium">{book.author || 'Tim PMI'}</p>
                                            
                                            <p className="text-[10px] text-gray-400 line-clamp-3 mb-4 flex-1 leading-relaxed">
                                                {book.description || 'Tidak ada deskripsi.'}
                                            </p>
                                            
                                            <div className="pt-3 border-t border-gray-100 text-[10px] text-gray-400 flex justify-between items-center font-bold">
                                                <span>{book.year || new Date().getFullYear()}</span>
                                                <span className="bg-gray-50 px-1.5 py-0.5 rounded text-gray-600 flex items-center gap-1 border border-gray-100">
                                                    <FileText size={10}/> {book.fileType || 'PDF'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Protected>
    );
}
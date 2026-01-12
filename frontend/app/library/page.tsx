'use client';

import { useState, useEffect } from 'react';
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';
import { BookOpen, Search, Download, Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation'; // Wajib ada untuk baca parameter URL

export default function LibraryPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // 1. Ambil Parameter highlight dari URL
  const searchParams = useSearchParams();
  const highlightId = searchParams.get('highlight');

  useEffect(() => {
    loadBooks();
  }, []);

  // 2. Efek Scroll Otomatis ke Buku yang dituju setelah loading selesai
  useEffect(() => {
    if (!loading && highlightId) {
        // Beri sedikit delay agar DOM render sempurna
        setTimeout(() => {
            const element = document.getElementById(`book-${highlightId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
    }
  }, [loading, highlightId]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const res = await api('/api/library');
      setBooks(Array.isArray(res) ? res : res.books || []);
    } catch (e) { console.error(e); } 
    finally { setLoading(false); }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    (b.author && b.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Protected>
      <div className="max-w-6xl mx-auto p-6 font-sans min-h-screen">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <BookOpen className="text-red-700" size={32}/> Perpustakaan Digital
                </h1>
                <p className="text-gray-500 mt-1">Kumpulan modul dan referensi resmi PMI.</p>
            </div>
            
            <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
                <input 
                    className="w-full pl-10 pr-4 py-2 border rounded-full bg-white focus:ring-2 focus:ring-red-500 outline-none"
                    placeholder="Cari judul atau penulis..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Cari buku"
                />
            </div>
        </div>

        {/* LIST BUKU */}
        {loading ? (
            <div className="text-center py-20">Memuat pustaka...</div>
        ) : filteredBooks.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
                <p className="text-gray-400">Belum ada materi yang dipublikasikan.</p>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBooks.map((book) => {
                    // 3. Cek apakah ini buku yang harus di-highlight
                    const isHighlighted = book._id === highlightId;

                    return (
                        <div 
                            key={book._id} 
                            id={`book-${book._id}`} // ID untuk target scroll
                            className={`
                                relative rounded-xl overflow-hidden flex flex-col group h-full transition-all duration-500
                                ${isHighlighted 
                                    ? 'ring-4 ring-red-500 shadow-2xl scale-105 z-10 bg-red-50' // Style untuk buku yang disorot
                                    : 'bg-white shadow-sm border border-gray-200 hover:shadow-md'
                                }
                            `}
                        >
                            {/* LABEL BARU (Hanya muncul jika di-highlight) */}
                            {isHighlighted && (
                                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20 animate-pulse flex items-center gap-1 shadow-md">
                                    <Star size={10} fill="white" /> BARU RILIS
                                </div>
                            )}

                            {/* COVER IMAGE */}
                            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden border-b border-gray-100">
                                <img 
                                    src={getImageUrl(book.coverUrl) || 'https://via.placeholder.com/300x400?text=No+Cover'} 
                                    alt={book.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Cover'; }}
                                />
                                
                                {/* Kategori Badge */}
                                <div className="absolute top-2 left-2">
                                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-red-700 uppercase tracking-wide shadow-sm border border-gray-200">
                                        {book.category || 'UMUM'}
                                    </span>
                                </div>

                                {/* HOVER OVERLAY */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                    <a 
                                        href={getImageUrl(book.fileUrl)} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg hover:bg-gray-100"
                                    >
                                        <Download size={14}/> Unduh PDF
                                    </a>
                                </div>
                            </div>

                            {/* INFO BUKU */}
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="font-bold text-gray-800 leading-snug mb-1 line-clamp-2 text-sm" title={book.title}>
                                    {book.title}
                                </h3>
                                <p className="text-xs text-gray-500 mb-2 font-medium">{book.author || 'Tim PMI'}</p>
                                
                                <p className="text-[10px] text-gray-400 line-clamp-3 mb-4 flex-1 leading-relaxed">
                                    {book.description || 'Tidak ada deskripsi.'}
                                </p>
                                
                                <div className="pt-3 border-t border-gray-100 text-[10px] text-gray-400 flex justify-between items-center font-bold">
                                    <span>{book.year || new Date().getFullYear()}</span>
                                    <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">PDF</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}
      </div>
    </Protected>
  );
}

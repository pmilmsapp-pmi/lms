// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useParams } from 'next/navigation';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import { Calendar, ArrowLeft, Share2, Eye, MessageCircle } from 'lucide-react';
// // // import Link from 'next/link';
// // // // [NEW] Import Komponen Komentar
// // // import BlogComments from '@/components/BlogComments';

// // // export default function BlogDetail() {
// // //     const { id } = useParams();
// // //     const [blog, setBlog] = useState<any>(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [commentCount, setCommentCount] = useState(0); // [NEW] State count

// // //     useEffect(() => {
// // //         const loadBlog = async () => {
// // //             if (!id) return;
// // //             try {
// // //                 const res = await api(`/api/blog/${id}`);
// // //                 setBlog(res);
// // //             } catch (e) {
// // //                 console.error("Gagal load blog:", e);
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };
// // //         loadBlog();
// // //     }, [id]);

// // //     if (loading) return (
// // //         <div className="min-h-screen flex items-center justify-center bg-white">
// // //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div>
// // //         </div>
// // //     );

// // //     if (!blog) return (
// // //         <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
// // //             <h1 className="text-2xl font-bold text-gray-800 mb-2">Cerita Tidak Ditemukan</h1>
// // //             <Link href="/" className="text-[#990000] hover:underline">Kembali ke Beranda</Link>
// // //         </div>
// // //     );

// // //     return (
// // //         <div className="bg-white min-h-screen font-sans pb-20 pt-6">
// // //             <div className="max-w-4xl mx-auto px-6">
                
// // //                 {/* Navigasi Balik */}
// // //                 <div className="mb-6">
// // //                     <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#990000] transition-colors">
// // //                         <ArrowLeft size={18} /> Kembali ke Beranda
// // //                     </Link>
// // //                 </div>

// // //                 {/* Judul & Header */}
// // //                 <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
// // //                     {blog.title}
// // //                 </h1>

// // //                 {/* Author Info & Stats */}
// // //                 <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-6 mb-8 gap-4">
// // //                     <div className="flex items-center gap-4">
// // //                         <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
// // //                              <img
// // //                                 src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'Admin'}&background=random`}
// // //                                 className="w-full h-full object-cover"
// // //                                 alt="Author"
// // //                             />
// // //                         </div>
// // //                         <div>
// // //                             <p className="text-sm font-bold text-gray-900">{blog.author?.name || 'Administrator'}</p>
// // //                             <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
// // //                                 <span className="flex items-center gap-1">
// // //                                     <Calendar size={12} />
// // //                                     {new Date(blog.createdAt).toLocaleDateString('id-ID', { 
// // //                                         year: 'numeric', month: 'long', day: 'numeric' 
// // //                                     })}
// // //                                 </span>
// // //                                 {/* [NEW] Indikator Views & Comments */}
// // //                                 <span className="flex items-center gap-1" title="Dilihat">
// // //                                     <Eye size={12} /> {blog.views || 0}
// // //                                 </span>
// // //                                 <span className="flex items-center gap-1" title="Komentar">
// // //                                     <MessageCircle size={12} /> {commentCount}
// // //                                 </span>
// // //                             </div>
// // //                         </div>
// // //                     </div>
                    
// // //                     <button 
// // //                         className="text-gray-400 hover:text-[#990000] transition p-2 rounded-full hover:bg-red-50 self-start sm:self-center"
// // //                         aria-label="Bagikan Cerita"
// // //                         title="Bagikan Cerita"
// // //                     >
// // //                         <Share2 size={20}/>
// // //                     </button>
// // //                 </div>

// // //                 {/* Cover Image */}
// // //                 {blog.coverUrl && (
// // //                     <div className="w-full h-64 md:h-[400px] rounded-2xl overflow-hidden mb-10 shadow-lg relative bg-gray-100">
// // //                         <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title} />
// // //                     </div>
// // //                 )}

// // //                 {/* CONTENT BODY */}
// // //                 <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify mb-10">
// // //                     <div dangerouslySetInnerHTML={{ __html: blog.content }} />
// // //                 </article>

// // //                 {/* [NEW] KOMPONEN KOMENTAR */}
// // //                 {/* Kita passing blogId dan fungsi untuk update jumlah komentar di header */}
// // //                 <BlogComments blogId={id as string} onCountChange={setCommentCount} />

// // //             </div>
// // //         </div>
// // //     );
// // // }
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useParams } from 'next/navigation';
// // import { api, getImageUrl } from '@/lib/api';
// // import { Calendar, ArrowLeft, Share2, Eye, MessageCircle, MessageCircleOff } from 'lucide-react';
// // import Link from 'next/link';
// // // Import Komponen Komentar
// // import BlogComments from '@/components/BlogComments';

// // export default function BlogDetail() {
// //     const { id } = useParams();
// //     const [blog, setBlog] = useState<any>(null);
// //     const [loading, setLoading] = useState(true);
// //     const [commentCount, setCommentCount] = useState(0); 

// //     useEffect(() => {
// //         const loadBlog = async () => {
// //             if (!id) return;
// //             try {
// //                 const res = await api(`/api/blog/${id}`);
// //                 setBlog(res);
// //                 if(res.commentCount) setCommentCount(res.commentCount);
// //             } catch (e) {
// //                 console.error("Gagal load blog:", e);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         loadBlog();
// //     }, [id]);

// //     if (loading) return (
// //         <div className="min-h-screen flex items-center justify-center bg-white">
// //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div>
// //         </div>
// //     );

// //     if (!blog) return (
// //         <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
// //             <h1 className="text-2xl font-bold text-gray-800 mb-2">Cerita Tidak Ditemukan</h1>
// //             <Link href="/" className="text-[#990000] hover:underline">Kembali ke Beranda</Link>
// //         </div>
// //     );

// //     return (
// //         <div className="bg-white min-h-screen font-sans pb-20 pt-6">
// //             <div className="max-w-4xl mx-auto px-6">
                
// //                 {/* Navigasi Balik */}
// //                 <div className="mb-6">
// //                     <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#990000] transition-colors">
// //                         <ArrowLeft size={18} /> Kembali ke Beranda
// //                     </Link>
// //                 </div>

// //                 {/* Judul & Header */}
// //                 <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
// //                     {blog.title}
// //                 </h1>

// //                 {/* Author Info & Stats */}
// //                 <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-6 mb-8 gap-4">
// //                     <div className="flex items-center gap-4">
// //                         <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
// //                              <img
// //                                 src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'Admin'}&background=random`}
// //                                 className="w-full h-full object-cover"
// //                                 alt="Author"
// //                             />
// //                         </div>
// //                         <div>
// //                             <p className="text-sm font-bold text-gray-900">{blog.author?.name || 'Administrator'}</p>
// //                             <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
// //                                 <span className="flex items-center gap-1">
// //                                     <Calendar size={12} />
// //                                     {new Date(blog.createdAt).toLocaleDateString('id-ID', { 
// //                                         year: 'numeric', month: 'long', day: 'numeric' 
// //                                     })}
// //                                 </span>
// //                                 {/* Indikator Views & Comments */}
// //                                 <span className="flex items-center gap-1" title="Dilihat">
// //                                     <Eye size={12} /> {blog.views || 0}
// //                                 </span>
// //                                 <span className="flex items-center gap-1" title="Komentar">
// //                                     <MessageCircle size={12} /> {commentCount}
// //                                 </span>
// //                             </div>
// //                         </div>
// //                     </div>
                    
// //                     <button 
// //                         className="text-gray-400 hover:text-[#990000] transition p-2 rounded-full hover:bg-red-50 self-start sm:self-center"
// //                         aria-label="Bagikan Cerita"
// //                         title="Bagikan Cerita"
// //                     >
// //                         <Share2 size={20}/>
// //                     </button>
// //                 </div>

// //                 {/* Cover Image */}
// //                 {blog.coverUrl && (
// //                     <div className="w-full h-64 md:h-[400px] rounded-2xl overflow-hidden mb-10 shadow-lg relative bg-gray-100">
// //                         <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title} />
// //                     </div>
// //                 )}

// //                 {/* CONTENT BODY */}
// //                 <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify mb-10">
// //                     <div dangerouslySetInnerHTML={{ __html: blog.content }} />
// //                 </article>

// //                 {/* KOMPONEN KOMENTAR (CONDITIONAL) */}
// //                 {/* [FIX] Jika allowComments !== false (undefined dianggap true), tampilkan komentar */}
// //                 {blog.allowComments !== false ? (
// //                     <BlogComments blogId={id as string} onCountChange={setCommentCount} />
// //                 ) : (
// //                     <div className="mt-10 p-10 bg-gray-50 rounded-3xl border border-gray-100 text-center text-gray-500">
// //                         <MessageCircleOff className="mx-auto mb-3 text-gray-300" size={32} />
// //                         <p className="font-medium text-lg">Komentar dinonaktifkan</p>
// //                         <p className="text-sm">Admin telah mematikan fitur komentar untuk cerita ini.</p>
// //                     </div>
// //                 )}

// //             </div>
// //         </div>
// //     );
// // }

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { api, getImageUrl } from '@/lib/api';
// // [FIX] Pastikan path import benar.
// import BlogCommentSection from '@/components/BlogCommentSection';
// import { ArrowLeft, Calendar, Share2, MoreVertical, Eye, MessageCircle } from 'lucide-react';
// import Link from 'next/link';

// export default function BlogDetailPage() {
//     const params = useParams();
//     const router = useRouter();
//     const blogId = params?.id as string;

//     const [blog, setBlog] = useState<any>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!blogId) return;
//         const fetchBlog = async () => {
//             try {
//                 setLoading(true);
//                 const data = await api(`/api/blog/${blogId}`);
//                 setBlog(data);
//             } catch (err) { console.error("Error", err); } 
//             finally { setLoading(false); }
//         };
//         fetchBlog();
//     }, [blogId]);

//     const handleShare = () => {
//         navigator.clipboard.writeText(window.location.href);
//         alert('Link disalin!');
//     };

//     if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-indigo-600 rounded-full"></div></div>;
//     if (!blog) return <div className="text-center py-20 text-gray-500">Blog tidak ditemukan.</div>;

//     return (
//         <div className="min-h-screen bg-gray-50 pb-20 font-sans">
//             <header className="bg-white sticky top-0 z-40 border-b border-gray-200 shadow-sm">
//                 <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
//                     <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-red-700 transition-colors font-medium text-sm">
//                         <ArrowLeft size={18} /> Kembali
//                     </button>
                    
//                     {/* [FIX] Accessibility for Button */}
//                     <button 
//                         className="p-2 hover:bg-gray-100 rounded-full text-gray-500" 
//                         title="Opsi Lainnya" 
//                         aria-label="Opsi Lainnya"
//                     >
//                         <MoreVertical size={20} />
//                     </button>
//                 </div>
//             </header>

//             <main className="max-w-4xl mx-auto px-4 py-8">
//                 <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
//                     {blog.coverUrl && (
//                         <div className="h-64 md:h-96 w-full relative">
//                             <img src={getImageUrl(blog.coverUrl)} alt={blog.title} className="w-full h-full object-cover"/>
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                             <h1 className="absolute bottom-6 left-6 right-6 text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-md">{blog.title}</h1>
//                         </div>
//                     )}
                    
//                     <div className="p-6 md:p-8">
//                         <div className="flex flex-wrap items-center gap-4 mb-8 text-xs text-gray-500 border-b border-gray-100 pb-4">
//                             <div className="flex items-center gap-2">
//                                 {/* [FIX] Accessibility for Avatar Image */}
//                                 {blog.author?.avatarUrl ? (
//                                     <img 
//                                         src={getImageUrl(blog.author.avatarUrl)} 
//                                         className="w-6 h-6 rounded-full object-cover" 
//                                         alt={blog.author?.name || 'Penulis'}
//                                     />
//                                 ) : (
//                                     <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-600">{blog.author?.name?.charAt(0)}</div>
//                                 )}
//                                 <span className="font-bold text-gray-900">{blog.author?.name || 'Anonim'}</span>
//                             </div>
//                             <span>•</span>
//                             <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</span>
//                             <span>•</span>
//                             <span className="flex items-center gap-1" title="Dilihat"><Eye size={14}/> {blog.views || 0}</span>
                            
//                             <button onClick={handleShare} className="ml-auto flex items-center gap-1 text-indigo-600 font-bold hover:underline"><Share2 size={14} /> Share</button>
//                         </div>

//                         <div className="prose max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
//                     </div>
//                 </article>

//                 {/* KOMENTAR BLOG (PAGINATION) */}
//                 <BlogCommentSection blogId={blogId} />
//             </main>
//         </div>
//     );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, getImageUrl } from '@/lib/api';
import { 
    Calendar, 
    User, 
    Eye, 
    ArrowLeft, 
    Share2, 
    Clock 
} from 'lucide-react';
import BlogCommentSection from '@/components/BlogCommentSection';

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params as { id: string };

    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    
    // [CRITICAL FIX] Ref untuk mencegah double-fetch di React Strict Mode (Dev)
    const isFetchedRef = useRef(false);

    useEffect(() => {
        if (!id) return;

        // Cek apakah sudah pernah di-fetch di sesi mount ini
        if (isFetchedRef.current) return;
        isFetchedRef.current = true;

        const fetchBlog = async () => {
            try {
                setLoading(true);
                // Panggil API (Ini akan trigger views +1 di backend)
                const res = await api(`/api/blog/${id}`);
                setBlog(res);
            } catch (e) {
                console.error("Gagal load blog", e);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    // Helper Format Tanggal
    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 gap-4">
                <h1 className="text-xl font-bold text-gray-800">Cerita tidak ditemukan</h1>
                <Link href="/blog" className="text-red-600 hover:underline">Kembali ke Katalog</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            {/* --- HEADER IMAGE --- */}
            <div className="relative h-[400px] w-full bg-gray-900">
                {/* Background Image */}
                <img 
                    src={getImageUrl(blog.coverUrl)} 
                    alt={blog.title} 
                    className="w-full h-full object-cover opacity-60"
                />
                
                {/* Back Button */}
                <div className="absolute top-6 left-6 z-20">
                    <Link href="/blog" className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all text-sm font-bold">
                        <ArrowLeft size={18} /> Kembali
                    </Link>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-32 pb-10 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags?.map((tag: string, idx: number) => (
                                <span key={idx} className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wide">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 shadow-black drop-shadow-lg">
                            {blog.title}
                        </h1>
                        
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
                            <div className="flex items-center gap-2">
                                {blog.user?.avatarUrl ? (
                                    <img src={getImageUrl(blog.user.avatarUrl)} className="w-8 h-8 rounded-full border-2 border-white/50" alt="Author"/>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center font-bold text-white border-2 border-white/50">
                                        {blog.user?.name?.charAt(0)}
                                    </div>
                                )}
                                <span className="font-medium text-white">{blog.user?.name || 'Admin'}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={16}/> {formatDate(blog.createdAt)}
                            </div>
                            <div className="flex items-center gap-1.5" title="Dilihat">
                                <Eye size={16}/> {blog.views} Views
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT AREA --- */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                    {/* Share & Actions */}
                    <div className="flex justify-end mb-6 border-b border-gray-100 pb-4">
                        <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors text-sm font-bold">
                            <Share2 size={18}/> Bagikan
                        </button>
                    </div>

                    {/* Blog Content (HTML) */}
                    <article className="prose prose-lg max-w-none prose-indigo prose-img:rounded-xl prose-a:text-red-600 hover:prose-a:text-red-700">
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </article>
                </div>

                {/* --- COMMENT SECTION --- */}
                {/* Kita gunakan komponen yang sudah diperbaiki sebelumnya */}
                <div id="comments">
                    <BlogCommentSection blogId={id} />
                </div>
            </div>
        </div>
    );
}
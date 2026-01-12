// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { api, getImageUrl } from '@/lib/api';
// // import Protected from '@/components/Protected';
// // import { ArrowLeft, Calendar, Share2 } from 'lucide-react';

// // export default function BlogDetail() {
// //   const { id } = useParams();
// //   const router = useRouter();
// //   const [blog, setBlog] = useState<any>(null);

// //   useEffect(() => {
// //     const load = async () => {
// //         try { const data = await api(`/api/blog/${id}`); setBlog(data); } 
// //         catch (e) { console.error(e); }
// //     };
// //     load();
// //   }, [id]);

// //   if (!blog) return <div className="p-20 text-center">Memuat...</div>;

// //   return (
// //     <Protected>
// //       <div className="max-w-4xl mx-auto p-6 font-sans min-h-screen">
// //         <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-red-700 font-bold mb-6 text-sm" aria-label="Kembali ke halaman sebelumnya"><ArrowLeft size={16}/> Kembali</button>
        
// //         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
// //             {/* Hero Image */}
// //             <div className="h-64 md:h-96 w-full bg-gray-100 relative">
// //                 {blog.coverUrl && <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title}/>}
// //                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8 pt-20">
// //                     <div className="flex gap-2 mb-2">
// //                          {blog.tags.map((t:string, i:number) => <span key={i} className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold uppercase">{t}</span>)}
// //                     </div>
// //                     <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{blog.title}</h1>
// //                 </div>
// //             </div>

// //             <div className="p-8 md:p-12">
// //                 {/* Meta */}
// //                 <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
// //                     <div className="flex items-center gap-4">
// //                         <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
// //                             <img src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'User'}`} className="w-full h-full object-cover" alt="Avatar Penulis"/>
// //                         </div>
// //                         <div>
// //                             <p className="font-bold text-gray-900">{blog.author?.name || 'Anonim'}</p>
// //                             <p className="text-xs text-gray-500 flex items-center gap-1"><Calendar size={12}/> {new Date(blog.createdAt).toLocaleDateString('id-ID', {dateStyle:'full'})}</p>
// //                         </div>
// //                     </div>
// //                     <button className="text-gray-400 hover:text-blue-600" aria-label="Bagikan Cerita"><Share2 size={20}/></button>
// //                 </div>

// //                 {/* Content */}
// //                 <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
// //                     {blog.content}
// //                 </div>
// //             </div>
// //         </div>
// //       </div>
// //     </Protected>
// //   );
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { api, getImageUrl } from '@/lib/api';
// import { Calendar, ArrowLeft, Share2 } from 'lucide-react';
// import Link from 'next/link';

// export default function BlogDetail() {
//     const { id } = useParams();
//     const [blog, setBlog] = useState<any>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadBlog = async () => {
//             if (!id) return;
//             try {
//                 const res = await api(`/api/blog/${id}`);
//                 setBlog(res);
//             } catch (e) {
//                 console.error("Gagal load blog:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadBlog();
//     }, [id]);

//     if (loading) return (
//         <div className="min-h-screen flex items-center justify-center bg-white">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div>
//         </div>
//     );

//     if (!blog) return (
//         <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
//             <h1 className="text-2xl font-bold text-gray-800 mb-2">Cerita Tidak Ditemukan</h1>
//             <Link href="/" className="text-[#990000] hover:underline">Kembali ke Beranda</Link>
//         </div>
//     );

//     return (
//         <div className="bg-white min-h-screen font-sans pb-20 pt-6">
//             <div className="max-w-4xl mx-auto px-6">
                
//                 {/* Navigasi Balik */}
//                 <div className="mb-6">
//                     <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#990000] transition-colors">
//                         <ArrowLeft size={18} /> Kembali ke Beranda
//                     </Link>
//                 </div>

//                 {/* Judul & Header */}
//                 <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
//                     {blog.title}
//                 </h1>

//                 {/* Author Info */}
//                 <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
//                     <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
//                              <img
//                                 src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'Admin'}&background=random`}
//                                 className="w-full h-full object-cover"
//                                 alt="Author"
//                             />
//                         </div>
//                         <div>
//                             <p className="text-sm font-bold text-gray-900">{blog.author?.name || 'Administrator'}</p>
//                             <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
//                                 <Calendar size={12} />
//                                 <span>
//                                     {new Date(blog.createdAt).toLocaleDateString('id-ID', { 
//                                         weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
//                                     })}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
                    
//                     {/* [FIX] Menambahkan aria-label agar tombol terbaca accessibility tool */}
//                     <button 
//                         className="text-gray-400 hover:text-[#990000] transition p-2 rounded-full hover:bg-red-50"
//                         aria-label="Bagikan Cerita"
//                         title="Bagikan Cerita"
//                     >
//                         <Share2 size={20}/>
//                     </button>
//                 </div>

//                 {/* Cover Image (Jika Ada) */}
//                 {blog.coverUrl && (
//                     <div className="w-full h-64 md:h-[400px] rounded-2xl overflow-hidden mb-10 shadow-lg relative bg-gray-100">
//                         <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title} />
//                     </div>
//                 )}

//                 {/* CONTENT BODY [Render HTML] */}
//                 <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify">
//                     <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//                 </article>

//             </div>
//         </div>
//     );
// }
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api';
import { Calendar, ArrowLeft, Share2, Eye, MessageCircle } from 'lucide-react';
import Link from 'next/link';
// [NEW] Import Komponen Komentar
import BlogComments from '@/components/BlogComments';

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [commentCount, setCommentCount] = useState(0); // [NEW] State count

    useEffect(() => {
        const loadBlog = async () => {
            if (!id) return;
            try {
                const res = await api(`/api/blog/${id}`);
                setBlog(res);
            } catch (e) {
                console.error("Gagal load blog:", e);
            } finally {
                setLoading(false);
            }
        };
        loadBlog();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#990000]"></div>
        </div>
    );

    if (!blog) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Cerita Tidak Ditemukan</h1>
            <Link href="/" className="text-[#990000] hover:underline">Kembali ke Beranda</Link>
        </div>
    );

    return (
        <div className="bg-white min-h-screen font-sans pb-20 pt-6">
            <div className="max-w-4xl mx-auto px-6">
                
                {/* Navigasi Balik */}
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#990000] transition-colors">
                        <ArrowLeft size={18} /> Kembali ke Beranda
                    </Link>
                </div>

                {/* Judul & Header */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                    {blog.title}
                </h1>

                {/* Author Info & Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-6 mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                             <img
                                src={blog.author?.avatarUrl ? getImageUrl(blog.author.avatarUrl) : `https://ui-avatars.com/api/?name=${blog.author?.name || 'Admin'}&background=random`}
                                className="w-full h-full object-cover"
                                alt="Author"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">{blog.author?.name || 'Administrator'}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                                <span className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(blog.createdAt).toLocaleDateString('id-ID', { 
                                        year: 'numeric', month: 'long', day: 'numeric' 
                                    })}
                                </span>
                                {/* [NEW] Indikator Views & Comments */}
                                <span className="flex items-center gap-1" title="Dilihat">
                                    <Eye size={12} /> {blog.views || 0}
                                </span>
                                <span className="flex items-center gap-1" title="Komentar">
                                    <MessageCircle size={12} /> {commentCount}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        className="text-gray-400 hover:text-[#990000] transition p-2 rounded-full hover:bg-red-50 self-start sm:self-center"
                        aria-label="Bagikan Cerita"
                        title="Bagikan Cerita"
                    >
                        <Share2 size={20}/>
                    </button>
                </div>

                {/* Cover Image */}
                {blog.coverUrl && (
                    <div className="w-full h-64 md:h-[400px] rounded-2xl overflow-hidden mb-10 shadow-lg relative bg-gray-100">
                        <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title} />
                    </div>
                )}

                {/* CONTENT BODY */}
                <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify mb-10">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </article>

                {/* [NEW] KOMPONEN KOMENTAR */}
                {/* Kita passing blogId dan fungsi untuk update jumlah komentar di header */}
                <BlogComments blogId={id as string} onCountChange={setCommentCount} />

            </div>
        </div>
    );
}
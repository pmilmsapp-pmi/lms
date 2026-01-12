// 'use client';

// import { useState, useEffect } from 'react';
// import { api, getImageUrl } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import { Send, Trash2, Reply, MoreHorizontal } from 'lucide-react';
// import Swal from 'sweetalert2';

// interface CommentProps {
//     blogId: string;
//     onCountChange?: (count: number) => void;
// }

// export default function BlogComments({ blogId, onCountChange }: CommentProps) {
//     const { user } = useAuth();
//     const [comments, setComments] = useState<any[]>([]);
//     const [content, setContent] = useState('');
//     const [replyTo, setReplyTo] = useState<any>(null); // State untuk mode reply
//     const [loading, setLoading] = useState(false);

//     // Load Comments
//     const fetchComments = async () => {
//         try {
//             const res = await api(`/api/comment/${blogId}`);
//             setComments(res);
//             if(onCountChange) onCountChange(res.length);
//         } catch (e) { console.error(e); }
//     };

//     useEffect(() => { fetchComments(); }, [blogId]);

//     // Handle Submit
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!content.trim()) return;
//         if (!user) return Swal.fire('Login Diperlukan', 'Silakan login untuk berkomentar.', 'info');

//         setLoading(true);
//         try {
//             await api('/api/comment', {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     content,
//                     blogId,
//                     parentId: replyTo ? replyTo._id : null
//                 })
//             });
//             setContent('');
//             setReplyTo(null);
//             fetchComments(); // Refresh list
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle Delete
//     const handleDelete = async (id: string) => {
//         const result = await Swal.fire({
//             title: 'Hapus komentar?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Ya, Hapus',
//             confirmButtonColor: '#d33'
//         });
//         if (result.isConfirmed) {
//             try {
//                 await api(`/api/comment/${id}`, { method: 'DELETE' });
//                 fetchComments();
//             } catch (e) {
//                 Swal.fire('Gagal', 'Tidak dapat menghapus komentar.', 'error');
//             }
//         }
//     };

//     // Handle Reply Click
//     const handleReply = (comment: any) => {
//         setReplyTo(comment);
//         // Mention otomatis
//         setContent(`@${comment.author.name} `);
//         // Scroll ke input
//         document.getElementById('comment-input')?.focus();
//     };

//     // Helper: Check Permission
//     const canDelete = (commentAuthorId: string) => {
//         if (!user) return false;
//         const allowedRoles = ['SUPER_ADMIN', 'FACILITATOR', 'ADMIN'];
//         return user.uid === commentAuthorId || allowedRoles.includes(user.role);
//     };

//     // Render List
//     const renderCommentItem = (c: any, isReply = false) => (
//         <div key={c._id} className={`flex gap-3 mb-4 ${isReply ? 'ml-12 border-l-2 border-gray-100 pl-4' : ''}`}>
//             <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
//                 <img src={c.author?.avatarUrl ? getImageUrl(c.author.avatarUrl) : `https://ui-avatars.com/api/?name=${c.author?.name}`} className="w-full h-full object-cover" />
//             </div>
//             <div className="flex-1 bg-gray-50 p-3 rounded-lg rounded-tl-none">
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <span className="font-bold text-sm text-gray-800">{c.author?.name}</span>
//                         <span className="text-xs text-gray-400 ml-2">
//                             {new Date(c.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', hour:'2-digit', minute:'2-digit'})}
//                         </span>
//                         {c.author?.role !== 'STUDENT' && (
//                             <span className="ml-2 text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold uppercase">{c.author.role}</span>
//                         )}
//                     </div>
//                     {canDelete(c.author?._id) && (
//                         <button onClick={() => handleDelete(c._id)} className="text-gray-400 hover:text-red-500 transition">
//                             <Trash2 size={14}/>
//                         </button>
//                     )}
//                 </div>
//                 <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{c.content}</p>
                
//                 {/* Reply Button */}
//                 {!isReply && user && (
//                     <button onClick={() => handleReply(c)} className="text-xs text-[#990000] font-bold mt-2 flex items-center gap-1 hover:underline">
//                         <Reply size={12}/> Balas
//                     </button>
//                 )}
//             </div>
//         </div>
//     );

//     // Grouping Parent & Children
//     const parentComments = comments.filter(c => !c.parentId);
//     const getReplies = (parentId: string) => comments.filter(c => c.parentId === parentId);

//     return (
//         <div className="mt-12 pt-8 border-t border-gray-100">
//             <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
//                 Komentar <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{comments.length}</span>
//             </h3>

//             {/* Input Form */}
//             {user ? (
//                 <form onSubmit={handleSubmit} className="mb-8 flex gap-3 items-start">
//                     <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-100">
//                         <img src={getImageUrl(user.avatarUrl)} className="w-full h-full object-cover" />
//                     </div>
//                     <div className="flex-1 relative">
//                         {replyTo && (
//                             <div className="flex justify-between items-center bg-gray-100 px-3 py-1 text-xs text-gray-600 rounded-t-lg border-b border-white">
//                                 <span>Membalas ke <b>{replyTo.author?.name}</b></span>
//                                 <button type="button" onClick={() => { setReplyTo(null); setContent(''); }}><XCircleIcon/></button>
//                             </div>
//                         )}
//                         <textarea
//                             id="comment-input"
//                             className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm resize-none"
//                             placeholder={replyTo ? "Tulis balasan..." : "Tulis komentar Anda..."}
//                             rows={replyTo ? 2 : 3}
//                             value={content}
//                             onChange={(e) => setContent(e.target.value)}
//                         ></textarea>
//                         <button 
//                             type="submit" 
//                             disabled={loading || !content.trim()}
//                             className="absolute bottom-3 right-3 bg-[#990000] text-white p-2 rounded-lg hover:bg-red-800 disabled:opacity-50 transition-all shadow-sm"
//                         >
//                             {loading ? <span className="animate-spin text-xs">...</span> : <Send size={16}/>}
//                         </button>
//                     </div>
//                 </form>
//             ) : (
//                 <div className="bg-gray-50 p-4 rounded-xl text-center text-sm text-gray-500 mb-8 border border-gray-100">
//                     Silakan <a href="/login" className="text-[#990000] font-bold hover:underline">Login</a> untuk ikut berdiskusi.
//                 </div>
//             )}

//             {/* List */}
//             <div className="space-y-2">
//                 {parentComments.length > 0 ? parentComments.map(parent => (
//                     <div key={parent._id}>
//                         {renderCommentItem(parent)}
//                         {/* Render Replies */}
//                         {getReplies(parent._id).map(reply => renderCommentItem(reply, true))}
//                     </div>
//                 )) : (
//                     <p className="text-gray-400 text-sm italic text-center py-4">Belum ada komentar. Jadilah yang pertama!</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// function XCircleIcon() {
//     return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>;
// }
'use client';

import { useState, useEffect } from 'react';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import { Send, Trash2, Reply, XCircle } from 'lucide-react';
import Swal from 'sweetalert2';

interface CommentProps {
    blogId: string;
    onCountChange?: (count: number) => void;
}

export default function BlogComments({ blogId, onCountChange }: CommentProps) {
    const { user } = useAuth();
    const [comments, setComments] = useState<any[]>([]);
    const [content, setContent] = useState('');
    const [replyTo, setReplyTo] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        try {
            const res = await api(`/api/comment/${blogId}`);
            setComments(res);
            if(onCountChange) onCountChange(res.length);
        } catch (e) { console.error(e); }
    };

    useEffect(() => { fetchComments(); }, [blogId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        if (!user) return Swal.fire('Login Diperlukan', 'Silakan login untuk berkomentar.', 'info');

        setLoading(true);
        try {
            await api('/api/comment', {
                method: 'POST',
                body: JSON.stringify({
                    content,
                    blogId,
                    parentId: replyTo ? replyTo._id : null
                })
            });
            setContent('');
            setReplyTo(null);
            fetchComments();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Hapus komentar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus',
            confirmButtonColor: '#d33'
        });
        if (result.isConfirmed) {
            try {
                await api(`/api/comment/${id}`, { method: 'DELETE' });
                fetchComments();
            } catch (e) {
                Swal.fire('Gagal', 'Tidak dapat menghapus komentar.', 'error');
            }
        }
    };

    const handleReply = (comment: any) => {
        setReplyTo(comment);
        setContent(`@${comment.author.name} `);
        document.getElementById('comment-input')?.focus();
    };

    // [FIX] Menggunakan user.id alih-alih user.uid
    const canDelete = (commentAuthorId: string) => {
        if (!user) return false;
        const allowedRoles = ['SUPER_ADMIN', 'FACILITATOR'];
        return user.id === commentAuthorId || allowedRoles.includes(user.role);
    };

    const renderCommentItem = (c: any, isReply = false) => (
        <div key={c._id} className={`flex gap-3 mb-4 ${isReply ? 'ml-12 border-l-2 border-gray-100 pl-4' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                {/* [FIX] Menambahkan alt text */}
                <img 
                    src={c.author?.avatarUrl ? getImageUrl(c.author.avatarUrl) : `https://ui-avatars.com/api/?name=${c.author?.name}`} 
                    alt={c.author?.name || 'User'}
                    className="w-full h-full object-cover" 
                />
            </div>
            <div className="flex-1 bg-gray-50 p-3 rounded-lg rounded-tl-none">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="font-bold text-sm text-gray-800">{c.author?.name}</span>
                        <span className="text-xs text-gray-400 ml-2">
                            {new Date(c.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', hour:'2-digit', minute:'2-digit'})}
                        </span>
                    </div>
                    {canDelete(c.author?._id) && (
                        /* [FIX] Menambahkan aria-label */
                        <button 
                            onClick={() => handleDelete(c._id)} 
                            className="text-gray-400 hover:text-red-500 transition"
                            aria-label="Hapus komentar"
                        >
                            <Trash2 size={14}/>
                        </button>
                    )}
                </div>
                <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{c.content}</p>
                
                {!isReply && user && (
                    <button onClick={() => handleReply(c)} className="text-xs text-[#990000] font-bold mt-2 flex items-center gap-1 hover:underline">
                        <Reply size={12}/> Balas
                    </button>
                )}
            </div>
        </div>
    );

    const parentComments = comments.filter(c => !c.parentId);
    const getReplies = (parentId: string) => comments.filter(c => c.parentId === parentId);

    return (
        <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">
                Komentar <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{comments.length}</span>
            </h3>

            {user ? (
                <form onSubmit={handleSubmit} className="mb-8 flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-100">
                        {/* [FIX] Menambahkan alt text */}
                        <img 
                            src={getImageUrl(user.avatarUrl)} 
                            alt={user.name}
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <div className="flex-1 relative">
                        {replyTo && (
                            <div className="flex justify-between items-center bg-gray-100 px-3 py-1 text-xs text-gray-600 rounded-t-lg border-b border-white">
                                <span>Membalas ke <b>{replyTo.author?.name}</b></span>
                                <button type="button" onClick={() => { setReplyTo(null); setContent(''); }} aria-label="Batal balas">
                                    <XCircle size={14}/>
                                </button>
                            </div>
                        )}
                        <textarea
                            id="comment-input"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm resize-none"
                            placeholder={replyTo ? "Tulis balasan..." : "Tulis komentar Anda..."}
                            rows={replyTo ? 2 : 3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            aria-label="Isi komentar"
                        ></textarea>
                        {/* [FIX] Menambahkan aria-label */}
                        <button 
                            type="submit" 
                            disabled={loading || !content.trim()}
                            className="absolute bottom-3 right-3 bg-[#990000] text-white p-2 rounded-lg hover:bg-red-800 disabled:opacity-50 transition-all shadow-sm"
                            aria-label="Kirim komentar"
                        >
                            {loading ? <span className="animate-spin text-xs">...</span> : <Send size={16}/>}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-gray-50 p-4 rounded-xl text-center text-sm text-gray-500 mb-8 border border-gray-100">
                    Silakan <a href="/login" className="text-[#990000] font-bold hover:underline">Login</a> untuk ikut berdiskusi.
                </div>
            )}

            <div className="space-y-2">
                {parentComments.length > 0 ? parentComments.map(parent => (
                    <div key={parent._id}>
                        {renderCommentItem(parent)}
                        {getReplies(parent._id).map(reply => renderCommentItem(reply, true))}
                    </div>
                )) : (
                    <p className="text-gray-400 text-sm italic text-center py-4">Belum ada komentar. Jadilah yang pertama!</p>
                )}
            </div>
        </div>
    );
}
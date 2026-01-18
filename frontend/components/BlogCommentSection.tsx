'use client';

import { useState, useEffect } from 'react';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import { Send, ChevronLeft, ChevronRight, MessageSquare, Reply, Trash2, Smile, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface CommentProps {
    blogId: string;
}

export default function BlogCommentSection({ blogId }: CommentProps) {
    const { user } = useAuth();
    
    const [comments, setComments] = useState<any[]>([]);
    const [replies, setReplies] = useState<any[]>([]); 
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalComments: 0 });
    
    const [inputText, setInputText] = useState('');
    const [replyingTo, setReplyingTo] = useState<any>(null); 
    const [showEmoji, setShowEmoji] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isAdminOrFacilitator = user?.role === 'SUPER_ADMIN' || user?.role === 'FACILITATOR';

    const fetchComments = async (page = 1) => {
        setIsLoading(true);
        try {
            const res = await api(`/api/blog/${blogId}/comments?page=${page}`);
            setComments(res.comments || []);
            setReplies(res.replies || []);
            setPagination(res.pagination || { currentPage: 1, totalPages: 1, totalComments: 0 });
        } catch (e) { console.error(e); } 
        finally { setIsLoading(false); }
    };

    useEffect(() => {
        if (blogId) fetchComments(1);
    }, [blogId]);

    const handleSend = async () => {
        if (!inputText.trim()) return;
        setIsSending(true);
        try {
            await api(`/api/blog/${blogId}/comments`, {
                method: 'POST',
                body: { 
                    content: inputText,
                    parentId: replyingTo ? replyingTo._id : null
                }
            });
            setInputText('');
            setReplyingTo(null);
            setShowEmoji(false);
            fetchComments(pagination.currentPage); 
        } catch (e: any) {
            alert('Gagal kirim: ' + e.message);
        } finally {
            setIsSending(false);
        }
    };

    const handleDelete = async (commentId: string) => {
        if(!confirm("Hapus komentar ini?")) return;
        try {
            await api(`/api/blog/comments/${commentId}`, { method: 'DELETE' });
            fetchComments(pagination.currentPage);
        } catch (e: any) { alert("Gagal hapus"); }
    };

    const onEmojiClick = (emojiData: any) => {
        setInputText(prev => prev + emojiData.emoji);
        setShowEmoji(false);
    };

    const renderCommentItem = (comment: any, isReply = false) => {
        const isMyComment = user && (comment.user?._id === user.id || comment.user?.id === user.id);
        const canDelete = isMyComment || isAdminOrFacilitator;

        return (
            <div key={comment._id} className={`group ${isReply ? 'mt-3 pl-4 md:pl-10 border-l-2 border-indigo-50' : ''}`}>
                <div className={`bg-white border ${isReply ? 'border-gray-100 bg-slate-50' : 'border-gray-200'} p-4 rounded-2xl rounded-tl-none shadow-sm relative transition-all hover:shadow-md`}>
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                            <div className="shrink-0">
                                {comment.user?.avatarUrl ? (
                                    <img src={getImageUrl(comment.user.avatarUrl)} className="w-8 h-8 rounded-full object-cover border" alt={comment.user.name || 'User'}/>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                                        {comment.user?.name?.charAt(0) || '?'}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                                    {comment.user?.name || 'User'}
                                    {['SUPER_ADMIN', 'FACILITATOR'].includes(comment.user?.role) && <span className="bg-red-100 text-red-600 text-[10px] px-1.5 rounded-full">Admin</span>}
                                </h4>
                                <span className="text-[10px] text-gray-400">{new Date(comment.createdAt).toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!isReply && user && (
                                <button onClick={() => setReplyingTo(comment)} className="text-indigo-600 p-1.5 hover:bg-indigo-50 rounded-full" title="Balas" aria-label="Balas Komentar">
                                    <Reply size={14}/>
                                </button>
                            )}
                            {canDelete && (
                                <button onClick={() => handleDelete(comment._id)} className="text-red-600 p-1.5 hover:bg-red-50 rounded-full" title="Hapus" aria-label="Hapus Komentar">
                                    <Trash2 size={14}/>
                                </button>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{comment.content}</p>
                </div>
                {!isReply && replies.filter(r => r.parent === comment._id).map(r => renderCommentItem(r, true))}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8 overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <MessageSquare size={18} className="text-indigo-600"/> 
                    Diskusi ({pagination.totalComments + replies.length})
                </h3>
            </div>

            <div className="p-6 space-y-6 min-h-[200px]">
                {isLoading ? (
                    <p className="text-center text-gray-400 text-sm py-10">Memuat komentar...</p>
                ) : comments.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm italic py-10">Jadilah yang pertama berkomentar!</p>
                ) : (
                    comments.map(c => renderCommentItem(c))
                )}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-4 border-t border-gray-100 bg-gray-50">
                    <button 
                        onClick={() => fetchComments(pagination.currentPage - 1)} 
                        disabled={pagination.currentPage === 1} 
                        className="p-2 rounded-full hover:bg-white disabled:opacity-30 border border-transparent hover:border-gray-200 transition"
                        title="Halaman Sebelumnya"
                        aria-label="Halaman Sebelumnya"
                    >
                        <ChevronLeft size={16}/>
                    </button>
                    <span className="text-xs font-bold text-gray-600">
                        Hal {pagination.currentPage} dari {pagination.totalPages}
                    </span>
                    <button 
                        onClick={() => fetchComments(pagination.currentPage + 1)} 
                        disabled={pagination.currentPage === pagination.totalPages} 
                        className="p-2 rounded-full hover:bg-white disabled:opacity-30 border border-transparent hover:border-gray-200 transition"
                        title="Halaman Selanjutnya"
                        aria-label="Halaman Selanjutnya"
                    >
                        <ChevronRight size={16}/>
                    </button>
                </div>
            )}

            {/* Input Form */}
            <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0 z-20">
                {replyingTo && (
                    <div className="flex justify-between items-center bg-indigo-50 p-2 px-4 rounded-lg mb-2 text-xs text-indigo-700 border border-indigo-100">
                        <span>Balas ke <strong>{replyingTo.user?.name}</strong>: "{replyingTo.content.substring(0, 30)}..."</span>
                        <button onClick={() => setReplyingTo(null)} className="hover:bg-indigo-100 p-1 rounded-full" aria-label="Batal Balas"><X size={14}/></button>
                    </div>
                )}
                
                {user ? (
                    <div className="flex gap-2 relative items-end">
                        {showEmoji && (
                            <div className="absolute bottom-14 left-0 z-50 shadow-2xl rounded-xl">
                                <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} />
                            </div>
                        )}
                        <button 
                            onClick={() => setShowEmoji(!showEmoji)} 
                            className="p-3 text-gray-400 hover:text-yellow-500 transition-colors" 
                            title="Emoji"
                            aria-label="Buka Emoji Picker"
                        >
                            <Smile size={20}/>
                        </button>
                        
                        <textarea 
                            className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none min-h-[45px] max-h-[120px] transition-all overflow-hidden"
                            placeholder={replyingTo ? "Tulis balasan..." : "Tulis komentar..."}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            disabled={isSending}
                            rows={1}
                            onInput={(e:any) => { 
                                e.target.style.height = 'auto'; 
                                e.target.style.height = e.target.scrollHeight + 'px'; 
                            }}
                        />
                        <button 
                            onClick={handleSend} 
                            disabled={!inputText.trim() || isSending} 
                            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 disabled:opacity-50 shadow-md transition-transform active:scale-95"
                            title="Kirim"
                            aria-label="Kirim Komentar"
                        >
                            <Send size={16}/>
                        </button>
                    </div>
                ) : (
                    <div className="text-center text-sm text-gray-500 py-2">Silakan login untuk berdiskusi.</div>
                )}
            </div>
        </div>
    );
}
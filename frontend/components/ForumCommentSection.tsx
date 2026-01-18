'use client';

import { useState, useEffect, useRef } from 'react';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import { Send, Reply, ChevronLeft, ChevronRight, MessageSquare, X, CornerDownRight, Smile, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface CommentProps {
    forumId: string;
}

export default function ForumCommentSection({ forumId }: CommentProps) {
    const { user } = useAuth();
    
    // Data State
    const [comments, setComments] = useState<any[]>([]); 
    const [replies, setReplies] = useState<any[]>([]);   
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalComments: 0 });
    
    // UI State
    const [inputText, setInputText] = useState('');
    const [replyingTo, setReplyingTo] = useState<any>(null); 
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showEmoji, setShowEmoji] = useState(false);
    const [mentionQuery, setMentionQuery] = useState('');
    const [showMentionPopup, setShowMentionPopup] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const isAdminOrFacilitator = user?.role === 'SUPER_ADMIN' || user?.role === 'FACILITATOR';

    // --- FETCH DATA ---
    const fetchComments = async (page = 1) => {
        setIsLoading(true);
        try {
            const res = await api(`/api/forum/${forumId}/comments?page=${page}`);
            setComments(res.comments || []);
            setReplies(res.replies || []);
            setPagination(res.pagination || { currentPage: 1, totalPages: 1, totalComments: 0 });
        } catch (e) {
            console.error("Gagal load komentar", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (forumId) fetchComments(1);
    }, [forumId]);

    // --- HANDLERS ---
    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        setIsSending(true);
        try {
            await api(`/api/forum/${forumId}/comments`, {
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
            alert('Gagal kirim: ' + (e.message || "Terjadi kesalahan"));
        } finally {
            setIsSending(false);
        }
    };

    const handleDelete = async (commentId: string) => {
        if(!confirm("Hapus komentar ini?")) return;
        try {
            await api(`/api/forum/${forumId}/comments/${commentId}`, { method: 'DELETE' });
            fetchComments(pagination.currentPage);
        } catch (e: any) {
            alert("Gagal hapus: " + e.message);
        }
    };

    const onEmojiClick = (emojiData: any) => {
        setInputText(prev => prev + emojiData.emoji);
        setShowEmoji(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setInputText(val);
        
        const lastWord = val.split(' ').pop();
        if (lastWord?.startsWith('@') && lastWord.length > 1) {
            setMentionQuery(lastWord.substring(1));
            setShowMentionPopup(true);
        } else {
            setShowMentionPopup(false);
        }
    };

    // --- RENDER HELPERS ---
    const renderCommentItem = (comment: any, isReply = false) => {
        const isMyComment = comment.user?._id === user?.id;
        const canDelete = isMyComment || isAdminOrFacilitator;

        return (
            <div key={comment._id} className={`group relative ${isReply ? 'mt-3 pl-4 md:pl-10 border-l-2 border-indigo-50' : ''} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`bg-white border ${isReply ? 'border-gray-100 bg-slate-50' : 'border-gray-200'} p-4 rounded-2xl rounded-tl-none shadow-sm hover:shadow-md transition-all relative`}>
                    
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                                {comment.user?.avatarUrl ? (
                                    <img src={getImageUrl(comment.user.avatarUrl)} className={`${isReply ? 'w-6 h-6' : 'w-8 h-8'} rounded-full object-cover border border-gray-200`} alt={comment.user.name}/>
                                ) : (
                                    <div className={`${isReply ? 'w-6 h-6 text-[10px]' : 'w-8 h-8 text-xs'} rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold`}>
                                        {comment.user?.name?.charAt(0) || '?'}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className={`font-bold text-gray-900 ${isReply ? 'text-xs' : 'text-sm'}`}>
                                    {comment.user?.name || 'Pengguna Tidak Dikenal'} 
                                    {['SUPER_ADMIN', 'FACILITATOR'].includes(comment.user?.role) && (
                                        <span className="ml-2 bg-red-100 text-red-600 text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wide">Admin</span>
                                    )}
                                </h4>
                                <span className="text-[10px] text-gray-400">{new Date(comment.createdAt).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!isReply && (
                                <button 
                                    onClick={() => {
                                        setReplyingTo(comment);
                                        document.getElementById('comment-input')?.focus();
                                    }}
                                    className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded transition-colors"
                                    title="Balas"
                                    aria-label="Balas Komentar" // [FIX] Accessibility
                                >
                                    <Reply size={14} />
                                </button>
                            )}
                            {canDelete && (
                                <button 
                                    onClick={() => handleDelete(comment._id)}
                                    className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
                                    title="Hapus"
                                    aria-label="Hapus Komentar" // [FIX] Accessibility
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    <p className={`text-gray-700 leading-relaxed ${isReply ? 'text-xs' : 'text-sm'}`}>{comment.content}</p>
                </div>

                {!isReply && renderReplies(comment._id)}
            </div>
        );
    };

    const renderReplies = (parentId: string) => {
        const childComments = replies.filter(r => r.parent === parentId);
        if (childComments.length === 0) return null;
        return <div>{childComments.map(reply => renderCommentItem(reply, true))}</div>;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8 overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm md:text-base">
                    <MessageSquare size={18} className="text-indigo-600"/> 
                    Diskusi ({pagination.totalComments + replies.length})
                </h3>
            </div>

            <div className="p-6 space-y-6 min-h-[200px]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
                        <p className="text-sm">Memuat diskusi...</p>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                        <p className="text-sm italic">Belum ada komentar. Mulailah diskusi!</p>
                    </div>
                ) : (
                    comments.map(comment => renderCommentItem(comment))
                )}
            </div>

            {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-4 border-t border-gray-100 bg-gray-50/50">
                    <button 
                        onClick={() => fetchComments(pagination.currentPage - 1)} 
                        disabled={pagination.currentPage === 1} 
                        className="p-2 rounded-full hover:bg-white disabled:opacity-30 border border-transparent hover:border-gray-200 transition-all"
                        title="Halaman Sebelumnya"
                        aria-label="Halaman Sebelumnya" // [FIX] Accessibility
                    >
                        <ChevronLeft size={20}/>
                    </button>
                    <span className="text-xs font-bold text-gray-600 bg-white px-3 py-1 rounded-full border">Halaman {pagination.currentPage} / {pagination.totalPages}</span>
                    <button 
                        onClick={() => fetchComments(pagination.currentPage + 1)} 
                        disabled={pagination.currentPage === pagination.totalPages} 
                        className="p-2 rounded-full hover:bg-white disabled:opacity-30 border border-transparent hover:border-gray-200 transition-all"
                        title="Halaman Selanjutnya"
                        aria-label="Halaman Selanjutnya" // [FIX] Accessibility
                    >
                        <ChevronRight size={20}/>
                    </button>
                </div>
            )}

            <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                {replyingTo && (
                    <div className="flex justify-between items-center bg-indigo-50 p-2 px-4 rounded-lg mb-2 text-xs text-indigo-700 animate-in slide-in-from-bottom-2 border border-indigo-100">
                        <div className="flex items-center gap-2">
                            <Reply size={12} />
                            <span>Membalas ke <strong>{replyingTo.user?.name}</strong></span>
                        </div>
                        <button onClick={() => setReplyingTo(null)} className="hover:bg-indigo-100 p-1 rounded-full transition-colors" title="Batal Balas" aria-label="Batal Balas"><X size={14}/></button>
                    </div>
                )}
                
                {user ? (
                    <div className="relative">
                        {showEmoji && <div className="absolute bottom-16 left-0 z-50"><EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350}/></div>}
                        
                        <div className="flex gap-3 items-end">
                            <img src={getImageUrl(user?.avatarUrl)} className="w-8 h-8 rounded-full object-cover border border-gray-200 hidden md:block" alt="Me"/>
                            
                            <div className="flex-1 relative bg-white border border-gray-300 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all shadow-sm flex items-center pr-2">
                                <button 
                                    type="button" 
                                    onClick={() => setShowEmoji(!showEmoji)} 
                                    className="p-3 text-gray-400 hover:text-yellow-500 transition-colors"
                                    title="Emoji"
                                    aria-label="Buka Emoji" // [FIX] Accessibility
                                >
                                    <Smile size={20}/>
                                </button>
                                
                                {/* [FIX] Replaced inline style minHeight with Tailwind min-h-[3rem] */}
                                <textarea 
                                    id="comment-input"
                                    ref={inputRef}
                                    value={inputText}
                                    onChange={handleInputChange}
                                    placeholder={replyingTo ? "Tulis balasan..." : "Tulis komentar..."}
                                    className="w-full text-sm outline-none bg-transparent resize-none py-3 h-12 max-h-32 min-h-[3rem]"
                                    disabled={isSending}
                                />
                                
                                <button 
                                    onClick={handleSend}
                                    disabled={!inputText.trim() || isSending}
                                    className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-90 ml-2"
                                    title="Kirim"
                                    aria-label="Kirim Komentar" // [FIX] Accessibility
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-sm text-gray-500 py-2">
                        Silakan <a href="/login" className="text-indigo-600 font-bold hover:underline">Masuk</a> untuk berdiskusi.
                    </div>
                )}
            </div>
        </div>
    );
}
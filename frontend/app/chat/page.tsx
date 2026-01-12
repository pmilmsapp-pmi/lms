'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';

export default function ChatInboxPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadConversations = async () => {
    try {
      const res = await api('/api/chat/conversations');
      setConversations(res.conversations);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  return (
    <Protected>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">💬 Pesan Masuk</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Memuat pesan...</div>
          ) : conversations.length === 0 ? (
            <div className="p-10 text-center text-gray-400 flex flex-col items-center">
                <span className="text-4xl mb-2">📭</span>
                Belum ada riwayat percakapan.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {conversations.map((conv: any) => (
                <div 
                  key={conv.user._id} 
                  onClick={() => router.push(`/chat/${conv.user._id}`)} // Kita akan buat page detail ini nanti
                  className={`p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors ${conv.unreadCount > 0 ? 'bg-blue-50' : ''}`}
                >
                  <div className="relative">
                    <img 
                      src={getImageUrl(conv.user.avatarUrl) || `https://ui-avatars.com/api/?name=${conv.user.name}`} 
                      alt={conv.user.name} 
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    {conv.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                        {conv.user.name} <span className="text-xs font-normal text-gray-500">({conv.user.role})</span>
                      </h3>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {new Date(conv.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Protected>
  );
}
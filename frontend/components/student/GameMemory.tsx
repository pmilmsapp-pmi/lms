'use client';

import { useState, useEffect } from 'react';
import { getImageUrl } from '@/lib/api';
import { RotateCw, CheckCircle, RefreshCw } from 'lucide-react';

interface Props {
    content: string; // JSON string dari database
    lessonId: string;
    onComplete: (id: string) => void;
}

export default function GameMemory({ content, lessonId, onComplete }: Props) {
    const [cards, setCards] = useState<any[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);

    // Inisialisasi Game
    useEffect(() => {
        startNewGame();
    }, [content]);

    const startNewGame = () => {
        try {
            const rawData = JSON.parse(content || '[]');
            // Gandakan data (pair), beri ID unik, lalu acak
            const deck = [...rawData, ...rawData]
                .map((item, index) => ({ 
                    ...item, 
                    uniqueId: index, // ID unik untuk key React
                    isFlipped: false 
                }))
                .sort(() => Math.random() - 0.5);
            
            setCards(deck);
            setFlippedIndices([]);
            setMatchedPairs([]);
            setIsCompleted(false);
        } catch (e) {
            console.error("Gagal load game data", e);
            setCards([]);
        }
    };

    const handleCardClick = (index: number) => {
        // Cegah klik jika:
        // 1. Sudah ada 2 kartu terbuka (sedang menunggu animasi tutup)
        // 2. Kartu ini sudah cocok (matched)
        // 3. Kartu ini sedang terbuka (diklik lagi)
        if (flippedIndices.length >= 2 || matchedPairs.includes(cards[index].pairId) || flippedIndices.includes(index)) {
            return;
        }

        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);

        // Jika sudah 2 kartu terbuka, cek kecocokan
        if (newFlipped.length === 2) {
            const firstIdx = newFlipped[0];
            const secondIdx = newFlipped[1];
            const firstCard = cards[firstIdx];
            const secondCard = cards[secondIdx];

            if (firstCard.pairId === secondCard.pairId) {
                // COCOK!
                const newMatched = [...matchedPairs, firstCard.pairId];
                setMatchedPairs(newMatched);
                setFlippedIndices([]); // Reset flip state agar kartu tetap terbuka via logic render

                // Cek Menang
                if (newMatched.length === (cards.length / 2)) {
                    setIsCompleted(true);
                    // Panggil fungsi parent untuk tandai selesai di server
                    // Beri delay sedikit agar efek visual selesai dulu
                    setTimeout(() => onComplete(lessonId), 1000); 
                }
            } else {
                // TIDAK COCOK, tutup kembali setelah 1 detik
                setTimeout(() => {
                    setFlippedIndices([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="bg-indigo-50 p-6 md:p-10 rounded-3xl border border-indigo-100 shadow-sm relative overflow-hidden">
            {/* Hiasan Background */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 text-center mb-8">
                <h2 className="text-2xl font-black text-indigo-900 mb-2 flex items-center justify-center gap-2">
                    🧠 Memory Games
                </h2>
                <p className="text-indigo-600 text-sm font-medium">Temukan semua pasangan kartu yang identik!</p>
                
                <div className="mt-4 flex justify-center gap-4">
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-sm font-bold text-indigo-800 border border-indigo-100">
                        Pasangan: {matchedPairs.length} / {cards.length / 2}
                    </div>
                    <button 
                        onClick={startNewGame}
                        className="bg-white px-4 py-2 rounded-xl shadow-sm text-sm font-bold text-indigo-600 border border-indigo-100 hover:bg-indigo-50 transition-colors flex items-center gap-2"
                    >
                        <RefreshCw size={14}/> Reset
                    </button>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
                {cards.map((card, idx) => {
                    const isFlipped = flippedIndices.includes(idx) || matchedPairs.includes(card.pairId);
                    const isMatched = matchedPairs.includes(card.pairId);
                    
                    return (
                        <div 
                            key={`${card.uniqueId}-${idx}`} 
                            onClick={() => handleCardClick(idx)}
                            className={`aspect-square cursor-pointer perspective-1000 group ${isMatched ? 'cursor-default' : ''}`}
                        >
                            <div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-md rounded-2xl ${isFlipped ? 'rotate-y-180' : ''}`}>
                                {/* SISI BELAKANG (TUTUP) */}
                                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center border-2 border-white/20 group-hover:shadow-lg transition-all">
                                    <span className="text-3xl text-white/50 font-bold">?</span>
                                </div>
                                
                                {/* SISI DEPAN (ISI) - Putar 180deg agar pas dibalik tampil benar */}
                                <div className={`absolute inset-0 backface-hidden bg-white rounded-2xl flex flex-col items-center justify-center border-4 rotate-y-180 p-2 text-center transition-all ${isMatched ? 'border-green-400 bg-green-50' : 'border-indigo-200'}`}>
                                    {card.image ? (
                                        <img src={getImageUrl(card.image)} alt="card" className="w-full h-full object-contain rounded-lg"/>
                                    ) : (
                                        <p className="font-bold text-gray-800 text-xs md:text-sm select-none">{card.text}</p>
                                    )}
                                    
                                    {isMatched && (
                                        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-sm">
                                            <CheckCircle size={12} fill="white" className="text-green-500"/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {isCompleted && (
                <div className="mt-8 text-center animate-in zoom-in duration-500 relative z-20">
                    <div className="inline-block p-4 bg-green-100 rounded-full text-green-600 mb-4 shadow-lg shadow-green-200">
                        <CheckCircle size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-gray-800 mb-2">HEBAT! 🎉</h3>
                    <p className="text-gray-600">Kamu berhasil menyelesaikan permainan ini.</p>
                </div>
            )}
        </div>
    );
}
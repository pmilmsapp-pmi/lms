// 'use client';

// import { useState, useEffect } from 'react';
// import { api } from '@/lib/api';

// interface QuizPlayerProps {
//   quizId: string;
//   courseId: string;
//   onComplete: () => void; // Callback saat kuis selesai/lulus
// }

// export default function QuizPlayer({ quizId, courseId, onComplete }: QuizPlayerProps) {
//   const [quiz, setQuiz] = useState<any>(null);
//   const [attemptId, setAttemptId] = useState<string | null>(null);
//   const [answers, setAnswers] = useState<number[]>([]);
  
//   // Timer & UI State
//   const [timeLeft, setTimeLeft] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [result, setResult] = useState<any>(null);

//   // 1. Load Data Quiz
//   useEffect(() => {
//     const loadQuiz = async () => {
//       try {
//         setLoading(true);
//         const res = await api(`/api/quiz/${quizId}`);
//         const quizData = res.quiz || res; 
//         setQuiz(quizData);
        
//         // Cek apakah user sedang resume (timer server)
//         if (quizData.isResuming && quizData.serverTimeLeft !== undefined) {
//             setAttemptId("resumed"); 
//             setTimeLeft(quizData.serverTimeLeft);
//         }

//         if (quizData.questions) {
//             setAnswers(new Array(quizData.questions.length).fill(-1));
//         }
//       } catch (e: any) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadQuiz();
//   }, [quizId]);

//   // 2. Timer Logic
//   useEffect(() => {
//     if (timeLeft === null) return;
//     if (timeLeft <= 0) {
//       handleAutoSubmit();
//       return;
//     }
//     const timerId = setInterval(() => {
//       setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
//     }, 1000);
//     return () => clearInterval(timerId);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [timeLeft]);

//   const handleStart = async () => {
//     try {
//       setLoading(true);
//       const res = await api(`/api/quiz/${quizId}/start`, { method: 'POST' });
//       setAttemptId("started");
//       const duration = res.durationSeconds || (quiz?.quizDuration ? quiz.quizDuration * 60 : 600);
//       setTimeLeft(duration);
//     } catch (e: any) {
//       alert("Gagal memulai: " + e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (isAuto = false) => {
//     if (isSubmitting) return;
//     setIsSubmitting(true);

//     try {
//       const res = await api(`/api/quiz/${quizId}/submit`, { 
//         method: 'POST', 
//         body: { answers } 
//       });
//       setResult(res); // Simpan hasil untuk ditampilkan
      
//       // Jika lulus, trigger parent untuk update progress
//       if (res.passed) {
//           onComplete(); 
//       }
//     } catch (e: any) {
//       alert('Error: ' + e.message);
//       setIsSubmitting(false);
//     }
//   };

//   const handleAutoSubmit = () => handleSubmit(true);

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s < 10 ? '0' : ''}${s}`;
//   };

//   if (loading && !quiz) return <div className="p-10 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div></div>;

//   // --- TAMPILAN HASIL ---
//   if (result) {
//       return (
//         <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-200">
//             <div className="text-6xl mb-4">{result.passed ? '🎉' : '😢'}</div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 {result.passed ? 'Selamat! Anda Lulus.' : 'Belum Lulus'}
//             </h2>
//             <div className="flex justify-center gap-8 my-6">
//                 <div>
//                     <p className="text-xs text-gray-400 uppercase font-bold">Skor</p>
//                     <p className={`text-4xl font-black ${result.passed ? 'text-green-600' : 'text-red-600'}`}>{result.score}</p>
//                 </div>
//                 <div>
//                     <p className="text-xs text-gray-400 uppercase font-bold">Benar</p>
//                     <p className="text-4xl font-black text-gray-800">{result.correctCount}/{result.totalQuestions}</p>
//                 </div>
//             </div>
//             {!result.passed && (
//                 <button onClick={() => window.location.reload()} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold">Coba Lagi</button>
//             )}
//         </div>
//       );
//   }

//   // --- TAMPILAN START ---
//   if (!attemptId) {
//       return (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-10 text-center">
//             <div className="text-6xl mb-4">📝</div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">{quiz.title}</h2>
//             <p className="text-gray-600 mb-6">
//                 Durasi: <strong>{quiz.quizDuration} Menit</strong> • Jumlah Soal: <strong>{quiz.questions.length}</strong>
//             </p>
//             <button onClick={handleStart} className="bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-yellow-700 transition-all shadow-lg active:scale-95">
//                 Mulai Kuis Sekarang
//             </button>
//         </div>
//       );
//   }

//   // --- TAMPILAN SOAL ---
//   return (
//     <div className="space-y-6">
//       {/* Sticky Header Timer */}
//       <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-indigo-100 sticky top-0 z-20">
//          <h3 className="font-bold text-gray-700">Pengerjaan Kuis</h3>
//          <div className={`px-4 py-1 rounded font-mono font-bold ${timeLeft! < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-indigo-100 text-indigo-700'}`}>
//             ⏱ {formatTime(timeLeft || 0)}
//          </div>
//       </div>

//       {quiz.questions?.map((q: any, i: number) => (
//         <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex gap-4 mb-4">
//               <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full font-bold text-gray-600 text-sm flex-shrink-0">{i + 1}</span>
//               <p className="font-medium text-lg text-gray-800">{q.question}</p>
//           </div>
//           <div className="space-y-3 ml-12">
//             {q.options?.map((choice: string, cIndex: number) => (
//               <label key={cIndex} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-colors ${answers[i] === cIndex ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' : 'border-gray-200 hover:bg-gray-50'}`}>
//                 <input type="radio" name={`q-${i}`} className="w-4 h-4 text-indigo-600" checked={answers[i] === cIndex} onChange={() => {
//                     const newAnswers = [...answers];
//                     newAnswers[i] = cIndex;
//                     setAnswers(newAnswers);
//                 }} />
//                 <span className="text-gray-700">{choice}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       ))}

//       <div className="flex justify-end pt-4">
//          <button 
//             onClick={() => { if(confirm("Kirim jawaban sekarang?")) handleSubmit(false); }} 
//             disabled={isSubmitting} 
//             className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg disabled:opacity-50"
//          >
//             {isSubmitting ? 'Mengirim...' : 'Kirim Jawaban ✅'}
//          </button>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ChevronRight, RefreshCw } from 'lucide-react';

// [FIX ERROR TYPESCRIPT DISINI]
interface QuizPlayerProps {
    quizId: string;
    courseId: string;
    lessonData?: any; 
    // Ubah tipe onComplete agar menerima object result
    onComplete: (result: { score: number, attempts: number }) => void; 
}

export default function QuizPlayer({ quizId, courseId, lessonData, onComplete }: QuizPlayerProps) {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [answers, setAnswers] = useState<number[]>([]); 
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(1);

    useEffect(() => {
        setCurrentQuestionIdx(0);
        setSelectedOption(null);
        setAnswers([]);
        setShowResult(false);
        setScore(0);
    }, [quizId]);

    // Fallback jika lessonData.questions tidak ada (ambil dari lessonData langsung jika struktur flat)
    const questions = lessonData?.questions || [];

    const handleNext = () => {
        if (selectedOption === null) return;

        const newAnswers = [...answers];
        newAnswers[currentQuestionIdx] = selectedOption;
        setAnswers(newAnswers);

        if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
            setSelectedOption(null);
        } else {
            finishQuiz(newAnswers);
        }
    };

    const finishQuiz = (finalAnswers: number[]) => {
        let correctCount = 0;
        questions.forEach((q: any, idx: number) => {
            if (finalAnswers[idx] === q.correctIndex) {
                correctCount++;
            }
        });

        // Hitung skor 0-100
        const finalScore = questions.length > 0 
            ? Math.round((correctCount / questions.length) * 100) 
            : 0;
            
        setScore(finalScore);
        setShowResult(true);

        // [FIX] Kirim data hasil ke parent (page.tsx)
        if (onComplete) {
            onComplete({ score: finalScore, attempts: attempts });
        }
    };

    const handleRetry = () => {
        setAttempts(prev => prev + 1);
        setCurrentQuestionIdx(0);
        setSelectedOption(null);
        setAnswers([]);
        setShowResult(false);
    };

    if (!questions || questions.length === 0) {
        return <div className="p-10 text-center text-gray-400 border border-dashed rounded-xl">Belum ada soal untuk kuis ini.</div>;
    }

    if (showResult) {
        const isPassed = score >= 70;
        return (
            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center animate-in zoom-in duration-300">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${isPassed ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                    {isPassed ? <CheckCircle size={48} /> : <XCircle size={48} />}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {isPassed ? 'Lulus!' : 'Belum Lulus'}
                </h2>
                <p className="text-gray-500 mb-6">Kamu mendapatkan skor:</p>
                <div className={`text-6xl font-black mb-8 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>{score}</div>
                
                <div className="flex justify-center gap-4">
                    {!isPassed && (
                        <button onClick={handleRetry} className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all">
                            <RefreshCw size={18}/> Coba Lagi
                        </button>
                    )}
                </div>
                <p className="text-xs text-gray-400 mt-8 font-medium uppercase tracking-wider">Percobaan ke-{attempts}</p>
            </div>
        );
    }

    const currentQ = questions[currentQuestionIdx];

    return (
        <div className="bg-white p-6 md:p-10 rounded-2xl border border-gray-200 shadow-sm max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-indigo-500 bg-indigo-50 px-2 py-1 rounded uppercase tracking-wider">Quiz</span>
                    <span className="text-sm font-bold text-gray-400">Soal {currentQuestionIdx + 1} / {questions.length}</span>
                </div>
                <div className="w-1/3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}></div>
                </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-snug">
                {currentQ.question}
            </h3>

            <div className="space-y-3 mb-10">
                {currentQ.options.map((opt: string, idx: number) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                            selectedOption === idx 
                                ? 'border-indigo-600 bg-indigo-50/50 shadow-md' 
                                : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                        }`}
                    >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selectedOption === idx ? 'border-indigo-600' : 'border-gray-300 group-hover:border-indigo-400'}`}>
                            {selectedOption === idx && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
                        </div>
                        <span className={`text-base ${selectedOption === idx ? 'text-indigo-900 font-bold' : 'text-gray-600'}`}>{opt}</span>
                    </button>
                ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="bg-indigo-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                    {currentQuestionIdx === questions.length - 1 ? 'Selesai & Lihat Hasil' : 'Selanjutnya'}
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}

// // // // // 'use client';
// // // // // import { useParams } from 'next/navigation';
// // // // // import { useEffect, useState } from 'react';
// // // // // import { api } from '@/lib/api';

// // // // // export default function QuizPage() {
// // // // //   const params = useParams();
// // // // //   const courseId = params?.courseId as string;
// // // // //   const quizId = params?.quizId as string;
// // // // //   const [quiz, setQuiz] = useState<any | null>(null);
// // // // //   const [attemptId, setAttemptId] = useState<string | null>(null);
// // // // //   const [answers, setAnswers] = useState<number[]>([]);
// // // // //   const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
// // // // //   const [error, setError] = useState<string | null>(null);

// // // // //   useEffect(() => {
// // // // //     const load = async () => {
// // // // //       try {
// // // // //         const q = await api(`/api/quiz/${quizId}`);
// // // // //         setQuiz(q.quiz);
// // // // //         setAnswers(Array(q.quiz.questions.length).fill(-1));
// // // // //       } catch (e: any) { setError(e.message); }
// // // // //     };
// // // // //     if (quizId) load();
// // // // //   }, [quizId]);

// // // // //   const start = async () => {
// // // // //     try {
// // // // //       const res = await api(`/api/quiz/${quizId}/start`, { method: 'POST' });
// // // // //       setAttemptId(res.attempt.id);
// // // // //       if (res.attempt.durationSeconds) setSecondsLeft(res.attempt.durationSeconds);
// // // // //     } catch (e: any) { setError(e.message); }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     if (secondsLeft === null) return;
// // // // //     if (secondsLeft <= 0) return;
// // // // //     const t = setTimeout(() => setSecondsLeft(prev => (prev ? prev - 1 : prev)), 1000);
// // // // //     return () => clearTimeout(t);
// // // // //   }, [secondsLeft]);

// // // // //   const submit = async () => {
// // // // //     try {
// // // // //       const res = await api(`/api/quiz/${quizId}/submit`, { method: 'POST', body: { attemptId, answers } });
// // // // //       alert(`Quiz selesai. Skor: ${res.attempt.score}`);
// // // // //       window.history.back();
// // // // //     } catch (e: any) { alert(e.message); }
// // // // //   };

// // // // //   if (error) return <div className="text-red-600">{error}</div>;
// // // // //   if (!quiz) return <div>Memuat...</div>;

// // // // //   return (
// // // // //     <div className="space-y-4">
// // // // //       <h1 className="text-2xl font-bold">{quiz.title}</h1>
// // // // //       {attemptId ? (
// // // // //         <div className="text-sm text-gray-700">Waktu tersisa: {secondsLeft ?? '–'} detik</div>
// // // // //       ) : (
// // // // //         <button className="btn-primary" onClick={start}>Mulai</button>
// // // // //       )}

// // // // //       {attemptId && (
// // // // //         <div className="space-y-3">
// // // // //           {quiz.questions.map((q: any, i: number) => (
// // // // //             <div key={i} className="card space-y-2">
// // // // //               <div className="font-medium">{i+1}. {q.q}</div>
// // // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
// // // // //                 {q.choices.map((c: string, ci: number) => (
// // // // //                   <label key={ci} className="flex items-center gap-2">
// // // // //                     <input type="radio" name={`q${i}`} onChange={() => setAnswers(prev => { const arr = [...prev]; arr[i] = ci; return arr; })} />
// // // // //                     <span>{c}</span>
// // // // //                   </label>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>
// // // // //           ))}
// // // // //           <button className="btn-primary" onClick={submit}>Kirim Jawaban</button>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // 'use client';
// // // // import { useState, useEffect } from 'react';
// // // // import { useRouter } from 'next/navigation';

// // // // export default function QuizPage({ params }: { params: { courseId: string, quizId: string } }) {
// // // //   const router = useRouter();
// // // //   // Asumsi durasi kuis 10 menit (600 detik) - nanti ambil dari API quiz details
// // // //   const [timeLeft, setTimeLeft] = useState<number>(600); 
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // // //   // Fungsi Submit
// // // //   const handleSubmit = async () => {
// // // //     if (isSubmitting) return;
// // // //     setIsSubmitting(true);
// // // //     alert('Waktu habis! Kuis otomatis dikumpulkan.');
// // // //     // Panggil API submit di sini...
// // // //     // await api.post(...)
// // // //     router.push(`/courses/${params.courseId}`);
// // // //   };

// // // //   // Logic Timer
// // // //   useEffect(() => {
// // // //     // Jangan jalankan jika waktu sudah habis
// // // //     if (timeLeft <= 0) {
// // // //       handleSubmit();
// // // //       return;
// // // //     }

// // // //     // Interval kurangi 1 detik
// // // //     const timerId = setInterval(() => {
// // // //       setTimeLeft((prev) => prev - 1);
// // // //     }, 1000);

// // // //     // Cleanup interval
// // // //     return () => clearInterval(timerId);
// // // //   }, [timeLeft]);

// // // //   // Helper Format Waktu (MM:SS)
// // // //   const formatTime = (seconds: number) => {
// // // //     const m = Math.floor(seconds / 60);
// // // //     const s = seconds % 60;
// // // //     return `${m}:${s < 10 ? '0' : ''}${s}`;
// // // //   };

// // // //   return (
// // // //     <div className="p-6">
// // // //       <div className="fixed top-4 right-4 z-50">
// // // //         <div className={`px-4 py-2 rounded-lg font-bold shadow-lg text-white ${timeLeft < 60 ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`}>
// // // //           Sisa Waktu: {formatTime(timeLeft)}
// // // //         </div>
// // // //       </div>
      
// // // //       {/* Render Soal Kuis di sini */}
// // // //       <h1>Halaman Kuis</h1>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { api } from '@/lib/api';

// // // // Props dari Next.js App Router (params otomatis di-inject)
// // // export default function QuizPage({ params }: { params: { courseId: string, quizId: string } }) {
// // //   const router = useRouter();
// // //   const { courseId, quizId } = params;

// // //   // State Data
// // //   const [quiz, setQuiz] = useState<any | null>(null);
// // //   const [attemptId, setAttemptId] = useState<string | null>(null);
// // //   const [answers, setAnswers] = useState<number[]>([]);
  
// // //   // State Timer & UI
// // //   const [timeLeft, setTimeLeft] = useState<number | null>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [error, setError] = useState<string | null>(null);

// // //   // 1. Load Data Quiz
// // //   useEffect(() => {
// // //     const loadQuiz = async () => {
// // //       try {
// // //         const res = await api(`/api/quiz/${quizId}`);
// // //         setQuiz(res.quiz);
// // //         // Inisialisasi array jawaban dengan -1 (belum dijawab)
// // //         setAnswers(new Array(res.quiz.questions.length).fill(-1));
// // //       } catch (e: any) {
// // //         setError(e.message || 'Gagal memuat kuis');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     loadQuiz();
// // //   }, [quizId]);

// // //   // 2. Timer Logic (Countdown)
// // //   useEffect(() => {
// // //     if (timeLeft === null) return; // Timer belum mulai

// // //     if (timeLeft <= 0) {
// // //       handleAutoSubmit(); // Waktu habis
// // //       return;
// // //     }

// // //     const timerId = setInterval(() => {
// // //       setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
// // //     }, 1000);

// // //     return () => clearInterval(timerId);
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [timeLeft]);

// // //   // Fungsi Mulai
// // //   const handleStart = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await api(`/api/quiz/${quizId}/start`, { method: 'POST' });
// // //       setAttemptId(res.attempt.id);
      
// // //       // Set timer dari durasi kuis (misal 600 detik)
// // //       if (res.attempt.durationSeconds) {
// // //         setTimeLeft(res.attempt.durationSeconds);
// // //       } else {
// // //         // Fallback jika tidak ada durasi (misal 10 menit)
// // //         setTimeLeft(600); 
// // //       }
// // //     } catch (e: any) {
// // //       alert(e.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Fungsi Submit Manual & Auto
// // //   const handleSubmit = async (isAuto = false) => {
// // //     if (isSubmitting) return;
// // //     setIsSubmitting(true);

// // //     try {
// // //       const res = await api(`/api/quiz/${quizId}/submit`, { 
// // //         method: 'POST', 
// // //         body: { attemptId, answers } 
// // //       });
      
// // //       const msg = isAuto 
// // //         ? `Waktu Habis! Skor Anda: ${res.attempt.score}` 
// // //         : `Kuis Selesai. Skor Anda: ${res.attempt.score}`;
      
// // //       alert(msg);
// // //       router.push(`/courses/${courseId}`);
// // //     } catch (e: any) {
// // //       alert('Gagal mengirim jawaban: ' + e.message);
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   const handleAutoSubmit = () => {
// // //     handleSubmit(true);
// // //   };

// // //   // Format Menit:Detik
// // //   const formatTime = (seconds: number) => {
// // //     const m = Math.floor(seconds / 60);
// // //     const s = seconds % 60;
// // //     return `${m}:${s < 10 ? '0' : ''}${s}`;
// // //   };

// // //   // Render Loading / Error
// // //   if (loading && !quiz) return <div className="p-8 text-center">Memuat Kuis...</div>;
// // //   if (error) return <div className="p-8 text-red-600 text-center">{error}</div>;
// // //   if (!quiz) return null;

// // //   return (
// // //     <div className="max-w-3xl mx-auto p-6 space-y-6">
// // //       {/* Header */}
// // //       <div className="flex justify-between items-center border-b pb-4">
// // //         <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
// // //         {attemptId && timeLeft !== null && (
// // //           <div className={`px-4 py-2 rounded font-mono font-bold text-white shadow 
// // //             ${timeLeft < 60 ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`}>
// // //             {formatTime(timeLeft)}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Tampilan Sebelum Mulai */}
// // //       {!attemptId ? (
// // //         <div className="text-center py-10 space-y-4">
// // //           <p className="text-gray-600">Jumlah Soal: {quiz.questions.length}</p>
// // //           <p className="text-gray-600">Durasi: {Math.floor((quiz.durationSeconds || 600) / 60)} Menit</p>
// // //           <button 
// // //             onClick={handleStart} 
// // //             disabled={loading}
// // //             className="btn-primary text-lg px-8 py-3"
// // //           >
// // //             {loading ? 'Memproses...' : 'Mulai Kerjakan'}
// // //           </button>
// // //         </div>
// // //       ) : (
// // //         /* Tampilan Soal */
// // //         <div className="space-y-8">
// // //           {quiz.questions.map((q: any, i: number) => (
// // //             <div key={i} className="bg-white p-4 rounded shadow border border-gray-100">
// // //               <p className="font-semibold text-lg mb-3">
// // //                 <span className="text-gray-500 mr-2">{i + 1}.</span>
// // //                 {q.q}
// // //               </p>
// // //               <div className="space-y-2 ml-6">
// // //                 {q.choices.map((choice: string, cIndex: number) => (
// // //                   <label 
// // //                     key={cIndex} 
// // //                     className={`flex items-center gap-3 p-3 rounded cursor-pointer border hover:bg-gray-50 transition-colors
// // //                       ${answers[i] === cIndex ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
// // //                     `}
// // //                   >
// // //                     <input 
// // //                       type="radio" 
// // //                       name={`question-${i}`} 
// // //                       className="w-4 h-4 text-blue-600"
// // //                       checked={answers[i] === cIndex}
// // //                       onChange={() => {
// // //                         const newAnswers = [...answers];
// // //                         newAnswers[i] = cIndex;
// // //                         setAnswers(newAnswers);
// // //                       }}
// // //                     />
// // //                     <span className="text-gray-700">{choice}</span>
// // //                   </label>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           ))}

// // //           <div className="flex justify-end pt-6">
// // //             <button 
// // //               onClick={() => handleSubmit(false)} 
// // //               disabled={isSubmitting}
// // //               className="btn-primary w-full md:w-auto text-lg"
// // //             >
// // //               {isSubmitting ? 'Mengirim...' : 'Kirim Jawaban'}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { api } from '@/lib/api';

// // export default function QuizPage() {
// //   const params = useParams();
// //   const { courseId, quizId } = params as { courseId: string; quizId: string };
// //   const router = useRouter();

// //   const [quiz, setQuiz] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [answers, setAnswers] = useState<number[]>([]);
// //   const [result, setResult] = useState<any>(null);
// //   const [timeLeft, setTimeLeft] = useState(0); // Detik

// //   useEffect(() => {
// //     if (quizId) loadQuiz();
// //   }, [quizId]);

// //   // Timer Countdown
// //   useEffect(() => {
// //     if (timeLeft > 0 && !result) {
// //       const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
// //       return () => clearInterval(timer);
// //     } else if (timeLeft === 0 && quiz && !result) {
// //       handleSubmit(); // Auto submit jika waktu habis
// //     }
// //   }, [timeLeft, result, quiz]);

// //   const loadQuiz = async () => {
// //     try {
// //       setLoading(true);
// //       // Panggil API Backend yang sudah kita buat sebelumnya
// //       const data = await api(`/api/quiz/${quizId}`);
// //       setQuiz(data);
      
// //       // Inisialisasi jawaban kosong sesuai jumlah soal
// //       if (data.questions) {
// //         setAnswers(new Array(data.questions.length).fill(-1));
// //       }

// //       // Set Timer (menit ke detik)
// //       if (data.quizDuration) {
// //         setTimeLeft(data.quizDuration * 60);
// //       }
// //     } catch (e) {
// //       console.error(e);
// //       alert("Gagal memuat kuis.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSelectAnswer = (qIndex: number, optIndex: number) => {
// //     const newAnswers = [...answers];
// //     newAnswers[qIndex] = optIndex;
// //     setAnswers(newAnswers);
// //   };

// //   const handleSubmit = async () => {
// //     if (!confirm("Yakin ingin mengumpulkan jawaban?")) return;

// //     try {
// //       const res = await api(`/api/quiz/${quizId}/submit`, {
// //         method: 'POST',
// //         body: { answers }
// //       });
// //       setResult(res);
// //     } catch (e: any) {
// //       alert("Gagal mengirim jawaban: " + e.message);
// //     }
// //   };

// //   const formatTime = (seconds: number) => {
// //     const m = Math.floor(seconds / 60);
// //     const s = seconds % 60;
// //     return `${m}:${s < 10 ? '0' : ''}${s}`;
// //   };

// //   // --- 1. HANDLING LOADING ---
// //   if (loading) return (
// //     <div className="flex h-screen items-center justify-center bg-gray-50">
// //         <div className="text-center">
// //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto mb-4"></div>
// //             <p className="text-gray-500">Memuat Soal...</p>
// //         </div>
// //     </div>
// //   );

// //   // --- 2. HANDLING ERROR (DATA KOSONG) ---
// //   if (!quiz || !quiz.questions) return (
// //     <div className="flex h-screen items-center justify-center bg-gray-50">
// //         <div className="text-center p-8 bg-white rounded-xl shadow">
// //             <h3 className="text-xl font-bold text-red-600 mb-2">Gagal Memuat Data</h3>
// //             <p className="text-gray-500 mb-4">Data kuis tidak ditemukan atau rusak.</p>
// //             <button onClick={() => router.back()} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Kembali</button>
// //         </div>
// //     </div>
// //   );

// //   // --- 3. TAMPILAN HASIL ---
// //   if (result) {
// //     return (
// //         <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// //             <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-xl text-center">
// //                 <div className="text-6xl mb-4">{result.passed ? '🎉' : '😢'}</div>
// //                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
// //                     {result.passed ? 'Selamat! Anda Lulus.' : 'Belum Lulus'}
// //                 </h2>
// //                 <p className="text-gray-500 mb-6">{result.message}</p>
                
// //                 <div className="flex justify-center gap-8 mb-8">
// //                     <div className="text-center">
// //                         <p className="text-xs text-gray-400 uppercase font-bold">Skor Anda</p>
// //                         <p className={`text-4xl font-black ${result.passed ? 'text-green-600' : 'text-red-600'}`}>{result.score}</p>
// //                     </div>
// //                     <div className="text-center">
// //                         <p className="text-xs text-gray-400 uppercase font-bold">Benar</p>
// //                         <p className="text-4xl font-black text-gray-800">{result.correctCount}/{result.totalQuestions}</p>
// //                     </div>
// //                 </div>

// //                 <button 
// //                     onClick={() => router.push(`/courses/${courseId}`)}
// //                     className="w-full py-3 bg-red-700 text-white rounded-xl font-bold hover:bg-red-800 transition-transform active:scale-95"
// //                 >
// //                     Kembali ke Materi
// //                 </button>
// //             </div>
// //         </div>
// //     );
// //   }

// //   // --- 4. TAMPILAN SOAL (MAIN QUIZ) ---
// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col">
// //         {/* Header Sticky */}
// //         <div className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex justify-between items-center shadow-sm">
// //             <div>
// //                 <h1 className="font-bold text-gray-800 text-lg">{quiz.title}</h1>
// //                 <p className="text-xs text-gray-500">{quiz.questions.length} Soal</p>
// //             </div>
// //             <div className={`px-4 py-2 rounded-lg font-mono font-bold text-xl ${timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-700'}`}>
// //                 ⏱ {formatTime(timeLeft)}
// //             </div>
// //         </div>

// //         {/* Question List */}
// //         <div className="flex-1 max-w-3xl mx-auto w-full p-6 space-y-8 pb-32">
// //             {quiz.questions.map((q: any, idx: number) => (
// //                 <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
// //                     <div className="flex gap-4 mb-4">
// //                         <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">{idx + 1}</span>
// //                         <h3 className="text-lg font-medium text-gray-800 leading-relaxed">{q.question}</h3>
// //                     </div>
                    
// //                     <div className="space-y-3 pl-12">
// //                         {q.options.map((opt: string, optIdx: number) => (
// //                             <label 
// //                                 key={optIdx} 
// //                                 className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
// //                                     answers[idx] === optIdx 
// //                                     ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
// //                                     : 'bg-white border-gray-200 hover:bg-gray-50'
// //                                 }`}
// //                             >
// //                                 <input 
// //                                     type="radio" 
// //                                     name={`q-${idx}`} 
// //                                     className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
// //                                     checked={answers[idx] === optIdx}
// //                                     onChange={() => handleSelectAnswer(idx, optIdx)}
// //                                 />
// //                                 <span className="text-gray-700">{opt}</span>
// //                             </label>
// //                         ))}
// //                     </div>
// //                 </div>
// //             ))}
// //         </div>

// //         {/* Footer Submit */}
// //         <div className="bg-white border-t p-4 fixed bottom-0 w-full z-10">
// //             <div className="max-w-3xl mx-auto flex justify-end">
// //                 <button 
// //                     onClick={handleSubmit}
// //                     className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     disabled={answers.includes(-1)} // Disable jika ada yg belum diisi
// //                 >
// //                     ✅ Kumpulkan Jawaban
// //                 </button>
// //             </div>
// //         </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { api } from '@/lib/api';

// // Props dari Next.js App Router (params otomatis di-inject)
// export default function QuizPage({ params }: { params: { courseId: string, quizId: string } }) {
//   const router = useRouter();
//   const { courseId, quizId } = params;

//   // --- STATE MANAGEMENT ---
//   // Data Kuis & Percobaan
//   const [quiz, setQuiz] = useState<any | null>(null);
//   const [attemptId, setAttemptId] = useState<string | null>(null);
//   const [answers, setAnswers] = useState<number[]>([]);
  
//   // State Timer & UI
//   const [timeLeft, setTimeLeft] = useState<number | null>(null); // Dalam detik
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // --- 1. LOAD DATA QUIZ ---
//   useEffect(() => {
//     const loadQuiz = async () => {
//       try {
//         setLoading(true);
//         // Endpoint ini harus mengembalikan detail kuis (judul, durasi, daftar pertanyaan)
//         const res = await api(`/api/quiz/${quizId}`);
        
//         // Sesuaikan dengan struktur respons backend Anda
//         // Jika backend mengembalikan { quiz: { ... } }, gunakan res.quiz
//         // Jika langsung object kuis, gunakan res
//         const quizData = res.quiz || res; 
        
//         setQuiz(quizData);
//         // Inisialisasi array jawaban dengan -1 (artinya belum dijawab)
//         if (quizData.questions) {
//             setAnswers(new Array(quizData.questions.length).fill(-1));
//         }
//       } catch (e: any) {
//         console.error("Gagal memuat kuis:", e);
//         setError(e.message || 'Gagal memuat data kuis. Silakan coba lagi.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (quizId) {
//         loadQuiz();
//     }
//   }, [quizId]);

//   // --- 2. TIMER LOGIC (COUNTDOWN) ---
//   useEffect(() => {
//     // Jangan jalankan timer jika belum dimulai atau waktu null
//     if (timeLeft === null) return;

//     // Jika waktu habis, auto-submit
//     if (timeLeft <= 0) {
//       handleAutoSubmit();
//       return;
//     }

//     // Interval kurangi 1 detik
//     const timerId = setInterval(() => {
//       setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
//     }, 1000);

//     // Cleanup interval saat component unmount atau timer berubah
//     return () => clearInterval(timerId);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [timeLeft]);

//   // --- 3. HANDLER FUNGSI ---

//   // Mulai Kuis (Start Attempt)
//   const handleStart = async () => {
//     try {
//       setLoading(true);
//       // Panggil API untuk memulai sesi kuis (mencatat waktu mulai di backend)
//       const res = await api(`/api/quiz/${quizId}/start`, { method: 'POST' });
      
//       setAttemptId(res.attempt.id);
      
//       // Set timer dari durasi kuis
//       // Prioritas: Durasi sisa dari attempt (jika resume) -> Durasi kuis -> Default 600 detik
//       if (res.attempt.durationSeconds) {
//         setTimeLeft(res.attempt.durationSeconds);
//       } else if (quiz?.durationSeconds) {
//         setTimeLeft(quiz.durationSeconds);
//       } else if (quiz?.quizDuration) {
//          // Fallback jika field di DB bernama quizDuration (dalam menit)
//          setTimeLeft(quiz.quizDuration * 60);
//       } else {
//         setTimeLeft(600); // Default 10 menit
//       }
//     } catch (e: any) {
//       alert("Gagal memulai kuis: " + e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Submit Jawaban (Manual & Auto)
//   const handleSubmit = async (isAuto = false) => {
//     if (isSubmitting) return; // Mencegah double submit
//     setIsSubmitting(true);

//     try {
//       // Kirim jawaban ke backend
//       const res = await api(`/api/quiz/${quizId}/submit`, { 
//         method: 'POST', 
//         body: { attemptId, answers } 
//       });
      
//       const score = res.attempt?.score ?? res.score ?? 0;
//       const msg = isAuto 
//         ? `Waktu Habis! Jawaban Anda telah dikirim otomatis.\nSkor Akhir: ${score}` 
//         : `Kuis Selesai.\nSkor Akhir: ${score}`;
      
//       alert(msg);
//       // Redirect kembali ke halaman detail kursus
//       router.push(`/courses/${courseId}`);
//     } catch (e: any) {
//       alert('Terjadi kesalahan saat mengirim jawaban: ' + e.message);
//       setIsSubmitting(false); // Reset jika gagal agar bisa coba lagi
//     }
//   };

//   // Wrapper untuk Auto Submit saat timer habis
//   const handleAutoSubmit = () => {
//     handleSubmit(true);
//   };

//   // Helper Format Waktu (MM:SS)
//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
//   };

//   // --- 4. RENDER UI ---

//   // Tampilan Loading
//   if (loading && !quiz) {
//       return (
//         <div className="flex h-screen items-center justify-center bg-gray-50">
//             <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                 <p className="text-gray-500 font-medium">Memuat Kuis...</p>
//             </div>
//         </div>
//       );
//   }

//   // Tampilan Error
//   if (error) {
//       return (
//         <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
//             <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md border border-red-100">
//                 <div className="text-red-500 text-5xl mb-4">⚠️</div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h3>
//                 <p className="text-gray-600 mb-6">{error}</p>
//                 <button onClick={() => router.back()} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors">
//                     Kembali
//                 </button>
//             </div>
//         </div>
//       );
//   }

//   // Guard Clause: Jika data quiz null (seharusnya tidak terjadi karena loading handled)
//   if (!quiz) return null;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-3xl mx-auto space-y-6">
        
//         {/* Header Kuis */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-4 z-20 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
//             <p className="text-sm text-gray-500 mt-1">Total Soal: {quiz.questions?.length || 0}</p>
//           </div>
          
//           {/* Timer Display */}
//           {attemptId && timeLeft !== null && (
//             <div className={`px-6 py-3 rounded-lg font-mono text-xl font-bold text-white shadow-md transition-colors duration-500 
//               ${timeLeft < 60 ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`}>
//               ⏱ {formatTime(timeLeft)}
//             </div>
//           )}
//         </div>

//         {/* --- STATE: BELUM MULAI --- */}
//         {!attemptId ? (
//           <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center space-y-6">
//             <div className="text-6xl">📝</div>
//             <div className="space-y-2">
//                 <h2 className="text-xl font-bold text-gray-800">Siap Mengerjakan?</h2>
//                 <p className="text-gray-600 max-w-md mx-auto">
//                     Kuis ini terdiri dari <strong>{quiz.questions?.length} soal</strong>. 
//                     Waktu pengerjaan adalah <strong>{Math.floor((quiz.durationSeconds || quiz.quizDuration * 60 || 600) / 60)} menit</strong>.
//                     Waktu akan berjalan otomatis setelah tombol ditekan.
//                 </p>
//             </div>
//             <button 
//               onClick={handleStart} 
//               disabled={loading}
//               className="bg-blue-600 text-white text-lg font-bold px-10 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Memproses...' : 'Mulai Kerjakan Sekarang'}
//             </button>
//           </div>
//         ) : (
//           /* --- STATE: SEDANG MENGERJAKAN --- */
//           <div className="space-y-6">
//             {quiz.questions?.map((q: any, i: number) => (
//               <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                 <div className="flex gap-4 mb-4">
//                     <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 font-bold rounded-full flex items-center justify-center text-sm">
//                         {i + 1}
//                     </span>
//                     <p className="font-medium text-lg text-gray-800 leading-relaxed">
//                         {q.question || q.q} {/* Support format field 'question' atau 'q' */}
//                     </p>
//                 </div>
                
//                 <div className="space-y-3 ml-12">
//                   {(q.options || q.choices)?.map((choice: string, cIndex: number) => (
//                     <label 
//                       key={cIndex} 
//                       className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer border transition-all duration-200 group
//                         ${answers[i] === cIndex 
//                             ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
//                             : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
//                       `}
//                     >
//                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
//                           ${answers[i] === cIndex ? 'border-blue-600' : 'border-gray-400 group-hover:border-gray-500'}`}>
//                           {answers[i] === cIndex && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
//                       </div>
                      
//                       {/* Hidden Radio Input for Accessibility */}
//                       <input 
//                         type="radio" 
//                         name={`question-${i}`} 
//                         className="hidden"
//                         checked={answers[i] === cIndex}
//                         onChange={() => {
//                           const newAnswers = [...answers];
//                           newAnswers[i] = cIndex;
//                           setAnswers(newAnswers);
//                         }}
//                       />
//                       <span className={`${answers[i] === cIndex ? 'text-blue-900 font-medium' : 'text-gray-700'}`}>
//                         {choice}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))}

//             {/* Tombol Submit */}
//             <div className="sticky bottom-4 z-20 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-gray-200 shadow-lg flex justify-between items-center">
//                 <div className="text-sm text-gray-500 font-medium hidden md:block">
//                     {answers.filter(a => a !== -1).length} dari {quiz.questions.length} soal terjawab
//                 </div>
//                 <button 
//                   onClick={() => {
//                       if(confirm("Apakah Anda yakin ingin mengumpulkan jawaban?")) {
//                           handleSubmit(false);
//                       }
//                   }} 
//                   disabled={isSubmitting}
//                   className="w-full md:w-auto bg-green-600 text-white text-lg font-bold px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? 'Mengirim Jawaban...' : 'Kirim Jawaban ✅'}
//                 </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function QuizPage({ params }: { params: { courseId: string, quizId: string } }) {
  const router = useRouter();
  const { courseId, quizId } = params;

  const [quiz, setQuiz] = useState<any | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- 1. LOAD DATA QUIZ & SYNC TIMER ---
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        const res = await api(`/api/quiz/${quizId}`);
        const quizData = res.quiz || res; 
        setQuiz(quizData);

        // Inisialisasi jawaban
        if (quizData.questions) {
            setAnswers(new Array(quizData.questions.length).fill(-1));
        }

        // LOGIKA BARU: Cek apakah user sedang resume (refresh page)
        if (quizData.isResuming && quizData.serverTimeLeft !== undefined) {
            // Jika backend bilang user sedang mengerjakan, langsung set timer & attemptId dummy
            setAttemptId("resumed"); 
            setTimeLeft(quizData.serverTimeLeft);
        }

      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) loadQuiz();
  }, [quizId]);

  // --- 2. TIMER COUNTDOWN ---
  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // --- 3. START (JIKA BELUM PERNAH MULAI) ---
  const handleStart = async () => {
    try {
      setLoading(true);
      const res = await api(`/api/quiz/${quizId}/start`, { method: 'POST' });
      setAttemptId("started");
      
      // Hitung durasi awal (default 10 menit jika null)
      const duration = res.durationSeconds || (quiz?.quizDuration ? quiz.quizDuration * 60 : 600);
      setTimeLeft(duration);

    } catch (e: any) {
      alert("Gagal memulai: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (isAuto = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await api(`/api/quiz/${quizId}/submit`, { 
        method: 'POST', 
        body: { answers } 
      });
      
      const score = res.attempt?.score ?? res.score ?? 0;
      alert(isAuto ? `Waktu Habis! Skor: ${score}` : `Selesai! Skor: ${score}`);
      router.push(`/courses/${courseId}`);
    } catch (e: any) {
      alert('Error: ' + e.message);
      setIsSubmitting(false);
    }
  };

  const handleAutoSubmit = () => handleSubmit(true);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (loading && !quiz) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-4 bg-white sticky top-0 z-10 p-4 rounded-xl shadow-sm">
        <div>
            <h1 className="text-xl font-bold text-gray-800">{quiz.title}</h1>
            <p className="text-sm text-gray-500">{quiz.questions?.length} Soal</p>
        </div>
        {attemptId && timeLeft !== null && (
          <div className={`px-4 py-2 rounded font-mono font-bold text-white shadow ${timeLeft < 60 ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`}>
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* BELUM MULAI */}
      {!attemptId ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-600 mb-6">Waktu Pengerjaan: {Math.floor((quiz.quizDuration || 10))} Menit</p>
          <button onClick={handleStart} disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-transform active:scale-95">
            Mulai Kerjakan
          </button>
        </div>
      ) : (
        /* SOAL KUIS */
        <div className="space-y-6 pb-20">
          {quiz.questions?.map((q: any, i: number) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex gap-3 mb-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full font-bold text-gray-600 text-sm flex-shrink-0">{i + 1}</span>
                  <p className="font-medium text-lg text-gray-800">{q.question}</p>
              </div>
              <div className="space-y-3 ml-11">
                {q.options?.map((choice: string, cIndex: number) => (
                  <label key={cIndex} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-colors ${answers[i] === cIndex ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name={`q-${i}`} className="w-4 h-4 text-blue-600" checked={answers[i] === cIndex} onChange={() => {
                        const newAnswers = [...answers];
                        newAnswers[i] = cIndex;
                        setAnswers(newAnswers);
                    }} />
                    <span className="text-gray-700">{choice}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
             <div className="max-w-3xl mx-auto flex justify-between items-center">
                <span className="text-sm text-gray-500">{answers.filter(a => a !== -1).length} dari {quiz.questions.length} terjawab</span>
                <button onClick={() => { if(confirm("Kirim jawaban sekarang?")) handleSubmit(false); }} disabled={isSubmitting} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50">
                    {isSubmitting ? 'Mengirim...' : 'Kirim Jawaban'}
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
// // frontend/app/admin/quizzes/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { api } from '@/lib/api';
// import Link from 'next/link';

// export default function AdminQuizzesPage() {
//   const [quizzes, setQuizzes] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Load Data Kuis
//   useEffect(() => {
//     loadQuizzes();
//   }, []);

//   const loadQuizzes = async () => {
//     try {
//       setLoading(true);
//       // Panggil endpoint GET /api/quiz (list all quizzes)
//       const res = await api('/api/quiz');
//       setQuizzes(res.quizzes || []);
//     } catch (err: any) {
//       console.error(err);
//       // Jangan alert jika 404 (mungkin belum ada kuis), cukup log saja
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteQuiz = async (id: string) => {
//     if (!confirm('Yakin ingin menghapus kuis ini?')) return;
//     try {
//       await api(`/api/quiz/${id}`, { method: 'DELETE' });
//       loadQuizzes(); // Refresh list
//     } catch (err: any) {
//       alert(err.message || 'Gagal menghapus kuis');
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Manajemen Kuis</h1>
//         {/* Tombol Buat Kuis biasanya dilakukan via halaman Detail Kursus, 
//             tapi jika mau direct link bisa diarahkan ke halaman course list */}
//         <Link 
//           href="/admin/courses" 
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
//         >
//           + Buat Kuis via Kursus
//         </Link>
//       </div>

//       {loading ? (
//         <div>Memuat data...</div>
//       ) : (
//         <div className="bg-white shadow-sm rounded-lg border overflow-hidden">
//           {quizzes.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               Belum ada kuis yang dibuat. Silakan masuk ke Menu Kursus untuk membuat kuis.
//             </div>
//           ) : (
//             <table className="w-full text-left text-sm text-gray-600">
//               <thead className="bg-gray-50 text-gray-800 font-semibold uppercase text-xs">
//                 <tr>
//                   <th className="px-6 py-3">Judul Kuis</th>
//                   <th className="px-6 py-3">Kursus Terkait</th>
//                   <th className="px-6 py-3">Durasi</th>
//                   <th className="px-6 py-3 text-center">Jumlah Soal</th>
//                   <th className="px-6 py-3 text-right">Aksi</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {quizzes.map((quiz) => (
//                   <tr key={quiz._id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 font-medium text-gray-900">
//                       {quiz.title}
//                     </td>
//                     <td className="px-6 py-4">
//                       {/* Pastikan backend melakukan populate('course') */}
//                       {quiz.course?.title || <span className="text-red-400">Kursus Dihapus</span>}
//                     </td>
//                     <td className="px-6 py-4">
//                       {Math.floor((quiz.durationSeconds || 0) / 60)} Menit
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       {quiz.questions?.length || 0}
//                     </td>
//                     <td className="px-6 py-4 text-right space-x-2">
//                       <button 
//                         onClick={() => deleteQuiz(quiz._id)}
//                         className="text-red-600 hover:text-red-800 font-medium"
//                       >
//                         Hapus
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Trash2, Edit, FileText, Plus } from 'lucide-react'; // Gunakan icon biar cantik

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load Data Kuis
  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const res = await api('/api/quiz');
      setQuizzes(res.quizzes || []);
    } catch (err: any) {
      console.error("Gagal load kuis:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus kuis ini secara permanen?')) return;
    try {
      await api(`/api/quiz/${id}`, { method: 'DELETE' });
      // Hapus dari state lokal biar gak perlu reload
      setQuizzes((prev) => prev.filter((q) => q._id !== id));
      alert("Kuis berhasil dihapus.");
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus kuis');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Manajemen Kuis</h1>
            <p className="text-sm text-gray-500">Kelola semua kuis dan ujian di platform ini.</p>
        </div>
        <Link 
          href="/admin/courses" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <Plus size={18} /> Buat Kuis Baru
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div></div>
      ) : (
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          {quizzes.length === 0 ? (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center">
              <FileText size={48} className="mb-4 opacity-20" />
              <p>Belum ada kuis yang tersedia.</p>
              <p className="text-xs mt-2">Buat kuis melalui menu Editor Materi di dalam Kursus.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-xs border-b">
                    <tr>
                      <th className="px-6 py-4">Judul Kuis</th>
                      <th className="px-6 py-4">Kursus</th>
                      <th className="px-6 py-4">Durasi</th>
                      <th className="px-6 py-4 text-center">Soal</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quizzes.map((quiz) => (
                      <tr key={quiz._id} className="hover:bg-indigo-50/30 transition-colors group">
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {quiz.title}
                        </td>
                        <td className="px-6 py-4">
                          {quiz.course ? (
                              <Link href={`/admin/courses/${quiz.course._id}/editor`} className="text-indigo-600 hover:underline hover:text-indigo-800">
                                  {quiz.course.title}
                              </Link>
                          ) : (
                              <span className="text-red-400 italic text-xs bg-red-50 px-2 py-1 rounded">Kursus Dihapus</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                            {Math.floor((quiz.durationSeconds || 0) / 60)} Menit
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-gray-800">{quiz.questions?.length || 0}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {/* Tombol Edit diarahkan ke editor kursus karena kuis bagian dari materi */}
                            {quiz.course && (
                                <Link href={`/admin/courses/${quiz.course._id}/editor`} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit di Kursus">
                                    <Edit size={18} />
                                </Link>
                            )}
                            <button 
                                onClick={() => handleDelete(quiz._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Hapus Kuis"
                            >
                                <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
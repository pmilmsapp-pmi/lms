'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

interface ResetTimerButtonProps {
  quizId: string;
  studentId: string;
  studentName?: string;
  onSuccess?: () => void;
}

export default function ResetTimerButton({ quizId, studentId, studentName, onSuccess }: ResetTimerButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    const confirmMsg = studentName 
      ? `Apakah Anda yakin ingin mereset waktu pengerjaan untuk siswa "${studentName}"?`
      : "Apakah Anda yakin ingin mereset waktu pengerjaan siswa ini?";

    if (!confirm(confirmMsg + "\n\nSiswa harus memulai kuis dari awal (tombol 'Mulai' akan muncul kembali).")) {
      return;
    }

    try {
      setLoading(true);
      await api(`/api/quiz/${quizId}/reset`, {
        method: 'POST',
        body: { studentId }
      });

      alert("Berhasil! Timer siswa telah di-reset.");
      if (onSuccess) onSuccess(); // Callback untuk refresh data tabel jika perlu
    } catch (error: any) {
      alert("Gagal mereset: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleReset}
      disabled={loading}
      className="bg-red-100 text-red-600 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-red-200 border border-red-200 transition-colors flex items-center gap-1 disabled:opacity-50"
      title="Reset Waktu Pengerjaan Kuis"
    >
      {loading ? '...' : '↺ Reset Timer'}
    </button>
  );
}
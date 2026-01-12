
// 'use client';
// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useAuth } from '@/lib/AuthProvider';
// import { api } from '@/lib/api';

// export default function CertificatePage() {
//   const { user } = useAuth();
// const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
//   const params = useParams();
//   const courseId = params?.courseId as string;
//   const [cert, setCert] = useState<any | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await api(`/api/certificates/${courseId}/me`);
//         setCert(res.certificate);
//       } catch (e: any) { setError(e.message); }
//     };
//     if (courseId) load();
//   }, [courseId]);

//   if (error) return <div className="text-red-600">{error}</div>;
//   if (!cert) return <div>Memuat...</div>;

//   return (
//     <div className="flex items-center justify-center min-h-[60vh]">
//       <div className="w-[800px] h-[560px] bg-white border-2 border-yellow-500 shadow-xl p-10 relative">
//         <div className="absolute left-4 top-4">
//           <img src="/pmi-logo.svg" alt="Palang Merah Indonesia" className="h-10 w-auto" />
//         </div>
//         <div className="text-center mt-8">
//           <div className="text-3xl font-bold">SERTIFIKAT KELULUSAN</div>
//           <div className="mt-6 text-lg">Diberikan kepada</div>
//           <div className="mt-2 text-2xl font-semibold">{user?.name || user?.email}</div>
//           <div className="mt-6">Atas keberhasilan menyelesaikan pelatihan</div>
//           <div className="mt-2 text-xl font-medium">{cert.courseTitle}</div>
//           <div className="mt-4 text-sm">Nomor Sertifikat: <span className="font-mono">{cert.number}</span></div>
//           <div className="mt-2 text-sm text-gray-600">Tanggal terbit: {new Date(cert.issuedAt).toLocaleDateString('id-ID')}</div>
//         </div>
//         <div className="absolute bottom-8 left-0 right-0 text-center">
//           <div className="flex gap-3 justify-center">
//             <button className="btn" onClick={() => window.print()}>Cetak (PDF)</button>
//             <a className="btn" href={`${apiUrl}/api/certificates/${courseId}/pdf`} target="_blank" rel="noopener noreferrer">Unduh PDF (Server)</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api'; 
import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
import CompetencyForm from '@/components/admin/CompetencyForm';
// import { CheckSquare, Square } from 'lucide-react'; // Opsional jika dibutuhkan

export default function CertificateSettingsPage({ params }: { params: { courseId: string } }) {
  const [certConfig, setCertConfig] = useState<any>(null);
  
  // STATE KOMPETENSI (PENTING!)
  const [competencies, setCompetencies] = useState<any[]>([]);
  
  // STATE CHECKBOX (Tampilkan di sertifikat?)
  const [includeCompetencies, setIncludeCompetencies] = useState(true); 

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load Data Awal
  useEffect(() => {
    const fetchData = async () => {
      try {
        // [FIX] Error 'Property get does not exist': Ubah api.get() menjadi api()
        // Helper 'api' Anda tampaknya mengembalikan data JSON langsung (seperti di ChatModal)
        // Jika response backend dibungkus dalam properti 'data', gunakan res.data. Jika tidak, gunakan res saja.
        const res = await api(`/api/courses/${params.courseId}`);
        
        // Adaptasi: Cek apakah response ada di 'res.data' atau 'res' langsung
        const data = res.data || res; 

        if (data) {
            setCertConfig(data.certificateConfig || {});
            setCompetencies(data.competencies || []);
            setIncludeCompetencies(data.includeCompetenciesInCertificate ?? true);
        }
      } catch (e) { 
        console.error(e); 
      } finally { 
        setIsLoading(false); 
      }
    };
    fetchData();
  }, [params.courseId]);

  // Fungsi Simpan Ke Database (Semua sekaligus)
  const handleSaveAll = async (configData: any) => {
     try {
        setIsSaving(true);
        // Kita kirim config, kompetensi, dan status checkbox
        const payload = {
            certificateConfig: configData,
            competencies: competencies, 
            includeCompetenciesInCertificate: includeCompetencies
        };

        // [FIX] Error 'Property patch does not exist': Gunakan api() dengan options
        await api(`/api/courses/${params.courseId}`, {
            method: 'PATCH',
            body: payload
        });

        alert("Pengaturan sertifikat dan kompetensi berhasil disimpan!");
     } catch (error: any) {
        alert("Gagal menyimpan: " + error.message);
     } finally {
        setIsSaving(false);
     }
  };

  // Fungsi khusus simpan kompetensi (opsional)
  // const handleSaveCompetencies = async (newCompetencies: any[]) => {
  //     setCompetencies(newCompetencies);
  // };

  if (isLoading) return <div className="p-10 text-center">Memuat pengaturan...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Pengaturan Sertifikat & Kompetensi</h1>
      <p className="text-gray-500 mb-8">Kelola tampilan sertifikat, nomor urut, dan daftar kompetensi kelulusan.</p>

      {/* 1. FORM KOMPETENSI */}
      {/* Update state competencies saat form ini berubah */}
      <CompetencyForm 
         initialData={competencies} 
         onChange={(newData) => setCompetencies(newData)} 
      />

      {/* Checkbox Opsional */}
      <div className="mt-6 flex items-center gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <input 
            type="checkbox" 
            checked={includeCompetencies} 
            onChange={e => setIncludeCompetencies(e.target.checked)}
            id="includeComp"
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        />
        <label htmlFor="includeComp" className="font-bold text-gray-700 cursor-pointer select-none">
            Tampilkan daftar kompetensi di halaman belakang sertifikat?
        </label>
      </div>

      {/* 2. FORM CONFIG & PREVIEW */}
      {/* Passing data kompetensi ke sini agar tombol PREVIEW di dalamnya bisa membacanya */}
      <CertificateConfigForm 
         initialData={certConfig}
         onSave={handleSaveAll}
         isSaving={isSaving}
         competencies={competencies} // <--- Kirim data kompetensi ke form config
         includeCompetencies={includeCompetencies} // <--- Kirim status checkbox
         courseId={params.courseId}
      />
    </div>
  );
}
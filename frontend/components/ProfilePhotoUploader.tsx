// // // // 'use client';
// // // // import { useState } from 'react';
// // // // import { apiUpload } from '@/lib/api';

// // // // export default function ProfilePhotoUploader({
// // // //   userId,
// // // //   onSaved,
// // // // }: {
// // // //   userId: string;
// // // //   onSaved: (rel: string) => void;
// // // // }) {
// // // //   const [file, setFile] = useState<File | null>(null);
// // // //   const [preview, setPreview] = useState<string | null>(null);
// // // //   const [loading, setLoading] = useState(false);

// // // //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const f = e.target.files?.[0] || null;
// // // //     setFile(f);
// // // //     if (f) setPreview(URL.createObjectURL(f));
// // // //   };

// // // //   const upload = async () => {
// // // //     if (!file) return;
// // // //     setLoading(true);
// // // //     const fd = new FormData();
// // // //     fd.append('file', file); // aman karena file pasti File
// // // //     const res = await apiUpload(`/upload/user/${userId}/avatar`, fd);
// // // //     setLoading(false);
// // // //     onSaved(res.file.url); // string diteruskan ke callback
// // // //   };

// // // //   return (
// // // //     <div className="card space-y-2">
// // // //       <h3 className="font-semibold">Foto Profil</h3>
// // // //       {preview && (
// // // //         <img
// // // //           src={preview}
// // // //           alt="Preview foto profil"
// // // //           className="w-32 h-32 rounded-full object-cover"
// // // //         />
// // // //       )}
// // // //       <label className="btn-secondary">
// // // //         Pilih Foto
// // // //         <input
// // // //           type="file"
// // // //           accept="image/png,image/jpeg,image/webp"
// // // //           onChange={onChange}
// // // //           className="hidden"
// // // //         />
// // // //       </label>
// // // //       <button className="btn-primary" onClick={upload} disabled={loading}>
// // // //         {loading ? 'Mengunggah...' : 'Upload'}
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // }

// // // // frontend/components/ProfilePhotoUploader.tsx
// // // // 'use client';
// // // // import { useState } from 'react';
// // // // import { apiUpload } from '@/lib/api';

// // // // export default function ProfilePhotoUploader({
// // // //   userId,
// // // //   onSaved,
// // // // }: {
// // // //   userId: string;
// // // //   onSaved?: (rel: string) => void;
// // // // }) {
// // // //   const [file, setFile] = useState<File | null>(null);
// // // //   const [loading, setLoading] = useState(false);

// // // //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const f = e.target.files?.[0] || null;
// // // //     setFile(f);
// // // //   };

// // // //   const upload = async () => {
// // // //     if (!file) return;
// // // //     setLoading(true);
// // // //     try {
// // // //       // 👇 PASS A File, NOT string
// // // //       const u = await apiUpload(file, file.name);
// // // //       // u.relativeUrl dari backend: "/uploads/files/<nama>"
// // // //       onSaved?.(u.relativeUrl || u.url || u.path);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="card space-y-2">
// // // //       <label htmlFor="avatar-file" className="block mb-1">Foto Profil</label>
// // // //       <input id="avatar-file" type="file" accept="image/*" onChange={onChange} title="Unggah foto profil" />
// // // //       <button className="btn-primary" onClick={upload} disabled={loading || !file}>
// // // //         {loading ? 'Mengunggah...' : 'Upload Avatar'}
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // }

// // // 'use client';
// // // import { useState } from 'react';
// // // import { apiUpload } from '@/lib/api';

// // // export default function ProfilePhotoUploader({
// // //   userId,
// // //   onSaved,
// // // }: {
// // //   userId: string;
// // //   onSaved?: (rel: string) => void;
// // // }) {
// // //   const [file, setFile] = useState<File | null>(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState<string | null>(null);

// // //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const f = e.target.files?.[0] || null;
// // //     setFile(f);
// // //     setError(null);
// // //   };

// // //   const upload = async () => {
// // //     if (!file) return;
// // //     setLoading(true);
// // //     setError(null);
    
// // //     try {
// // //       // 1. Bungkus file ke dalam FormData
// // //       const formData = new FormData();
// // //       formData.append('file', file);

// // //       // 2. Panggil apiUpload dengan format BARU: (endpoint, formData)
// // //       // Endpoint sesuai arsitektur backend: /upload/user/:userId/avatar
// // //       const response = await apiUpload(`/upload/user/${userId}/avatar`, formData);
      
// // //       // 3. Ambil URL dari response backend
// // //       // Backend biasanya return: { file: { url: "..." } } atau { url: "..." }
// // //       const resultUrl = response.file?.url || response.url || response.relativeUrl;

// // //       if (onSaved && resultUrl) {
// // //         onSaved(resultUrl);
// // //       } else {
// // //         // Fallback jika tidak ada callback onSaved, kita alert saja
// // //         alert('Avatar berhasil diubah!');
// // //       }

// // //     } catch (err: any) {
// // //       console.error(err);
// // //       setError(err.message || "Gagal mengunggah avatar");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="card space-y-2 p-4 border rounded bg-white">
// // //       <label htmlFor="avatar-file" className="block text-sm font-medium mb-1">
// // //         Foto Profil
// // //       </label>
      
// // //       <input 
// // //         id="avatar-file" 
// // //         type="file" 
// // //         accept="image/*" 
// // //         onChange={onChange} 
// // //         title="Unggah foto profil"
// // //         className="block w-full text-sm text-gray-500
// // //           file:mr-4 file:py-2 file:px-4
// // //           file:rounded-full file:border-0
// // //           file:text-sm file:font-semibold
// // //           file:bg-blue-50 file:text-blue-700
// // //           hover:file:bg-blue-100"
// // //       />
      
// // //       {error && <p className="text-red-500 text-xs">{error}</p>}

// // //       <button 
// // //         className="btn-primary w-full py-2 mt-2" 
// // //         onClick={upload} 
// // //         disabled={loading || !file}
// // //       >
// // //         {loading ? 'Mengunggah...' : 'Upload Avatar'}
// // //       </button>
// // //     </div>
// // //   );
// // // }
// // 'use client';
// // import { useState } from 'react';
// // import { api, apiUpload } from '@/lib/api';

// // export default function ProfilePhotoUploader({
// //   userId,
// //   currentUrl,
// //   onSaved,
// // }: {
// //   userId: string;
// //   currentUrl?: string;
// //   onSaved?: (newUrl: string) => void;
// // }) {
// //   const [file, setFile] = useState<File | null>(null);
// //   const [preview, setPreview] = useState<string>(currentUrl || '');
// //   const [loading, setLoading] = useState(false);

// //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const f = e.target.files?.[0] || null;
// //     setFile(f);
// //     if (f) setPreview(URL.createObjectURL(f)); // Preview lokal langsung
// //   };

// //   const uploadAndSave = async () => {
// //     if (!file) return;
// //     setLoading(true);
// //     try {
// //       // 1. Upload File
// //       const formData = new FormData();
// //       formData.append('file', file);
      
// //       // Upload ke endpoint user avatar
// //       const res = await apiUpload(`/upload/user/${userId}/avatar`, formData);
      
// //       // Ambil path relatif (/uploads/files/xxx.jpg)
// //       const relativePath = res.file?.url || res.url || res.relativeUrl;

// //       // 2. Konversi ke Absolute URL (http://localhost:4000/uploads/...)
// //       const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// //       const absoluteUrl = new URL(relativePath, baseUrl).toString();

// //       // 3. Simpan URL Absolut ke Profil User (PATCH)
// //       // Endpoint ini akan update field avatarUrl di database user
// //       await api('/api/users/me', {
// //         method: 'PATCH',
// //         body: { avatarUrl: absoluteUrl }
// //       });

// //       alert('Foto profil berhasil diperbarui!');
// //       if (onSaved) onSaved(absoluteUrl);
      
// //       // Reload halaman agar Header juga terupdate (opsional)
// //       window.location.reload();

// //     } catch (err: any) {
// //       console.error(err);
// //       alert('Gagal upload: ' + err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center gap-4 border p-4 rounded bg-gray-50">
// //       <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
// //         {preview ? (
// //           // eslint-disable-next-line @next/next/no-img-element
// //           <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
// //         ) : (
// //           <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-2xl">
// //             ?
// //           </div>
// //         )}
// //       </div>
      
// //       <div className="w-full">
// //         <input 
// //           type="file" 
// //           accept="image/*" 
// //           onChange={onChange}
// //           className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
// //         />
// //       </div>

// //       <button 
// //         onClick={uploadAndSave} 
// //         disabled={!file || loading}
// //         className="btn-primary w-full py-2 disabled:opacity-50"
// //       >
// //         {loading ? 'Menyimpan...' : 'Simpan Foto'}
// //       </button>
// //     </div>
// //   );
// // }
// 'use client';
// import { useState } from 'react';
// import { api, apiUpload } from '@/lib/api';

// export default function ProfilePhotoUploader({
//   userId,
//   currentUrl,
//   onSaved,
// }: {
//   userId: string;
//   currentUrl?: string;
//   onSaved?: (newUrl: string) => void;
// }) {
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string>(currentUrl || '');
//   const [loading, setLoading] = useState(false);

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0] || null;
//     setFile(f);
//     if (f) setPreview(URL.createObjectURL(f));
//   };

//   const uploadAndSave = async () => {
//     if (!file) return;
//     setLoading(true);
//     try {
//       // 1. Upload File
//       const formData = new FormData();
//       formData.append('file', file);
      
//       const res = await apiUpload(`/upload/user/${userId}/avatar`, formData);
      
//       const relativePath = res.file?.url || res.url || res.relativeUrl;

//       // 2. Konversi ke Absolute URL
//       const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
//       const absoluteUrl = new URL(relativePath, baseUrl).toString();

//       // 3. Simpan URL ke Profil User
//       await api('/api/users/me', {
//         method: 'PATCH',
//         body: { avatarUrl: absoluteUrl }
//       });

//       alert('Foto profil berhasil diperbarui!');
//       if (onSaved) onSaved(absoluteUrl);
      
//       window.location.reload();

//     } catch (err: any) {
//       console.error(err);
//       alert('Gagal upload: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 border p-4 rounded bg-gray-50">
//       {/* Preview Circle */}
//       <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border border-gray-300 relative shadow-sm">
//         {preview ? (
//           // eslint-disable-next-line @next/next/no-img-element
//           <img src={preview} alt="Avatar Preview" className="w-full h-full object-cover" />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-2xl">
//             ?
//           </div>
//         )}
//       </div>
      
//       <div className="w-full">
//         {/* TAMBAHAN 1: Label Visual yang terhubung dengan ID input */}
//         <label 
//           htmlFor="avatar-upload" 
//           className="block text-sm font-medium text-gray-700 mb-1 ml-1"
//         >
//           Pilih Foto Baru
//         </label>

//         {/* TAMBAHAN 2: Atribut title dan id */}
//         <input 
//           id="avatar-upload"
//           type="file" 
//           accept="image/*" 
//           onChange={onChange}
//           title="Upload foto profil" // Solusi Error Linter
//           aria-label="Upload foto profil"
//           className="block w-full text-sm text-gray-500
//             file:mr-4 file:py-2 file:px-4
//             file:rounded-full file:border-0
//             file:text-sm file:font-semibold
//             file:bg-blue-50 file:text-blue-700
//             hover:file:bg-blue-100"
//         />
//       </div>

//       <button 
//         onClick={uploadAndSave} 
//         disabled={!file || loading}
//         className="btn-primary w-full py-2 disabled:opacity-50 mt-2"
//         aria-label="Simpan foto profil"
//       >
//         {loading ? 'Menyimpan...' : 'Simpan Foto'}
//       </button>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { api, apiUpload } from '@/lib/api';

export default function ProfilePhotoUploader({
  userId,
  currentUrl,
  onSaved,
}: {
  userId: string;
  currentUrl?: string;
  onSaved?: (newUrl: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(currentUrl || '');
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      setPreview(URL.createObjectURL(f)); // Preview lokal langsung
    }
  };

  const uploadAndSave = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      // 1. Upload File ke Server
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await apiUpload(`/upload/user/${userId}/avatar`, formData);
      
      // Ambil path relatif dari response (handle variasi struktur response)
      const relativePath = res.file?.url || res.url || res.relativeUrl;

      if (!relativePath) {
        throw new Error("Gagal mendapatkan URL gambar dari server.");
      }

      // 2. Konversi ke Absolute URL (Penting untuk validasi backend)
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const absoluteUrl = new URL(relativePath, baseUrl).toString();

      // 3. Simpan URL ke Profil User di Database
      await api('/api/users/me', {
        method: 'PATCH',
        body: { avatarUrl: absoluteUrl }
      });

      alert('Foto profil berhasil diperbarui!');
      
      if (onSaved) onSaved(absoluteUrl);
      
      // Reload halaman agar Header/Navbar juga terupdate fotonya
      window.location.reload();

    } catch (err: any) {
      console.error(err);
      alert('Gagal upload: ' + (err.message || 'Terjadi kesalahan saat upload.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 border p-4 rounded-xl bg-white shadow-sm">
      {/* Preview Circle */}
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border border-gray-200 relative shadow-inner">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={preview} 
            alt="Avatar Preview" 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-2xl">
            ?
          </div>
        )}
      </div>
      
      <div className="w-full">
        {/* Label Visual yang terhubung dengan ID input */}
        <label 
          htmlFor="avatar-upload" 
          className="block text-sm font-bold text-gray-700 mb-2 ml-1"
        >
          Pilih Foto Baru
        </label>

        {/* Input File dengan Atribut Aksesibilitas Lengkap */}
        <input 
          id="avatar-upload"
          type="file" 
          accept="image/png, image/jpeg, image/webp" 
          onChange={onChange}
          title="Upload foto profil"
          aria-label="Upload foto profil"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-xs file:font-bold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer"
        />
      </div>

      <button 
        onClick={uploadAndSave} 
        disabled={!file || loading}
        className="w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md mt-2"
        aria-label="Simpan foto profil"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Menyimpan...
          </span>
        ) : 'Simpan Foto'}
      </button>
    </div>
  );
}

// // // // // // // 'use client';
// // // // // // // import { useState } from 'react';
// // // // // // // import { apiUpload, api } from '@/lib/api';

// // // // // // // export default function UploadCourseCoverWithSave({ courseId, currentUrl, onSaved }: { courseId: string; currentUrl?: string; onSaved?: ()=>void }) {
// // // // // // //   const [file, setFile] = useState<File | null>(null);
// // // // // // //   const [preview, setPreview] = useState<string | null>(currentUrl || null);
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     const f = e.target.files?.[0] || null; setFile(f);
// // // // // // //     if (f) setPreview(URL.createObjectURL(f));
// // // // // // //   };

// // // // // // //   const uploadAndSave = async () => {
// // // // // // //     if (!file) return;
// // // // // // //     setLoading(true);
// // // // // // //     const fd = new FormData(); fd.append('file', file);
// // // // // // //     const res = await apiUpload(`/upload/course/${courseId}/cover`, fd);
// // // // // // //     const rel = res.file.url as string;
// // // // // // //     const abs = new URL(rel, process.env.NEXT_PUBLIC_API_URL).toString();
// // // // // // //     await api(`/api/courses/${courseId}`, { method: 'PATCH', body: { thumbnailUrl: abs } });
// // // // // // //     setLoading(false); onSaved && onSaved();
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="space-y-2">
// // // // // // //       {preview && <img src={preview} alt="preview" className="w-full h-40 object-cover rounded-md" />}
// // // // // // //       <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onChange} />
// // // // // // //       <button className="btn-primary" onClick={uploadAndSave} disabled={loading}>{loading ? 'Mengunggah...' : 'Upload & Simpan'}</button>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // frontend/components/UploadCourseCoverWithSave.tsx
// // // // // // 'use client';

// // // // // // import { useState } from 'react';
// // // // // // import { api, apiUpload } from '@/lib/api';

// // // // // // export default function UploadCourseCoverWithSave({
// // // // // //   courseId,
// // // // // //   currentUrl,
// // // // // //   onSaved,
// // // // // // }: {
// // // // // //   courseId: string;
// // // // // //   currentUrl?: string;
// // // // // //   onSaved?: () => void;
// // // // // // }) {
// // // // // //   const [file, setFile] = useState<File | null>(null);
// // // // // //   const [preview, setPreview] = useState<string>(currentUrl || '');
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     const f = e.target.files?.[0] || null;
// // // // // //     setFile(f);
// // // // // //     setError(null);
// // // // // //     if (f) {
// // // // // //       const url = URL.createObjectURL(f);
// // // // // //       setPreview(url);
// // // // // //     }
// // // // // //   };

// // // // // //   const onUploadAndSave = async () => {
// // // // // //     if (!file) {
// // // // // //       setError('Pilih file cover terlebih dahulu.');
// // // // // //       return;
// // // // // //     }
// // // // // //     setLoading(true);
// // // // // //     setError(null);
// // // // // //     try {
// // // // // //       // 1) Upload file ke backend
// // // // // //       const uploaded = await apiUpload(file, file.name);
// // // // // //       // Expecting: { relativeUrl: "/uploads/files/xxx.png", absoluteUrl?: "http://..." }
// // // // // //       const rel = uploaded.relativeUrl || uploaded.url || uploaded.path;

// // // // // //       // 2) Simpan thumbnailUrl course (boleh pakai absolute URL jika diperlukan)
// // // // // //       // Jika ingin absolute: new URL(rel, process.env.NEXT_PUBLIC_API_URL).toString()
// // // // // //       await api(`/api/courses/${courseId}`, {
// // // // // //         method: 'PATCH',
// // // // // //         body: { thumbnailUrl: rel },
// // // // // //       });

// // // // // //       // 3) Refresh list caller
// // // // // //       onSaved?.();
// // // // // //     } catch (e: any) {
// // // // // //       setError(e.message);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="space-y-2">
// // // // // //       <div>
// // // // // //         {/* Label terhubung untuk a11y */}
// // // // // //         <label htmlFor={`cover-upload-${courseId}`} className="block mb-1">
// // // // // //           Cover Kursus
// // // // // //         </label>
// // // // // //         <input
// // // // // //           id={`cover-upload-${courseId}`}
// // // // // //           type="file"
// // // // // //           accept="image/*"
// // // // // //           onChange={onChange}
// // // // // //           title="Unggah gambar cover untuk kursus"
// // // // // //         />
// // // // // //       </div>

// // // // // //       {/* Preview jika ada */}
// // // // // //       {preview && (
// // // // // //         <img
// // // // // //           src={preview}
// // // // // //           alt="Preview cover"
// // // // // //           className="w-full h-40 object-cover rounded-md border"
// // // // // //         />
// // // // // //       )}

// // // // // //       {error && <div className="text-red-600 text-sm">{error}</div>}

// // // // // //       <button className="btn-primary" onClick={onUploadAndSave} disabled={loading || !file}>
// // // // // //         {loading ? 'Mengunggah...' : 'Upload & Simpan'}
// // // // // //       </button>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // // Pastikan imports sudah benar
// // // // // import { api, apiUpload } from '@/lib/api';

// // // // // const handleUpload = async (file: File) => {
// // // // //   try {
// // // // //     const formData = new FormData();
// // // // //     formData.append('file', file);

// // // // //     // 1. Upload file ke endpoint multer
// // // // //     // Response: { file: { url: "/uploads/files/xxx.jpg", ... } }
// // // // //     const uploadRes = await apiUpload(`/upload/course/${courseId}/cover`, formData);
    
// // // // //     // 2. KRUSIAL: Ubah path relatif menjadi URL Absolut agar lolos validasi Zod Backend
// // // // //     // NEXT_PUBLIC_API_URL harus "http://localhost:4000"
// // // // //     const absoluteUrl = new URL(uploadRes.file.url, process.env.NEXT_PUBLIC_API_URL).toString();

// // // // //     // 3. PATCH ke database course
// // // // //     await api(`/api/courses/${courseId}`, {
// // // // //       method: 'PATCH',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify({ thumbnailUrl: absoluteUrl })
// // // // //     });

// // // // //     alert('Cover berhasil disimpan!');
// // // // //     // Refresh halaman atau state di sini
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     alert('Gagal upload cover.');
// // // // //   }
// // // // // };

// // // // 'use client';

// // // // import { useState } from 'react';
// // // // import { api, apiUpload } from '@/lib/api';

// // // // interface UploadProps {
// // // //   courseId: string;
// // // //   currentUrl?: string;
// // // //   onSaved?: () => void;
// // // // }

// // // // export default function UploadCourseCoverWithSave({ courseId, currentUrl, onSaved }: UploadProps) {
// // // //   const [file, setFile] = useState<File | null>(null);
// // // //   // Gunakan currentUrl atau string kosong untuk preview awal
// // // //   const [preview, setPreview] = useState<string>(currentUrl || '');
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState<string | null>(null);

// // // //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const selectedFile = e.target.files?.[0] || null;
// // // //     setFile(selectedFile);
// // // //     setError(null);
    
// // // //     if (selectedFile) {
// // // //       // Buat preview lokal sebelum upload
// // // //       const objectUrl = URL.createObjectURL(selectedFile);
// // // //       setPreview(objectUrl);
// // // //     }
// // // //   };

// // // //   const onUploadAndSave = async () => {
// // // //     if (!file) {
// // // //       setError('Pilih file cover terlebih dahulu.');
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setError(null);

// // // //     try {
// // // //       const formData = new FormData();
// // // //       // Pastikan 'file' di sini adalah object File, bukan string
// // // //       formData.append('file', file);

// // // //       // 1. Upload ke Backend (Multer)
// // // //       // Pastikan apiUpload menerima (endpoint, formData)
// // // //       const uploadRes = await apiUpload(`/upload/course/${courseId}/cover`, formData);
      
// // // //       // Response biasanya: { file: { url: "/uploads/files/xxx.jpg" } }
// // // //       // Gunakan chaining (?.) untuk keamanan jika struktur response beda
// // // //       const relativePath = uploadRes.file?.url || uploadRes.url || uploadRes.path;

// // // //       if (!relativePath) throw new Error("Gagal mendapatkan path file dari server.");

// // // //       // 2. Konversi ke Absolute URL untuk disimpan di DB (Validasi Zod)
// // // //       // Pastikan NEXT_PUBLIC_API_URL diset di .env.local (misal: http://localhost:4000)
// // // //       const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // // //       const absoluteUrl = new URL(relativePath, baseUrl).toString();

// // // //       // 3. Simpan URL ke Collection Course
// // // //       await api(`/api/courses/${courseId}`, {
// // // //         method: 'PATCH',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({ thumbnailUrl: absoluteUrl }),
// // // //       });

// // // //       alert('Cover berhasil disimpan!');
// // // //       onSaved?.(); // Callback refresh parent

// // // //     } catch (err: any) {
// // // //       console.error(err);
// // // //       setError(err.message || 'Gagal mengunggah cover.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="space-y-4 border p-4 rounded-md bg-gray-50">
// // // //       <div>
// // // //         <label 
// // // //           htmlFor={`cover-upload-${courseId}`} 
// // // //           className="block text-sm font-medium text-gray-700 mb-2"
// // // //         >
// // // //           Ganti Cover Kursus
// // // //         </label>
        
// // // //         {/* Preview Image */}
// // // //         {preview && (
// // // //           <div className="mb-3">
// // // //              {/* eslint-disable-next-line @next/next/no-img-element */}
// // // //             <img 
// // // //               src={preview} 
// // // //               alt="Preview" 
// // // //               className="w-full h-40 object-cover rounded-md border border-gray-300"
// // // //             />
// // // //           </div>
// // // //         )}

// // // //         <input
// // // //           id={`cover-upload-${courseId}`}
// // // //           type="file"
// // // //           accept="image/png, image/jpeg, image/webp"
// // // //           onChange={onChange}
// // // //           className="block w-full text-sm text-gray-500
// // // //             file:mr-4 file:py-2 file:px-4
// // // //             file:rounded-full file:border-0
// // // //             file:text-sm file:font-semibold
// // // //             file:bg-red-50 file:text-red-700
// // // //             hover:file:bg-red-100"
// // // //         />
// // // //       </div>

// // // //       {error && <p className="text-red-600 text-sm">{error}</p>}

// // // //       <button 
// // // //         className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors w-full"
// // // //         onClick={onUploadAndSave} 
// // // //         disabled={loading || !file}
// // // //       >
// // // //         {loading ? 'Menyimpan...' : 'Upload & Simpan'}
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // }
// // // // frontend/components/UploadCourseCoverWithSave.tsx
// // // 'use client';

// // // import { useState } from 'react';
// // // import { api, apiUpload } from '@/lib/api';

// // // interface UploadProps {
// // //   courseId: string;
// // //   currentUrl?: string;
// // //   onSaved?: () => void;
// // // }

// // // export default function UploadCourseCoverWithSave({ courseId, currentUrl, onSaved }: UploadProps) {
// // //   const [file, setFile] = useState<File | null>(null);
// // //   // Gunakan currentUrl jika ada, atau string kosong
// // //   const [preview, setPreview] = useState<string>(currentUrl || '');
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState<string | null>(null);

// // //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const selectedFile = e.target.files?.[0] || null;
// // //     setFile(selectedFile);
// // //     setError(null);
    
// // //     if (selectedFile) {
// // //       // Buat preview lokal agar user tahu gambar apa yang dipilih
// // //       const objectUrl = URL.createObjectURL(selectedFile);
// // //       setPreview(objectUrl);
// // //     }
// // //   };

// // //   const onUploadAndSave = async () => {
// // //     if (!file) {
// // //       setError('Pilih file cover terlebih dahulu.');
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setError(null);

// // //     try {
// // //       // 1. Siapkan FormData
// // //       const formData = new FormData();
// // //       formData.append('file', file);

// // //       // 2. Upload ke Backend
// // //       // Menggunakan apiUpload(path, formData)
// // //       const uploadRes = await apiUpload(`/upload/course/${courseId}/cover`, formData);
      
// // //       // Backend mengembalikan object, misal: { file: { url: "/uploads/..." } }
// // //       // Kita ambil path relatifnya
// // //       const relativePath = uploadRes.file?.url || uploadRes.url || uploadRes.path;

// // //       if (!relativePath) {
// // //         throw new Error("Gagal mendapatkan path file dari server.");
// // //       }

// // //       // 3. Konversi ke URL Absolut (Wajib untuk validasi Zod Backend)
// // //       // Menggabungkan http://localhost:4000 dengan /uploads/...
// // //       const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // //       const absoluteUrl = new URL(relativePath, baseUrl).toString();

// // //       // 4. Simpan URL ke Database (PATCH Course)
// // //       // PERBAIKAN: Kirim object langsung (jangan JSON.stringify lagi!)
// // //       await api(`/api/courses/${courseId}`, {
// // //         method: 'PATCH',
// // //         body: { thumbnailUrl: absoluteUrl } 
// // //       });

// // //       alert('Cover berhasil disimpan!');
// // //       onSaved?.(); // Refresh halaman parent jika perlu

// // //     } catch (err: any) {
// // //       console.error(err);
// // //       setError(err.message || 'Gagal mengunggah cover.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="space-y-4 border p-4 rounded-md bg-white shadow-sm">
// // //       <div>
// // //         <label 
// // //           htmlFor={`cover-upload-${courseId}`} 
// // //           className="block text-sm font-bold text-gray-700 mb-2"
// // //         >
// // //           Ganti Cover Kursus
// // //         </label>
        
// // //         {/* Area Preview */}
// // //         {preview ? (
// // //           <div className="mb-3 relative w-full h-48 bg-gray-100 rounded-md overflow-hidden border">
// // //             {/* eslint-disable-next-line @next/next/no-img-element */}
// // //             <img 
// // //               src={preview} 
// // //               alt="Preview Cover" 
// // //               className="w-full h-full object-cover"
// // //             />
// // //           </div>
// // //         ) : (
// // //           <div className="mb-3 w-full h-48 bg-gray-100 flex items-center justify-center rounded-md border text-gray-400">
// // //             Belum ada cover
// // //           </div>
// // //         )}

// // //         <input
// // //           id={`cover-upload-${courseId}`}
// // //           type="file"
// // //           accept="image/png, image/jpeg, image/webp"
// // //           onChange={onChange}
// // //           className="block w-full text-sm text-gray-500
// // //             file:mr-4 file:py-2 file:px-4
// // //             file:rounded-full file:border-0
// // //             file:text-sm file:font-semibold
// // //             file:bg-red-50 file:text-red-700
// // //             hover:file:bg-red-100
// // //             cursor-pointer"
// // //         />
// // //       </div>

// // 'use client';

// // import { useState } from 'react';
// // import { api, apiUpload } from '@/lib/api';

// // interface UploadProps {
// //   courseId: string;
// //   currentUrl?: string;
// //   onSaved?: () => void;
// // }

// // export default function UploadCourseCoverWithSave({ courseId, currentUrl, onSaved }: UploadProps) {
// //   const [file, setFile] = useState<File | null>(null);
// //   // Gunakan currentUrl jika ada, atau string kosong
// //   const [preview, setPreview] = useState<string>(currentUrl || '');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const selectedFile = e.target.files?.[0] || null;
// //     setFile(selectedFile);
// //     setError(null);
    
// //     if (selectedFile) {
// //       // Buat preview lokal
// //       const objectUrl = URL.createObjectURL(selectedFile);
// //       setPreview(objectUrl);
// //     }
// //   };

// //   const onUploadAndSave = async () => {
// //     if (!file) {
// //       setError('Pilih file cover terlebih dahulu.');
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);

// //     try {
// //       // 1. Siapkan FormData
// //       const formData = new FormData();
// //       formData.append('file', file);

// //       // 2. Upload ke Backend (gunakan apiUpload yang sudah diperbaiki)
// //       const uploadRes = await apiUpload(`/upload/course/${courseId}/cover`, formData);
      
// //       // Ambil path relatif (handle struktur response yang mungkin berbeda)
// //       const relativePath = uploadRes.file?.url || uploadRes.url || uploadRes.path;

// //       if (!relativePath) {
// //         throw new Error("Gagal mendapatkan path file dari server.");
// //       }

// //       // 3. Konversi ke URL Absolut
// //       const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// //       const absoluteUrl = new URL(relativePath, baseUrl).toString();

// //       // 4. Simpan URL ke Database (PATCH Course)
// //       // Body dikirim sebagai object biasa (api.ts akan handle JSON.stringify)
// //       await api(`/api/courses/${courseId}`, {
// //         method: 'PATCH',
// //         body: { thumbnailUrl: absoluteUrl } 
// //       });

// //       alert('Cover berhasil disimpan!');
// //       if (onSaved) onSaved();

// //     } catch (err: any) {
// //       console.error(err);
// //       setError(err.message || 'Gagal mengunggah cover.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Class untuk button (logic dipisah agar JSX lebih bersih)
// //   const buttonClass = loading || !file 
// //     ? 'bg-gray-400 cursor-not-allowed' 
// //     : 'bg-red-600 hover:bg-red-700 shadow-md';

// //   return (
// //     <div className="space-y-4 border p-4 rounded-md bg-white shadow-sm">
// //       <div>
// //         <label 
// //           htmlFor={`cover-upload-${courseId}`} 
// //           className="block text-sm font-bold text-gray-700 mb-2"
// //         >
// //           Ganti Cover Kursus
// //         </label>
        
// //         {/* Area Preview */}
// //         {preview ? (
// //           <div className="mb-3 relative w-full h-48 bg-gray-100 rounded-md overflow-hidden border">
// //             {/* eslint-disable-next-line @next/next/no-img-element */}
// //             <img 
// //               src={preview} 
// //               alt="Preview Cover" 
// //               className="w-full h-full object-cover"
// //             />
// //           </div>
// //         ) : (
// //           <div className="mb-3 w-full h-48 bg-gray-100 flex items-center justify-center rounded-md border text-gray-400">
// //             Belum ada cover
// //           </div>
// //         )}

// //         <input
// //           id={`cover-upload-${courseId}`}
// //           type="file"
// //           accept="image/png, image/jpeg, image/webp"
// //           onChange={onChange}
// //           className="block w-full text-sm text-gray-500
// //             file:mr-4 file:py-2 file:px-4
// //             file:rounded-full file:border-0
// //             file:text-sm file:font-semibold
// //             file:bg-red-50 file:text-red-700
// //             hover:file:bg-red-100
// //             cursor-pointer"
// //         />
// //       </div>

// //       {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

// //       <button 
// //         className={`w-full py-2 px-4 rounded font-semibold text-white transition-colors ${buttonClass}`}
// //         onClick={onUploadAndSave} 
// //         disabled={loading || !file}
// //       >
// //         {loading ? 'Menyimpan...' : 'Upload & Simpan'}
// //       </button>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState } from 'react';
// import { api, apiUpload } from '@/lib/api';

// interface UploadProps {
//   courseId: string;
//   currentUrl?: string;
//   onSaved?: () => void;
// }

// export default function UploadCourseCoverWithSave({ courseId, currentUrl, onSaved }: UploadProps) {
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string>(currentUrl || '');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//     setError(null);
    
//     if (selectedFile) {
//       // Buat preview lokal
//       const objectUrl = URL.createObjectURL(selectedFile);
//       setPreview(objectUrl);
//     }
//   };

//   const onUploadAndSave = async () => {
//     if (!file) {
//       setError('Pilih file cover terlebih dahulu.');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // 1. Siapkan FormData
//       const formData = new FormData();
//       formData.append('file', file);

//       // 2. Upload ke Backend
//       // Kita menembak endpoint POST /upload/course/:id/cover
//       const uploadRes = await apiUpload(`/upload/course/${courseId}/cover`, formData);
      
//       // PERBAIKAN KRUSIAL: Menyesuaikan dengan response backend { imageUrl: "..." }
//       // Kita cek beberapa kemungkinan property agar lebih aman
//       const relativePath = uploadRes.imageUrl || uploadRes.file?.url || uploadRes.url;

//       if (!relativePath) {
//         console.error("Struktur response server:", uploadRes);
//         throw new Error("Gagal mendapatkan path file dari server (Property tidak ditemukan).");
//       }

//       // 3. Konversi ke URL Absolut (Wajib agar validasi backend/zod aman)
//       const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
//       const absoluteUrl = new URL(relativePath, baseUrl).toString();

//       // 4. Simpan URL ke Database Course
//       // Catatan: api() biasanya menghandle JSON.stringify secara otomatis
//       await api(`/api/courses/${courseId}`, {
//         method: 'PATCH',
//         body: { thumbnailUrl: absoluteUrl } 
//       });

//       alert('Cover berhasil disimpan!');
//       setFile(null); // Reset file input
//       if (onSaved) onSaved();

//     } catch (err: any) {
//       console.error("Upload Error:", err);
//       setError(err.message || 'Gagal mengunggah cover.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logic Styling Button
//   const buttonClass = loading || !file 
//     ? 'bg-gray-400 cursor-not-allowed' 
//     : 'bg-red-700 hover:bg-red-800 shadow-md active:scale-95';

//   return (
//     <div className="space-y-4 border p-4 rounded-xl bg-gray-50 shadow-sm">
//       <div>
//         <label 
//           htmlFor={`cover-upload-${courseId}`} 
//           className="block text-sm font-bold text-gray-700 mb-2"
//         >
//           Ganti Cover Kursus
//         </label>
        
//         {/* Area Preview */}
//         <div className="mb-3 relative w-full h-44 bg-white rounded-lg overflow-hidden border border-gray-200 group">
//           {preview ? (
//             <img 
//               src={preview} 
//               alt="Preview Cover" 
//               className="w-full h-full object-cover transition-transform group-hover:scale-105"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm italic">
//               Belum ada cover
//             </div>
//           )}
//         </div>

//         <input
//           id={`cover-upload-${courseId}`}
//           type="file"
//           accept="image/png, image/jpeg, image/webp"
//           onChange={onChange}
//           className="block w-full text-xs text-gray-500
//             file:mr-4 file:py-2 file:px-4
//             file:rounded-full file:border-0
//             file:text-xs file:font-bold
//             file:bg-gray-200 file:text-gray-700
//             hover:file:bg-gray-300
//             cursor-pointer"
//         />
//       </div>

//       {error && (
//         <div className="p-2 bg-red-50 border border-red-100 rounded text-red-600 text-xs font-medium">
//           ⚠️ {error}
//         </div>
//       )}

//       <button 
//         className={`w-full py-2.5 px-4 rounded-lg font-bold text-white transition-all text-sm ${buttonClass}`}
//         onClick={onUploadAndSave} 
//         disabled={loading || !file}
//       >
//         {loading ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Sedang Menyimpan...
//           </span>
//         ) : 'Upload & Simpan Cover'}
//       </button>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { api, apiUpload } from '@/lib/api';

interface UploadProps {
  courseId: string;
  currentUrl?: string;
  onSaved?: () => void;
}

export default function UploadCourseCoverWithSave({ courseId, currentUrl, onSaved }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  // Gunakan currentUrl jika ada, atau string kosong
  const [preview, setPreview] = useState<string>(currentUrl || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
    
    if (selectedFile) {
      // Buat preview lokal
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const onUploadAndSave = async () => {
    if (!file) {
      setError('Pilih file cover terlebih dahulu.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Siapkan FormData
      const formData = new FormData();
      formData.append('file', file);

      // 2. Upload ke Backend
      // Endpoint ini (dari backend/routes/upload.ts) mengembalikan { imageUrl: "/uploads/..." }
      const uploadRes = await apiUpload(`/upload/course/${courseId}/cover`, formData);
      
      // Ambil path relatif (handle struktur response yang mungkin berbeda untuk keamanan)
      const relativePath = uploadRes.imageUrl || uploadRes.file?.url || uploadRes.url;

      if (!relativePath) {
        console.error("Struktur response server:", uploadRes);
        throw new Error("Gagal mendapatkan path file dari server (Property tidak ditemukan).");
      }

      // 3. Konversi ke URL Absolut (Wajib agar validasi backend/zod aman)
      // Menggabungkan http://localhost:4000 dengan /uploads/...
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const absoluteUrl = new URL(relativePath, baseUrl).toString();

      // 4. Simpan URL ke Database Course
      // Catatan: api() menghandle JSON.stringify secara otomatis
      await api(`/api/courses/${courseId}`, {
        method: 'PATCH',
        body: { thumbnailUrl: absoluteUrl } 
      });

      alert('Cover berhasil disimpan!');
      setFile(null); // Reset file input
      
      if (onSaved) onSaved();

    } catch (err: any) {
      console.error("Upload Error:", err);
      setError(err.message || 'Gagal mengunggah cover.');
    } finally {
      setLoading(false);
    }
  };

  // Logic Styling Button
  const buttonClass = loading || !file 
    ? 'bg-gray-400 cursor-not-allowed' 
    : 'bg-red-700 hover:bg-red-800 shadow-md active:scale-95';

  return (
    <div className="space-y-4 border p-4 rounded-xl bg-gray-50 shadow-sm">
      <div>
        <label 
          htmlFor={`cover-upload-${courseId}`} 
          className="block text-sm font-bold text-gray-700 mb-2"
        >
          Ganti Cover Kursus
        </label>
        
        {/* Area Preview */}
        <div className="mb-3 relative w-full h-44 bg-white rounded-lg overflow-hidden border border-gray-200 group">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={preview} 
              alt="Preview Cover" 
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              onError={(e) => {
                // Fallback jika preview URL rusak/expired
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x360?text=No+Image';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm italic">
              Belum ada cover
            </div>
          )}
        </div>

        <input
          id={`cover-upload-${courseId}`}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={onChange}
          className="block w-full text-xs text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-xs file:font-bold
            file:bg-gray-200 file:text-gray-700
            hover:file:bg-gray-300
            cursor-pointer"
        />
      </div>

      {error && (
        <div className="p-2 bg-red-50 border border-red-100 rounded text-red-600 text-xs font-medium flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <button 
        className={`w-full py-2.5 px-4 rounded-lg font-bold text-white transition-all text-sm ${buttonClass}`}
        onClick={onUploadAndSave} 
        disabled={loading || !file}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sedang Menyimpan...
          </span>
        ) : 'Upload & Simpan Cover'}
      </button>
    </div>
  );
}
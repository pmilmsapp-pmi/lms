
// // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // // // // import ProfilePhotoUploader from '@/components/ProfilePhotoUploader';

// // // // // // // // // // // // // export default function ProfilePage() {
// // // // // // // // // // // // //   const { user, refresh } = useAuth(); // Pastikan ada refresh di AuthProvider

// // // // // // // // // // // // //   if (!user) return <div className="p-8">Memuat profil...</div>;

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="p-6 max-w-2xl mx-auto">
// // // // // // // // // // // // //       <h1 className="text-2xl font-bold mb-6">Profil Saya</h1>
      
// // // // // // // // // // // // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // // // // // // //         {/* Kolom Kiri: Foto */}
// // // // // // // // // // // // //         <div className="md:col-span-1">
// // // // // // // // // // // // //           <ProfilePhotoUploader 
// // // // // // // // // // // // //             userId={user.id} 
// // // // // // // // // // // // //             currentUrl={user.avatarUrl} 
// // // // // // // // // // // // //             onSaved={() => refresh()} // Refresh auth context setelah save
// // // // // // // // // // // // //           />
// // // // // // // // // // // // //         </div>

// // // // // // // // // // // // //         {/* Kolom Kanan: Info */}
// // // // // // // // // // // // //         <div className="md:col-span-2 space-y-4 bg-white p-6 rounded shadow border">
// // // // // // // // // // // // //           <div>
// // // // // // // // // // // // //             <label className="block text-sm font-medium text-gray-500">Nama</label>
// // // // // // // // // // // // //             <p className="text-lg font-semibold">{user.name}</p>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //           <div>
// // // // // // // // // // // // //             <label className="block text-sm font-medium text-gray-500">Email</label>
// // // // // // // // // // // // //             <p className="text-lg font-semibold">{user.email}</p>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //           <div>
// // // // // // // // // // // // //             <label className="block text-sm font-medium text-gray-500">Role</label>
// // // // // // // // // // // // //             <span className="bg-gray-100 px-2 py-1 rounded text-sm font-bold">
// // // // // // // // // // // // //               {user.role}
// // // // // // // // // // // // //             </span>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // }
// // // // // // // // // // // // 'use client';

// // // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // // // import ProfilePhotoUploader from '@/components/ProfilePhotoUploader';
// // // // // // // // // // // // import { api } from '@/lib/api'; // Pastikan import ini ada
// // // // // // // // // // // // import Link from 'next/link';

// // // // // // // // // // // // export default function ProfilePage() {
// // // // // // // // // // // //   const { user, refresh } = useAuth(); 
  
// // // // // // // // // // // //   // State untuk Sertifikat
// // // // // // // // // // // //   const [certificates, setCertificates] = useState<any[]>([]);
// // // // // // // // // // // //   const [loadingCert, setLoadingCert] = useState(true);

// // // // // // // // // // // //   // Load sertifikat saat user tersedia
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (user) {
// // // // // // // // // // // //       loadCertificates();
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }, [user]);

// // // // // // // // // // // //   const loadCertificates = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const data = await api('/api/certificates');
// // // // // // // // // // // //       // Handle format data (array langsung atau object)
// // // // // // // // // // // //       const certList = Array.isArray(data) ? data : (data.certificates || []);
// // // // // // // // // // // //       setCertificates(certList);
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       console.error("Gagal load sertifikat:", err);
// // // // // // // // // // // //     } finally {
// // // // // // // // // // // //       setLoadingCert(false);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Fungsi Download PDF (Membuka Tab Baru ke Backend)
// // // // // // // // // // // //   const handleDownload = (certId: string) => {
// // // // // // // // // // // //     // Ganti URL ini jika backend Anda deploy di tempat lain
// // // // // // // // // // // //     // Jika backend running di localhost:4000:
// // // // // // // // // // // //     const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    
// // // // // // // // // // // //     // Buka endpoint PDF di tab baru
// // // // // // // // // // // //     window.open(`${backendUrl}/api/certificates/${certId}/pdf`, '_blank');
// // // // // // // // // // // //   };

// // // // // // // // // // // //   if (!user) return <div className="p-8 text-center">Memuat profil...</div>;

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="p-6 max-w-4xl mx-auto space-y-10 pb-20">
      
// // // // // // // // // // // //       {/* --- BAGIAN 1: INFO PROFIL (Kode Lama Anda) --- */}
// // // // // // // // // // // //       <div>
// // // // // // // // // // // //         <h1 className="text-2xl font-bold mb-6 text-gray-800">Profil Saya</h1>
// // // // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // // // // // //           {/* Kolom Kiri: Foto */}
// // // // // // // // // // // //           <div className="md:col-span-1">
// // // // // // // // // // // //             <ProfilePhotoUploader 
// // // // // // // // // // // //               userId={user.id} 
// // // // // // // // // // // //               currentUrl={user.avatarUrl} 
// // // // // // // // // // // //               onSaved={() => refresh()} 
// // // // // // // // // // // //             />
// // // // // // // // // // // //           </div>

// // // // // // // // // // // //           {/* Kolom Kanan: Info */}
// // // // // // // // // // // //           <div className="md:col-span-2 space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // //             <div>
// // // // // // // // // // // //               <label className="block text-sm font-medium text-gray-500">Nama Lengkap</label>
// // // // // // // // // // // //               <p className="text-lg font-semibold text-gray-900">{user.name}</p>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <div>
// // // // // // // // // // // //               <label className="block text-sm font-medium text-gray-500">Alamat Email</label>
// // // // // // // // // // // //               <p className="text-lg font-semibold text-gray-900">{user.email}</p>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //             <div>
// // // // // // // // // // // //               <label className="block text-sm font-medium text-gray-500">Status Akun</label>
// // // // // // // // // // // //               <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
// // // // // // // // // // // // user.role === 'SUPER_ADMIN' || user.role === 'FACILITATOR'                  ? 'bg-purple-100 text-purple-800' 
// // // // // // // // // // // //                   : 'bg-green-100 text-green-800'
// // // // // // // // // // // //               }`}>
// // // // // // // // // // // //                 {user.role}
// // // // // // // // // // // //               </span>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       <hr className="border-gray-200" />

// // // // // // // // // // // //       {/* --- BAGIAN 2: DAFTAR SERTIFIKAT (Fitur Baru) --- */}
// // // // // // // // // // // //       <div>
// // // // // // // // // // // //         <h2 className="text-2xl font-bold text-gray-800 mb-6">Sertifikat Kelulusan</h2>
        
// // // // // // // // // // // //         {loadingCert ? (
// // // // // // // // // // // //           <div className="text-center py-10 text-gray-500">Memeriksa sertifikat...</div>
// // // // // // // // // // // //         ) : certificates.length === 0 ? (
// // // // // // // // // // // //           <div className="bg-gray-50 p-8 rounded-xl border-2 border-dashed border-gray-300 text-center">
// // // // // // // // // // // //             <p className="text-gray-500 mb-2">Anda belum memiliki sertifikat.</p>
// // // // // // // // // // // //             <Link href="/courses" className="text-red-600 font-bold hover:underline">
// // // // // // // // // // // //               Selesaikan Kursus Sekarang
// // // // // // // // // // // //             </Link>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         ) : (
// // // // // // // // // // // //           <div className="grid gap-6">
// // // // // // // // // // // //             {certificates.map((cert) => (
// // // // // // // // // // // //               <div key={cert._id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
// // // // // // // // // // // //                 <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  
// // // // // // // // // // // //                   {/* Info Sertifikat */}
// // // // // // // // // // // //                   <div className="flex-1 text-center md:text-left">
// // // // // // // // // // // //                     <h3 className="text-lg font-bold text-gray-900">{cert.courseId?.title || 'Kursus Tidak Dikenal'}</h3>
// // // // // // // // // // // //                     <p className="text-sm text-gray-500 mt-1">
// // // // // // // // // // // //                       Diterbitkan pada: {new Date(cert.issueDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}
// // // // // // // // // // // //                     </p>
// // // // // // // // // // // //                     <p className="text-xs text-gray-400 font-mono mt-1">ID: {cert.certificateCode}</p>
// // // // // // // // // // // //                   </div>

// // // // // // // // // // // //                   {/* Tombol Action */}
// // // // // // // // // // // //                   <div className="flex gap-3">
// // // // // // // // // // // //                     <button 
// // // // // // // // // // // //                       onClick={() => handleDownload(cert._id)}
// // // // // // // // // // // //                       className="flex items-center gap-2 bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-red-800 transition-colors shadow"
// // // // // // // // // // // //                     >
// // // // // // // // // // // //                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
// // // // // // // // // // // //                       Download PDF
// // // // // // // // // // // //                     </button>
// // // // // // // // // // // //                   </div>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //               </div>
// // // // // // // // // // // //             ))}
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         )}
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }
// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { useState } from 'react';
// // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // // import { api, apiUpload } from '@/lib/api'; // Pastikan apiUpload mengarah ke /api/upload
// // // // // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // // // // export default function ProfilePage() {
// // // // // // // // // // //   const { user, login } = useAuth(); // login disini untuk update context user
// // // // // // // // // // //   const [uploading, setUploading] = useState(false);
  
// // // // // // // // // // //   // State Password
// // // // // // // // // // //   const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });

// // // // // // // // // // //   // 1. HANDLE UPLOAD AVATAR
// // // // // // // // // // //   const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // //     const file = e.target.files?.[0];
// // // // // // // // // // //     if (!file) return;

// // // // // // // // // // //     try {
// // // // // // // // // // //       setUploading(true);
      
// // // // // // // // // // //       // Step A: Upload File ke Server
// // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // //       formData.append('file', file);
// // // // // // // // // // //       // PENTING: Gunakan route upload umum, bukan /upload/user/:id
// // // // // // // // // // //       const resUpload = await apiUpload('/upload', formData); 
// // // // // // // // // // //       const avatarUrl = resUpload.url || resUpload.file?.url;

// // // // // // // // // // //       // Step B: Update Profile User dengan URL baru
// // // // // // // // // // //       const resUser = await api('/api/users/profile', {
// // // // // // // // // // //         method: 'PUT',
// // // // // // // // // // //         body: { avatarUrl }
// // // // // // // // // // //       });

// // // // // // // // // // //       // Update Local Storage / Context
// // // // // // // // // // //       // (Asumsi fungsi login bisa menerima data user baru untuk update state)
// // // // // // // // // // //       // Jika tidak, refresh halaman:
// // // // // // // // // // //       alert("Foto Profil Berhasil Diubah!");
// // // // // // // // // // //       window.location.reload(); 

// // // // // // // // // // //     } catch (err: any) {
// // // // // // // // // // //       console.error(err);
// // // // // // // // // // //       alert("Gagal upload: " + err.message);
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setUploading(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // 2. HANDLE CHANGE PASSWORD
// // // // // // // // // // //   const handleChangePassword = async (e: React.FormEvent) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     if (passForm.new !== passForm.confirm) return alert("Konfirmasi password tidak cocok");
    
// // // // // // // // // // //     try {
// // // // // // // // // // //       await api('/api/users/change-password', {
// // // // // // // // // // //         method: 'PUT',
// // // // // // // // // // //         body: { 
// // // // // // // // // // //           currentPassword: passForm.current,
// // // // // // // // // // //           newPassword: passForm.new 
// // // // // // // // // // //         }
// // // // // // // // // // //       });
// // // // // // // // // // //       alert("Password berhasil diubah!");
// // // // // // // // // // //       setPassForm({ current: '', new: '', confirm: '' });
// // // // // // // // // // //     } catch (err: any) {
// // // // // // // // // // //       alert("Gagal: " + err.message);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <Protected>
// // // // // // // // // // //       <div className="max-w-4xl mx-auto p-6 space-y-8">
// // // // // // // // // // //         <h1 className="text-3xl font-bold text-gray-800">Profil Saya</h1>

// // // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // // // // // // // // //           {/* BAGIAN KIRI: AVATAR & INFO */}
// // // // // // // // // // //           <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
// // // // // // // // // // //             <div className="relative w-32 h-32 mx-auto mb-4">
// // // // // // // // // // //                {/* eslint-disable-next-line @next/next/no-img-element */}
// // // // // // // // // // //               <img 
// // // // // // // // // // //                 src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.name}`} 
// // // // // // // // // // //                 className="w-full h-full rounded-full object-cover border-4 border-red-50" 
// // // // // // // // // // //                 alt="Profile"
// // // // // // // // // // //               />
// // // // // // // // // // //               <label className="absolute bottom-0 right-0 bg-red-700 text-white p-2 rounded-full cursor-pointer hover:bg-red-800 shadow-md">
// // // // // // // // // // //                 <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} disabled={uploading} />
// // // // // // // // // // //                 {uploading ? '...' : '📷'}
// // // // // // // // // // //               </label>
// // // // // // // // // // //             </div>
// // // // // // // // // // //             <h2 className="text-xl font-bold">{user?.name}</h2>
// // // // // // // // // // //             <p className="text-gray-500">{user?.email}</p>
// // // // // // // // // // //             <span className="inline-block mt-2 bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-bold">
// // // // // // // // // // //               {user?.role}
// // // // // // // // // // //             </span>
// // // // // // // // // // //           </div>

// // // // // // // // // // //           {/* BAGIAN KANAN: GANTI PASSWORD */}
// // // // // // // // // // //           <div className="bg-white p-6 rounded-xl shadow-sm border">
// // // // // // // // // // //             <h3 className="font-bold text-lg mb-4 text-gray-700">Ganti Password</h3>
// // // // // // // // // // //             <form onSubmit={handleChangePassword} className="space-y-4">
// // // // // // // // // // //               <input 
// // // // // // // // // // //                 type="password" placeholder="Password Lama" 
// // // // // // // // // // //                 className="w-full p-3 border rounded-lg text-sm"
// // // // // // // // // // //                 value={passForm.current} onChange={e=>setPassForm({...passForm, current:e.target.value})}
// // // // // // // // // // //               />
// // // // // // // // // // //               <input 
// // // // // // // // // // //                 type="password" placeholder="Password Baru" 
// // // // // // // // // // //                 className="w-full p-3 border rounded-lg text-sm"
// // // // // // // // // // //                 value={passForm.new} onChange={e=>setPassForm({...passForm, new:e.target.value})}
// // // // // // // // // // //               />
// // // // // // // // // // //               <input 
// // // // // // // // // // //                 type="password" placeholder="Konfirmasi Password Baru" 
// // // // // // // // // // //                 className="w-full p-3 border rounded-lg text-sm"
// // // // // // // // // // //                 value={passForm.confirm} onChange={e=>setPassForm({...passForm, confirm:e.target.value})}
// // // // // // // // // // //               />
// // // // // // // // // // //               <button className="bg-gray-800 text-white w-full py-2 rounded-lg font-bold hover:bg-black transition-all">
// // // // // // // // // // //                 Update Password
// // // // // // // // // // //               </button>
// // // // // // // // // // //             </form>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </Protected>
// // // // // // // // // // //   );
// // // // // // // // // // // }
// // // // // // // // // // 'use client';

// // // // // // // // // // import { useState } from 'react';
// // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // // import { api, apiUpload } from '@/lib/api';
// // // // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // // // export default function ProfilePage() {
// // // // // // // // // //   // Hapus 'login' karena tidak ada di AuthProvider context biasanya
// // // // // // // // // //   const { user } = useAuth(); 
// // // // // // // // // //   const [uploading, setUploading] = useState(false);
  
// // // // // // // // // //   const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });

// // // // // // // // // //   const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //     const file = e.target.files?.[0];
// // // // // // // // // //     if (!file) return;

// // // // // // // // // //     try {
// // // // // // // // // //       setUploading(true);
// // // // // // // // // //       const formData = new FormData();
// // // // // // // // // //       formData.append('file', file);
      
// // // // // // // // // //       // 1. Upload file ke folder umum
// // // // // // // // // //       const resUpload = await apiUpload('/upload', formData); 
// // // // // // // // // //       const avatarUrl = resUpload.url || resUpload.file?.url;

// // // // // // // // // //       // 2. Gunakan PATCH /me sesuai rute backend Anda yang baru
// // // // // // // // // //       await api('/api/users/me', {
// // // // // // // // // //         method: 'PATCH',
// // // // // // // // // //         body: { avatarUrl }
// // // // // // // // // //       });

// // // // // // // // // //       alert("Foto Profil Berhasil Diubah!");
// // // // // // // // // //       window.location.reload(); // Memaksa refresh agar Header & Profile sinkron

// // // // // // // // // //     } catch (err: any) {
// // // // // // // // // //       alert("Gagal upload: " + err.message);
// // // // // // // // // //     } finally {
// // // // // // // // // //       setUploading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleChangePassword = async (e: React.FormEvent) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     if (passForm.new !== passForm.confirm) return alert("Konfirmasi password tidak cocok");
    
// // // // // // // // // //     try {
// // // // // // // // // //       await api('/api/users/change-password', {
// // // // // // // // // //         method: 'PUT',
// // // // // // // // // //         body: { 
// // // // // // // // // //           currentPassword: passForm.current,
// // // // // // // // // //           newPassword: passForm.new 
// // // // // // // // // //         }
// // // // // // // // // //       });
// // // // // // // // // //       alert("Password berhasil diubah!");
// // // // // // // // // //       setPassForm({ current: '', new: '', confirm: '' });
// // // // // // // // // //     } catch (err: any) {
// // // // // // // // // //       alert("Gagal: " + (err.error || err.message));
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <Protected>
// // // // // // // // // //       <div className="max-w-4xl mx-auto p-6 space-y-8">
// // // // // // // // // //         <h1 className="text-3xl font-bold text-gray-800">Profil Saya</h1>

// // // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // // // // // // // //           <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
// // // // // // // // // //             <div className="relative w-32 h-32 mx-auto mb-4">
// // // // // // // // // //               {/* eslint-disable-next-line @next/next/no-img-element */}
// // // // // // // // // //               <img 
// // // // // // // // // //                 src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.name}`} 
// // // // // // // // // //                 className="w-full h-full rounded-full object-cover border-4 border-red-50" 
// // // // // // // // // //                 alt="Profile"
// // // // // // // // // //               />
// // // // // // // // // //               <label className="absolute bottom-0 right-0 bg-red-700 text-white p-2 rounded-full cursor-pointer hover:bg-red-800 shadow-md">
// // // // // // // // // //                 <input 
// // // // // // // // // //                     type="file" 
// // // // // // // // // //                     title="Ganti Foto Profil"
// // // // // // // // // //                     className="hidden" 
// // // // // // // // // //                     accept="image/*" 
// // // // // // // // // //                     onChange={handleAvatarChange} 
// // // // // // // // // //                     disabled={uploading} 
// // // // // // // // // //                 />
// // // // // // // // // //                 {uploading ? '...' : '📷'}
// // // // // // // // // //               </label>
// // // // // // // // // //             </div>
// // // // // // // // // //             <h2 className="text-xl font-bold">{user?.name}</h2>
// // // // // // // // // //             <p className="text-gray-500">{user?.email}</p>
// // // // // // // // // //             <span className="inline-block mt-2 bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-bold uppercase">
// // // // // // // // // //               {user?.role}
// // // // // // // // // //             </span>
// // // // // // // // // //           </div>

// // // // // // // // // //           <div className="bg-white p-6 rounded-xl shadow-sm border">
// // // // // // // // // //             <h3 className="font-bold text-lg mb-4 text-gray-700">Ganti Password</h3>
// // // // // // // // // //             <form onSubmit={handleChangePassword} className="space-y-4">
// // // // // // // // // //               <input 
// // // // // // // // // //                 type="password" 
// // // // // // // // // //                 title="Password Lama"
// // // // // // // // // //                 placeholder="Password Lama" 
// // // // // // // // // //                 className="w-full p-3 border rounded-lg text-sm"
// // // // // // // // // //                 value={passForm.current} 
// // // // // // // // // //                 onChange={e=>setPassForm({...passForm, current:e.target.value})}
// // // // // // // // // //               />
// // // // // // // // // //               <input 
// // // // // // // // // //                 type="password" 
// // // // // // // // // //                 title="Password Baru"
// // // // // // // // // //                 placeholder="Password Baru" 
// // // // // // // // // //                 className="w-full p-3 border rounded-lg text-sm"
// // // // // // // // // //                 value={passForm.new} 
// // // // // // // // // //                 onChange={e=>setPassForm({...passForm, new:e.target.value})}
// // // // // // // // // //               />
// // // // // // // // // //               <input 
// // // // // // // // // //                 type="password" 
// // // // // // // // // //                 title="Konfirmasi Password Baru"
// // // // // // // // // //                 placeholder="Konfirmasi Password Baru" 
// // // // // // // // // //                 className="w-full p-3 border rounded-lg text-sm"
// // // // // // // // // //                 value={passForm.confirm} 
// // // // // // // // // //                 onChange={e=>setPassForm({...passForm, confirm:e.target.value})}
// // // // // // // // // //               />
// // // // // // // // // //               <button className="bg-gray-800 text-white w-full py-2 rounded-lg font-bold hover:bg-black transition-all">
// // // // // // // // // //                 Update Password
// // // // // // // // // //               </button>
// // // // // // // // // //             </form>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </Protected>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // 'use client';

// // // // // // // // // import { useState } from 'react';
// // // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // // import { api, apiUpload } from '@/lib/api';
// // // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // // export default function ProfilePage() {
// // // // // // // // //   const { user } = useAuth(); 
// // // // // // // // //   const [uploading, setUploading] = useState(false);
// // // // // // // // //   const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });

// // // // // // // // //   // --- LETAKKAN FUNGSI handleAvatarChange DI SINI ---
// // // // // // // // //   const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //     const file = e.target.files?.[0];
// // // // // // // // //     if (!file) return;

// // // // // // // // //     try {
// // // // // // // // //       setUploading(true);
// // // // // // // // //       const formData = new FormData();
// // // // // // // // //       formData.append('file', file);
      
// // // // // // // // //       // 1. Upload file ke endpoint umum /api/upload
// // // // // // // // //       const resUpload = await apiUpload('/api/upload', formData); 
// // // // // // // // //       const avatarUrl = resUpload.url || resUpload.file?.url;

// // // // // // // // //       // 2. Update Profile User menggunakan PATCH /api/users/me
// // // // // // // // //       await api('/api/users/me', {
// // // // // // // // //         method: 'PATCH',
// // // // // // // // //         body: { avatarUrl }
// // // // // // // // //       });

// // // // // // // // //       alert("Foto Profil Berhasil Diubah!");
// // // // // // // // //       window.location.reload(); 
// // // // // // // // //     } catch (err: any) {
// // // // // // // // //       alert("Gagal upload: Pastikan server backend sudah berjalan dan route /api/upload tersedia.");
// // // // // // // // //       console.error(err);
// // // // // // // // //     } finally {
// // // // // // // // //       setUploading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Handler untuk Ganti Password
// // // // // // // // //   const handleChangePassword = async (e: React.FormEvent) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     if (passForm.new !== passForm.confirm) return alert("Konfirmasi password tidak cocok");
    
// // // // // // // // //     try {
// // // // // // // // //       await api('/api/users/change-password', {
// // // // // // // // //         method: 'PUT',
// // // // // // // // //         body: { 
// // // // // // // // //           currentPassword: passForm.current,
// // // // // // // // //           newPassword: passForm.new 
// // // // // // // // //         }
// // // // // // // // //       });
// // // // // // // // //       alert("Password berhasil diubah!");
// // // // // // // // //       setPassForm({ current: '', new: '', confirm: '' });
// // // // // // // // //     } catch (err: any) {
// // // // // // // // //       alert("Gagal: " + (err.error || err.message));
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <Protected>
// // // // // // // // //       <div className="max-w-4xl mx-auto p-6 space-y-8">
// // // // // // // // //         <h1 className="text-3xl font-bold text-gray-800">Profil Saya</h1>

// // // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // // // // // // //           {/* KARTU PROFIL & AVATAR */}
// // // // // // // // //           <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
// // // // // // // // //             <div className="relative w-32 h-32 mx-auto mb-4">
// // // // // // // // //               <img 
// // // // // // // // //                 src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.name}`} 
// // // // // // // // //                 className="w-full h-full rounded-full object-cover border-4 border-red-50" 
// // // // // // // // //                 alt="Profile"
// // // // // // // // //               />
// // // // // // // // //               <label className="absolute bottom-0 right-0 bg-red-700 text-white p-2 rounded-full cursor-pointer hover:bg-red-800 shadow-md">
// // // // // // // // //                 {/* Input ini yang memicu fungsi handleAvatarChange */}
// // // // // // // // //                 <input 
// // // // // // // // //                     type="file" 
// // // // // // // // //                     title="Ganti Foto Profil"
// // // // // // // // //                     className="hidden" 
// // // // // // // // //                     accept="image/*" 
// // // // // // // // //                     onChange={handleAvatarChange} 
// // // // // // // // //                     disabled={uploading} 
// // // // // // // // //                 />
// // // // // // // // //                 {uploading ? '...' : '📷'}
// // // // // // // // //               </label>
// // // // // // // // //             </div>
// // // // // // // // //             <h2 className="text-xl font-bold">{user?.name}</h2>
// // // // // // // // //             <p className="text-gray-500">{user?.email}</p>
// // // // // // // // //             <span className="inline-block mt-2 bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-bold uppercase">
// // // // // // // // //               {user?.role}
// // // // // // // // //             </span>
// // // // // // // // //           </div>

// // // // // // // // //           {/* FORM GANTI PASSWORD */}
// // // // // // // // //           <div className="bg-white p-6 rounded-xl shadow-sm border">
// // // // // // // // //             <h3 className="font-bold text-lg mb-4 text-gray-700">Ganti Password</h3>
// // // // // // // // //             <form onSubmit={handleChangePassword} className="space-y-4">
// // // // // // // // //               <input 
// // // // // // // // //                 type="password" 
// // // // // // // // //                 title="Password Lama"
// // // // // // // // //                 placeholder="Password Lama" 
// // // // // // // // //                 className="w-full p-3 border rounded-lg text-sm"
// // // // // // // // //                 value={passForm.current} 
// // // // // // // // //                 onChange={e=>setPassForm({...passForm, current:e.target.value})}
// // // // // // // // //               />
// // // // // // // // //               <input 
// // // // // // // // //                 type="password" 
// // // // // // // // //                 title="Password Baru"
// // // // // // // // //                 placeholder="Password Baru" 
// // // // // // // // //                 className="w-full p-3 border rounded-lg text-sm"
// // // // // // // // //                 value={passForm.new} 
// // // // // // // // //                 onChange={e=>setPassForm({...passForm, new:e.target.value})}
// // // // // // // // //               />
// // // // // // // // //               <input 
// // // // // // // // //                 type="password" 
// // // // // // // // //                 title="Konfirmasi Password Baru"
// // // // // // // // //                 placeholder="Konfirmasi Password Baru" 
// // // // // // // // //                 className="w-full p-3 border rounded-lg text-sm"
// // // // // // // // //                 value={passForm.confirm} 
// // // // // // // // //                 onChange={e=>setPassForm({...passForm, confirm:e.target.value})}
// // // // // // // // //               />
// // // // // // // // //               <button className="bg-gray-800 text-white w-full py-2 rounded-lg font-bold hover:bg-black transition-all">
// // // // // // // // //                 Update Password
// // // // // // // // //               </button>
// // // // // // // // //             </form>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </Protected>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // // import { api } from '@/lib/api';
// // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // export default function ProfilePage() {
// // // // // // // //   const { user } = useAuth();
// // // // // // // //   const [profileData, setProfileData] = useState<any>(null);
// // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // //   useEffect(() => {
// // // // // // // //     // Ambil detail lengkap: Profile + History + Certificates
// // // // // // // //     api('/api/users/me/detail')
// // // // // // // //       .then(setProfileData)
// // // // // // // //       .catch(console.error)
// // // // // // // //       .finally(() => setLoading(false));
// // // // // // // //   }, []);

// // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat profil lengkap...</div>;

// // // // // // // //   return (
// // // // // // // //     <Protected>
// // // // // // // //       <div className="max-w-6xl mx-auto p-6 space-y-10">
// // // // // // // //         {/* HEADER PROFIL (Sudah Ada Sebelumnya) */}
// // // // // // // //         <div className="bg-white p-8 rounded-3xl shadow-sm border flex items-center gap-6">
// // // // // // // //           <img 
// // // // // // // //             src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.name}`} 
// // // // // // // //             className="w-24 h-24 rounded-full object-cover border-4 border-red-50"
// // // // // // // //             alt="Avatar"
// // // // // // // //           />
// // // // // // // //           <div>
// // // // // // // //             <h1 className="text-2xl font-bold">{user?.name}</h1>
// // // // // // // //             <p className="text-gray-500">{user?.email}</p>
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // // // // // //           {/* TABEL SEJARAH PELATIHAN */}
// // // // // // // //           <div className="bg-white p-6 rounded-2xl shadow-sm border">
// // // // // // // //             <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
// // // // // // // //               📚 Sejarah Pelatihan
// // // // // // // //             </h3>
// // // // // // // //             <div className="space-y-4">
// // // // // // // //               {profileData?.history?.length > 0 ? (
// // // // // // // //                 profileData.history.map((item: any) => (
// // // // // // // //                   <div key={item._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
// // // // // // // //                     <span className="font-medium text-sm">{item.courseId?.title}</span>
// // // // // // // //                     <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
// // // // // // // //                       {item.completed ? 'Selesai' : 'Dalam Proses'}
// // // // // // // //                     </span>
// // // // // // // //                   </div>
// // // // // // // //                 ))
// // // // // // // //               ) : (
// // // // // // // //                 <p className="text-gray-400 text-sm italic">Belum mengikuti pelatihan apapun.</p>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* DAFTAR SERTIFIKAT */}
// // // // // // // //           <div className="bg-white p-6 rounded-2xl shadow-sm border">
// // // // // // // //             <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
// // // // // // // //               📜 Sertifikat Dimiliki
// // // // // // // //             </h3>
// // // // // // // //             <div className="space-y-4">
// // // // // // // //               {profileData?.certificates?.length > 0 ? (
// // // // // // // //                 profileData.certificates.map((cert: any) => (
// // // // // // // //                   <div key={cert._id} className="flex justify-between items-center p-3 border-l-4 border-red-600 bg-red-50 rounded-r-lg">
// // // // // // // //                     <div>
// // // // // // // //                       <p className="font-bold text-sm">{cert.courseId?.title}</p>
// // // // // // // //                       <p className="text-[10px] text-gray-500">No: {cert.certificateNumber}</p>
// // // // // // // //                     </div>
// // // // // // // //                     <a 
// // // // // // // //                       href={`/api/certificates/download/${cert._id}`} 
// // // // // // // //                       className="text-red-700 hover:underline text-xs font-bold"
// // // // // // // //                     >
// // // // // // // //                       Download
// // // // // // // //                     </a>
// // // // // // // //                   </div>
// // // // // // // //                 ))
// // // // // // // //               ) : (
// // // // // // // //                 <p className="text-gray-400 text-sm italic">Belum ada sertifikat yang diterbitkan.</p>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </Protected>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // 'use client';

// // // // // // // import { useEffect, useState } from 'react';
// // // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // // import { api } from '@/lib/api';
// // // // // // // import Protected from '@/components/Protected';

// // // // // // // export default function ProfilePage() {
// // // // // // //   const { user } = useAuth();
// // // // // // //   const [profileData, setProfileData] = useState<any>(null);
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   useEffect(() => {
// // // // // // //     // Ambil detail lengkap: Profile + History + Certificates
// // // // // // //     // Pastikan endpoint '/api/users/me/detail' sudah ada di backend Anda
// // // // // // //     // Jika belum, Anda mungkin perlu membuatnya atau memanggil beberapa endpoint terpisah
// // // // // // //     api('/api/users/me/detail')
// // // // // // //       .then(setProfileData)
// // // // // // //       .catch((err) => {
// // // // // // //         console.error("Gagal memuat profil:", err);
// // // // // // //         // Fallback data kosong jika API belum siap
// // // // // // //         setProfileData({ history: [], certificates: [] });
// // // // // // //       })
// // // // // // //       .finally(() => setLoading(false));
// // // // // // //   }, []);

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
// // // // // // //       </div>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <Protected>
// // // // // // //       <div className="max-w-6xl mx-auto p-6 space-y-10 pb-20">
        
// // // // // // //         {/* HEADER PROFIL */}
// // // // // // //         <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
// // // // // // //           <div className="relative group">
// // // // // // //             <img 
// // // // // // //               src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
// // // // // // //               className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
// // // // // // //               alt="Avatar"
// // // // // // //             />
// // // // // // //             {/* Tombol edit foto bisa ditambahkan di sini jika diperlukan */}
// // // // // // //           </div>
// // // // // // //           <div>
// // // // // // //             <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
// // // // // // //             <p className="text-gray-500 font-medium">{user?.email}</p>
// // // // // // //             <span className="inline-block mt-3 px-4 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider">
// // // // // // //               {user?.role || 'Peserta'}
// // // // // // //             </span>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
// // // // // // //           {/* KOLOM 1: SEJARAH PELATIHAN */}
// // // // // // //           <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
// // // // // // //             <div className="flex items-center gap-3 mb-6 border-b pb-4">
// // // // // // //               <span className="text-2xl">📚</span>
// // // // // // //               <h3 className="font-bold text-xl text-gray-800">Sejarah Pelatihan</h3>
// // // // // // //             </div>
            
// // // // // // //             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
// // // // // // //               {profileData?.history?.length > 0 ? (
// // // // // // //                 profileData.history.map((item: any) => (
// // // // // // //                   <div key={item._id} className="group p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all">
// // // // // // //                     <div className="flex justify-between items-start mb-2">
// // // // // // //                       <h4 className="font-bold text-gray-800 line-clamp-1">{item.courseId?.title || 'Judul Tidak Tersedia'}</h4>
// // // // // // //                       {item.completed ? (
// // // // // // //                         <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Selesai</span>
// // // // // // //                       ) : (
// // // // // // //                         <span className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold rounded uppercase">Proses</span>
// // // // // // //                       )}
// // // // // // //                     </div>
// // // // // // //                     <div className="flex justify-between items-center text-xs text-gray-500">
// // // // // // //                       <span>Mulai: {new Date(item.startDate || Date.now()).toLocaleDateString('id-ID')}</span>
// // // // // // //                       {item.progress !== undefined && (
// // // // // // //                         <span className="font-bold text-blue-600">{item.progress}%</span>
// // // // // // //                       )}
// // // // // // //                     </div>
// // // // // // //                     {/* Progress Bar Visual */}
// // // // // // //                     <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
// // // // // // //                       <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${item.progress || 0}%` }}></div>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 ))
// // // // // // //               ) : (
// // // // // // //                 <div className="text-center py-10">
// // // // // // //                   <div className="text-4xl mb-2 text-gray-200">📭</div>
// // // // // // //                   <p className="text-gray-400 text-sm">Belum ada riwayat pelatihan.</p>
// // // // // // //                   <a href="/dashboard" className="text-red-600 font-bold text-xs hover:underline mt-2 inline-block">Mulai Belajar →</a>
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           {/* KOLOM 2: SERTIFIKAT */}
// // // // // // //           <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
// // // // // // //             <div className="flex items-center gap-3 mb-6 border-b pb-4">
// // // // // // //               <span className="text-2xl">📜</span>
// // // // // // //               <h3 className="font-bold text-xl text-gray-800">Sertifikat Saya</h3>
// // // // // // //             </div>

// // // // // // //             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
// // // // // // //               {profileData?.certificates?.length > 0 ? (
// // // // // // //                 profileData.certificates.map((cert: any) => (
// // // // // // //                   <div key={cert._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow relative overflow-hidden group">
// // // // // // //                     <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-yellow-400 to-yellow-600"></div>
                    
// // // // // // //                     <div className="pl-4 flex-1">
// // // // // // //                       <h4 className="font-bold text-gray-800 text-sm mb-1">{cert.courseId?.title}</h4>
// // // // // // //                       <p className="text-[10px] text-gray-400 font-mono">NO: {cert.certificateNumber}</p>
// // // // // // //                       <p className="text-[10px] text-gray-500 mt-1">Terbit: {new Date(cert.issueDate).toLocaleDateString('id-ID')}</p>
// // // // // // //                     </div>

// // // // // // //                     <a 
// // // // // // //                       href={`/api/certificates/download/${cert._id}`} 
// // // // // // //                       target="_blank"
// // // // // // //                       rel="noopener noreferrer"
// // // // // // //                       className="ml-4 flex flex-col items-center justify-center text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 w-10 h-10 rounded-xl transition-colors"
// // // // // // //                       title="Download PDF"
// // // // // // //                     >
// // // // // // //                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
// // // // // // //                         <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
// // // // // // //                       </svg>
// // // // // // //                     </a>
// // // // // // //                   </div>
// // // // // // //                 ))
// // // // // // //               ) : (
// // // // // // //                 <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // // // // // //                   <div className="text-4xl mb-2">🎓</div>
// // // // // // //                   <p className="text-gray-500 font-medium text-sm">Belum ada sertifikat.</p>
// // // // // // //                   <p className="text-xs text-gray-400 mt-1">Selesaikan kursus untuk mendapatkannya!</p>
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </Protected>
// // // // // // //   );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useEffect, useState, useRef } from 'react';
// // // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // import Protected from '@/components/Protected';

// // // // // // export default function ProfilePage() {
// // // // // //   const { user } = useAuth();
// // // // // //   const [profileData, setProfileData] = useState<any>(null);
// // // // // //   const [loading, setLoading] = useState(true);
  
// // // // // //   // State Edit Profile
// // // // // //   const [name, setName] = useState('');
// // // // // //   const [avatarFile, setAvatarFile] = useState<File | null>(null);
// // // // // //   const [previewUrl, setPreviewUrl] = useState('');
// // // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // // // // //   useEffect(() => {
// // // // // //     // Fetch data fresh dari server
// // // // // //     loadProfile();
// // // // // //   }, []);

// // // // // //   const loadProfile = async () => {
// // // // // //       try {
// // // // // //           // Asumsi endpoint ini mengembalikan { user: ..., history: [], certificates: [] }
// // // // // //           // Jika belum ada endpoint /detail, buatlah endpoint aggregasi di backend.
// // // // // //           // Untuk sementara, kita bisa panggil endpoint standar dan sertifikat terpisah jika perlu.
// // // // // //           // Disini saya asumsikan endpoint existing atau kita buat simpel:
          
// // // // // //           const res = await api('/api/users/me/detail'); 
// // // // // //           setProfileData(res);
// // // // // //           setName(res.user?.name || '');
// // // // // //       } catch (err) {
// // // // // //           console.error("Gagal load profil", err);
// // // // // //       } finally {
// // // // // //           setLoading(false);
// // // // // //       }
// // // // // //   };

// // // // // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //       const file = e.target.files?.[0];
// // // // // //       if (file) {
// // // // // //           setAvatarFile(file);
// // // // // //           setPreviewUrl(URL.createObjectURL(file));
// // // // // //       }
// // // // // //   };

// // // // // //   const handleSave = async () => {
// // // // // //       try {
// // // // // //           setIsEditing(true);
// // // // // //           let avatarUrl = profileData?.user?.avatarUrl;

// // // // // //           if (avatarFile) {
// // // // // //               const fd = new FormData();
// // // // // //               fd.append('file', avatarFile);
// // // // // //               const res = await apiUpload('/api/upload', fd);
// // // // // //               avatarUrl = res.url || res.file?.url;
// // // // // //           }

// // // // // //           await api('/api/users/profile', { method: 'PATCH', body: { name, avatarUrl } });
          
// // // // // //           alert("Profil berhasil diperbarui!");
// // // // // //           // Update local data
// // // // // //           const newUser = { ...user, name, avatarUrl };
// // // // // //           localStorage.setItem('user', JSON.stringify(newUser));
// // // // // //           window.location.reload(); 
// // // // // //       } catch (e: any) {
// // // // // //           alert("Gagal update: " + e.message);
// // // // // //       } finally {
// // // // // //           setIsEditing(false);
// // // // // //       }
// // // // // //   };

// // // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

// // // // // //   return (
// // // // // //     <Protected>
// // // // // //       <div className="max-w-6xl mx-auto p-6 space-y-10 pb-20">
        
// // // // // //         {/* HEADER PROFIL */}
// // // // // //         <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
// // // // // //           <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
// // // // // //             <img 
// // // // // //               src={previewUrl || getImageUrl(profileData?.user?.avatarUrl) || `https://ui-avatars.com/api/?name=${user?.name}`} 
// // // // // //               className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
// // // // // //               alt="Avatar"
// // // // // //             />
// // // // // //             <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
// // // // // //                 <span className="text-white text-xs font-bold">Ganti Foto</span>
// // // // // //             </div>
// // // // // //             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
// // // // // //           </div>
          
// // // // // //           <div className="flex-1 text-center md:text-left">
// // // // // //             <div className="mb-2">
// // // // // //                 <label className="text-xs text-gray-400 font-bold block mb-1">Nama Lengkap</label>
// // // // // //                 <input 
// // // // // //                     type="text" 
// // // // // //                     value={name} 
// // // // // //                     onChange={e => setName(e.target.value)} 
// // // // // //                     className="text-3xl font-bold text-gray-800 border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none bg-transparent w-full md:w-auto text-center md:text-left transition-all"
// // // // // //                 />
// // // // // //             </div>
// // // // // //             <p className="text-gray-500 font-medium">{profileData?.user?.email}</p>
// // // // // //             <div className="mt-4 flex gap-3 justify-center md:justify-start">
// // // // // //                 <span className="px-4 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider">{profileData?.user?.role}</span>
// // // // // //                 {(name !== profileData?.user?.name || avatarFile) && (
// // // // // //                     <button onClick={handleSave} disabled={isEditing} className="px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-700 disabled:opacity-50">
// // // // // //                         {isEditing ? 'Menyimpan...' : 'Simpan Perubahan'}
// // // // // //                     </button>
// // // // // //                 )}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
// // // // // //           {/* KOLOM 1: SEJARAH PELATIHAN */}
// // // // // //           <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
// // // // // //             <div className="flex items-center gap-3 mb-6 border-b pb-4">
// // // // // //               <span className="text-2xl">📚</span>
// // // // // //               <h3 className="font-bold text-xl text-gray-800">Sejarah Pelatihan</h3>
// // // // // //             </div>
            
// // // // // //             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
// // // // // //               {profileData?.history?.length > 0 ? (
// // // // // //                 profileData.history.map((item: any) => (
// // // // // //                   <div key={item._id} className="p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all">
// // // // // //                     <div className="flex justify-between items-start mb-2">
// // // // // //                       <h4 className="font-bold text-gray-800 line-clamp-1">{item.courseId?.title}</h4>
// // // // // //                       <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${item.completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
// // // // // //                           {item.completed ? 'Selesai' : 'Proses'}
// // // // // //                       </span>
// // // // // //                     </div>
// // // // // //                     <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
// // // // // //                       <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${item.progress || 0}%` }}></div>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 ))
// // // // // //               ) : (
// // // // // //                 <div className="text-center py-10 text-gray-400 text-sm">Belum ada riwayat.</div>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* KOLOM 2: SERTIFIKAT */}
// // // // // //           <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
// // // // // //             <div className="flex items-center gap-3 mb-6 border-b pb-4">
// // // // // //               <span className="text-2xl">📜</span>
// // // // // //               <h3 className="font-bold text-xl text-gray-800">Sertifikat Saya</h3>
// // // // // //             </div>

// // // // // //             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
// // // // // //               {profileData?.certificates?.length > 0 ? (
// // // // // //                 profileData.certificates.map((cert: any) => (
// // // // // //                   <div key={cert._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow relative overflow-hidden">
// // // // // //                     <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-yellow-400 to-yellow-600"></div>
// // // // // //                     <div className="pl-4 flex-1">
// // // // // //                       <h4 className="font-bold text-gray-800 text-sm mb-1">{cert.course?.title}</h4>
// // // // // //                       <p className="text-[10px] text-gray-400 font-mono">NO: {cert.certificateNumber}</p>
// // // // // //                       <p className="text-[10px] text-gray-500 mt-1">Terbit: {new Date(cert.issueDate).toLocaleDateString('id-ID')}</p>
// // // // // //                       {cert.status === 'pending' && <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded">Menunggu Approval</span>}
// // // // // //                     </div>
// // // // // //                     {cert.status === 'issued' && (
// // // // // //                         <a 
// // // // // //                           href={`/api/certificates/download/${cert._id}`} 
// // // // // //                           target="_blank"
// // // // // //                           className="ml-4 flex flex-col items-center justify-center text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 w-10 h-10 rounded-xl transition-colors"
// // // // // //                           title="Download PDF"
// // // // // //                         >
// // // // // //                           📥
// // // // // //                         </a>
// // // // // //                     )}
// // // // // //                   </div>
// // // // // //                 ))
// // // // // //               ) : (
// // // // // //                 <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // // // // //                   <div className="text-4xl mb-2">🎓</div>
// // // // // //                   <p className="text-gray-500 font-medium text-sm">Belum ada sertifikat.</p>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </Protected>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useEffect, useState, useRef } from 'react';
// // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // import Protected from '@/components/Protected';

// // // // // export default function ProfilePage() {
// // // // //   const { user } = useAuth();
// // // // //   const [profileData, setProfileData] = useState<any>(null);
// // // // //   const [loading, setLoading] = useState(true);
  
// // // // //   // State Edit Profile
// // // // //   const [name, setName] = useState('');
// // // // //   const [avatarFile, setAvatarFile] = useState<File | null>(null);
// // // // //   const [previewUrl, setPreviewUrl] = useState('');
// // // // //   const [isEditing, setIsEditing] = useState(false);
// // // // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // // // //   useEffect(() => {
// // // // //     // Fetch data fresh dari server
// // // // //     loadProfile();
// // // // //   }, []);

// // // // //   const loadProfile = async () => {
// // // // //       try {
// // // // //           const res = await api('/api/users/me/detail'); 
// // // // //           setProfileData(res);
// // // // //           setName(res.user?.name || '');
// // // // //       } catch (err) {
// // // // //           console.error("Gagal load profil", err);
// // // // //       } finally {
// // // // //           setLoading(false);
// // // // //       }
// // // // //   };

// // // // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //       const file = e.target.files?.[0];
// // // // //       if (file) {
// // // // //           setAvatarFile(file);
// // // // //           setPreviewUrl(URL.createObjectURL(file));
// // // // //       }
// // // // //   };

// // // // //   const handleSave = async () => {
// // // // //       try {
// // // // //           setIsEditing(true);
// // // // //           let avatarUrl = profileData?.user?.avatarUrl;

// // // // //           if (avatarFile) {
// // // // //               const fd = new FormData();
// // // // //               fd.append('file', avatarFile);
// // // // //               const res = await apiUpload('/api/upload', fd);
// // // // //               avatarUrl = res.url || res.file?.url;
// // // // //           }

// // // // //           await api('/api/users/profile', { method: 'PATCH', body: { name, avatarUrl } });
          
// // // // //           alert("Profil berhasil diperbarui!");
// // // // //           // Update local data
// // // // //           const newUser = { ...user, name, avatarUrl };
// // // // //           localStorage.setItem('user', JSON.stringify(newUser));
// // // // //           window.location.reload(); 
// // // // //       } catch (e: any) {
// // // // //           alert("Gagal update: " + e.message);
// // // // //       } finally {
// // // // //           setIsEditing(false);
// // // // //       }
// // // // //   };

// // // // //   if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

// // // // //   return (
// // // // //     <Protected>
// // // // //       <div className="max-w-6xl mx-auto p-6 space-y-10 pb-20">
        
// // // // //         {/* HEADER PROFIL */}
// // // // //         <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
// // // // //           <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
// // // // //             <img 
// // // // //               src={previewUrl || getImageUrl(profileData?.user?.avatarUrl) || `https://ui-avatars.com/api/?name=${user?.name}`} 
// // // // //               className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
// // // // //               alt="Avatar"
// // // // //             />
// // // // //             <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
// // // // //                 <span className="text-white text-xs font-bold">Ganti Foto</span>
// // // // //             </div>
// // // // //             <input 
// // // // //                 type="file" 
// // // // //                 ref={fileInputRef} 
// // // // //                 className="hidden" 
// // // // //                 accept="image/*" 
// // // // //                 onChange={handleFileChange}
// // // // //                 aria-label="Ganti Foto Profil" // FIX AXE
// // // // //                 title="Upload Foto Baru" 
// // // // //             />
// // // // //           </div>
          
// // // // //           <div className="flex-1 text-center md:text-left">
// // // // //             <div className="mb-2">
// // // // //                 <label htmlFor="profileName" className="text-xs text-gray-400 font-bold block mb-1">Nama Lengkap</label>
// // // // //                 <input 
// // // // //                     id="profileName"
// // // // //                     type="text" 
// // // // //                     value={name} 
// // // // //                     onChange={e => setName(e.target.value)} 
// // // // //                     className="text-3xl font-bold text-gray-800 border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none bg-transparent w-full md:w-auto text-center md:text-left transition-all"
// // // // //                     aria-label="Edit Nama Lengkap" // FIX AXE
// // // // //                     title="Klik untuk mengedit nama"
// // // // //                 />
// // // // //             </div>
// // // // //             <p className="text-gray-500 font-medium">{profileData?.user?.email}</p>
// // // // //             <div className="mt-4 flex gap-3 justify-center md:justify-start">
// // // // //                 <span className="px-4 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider">{profileData?.user?.role}</span>
// // // // //                 {(name !== profileData?.user?.name || avatarFile) && (
// // // // //                     <button onClick={handleSave} disabled={isEditing} className="px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-700 disabled:opacity-50">
// // // // //                         {isEditing ? 'Menyimpan...' : 'Simpan Perubahan'}
// // // // //                     </button>
// // // // //                 )}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
// // // // //           {/* KOLOM 1: SEJARAH PELATIHAN */}
// // // // //           <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
// // // // //             <div className="flex items-center gap-3 mb-6 border-b pb-4">
// // // // //               <span className="text-2xl">📚</span>
// // // // //               <h3 className="font-bold text-xl text-gray-800">Sejarah Pelatihan</h3>
// // // // //             </div>
            
// // // // //             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
// // // // //               {profileData?.history?.length > 0 ? (
// // // // //                 profileData.history.map((item: any) => (
// // // // //                   <div key={item._id} className="p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all">
// // // // //                     <div className="flex justify-between items-start mb-2">
// // // // //                       <h4 className="font-bold text-gray-800 line-clamp-1">{item.courseId?.title}</h4>
// // // // //                       <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${item.completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
// // // // //                           {item.completed ? 'Selesai' : 'Proses'}
// // // // //                       </span>
// // // // //                     </div>
// // // // //                     {/* Progress Bar: Inline style is necessary for dynamic values */}
// // // // //                     <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden">
// // // // //                       <div 
// // // // //                         className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out" 
// // // // //                         style={{ width: `${item.progress || 0}%` }}
// // // // //                       ></div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))
// // // // //               ) : (
// // // // //                 <div className="text-center py-10 text-gray-400 text-sm">Belum ada riwayat.</div>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* KOLOM 2: SERTIFIKAT */}
// // // // //           <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
// // // // //             <div className="flex items-center gap-3 mb-6 border-b pb-4">
// // // // //               <span className="text-2xl">📜</span>
// // // // //               <h3 className="font-bold text-xl text-gray-800">Sertifikat Saya</h3>
// // // // //             </div>

// // // // //             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
// // // // //               {profileData?.certificates?.length > 0 ? (
// // // // //                 profileData.certificates.map((cert: any) => (
// // // // //                   <div key={cert._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow relative overflow-hidden">
// // // // //                     <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-yellow-400 to-yellow-600"></div>
// // // // //                     <div className="pl-4 flex-1">
// // // // //                       <h4 className="font-bold text-gray-800 text-sm mb-1">{cert.course?.title}</h4>
// // // // //                       <p className="text-[10px] text-gray-400 font-mono">NO: {cert.certificateNumber}</p>
// // // // //                       <p className="text-[10px] text-gray-500 mt-1">Terbit: {new Date(cert.issueDate).toLocaleDateString('id-ID')}</p>
// // // // //                       {cert.status === 'pending' && <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded">Menunggu Approval</span>}
// // // // //                     </div>
// // // // //                     {cert.status === 'issued' && (
// // // // //                         <a 
// // // // //                           href={`/api/certificates/download/${cert._id}`} 
// // // // //                           target="_blank"
// // // // //                           rel="noreferrer"
// // // // //                           className="ml-4 flex flex-col items-center justify-center text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 w-10 h-10 rounded-xl transition-colors"
// // // // //                           title="Download PDF"
// // // // //                           aria-label={`Download Sertifikat ${cert.course?.title}`}
// // // // //                         >
// // // // //                           📥
// // // // //                         </a>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 ))
// // // // //               ) : (
// // // // //                 <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // // // //                   <div className="text-4xl mb-2">🎓</div>
// // // // //                   <p className="text-gray-500 font-medium text-sm">Belum ada sertifikat.</p>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>

// // // // //         </div>
// // // // //       </div>
// // // // //     </Protected>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useEffect, useState, useRef } from 'react';
// // // // import { useAuth } from '@/lib/AuthProvider';
// // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // import Protected from '@/components/Protected';

// // // // export default function ProfilePage() {
// // // //   const { user } = useAuth();
// // // //   const [profileData, setProfileData] = useState<any>(null);
// // // //   const [loading, setLoading] = useState(true);
  
// // // //   // State Edit Profile
// // // //   const [name, setName] = useState('');
// // // //   const [avatarFile, setAvatarFile] = useState<File | null>(null);
// // // //   const [previewUrl, setPreviewUrl] = useState('');
// // // //   const [isEditing, setIsEditing] = useState(false);
// // // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // // //   useEffect(() => { loadProfile(); }, []);

// // // //   const loadProfile = async () => {
// // // //       try {
// // // //           const res = await api('/api/users/me/detail'); 
// // // //           setProfileData(res);
// // // //           setName(res.user?.name || '');
// // // //       } catch (err) { console.error(err); } finally { setLoading(false); }
// // // //   };

// // // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //       const file = e.target.files?.[0];
// // // //       if (file) { setAvatarFile(file); setPreviewUrl(URL.createObjectURL(file)); }
// // // //   };

// // // //   const handleSave = async () => {
// // // //       try {
// // // //           setIsEditing(true);
// // // //           let avatarUrl = profileData?.user?.avatarUrl;
// // // //           if (avatarFile) {
// // // //               const fd = new FormData(); fd.append('file', avatarFile);
// // // //               const res = await apiUpload('/api/upload', fd);
// // // //               avatarUrl = res.url || res.file?.url;
// // // //           }
// // // //           await api('/api/users/profile', { method: 'PATCH', body: { name, avatarUrl } });
// // // //           alert("Profil berhasil diperbarui!");
// // // //           window.location.reload(); 
// // // //       } catch (e: any) { alert("Gagal: " + e.message); } finally { setIsEditing(false); }
// // // //   };

// // // //   if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

// // // //   return (
// // // //     <Protected>
// // // //       <div className="max-w-6xl mx-auto p-6 space-y-10 pb-20">
        
// // // //         {/* HEADER PROFIL */}
// // // //         <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
// // // //           <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
// // // //             <img src={previewUrl || getImageUrl(profileData?.user?.avatarUrl) || `https://ui-avatars.com/api/?name=${user?.name}`} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" alt="Avatar"/>
// // // //             <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-white text-xs font-bold">Ganti Foto</span></div>
// // // //             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} aria-label="Upload Avatar" />
// // // //           </div>
// // // //           <div className="flex-1 text-center md:text-left">
// // // //             <div className="mb-2"><label className="text-xs text-gray-400 font-bold block mb-1">Nama Lengkap</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="text-3xl font-bold text-gray-800 border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none bg-transparent w-full md:w-auto text-center md:text-left transition-all" aria-label="Nama Lengkap" /></div>
// // // //             <p className="text-gray-500 font-medium">{profileData?.user?.email}</p>
// // // //             <div className="mt-4 flex gap-3 justify-center md:justify-start"><span className="px-4 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider">{profileData?.user?.role}</span>{(name !== profileData?.user?.name || avatarFile) && (<button onClick={handleSave} disabled={isEditing} className="px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-700 disabled:opacity-50">{isEditing ? 'Menyimpan...' : 'Simpan Perubahan'}</button>)}</div>
// // // //           </div>
// // // //         </div>

// // // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // // //           {/* SEJARAH PELATIHAN */}
// // // //           <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
// // // //             <div className="flex items-center gap-3 mb-6 border-b pb-4"><span className="text-2xl">📚</span><h3 className="font-bold text-xl text-gray-800">Sejarah Pelatihan</h3></div>
// // // //             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
// // // //               {profileData?.history?.length > 0 ? (profileData.history.map((item: any) => (<div key={item._id} className="p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all"><div className="flex justify-between items-start mb-2"><h4 className="font-bold text-gray-800 line-clamp-1">{item.courseId?.title}</h4><span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${item.completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{item.completed ? 'Selesai' : 'Proses'}</span></div><div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${item.progress || 0}%` }}></div></div></div>))) : (<div className="text-center py-10 text-gray-400 text-sm">Belum ada riwayat.</div>)}
// // // //             </div>
// // // //           </div>

// // // //           {/* SERTIFIKAT (BAGIAN PENTING) */}
// // // //           <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
// // // //             <div className="flex items-center gap-3 mb-6 border-b pb-4"><span className="text-2xl">📜</span><h3 className="font-bold text-xl text-gray-800">Sertifikat Saya</h3></div>
// // // //             <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
// // // //               {profileData?.certificates?.length > 0 ? (
// // // //                 profileData.certificates.map((cert: any) => (
// // // //                   <div key={cert._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow relative overflow-hidden">
// // // //                     <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${cert.status === 'issued' ? 'bg-gradient-to-b from-yellow-400 to-yellow-600' : 'bg-gray-300'}`}></div>
                    
// // // //                     <div className="pl-4 flex-1">
// // // //                       <h4 className="font-bold text-gray-800 text-sm mb-1">{cert.course?.title}</h4>
                      
// // // //                       {cert.status === 'issued' ? (
// // // //                           <>
// // // //                             <p className="text-[10px] text-gray-400 font-mono">NO: {cert.certificateNumber}</p>
// // // //                             <p className="text-[10px] text-gray-500 mt-1">Terbit: {new Date(cert.issueDate).toLocaleDateString('id-ID')}</p>
// // // //                           </>
// // // //                       ) : (
// // // //                           <div className="flex items-center gap-2 mt-2">
// // // //                               <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded border border-orange-200 animate-pulse">
// // // //                                   ⏳ Menunggu Persetujuan Fasilitator
// // // //                               </span>
// // // //                           </div>
// // // //                       )}
// // // //                     </div>

// // // //                     {cert.status === 'issued' ? (
// // // //                         <a 
// // // //                           href={`/api/certificates/download/${cert._id}`} 
// // // //                           target="_blank"
// // // //                           className="ml-4 flex flex-col items-center justify-center text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 w-10 h-10 rounded-xl transition-colors"
// // // //                           title="Download PDF"
// // // //                         >
// // // //                           📥
// // // //                         </a>
// // // //                     ) : (
// // // //                         <div className="ml-4 w-10 h-10 flex items-center justify-center text-gray-300 bg-gray-100 rounded-xl cursor-not-allowed" title="Belum tersedia">
// // // //                             🔒
// // // //                         </div>
// // // //                     )}
// // // //                   </div>
// // // //                 ))
// // // //               ) : (
// // // //                 <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // // //                   <div className="text-4xl mb-2">🎓</div>
// // // //                   <p className="text-gray-500 font-medium text-sm">Belum ada sertifikat.</p>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </Protected>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useEffect, useState, useRef } from 'react';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // import Protected from '@/components/Protected';
// // // import Link from 'next/link';

// // // export default function ProfilePage() {
// // //   const { user } = useAuth();
// // //   const [profileData, setProfileData] = useState<any>(null);
// // //   const [loading, setLoading] = useState(true);
  
// // //   // State Edit Profile
// // //   const [name, setName] = useState('');
// // //   const [avatarFile, setAvatarFile] = useState<File | null>(null);
// // //   const [previewUrl, setPreviewUrl] = useState('');
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const fileInputRef = useRef<HTMLInputElement>(null);

// // //   // State Inbox Chat
// // //   const [conversations, setConversations] = useState<any[]>([]);
// // //   const [loadingChat, setLoadingChat] = useState(true);

// // //   useEffect(() => { 
// // //       loadProfile(); 
// // //       loadConversations();
// // //   }, []);

// // //   const loadProfile = async () => {
// // //       try {
// // //           const res = await api('/api/users/me/detail'); 
// // //           setProfileData(res);
// // //           setName(res.user?.name || '');
// // //       } catch (err) { console.error(err); } finally { setLoading(false); }
// // //   };

// // //   const loadConversations = async () => {
// // //       try {
// // //           const res = await api('/api/chat/conversations');
// // //           setConversations(res.conversations || []);
// // //       } catch (err) { console.error(err); } finally { setLoadingChat(false); }
// // //   };

// // //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //       const file = e.target.files?.[0];
// // //       if (file) { setAvatarFile(file); setPreviewUrl(URL.createObjectURL(file)); }
// // //   };

// // //   const handleSave = async () => {
// // //       try {
// // //           setIsEditing(true);
// // //           let avatarUrl = profileData?.user?.avatarUrl;
// // //           if (avatarFile) {
// // //               const fd = new FormData(); fd.append('file', avatarFile);
// // //               const res = await apiUpload('/api/upload', fd);
// // //               avatarUrl = res.url || res.file?.url;
// // //           }
// // //           await api('/api/users/profile', { method: 'PATCH', body: { name, avatarUrl } });
// // //           alert("Profil berhasil diperbarui!");
// // //           window.location.reload(); 
// // //       } catch (e: any) { alert("Gagal: " + e.message); } finally { setIsEditing(false); }
// // //   };

// // //   if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>;

// // //   return (
// // //     <Protected>
// // //       <div className="max-w-6xl mx-auto p-6 space-y-10 pb-20">
        
// // //         {/* HEADER PROFIL */}
// // //         <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
// // //           <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
// // //             <img src={previewUrl || getImageUrl(profileData?.user?.avatarUrl) || `https://ui-avatars.com/api/?name=${user?.name}`} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" alt="Avatar"/>
// // //             <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-white text-xs font-bold">Ganti Foto</span></div>
// // //             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} aria-label="Upload Avatar" />
// // //           </div>
// // //           <div className="flex-1 text-center md:text-left">
// // //             <div className="mb-2"><label className="text-xs text-gray-400 font-bold block mb-1">Nama Lengkap</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="text-3xl font-bold text-gray-800 border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none bg-transparent w-full md:w-auto text-center md:text-left transition-all" aria-label="Nama Lengkap" /></div>
// // //             <p className="text-gray-500 font-medium">{profileData?.user?.email}</p>
// // //             <div className="mt-4 flex gap-3 justify-center md:justify-start"><span className="px-4 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider">{profileData?.user?.role}</span>{(name !== profileData?.user?.name || avatarFile) && (<button onClick={handleSave} disabled={isEditing} className="px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-700 disabled:opacity-50">{isEditing ? 'Menyimpan...' : 'Simpan Perubahan'}</button>)}</div>
// // //           </div>
// // //         </div>

// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
// // //           {/* KOLOM KIRI: INBOX CHAT (FITUR BARU) */}
// // //           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full lg:col-span-1">
// // //             <div className="flex items-center justify-between mb-6 border-b pb-4">
// // //                 <div className="flex items-center gap-2">
// // //                     <span className="text-2xl">💬</span>
// // //                     <h3 className="font-bold text-xl text-gray-800">Pesan Masuk</h3>
// // //                 </div>
// // //                 <Link href="/chat" className="text-xs text-blue-600 font-bold hover:underline">Lihat Semua</Link>
// // //             </div>
            
// // //             <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
// // //                 {loadingChat ? (
// // //                     <div className="text-center py-4 text-gray-400 text-xs">Memuat pesan...</div>
// // //                 ) : conversations.length === 0 ? (
// // //                     <div className="text-center py-8 text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed">Belum ada percakapan.</div>
// // //                 ) : (
// // //                     conversations.map((conv: any) => (
// // //                         <Link href={`/chat/${conv.user._id}`} key={conv.user._id} className="block group">
// // //                             <div className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${conv.unreadCount > 0 ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100 hover:border-blue-300'}`}>
// // //                                 <div className="relative">
// // //                                     <img src={getImageUrl(conv.user.avatarUrl)} className="w-10 h-10 rounded-full bg-gray-200 object-cover" alt={conv.user.name} />
// // //                                     {conv.unreadCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold border border-white">{conv.unreadCount}</span>}
// // //                                 </div>
// // //                                 <div className="flex-1 min-w-0">
// // //                                     <div className="flex justify-between items-center mb-0.5">
// // //                                         <h4 className="font-bold text-sm text-gray-800 truncate">{conv.user.name}</h4>
// // //                                         <span className="text-[10px] text-gray-400">{new Date(conv.timestamp).toLocaleDateString()}</span>
// // //                                     </div>
// // //                                     <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'font-bold text-gray-600' : 'text-gray-400'}`}>{conv.lastMessage}</p>
// // //                                 </div>
// // //                             </div>
// // //                         </Link>
// // //                     ))
// // //                 )}
// // //             </div>
// // //           </div>

// // //           {/* KOLOM TENGAH & KANAN: HISTORY & SERTIFIKAT */}
// // //           <div className="lg:col-span-2 space-y-8">
              
// // //               {/* SEJARAH PELATIHAN */}
// // //               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
// // //                 <div className="flex items-center gap-3 mb-6 border-b pb-4"><span className="text-2xl">📚</span><h3 className="font-bold text-xl text-gray-800">Sejarah Pelatihan</h3></div>
// // //                 <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
// // //                   {profileData?.history?.length > 0 ? (profileData.history.map((item: any) => (<div key={item._id} className="p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all"><div className="flex justify-between items-start mb-2"><h4 className="font-bold text-gray-800 line-clamp-1">{item.courseId?.title}</h4><span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${item.completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{item.completed ? 'Selesai' : 'Proses'}</span></div><div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${item.progress || 0}%` }}></div></div></div>))) : (<div className="text-center py-10 text-gray-400 text-sm">Belum ada riwayat.</div>)}
// // //                 </div>
// // //               </div>

// // //               {/* SERTIFIKAT */}
// // //               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
// // //                 <div className="flex items-center gap-3 mb-6 border-b pb-4"><span className="text-2xl">📜</span><h3 className="font-bold text-xl text-gray-800">Sertifikat Saya</h3></div>
// // //                 <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
// // //                   {profileData?.certificates?.length > 0 ? (
// // //                     profileData.certificates.map((cert: any) => (
// // //                       <div key={cert._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow relative overflow-hidden">
// // //                         <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${cert.status === 'issued' ? 'bg-gradient-to-b from-yellow-400 to-yellow-600' : 'bg-gray-300'}`}></div>
                        
// // //                         <div className="pl-4 flex-1">
// // //                           <h4 className="font-bold text-gray-800 text-sm mb-1">{cert.course?.title}</h4>
                          
// // //                           {cert.status === 'issued' ? (
// // //                               <>
// // //                                 <p className="text-[10px] text-gray-400 font-mono">NO: {cert.certificateNumber}</p>
// // //                                 <p className="text-[10px] text-gray-500 mt-1">Terbit: {new Date(cert.issueDate).toLocaleDateString('id-ID')}</p>
// // //                               </>
// // //                           ) : (
// // //                               <div className="flex items-center gap-2 mt-2">
// // //                                   <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded border border-orange-200 animate-pulse">
// // //                                       ⏳ Menunggu Persetujuan Fasilitator
// // //                                   </span>
// // //                               </div>
// // //                           )}
// // //                         </div>

// // //                         {cert.status === 'issued' ? (
// // //                             <a 
// // //                               href={`/api/certificates/download/${cert._id}`} 
// // //                               target="_blank"
// // //                               className="ml-4 flex flex-col items-center justify-center text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 w-10 h-10 rounded-xl transition-colors"
// // //                               title="Download PDF"
// // //                             >
// // //                               📥
// // //                             </a>
// // //                         ) : (
// // //                             <div className="ml-4 w-10 h-10 flex items-center justify-center text-gray-300 bg-gray-100 rounded-xl cursor-not-allowed" title="Belum tersedia">
// // //                                 🔒
// // //                             </div>
// // //                         )}
// // //                       </div>
// // //                     ))
// // //                   ) : (
// // //                     <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
// // //                       <div className="text-4xl mb-2">🎓</div>
// // //                       <p className="text-gray-500 font-medium text-sm">Belum ada sertifikat.</p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //           </div>
// // //         </div>
// // //       </div>
// // //     </Protected>
// // //   );
// // // }'use client';
// // 'use client';
// // import { useState, useEffect } from 'react';
// // import { useAuth } from '@/lib/AuthProvider';
// // import { api, getImageUrl } from '@/lib/api';
// // import Protected from '@/components/Protected';
// // import { 
// //     User, Mail, Phone, MapPin, Edit, 
// //     MessageCircle, BookOpen, CreditCard, FileText, CheckCircle, Clock, XCircle 
// // } from 'lucide-react';

// // // --- MOCK DATA (CONTOH UNTUK TAB LAIN) ---
// // const MOCK_TRAINING = [
// //     { id: 1, title: 'Pelatihan Pertolongan Pertama', date: '2025-01-10', status: 'Selesai', score: 85 },
// //     { id: 2, title: 'Manajemen Bencana Dasar', date: '2025-01-15', status: 'Sedang Berjalan', score: 0 },
// // ];

// // const MOCK_FINANCE = [
// //     { id: 'INV-001', item: 'Sertifikat Kompetensi', date: '2024-12-20', amount: 'Rp 50.000', status: 'Lunas' },
// //     { id: 'INV-002', item: 'Modul Premium', date: '2024-12-25', amount: 'Rp 25.000', status: 'Lunas' },
// // ];

// // const MOCK_LIBRARY = [
// //     { id: 1, title: 'Panduan Relawan 2025', type: 'PDF', downloadedAt: '2024-12-28' },
// //     { id: 2, title: 'Video CPR', type: 'MP4', downloadedAt: '2024-12-29' },
// // ];

// // const MOCK_CHAT = [
// //     { id: 1, with: 'Fasilitator Budi', lastMsg: 'Tugas Anda sudah saya terima.', time: 'Kemarin' },
// //     { id: 2, with: 'Admin Super', lastMsg: 'Silakan cek email untuk verifikasi.', time: '2 Hari lalu' },
// // ];

// // export default function ProfilePage() {
// //     const { user } = useAuth();
// //     const [activeTab, setActiveTab] = useState('forum');
// //     const [myTopics, setMyTopics] = useState<any[]>([]);
// //     const [loadingForum, setLoadingForum] = useState(false);

// //     // Load Data Forum Milik User Sendiri
// //     useEffect(() => {
// //         if (activeTab === 'forum') {
// //             loadMyTopics();
// //         }
// //     }, [activeTab]);

// //     const loadMyTopics = async () => {
// //         try {
// //             setLoadingForum(true);
// //             // Panggil API dengan filter author=me (sesuai backend yg baru kita update)
// //             const res = await api('/api/forum?author=me'); 
// //             setMyTopics(res.topics || []);
// //         } catch (e) {
// //             console.error(e);
// //         } finally {
// //             setLoadingForum(false);
// //         }
// //     };

// //     // Helper Status Badge Forum
// //     const getStatusBadge = (status: string) => {
// //         switch(status) {
// //             case 'approved': return <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold"><CheckCircle size={12}/> Disetujui</span>;
// //             case 'rejected': return <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold"><XCircle size={12}/> Ditolak</span>;
// //             default: return <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-bold"><Clock size={12}/> Menunggu</span>;
// //         }
// //     };

// //     return (
// //         <Protected>
// //             <div className="max-w-6xl mx-auto p-6 min-h-screen font-sans pb-20">
                
// //                 {/* --- 1. HEADER PROFIL --- */}
// //                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
// //                     <div className="h-32 bg-gradient-to-r from-red-700 to-red-900 relative"></div>
// //                     <div className="px-8 pb-8">
// //                         <div className="relative flex justify-between items-end -mt-12 mb-6">
// //                             <div className="flex items-end gap-6">
// //                                 <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
// //                                     <img 
// //                                         src={getImageUrl(user?.avatarUrl) || `https://ui-avatars.com/api/?name=${user?.name}`} 
// //                                         className="w-full h-full object-cover" 
// //                                         alt="Profile"
// //                                     />
// //                                 </div>
// //                                 <div className="mb-1">
// //                                     <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
// //                                     <p className="text-gray-500 text-sm flex items-center gap-2">
// //                                         <span className="capitalize bg-gray-100 px-2 py-0.5 rounded text-xs font-bold text-gray-600">{user?.role?.replace('_', ' ')}</span>
// //                                         • {user?.email}
// //                                     </p>
// //                                 </div>
// //                             </div>
// //                             <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 flex items-center gap-2">
// //                                 <Edit size={14}/> Edit Profil
// //                             </button>
// //                         </div>

// //                         {/* INFO DETAIL */}
// //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 border-t pt-6">
// //                             <div className="flex items-center gap-3">
// //                                 <Mail className="text-gray-400" size={18}/>
// //                                 <span>{user?.email}</span>
// //                             </div>
// //                             <div className="flex items-center gap-3">
// //                                 <Phone className="text-gray-400" size={18}/>
// //                                 <span>+62 812-3456-7890 (Contoh)</span>
// //                             </div>
// //                             <div className="flex items-center gap-3">
// //                                 <MapPin className="text-gray-400" size={18}/>
// //                                 <span>Jakarta, Indonesia</span>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* --- 2. TABS NAVIGASI --- */}
// //                 <div className="flex overflow-x-auto gap-2 border-b border-gray-200 mb-6 pb-1">
// //                     {[
// //                         { id: 'forum', label: 'Forum & Diskusi', icon: MessageCircle },
// //                         { id: 'chat', label: 'Riwayat Chat', icon: Mail },
// //                         { id: 'training', label: 'Pelatihan & Kursus', icon: BookOpen },
// //                         { id: 'finance', label: 'Keuangan', icon: CreditCard },
// //                         { id: 'library', label: 'Aktivitas Pustaka', icon: FileText },
// //                     ].map((tab) => (
// //                         <button
// //                             key={tab.id}
// //                             onClick={() => setActiveTab(tab.id)}
// //                             className={`flex items-center gap-2 px-5 py-3 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
// //                                 activeTab === tab.id 
// //                                 ? 'border-red-700 text-red-700' 
// //                                 : 'border-transparent text-gray-500 hover:text-gray-800'
// //                             }`}
// //                         >
// //                             <tab.icon size={16}/> {tab.label}
// //                         </button>
// //                     ))}
// //                 </div>

// //                 {/* --- 3. KONTEN TAB --- */}
// //                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[300px] p-6">
                    
// //                     {/* A. TAB FORUM (REAL DATA) */}
// //                     {activeTab === 'forum' && (
// //                         <div>
// //                             <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><MessageCircle className="text-red-700"/> Riwayat Pengajuan Forum</h3>
// //                             {loadingForum ? (
// //                                 <div className="text-center py-10 text-gray-400">Memuat data forum...</div>
// //                             ) : myTopics.length === 0 ? (
// //                                 <div className="text-center py-10 border-2 border-dashed rounded-xl bg-gray-50">
// //                                     <p className="text-gray-500 font-medium">Belum ada topik yang Anda buat.</p>
// //                                 </div>
// //                             ) : (
// //                                 <div className="space-y-3">
// //                                     {myTopics.map((topic) => (
// //                                         <div key={topic._id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition">
// //                                             <div>
// //                                                 <div className="flex items-center gap-2 mb-1">
// //                                                     <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{topic.category}</span>
// //                                                     <span className="text-xs text-gray-400">• {new Date(topic.createdAt).toLocaleDateString('id-ID')}</span>
// //                                                 </div>
// //                                                 <h4 className="font-bold text-gray-800">{topic.title}</h4>
// //                                                 <p className="text-sm text-gray-500 line-clamp-1">{topic.content}</p>
// //                                             </div>
// //                                             <div className="text-right">
// //                                                 {getStatusBadge(topic.status)}
// //                                                 <p className="text-xs text-gray-400 mt-2">{topic.replies?.length || 0} Balasan</p>
// //                                             </div>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             )}
// //                         </div>
// //                     )}

// //                     {/* B. TAB CHAT (MOCK) */}
// //                     {activeTab === 'chat' && (
// //                         <div>
// //                             <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Mail className="text-red-700"/> Riwayat Pesan</h3>
// //                             <div className="space-y-3">
// //                                 {MOCK_CHAT.map((chat) => (
// //                                     <div key={chat.id} className="p-4 border rounded-xl flex items-center gap-4 hover:bg-gray-50 cursor-pointer">
// //                                         <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
// //                                             {chat.with.charAt(0)}
// //                                         </div>
// //                                         <div className="flex-1">
// //                                             <h4 className="font-bold text-sm">{chat.with}</h4>
// //                                             <p className="text-sm text-gray-500">{chat.lastMsg}</p>
// //                                         </div>
// //                                         <span className="text-xs text-gray-400">{chat.time}</span>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     )}

// //                     {/* C. TAB PELATIHAN (MOCK) */}
// //                     {activeTab === 'training' && (
// //                         <div>
// //                             <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BookOpen className="text-red-700"/> Pelatihan Saya</h3>
// //                             <div className="space-y-3">
// //                                 {MOCK_TRAINING.map((item) => (
// //                                     <div key={item.id} className="p-4 border rounded-xl flex justify-between items-center">
// //                                         <div>
// //                                             <h4 className="font-bold text-gray-800">{item.title}</h4>
// //                                             <p className="text-sm text-gray-500">Tanggal: {item.date}</p>
// //                                         </div>
// //                                         <div className="text-right">
// //                                             <span className={`text-xs font-bold px-2 py-1 rounded ${item.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
// //                                                 {item.status}
// //                                             </span>
// //                                             {item.score > 0 && <p className="text-xs font-bold mt-1">Nilai: {item.score}</p>}
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     )}

// //                     {/* D. TAB KEUANGAN (MOCK) */}
// //                     {activeTab === 'finance' && (
// //                         <div>
// //                             <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><CreditCard className="text-red-700"/> Riwayat Transaksi</h3>
// //                             <div className="overflow-x-auto">
// //                                 <table className="w-full text-sm text-left">
// //                                     <thead className="text-xs text-gray-500 uppercase bg-gray-50">
// //                                         <tr>
// //                                             <th className="px-4 py-3">Invoice ID</th>
// //                                             <th className="px-4 py-3">Item</th>
// //                                             <th className="px-4 py-3">Tanggal</th>
// //                                             <th className="px-4 py-3">Jumlah</th>
// //                                             <th className="px-4 py-3">Status</th>
// //                                         </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                         {MOCK_FINANCE.map((item) => (
// //                                             <tr key={item.id} className="border-b">
// //                                                 <td className="px-4 py-3 font-medium">{item.id}</td>
// //                                                 <td className="px-4 py-3">{item.item}</td>
// //                                                 <td className="px-4 py-3">{item.date}</td>
// //                                                 <td className="px-4 py-3">{item.amount}</td>
// //                                                 <td className="px-4 py-3 text-green-600 font-bold">{item.status}</td>
// //                                             </tr>
// //                                         ))}
// //                                     </tbody>
// //                                 </table>
// //                             </div>
// //                         </div>
// //                     )}

// //                     {/* E. TAB LIBRARY (MOCK) */}
// //                     {activeTab === 'library' && (
// //                         <div>
// //                             <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FileText className="text-red-700"/> Riwayat Unduhan & Bacaan</h3>
// //                             <div className="space-y-3">
// //                                 {MOCK_LIBRARY.map((item) => (
// //                                     <div key={item.id} className="p-3 border rounded-lg flex items-center justify-between">
// //                                         <div className="flex items-center gap-3">
// //                                             <div className="bg-red-100 p-2 rounded text-red-600 font-bold text-xs">{item.type}</div>
// //                                             <div>
// //                                                 <h4 className="font-bold text-sm">{item.title}</h4>
// //                                                 <p className="text-xs text-gray-400">Diunduh: {item.downloadedAt}</p>
// //                                             </div>
// //                                         </div>
// //                                         <button className="text-blue-600 text-sm font-bold hover:underline">Unduh Lagi</button>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     )}

// //                 </div>
// //             </div>
// //         </Protected>
// //     );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { useAuth } from '@/lib/AuthProvider';
// import { api, getImageUrl } from '@/lib/api';
// import Protected from '@/components/Protected';
// import { User, Mail, Phone, MapPin, Edit, MessageSquare, BookOpen, Clock, FileText } from 'lucide-react';
// import Link from 'next/link';

// export default function ProfilePage() {
//   const { user } = useAuth();
  
//   // State Tabs
//   const [activeTab, setActiveTab] = useState<'forum' | 'chat' | 'course' | 'finance' | 'library' | 'blog'>('forum');
  
//   // Data State
//   const [forums, setForums] = useState<any[]>([]);
//   const [blogs, setBlogs] = useState<any[]>([]); // State Blog
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (activeTab === 'forum') loadForumHistory();
//     if (activeTab === 'blog') loadBlogHistory(); // Load Blog
//   }, [activeTab]);

//   const loadForumHistory = async () => {
//     try {
//         setLoading(true);
//         const res = await api('/api/forum?author=me');
//         setForums(res.topics || []);
//     } catch (e) { console.error(e); } finally { setLoading(false); }
//   };

//   const loadBlogHistory = async () => {
//     try {
//         setLoading(true);
//         // Panggil API Blog dengan filter author=me
//         const res = await api('/api/blog?author=me'); 
//         setBlogs(res || []);
//     } catch (e) { console.error(e); } finally { setLoading(false); }
//   };

//   if (!user) return null;

//   return (
//     <Protected>
//       <div className="max-w-6xl mx-auto p-6 font-sans min-h-screen pb-20">
        
//         {/* HEADER PROFIL */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
//             <div className="h-32 bg-red-800"></div>
//             <div className="px-8 pb-8 relative">
//                 <div className="flex flex-col md:flex-row gap-6 items-end -mt-12">
//                     <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
//                         <img src={getImageUrl(user.avatarUrl)} className="w-full h-full object-cover" alt="Avatar"/>
//                     </div>
//                     <div className="flex-1 mb-2">
//                         <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
//                         <p className="text-sm text-gray-500 uppercase font-bold tracking-wide flex items-center gap-2">
//                             <span className="bg-gray-100 px-2 py-0.5 rounded">{user.role}</span> • {user.email}
//                         </p>
//                     </div>
//                     <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 mb-2">
//                         <Edit size={16}/> Edit Profil
//                     </button>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 text-sm text-gray-600">
//                     <div className="flex items-center gap-2"><Mail size={16} className="text-gray-400"/> {user.email}</div>
//                     <div className="flex items-center gap-2"><Phone size={16} className="text-gray-400"/> +62 812-xxxx-xxxx</div>
//                     <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-400"/> Jakarta, Indonesia</div>
//                 </div>
//             </div>
//         </div>

//         {/* TAB NAVIGASI */}
//         <div className="flex overflow-x-auto gap-8 border-b border-gray-200 mb-8 hide-scrollbar">
//             {[
//                 { id: 'forum', label: 'Forum & Diskusi', icon: MessageSquare },
//                 { id: 'blog', label: 'Riwayat Blog', icon: FileText }, // TAB BARU
//                 { id: 'chat', label: 'Riwayat Chat', icon: MessageSquare },
//                 { id: 'course', label: 'Pelatihan', icon: BookOpen },
//             ].map((tab) => (
//                 <button 
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id as any)}
//                     className={`flex items-center gap-2 pb-4 text-sm font-bold whitespace-nowrap transition border-b-2 ${activeTab === tab.id ? 'border-red-600 text-red-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
//                 >
//                     <tab.icon size={18}/> {tab.label}
//                 </button>
//             ))}
//         </div>

//         {/* KONTEN TAB */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px]">
            
//             {/* KONTEN RIWAYAT BLOG */}
//             {activeTab === 'blog' && (
//                 <div>
//                     <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><FileText size={20}/> Cerita Relawan Saya</h3>
//                     {loading ? <div>Memuat...</div> : 
//                      blogs.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada cerita yang Anda tulis.</div> :
//                      <div className="space-y-4">
//                         {blogs.map((blog) => (
//                             <div key={blog._id} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition">
//                                 <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                                     {blog.coverUrl && <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover"/>}
//                                 </div>
//                                 <div className="flex-1">
//                                     <h4 className="font-bold text-gray-800">{blog.title}</h4>
//                                     <div className="flex items-center gap-2 text-xs mt-1">
//                                         <span className={`px-2 py-0.5 rounded uppercase font-bold ${blog.status === 'approved' ? 'bg-green-100 text-green-700' : blog.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
//                                             {blog.status === 'approved' ? 'Disetujui' : blog.status === 'rejected' ? 'Ditolak' : 'Menunggu Review'}
//                                         </span>
//                                         <span className="text-gray-400">• {new Date(blog.createdAt).toLocaleDateString()}</span>
//                                     </div>
//                                 </div>
//                                 <Link href={`/blog/${blog._id}`} className="text-sm font-bold text-blue-600 hover:underline">Lihat</Link>
//                             </div>
//                         ))}
//                      </div>
//                     }
//                 </div>
//             )}

//             {/* KONTEN FORUM (EXISTING) */}
//             {activeTab === 'forum' && (
//                 <div>
//                      <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><MessageSquare size={20}/> Riwayat Pengajuan Forum</h3>
//                      {loading ? <div>Memuat...</div> : 
//                       forums.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada topik diskusi.</div> :
//                       <div className="space-y-4">
//                         {forums.map((f) => (
//                             <div key={f._id} className="p-4 border rounded-xl flex justify-between items-center">
//                                 <div>
//                                     <div className="text-xs font-bold text-blue-600 mb-1 uppercase">{f.category} • {new Date(f.createdAt).toLocaleDateString()}</div>
//                                     <h4 className="font-bold text-gray-800">{f.title}</h4>
//                                 </div>
//                                 <div className={`px-3 py-1 rounded-full text-xs font-bold ${f.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
//                                     {f.status === 'approved' ? 'Disetujui' : 'Menunggu'}
//                                 </div>
//                             </div>
//                         ))}
//                       </div>
//                      }
//                 </div>
//             )}
            
//             {(activeTab === 'chat' || activeTab === 'course') && (
//                 <div className="text-center py-20 text-gray-400">Fitur sedang dalam pengembangan...</div>
//             )}
//         </div>
//       </div>
//     </Protected>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthProvider';
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';
import { User, Mail, Phone, MapPin, Edit, MessageSquare, BookOpen, Clock, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();
  
  // State Tabs
  const [activeTab, setActiveTab] = useState<'forum' | 'chat' | 'course' | 'finance' | 'library' | 'blog'>('forum');
  
  // Data State
  const [forums, setForums] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'forum') loadForumHistory();
    if (activeTab === 'blog') loadBlogHistory();
  }, [activeTab]);

  const loadForumHistory = async () => {
    try {
        setLoading(true);
        const res = await api('/api/forum?author=me');
        setForums(res.topics || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const loadBlogHistory = async () => {
    try {
        setLoading(true);
        const res = await api('/api/blog?author=me'); 
        setBlogs(res || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  if (!user) return null;

  return (
    <Protected>
      <div className="max-w-6xl mx-auto p-6 font-sans min-h-screen pb-20">
        
        {/* HEADER PROFIL */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="h-32 bg-red-800"></div>
            <div className="px-8 pb-8 relative">
                <div className="flex flex-col md:flex-row gap-6 items-end -mt-12">
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
                        <img src={getImageUrl(user.avatarUrl)} className="w-full h-full object-cover" alt="Avatar"/>
                    </div>
                    <div className="flex-1 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-sm text-gray-500 uppercase font-bold tracking-wide flex items-center gap-2">
                            <span className="bg-gray-100 px-2 py-0.5 rounded">{user.role}</span> • {user.email}
                        </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 mb-2">
                        <Edit size={16}/> Edit Profil
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 text-sm text-gray-600">
                    <div className="flex items-center gap-2"><Mail size={16} className="text-gray-400"/> {user.email}</div>
                    <div className="flex items-center gap-2"><Phone size={16} className="text-gray-400"/> +62 812-xxxx-xxxx</div>
                    <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-400"/> Jakarta, Indonesia</div>
                </div>
            </div>
        </div>

        {/* TAB NAVIGASI */}
        <div className="flex overflow-x-auto gap-8 border-b border-gray-200 mb-8 hide-scrollbar">
            {[
                { id: 'forum', label: 'Forum & Diskusi', icon: MessageSquare },
                { id: 'blog', label: 'Riwayat Blog', icon: FileText },
                { id: 'chat', label: 'Riwayat Chat', icon: MessageSquare },
                { id: 'course', label: 'Pelatihan', icon: BookOpen },
            ].map((tab) => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 pb-4 text-sm font-bold whitespace-nowrap transition border-b-2 ${activeTab === tab.id ? 'border-red-600 text-red-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <tab.icon size={18}/> {tab.label}
                </button>
            ))}
        </div>

        {/* KONTEN TAB */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px]">
            
            {/* KONTEN RIWAYAT BLOG */}
            {activeTab === 'blog' && (
                <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><FileText size={20}/> Cerita Relawan Saya</h3>
                    {loading ? <div>Memuat...</div> : 
                     blogs.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada cerita yang Anda tulis.</div> :
                     <div className="space-y-4">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition">
                                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                    {/* FIX: Added alt attribute */}
                                    {blog.coverUrl && <img src={getImageUrl(blog.coverUrl)} className="w-full h-full object-cover" alt={blog.title}/>}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800">{blog.title}</h4>
                                    <div className="flex items-center gap-2 text-xs mt-1">
                                        <span className={`px-2 py-0.5 rounded uppercase font-bold ${blog.status === 'approved' ? 'bg-green-100 text-green-700' : blog.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {blog.status === 'approved' ? 'Disetujui' : blog.status === 'rejected' ? 'Ditolak' : 'Menunggu Review'}
                                        </span>
                                        <span className="text-gray-400">• {new Date(blog.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <Link href={`/blog/${blog._id}`} className="text-sm font-bold text-blue-600 hover:underline">Lihat</Link>
                            </div>
                        ))}
                     </div>
                    }
                </div>
            )}

            {/* KONTEN FORUM (EXISTING) */}
            {activeTab === 'forum' && (
                <div>
                     <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2"><MessageSquare size={20}/> Riwayat Pengajuan Forum</h3>
                     {loading ? <div>Memuat...</div> : 
                      forums.length === 0 ? <div className="text-center py-10 text-gray-400">Belum ada topik diskusi.</div> :
                      <div className="space-y-4">
                        {forums.map((f) => (
                            <div key={f._id} className="p-4 border rounded-xl flex justify-between items-center">
                                <div>
                                    <div className="text-xs font-bold text-blue-600 mb-1 uppercase">{f.category} • {new Date(f.createdAt).toLocaleDateString()}</div>
                                    <h4 className="font-bold text-gray-800">{f.title}</h4>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${f.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                    {f.status === 'approved' ? 'Disetujui' : 'Menunggu'}
                                </div>
                            </div>
                        ))}
                      </div>
                     }
                </div>
            )}
            
            {(activeTab === 'chat' || activeTab === 'course') && (
                <div className="text-center py-20 text-gray-400">Fitur sedang dalam pengembangan...</div>
            )}
        </div>
      </div>
    </Protected>
  );
}

// // // 'use client';

// // // import { useState } from 'react';
// // // // Hapus useRouter, kita pakai window.location agar lebih stabil
// // // // import { useRouter } from 'next/navigation'; 
// // // import { api } from '@/lib/api';
// // // import Link from 'next/link';

// // // export default function LoginPage() {
// // //   // const router = useRouter(); // Tidak dipakai dulu
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');

// // //   const handleLogin = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError('');

// // //     try {
// // //       console.log("1. Mengirim data login...");
// // //       const data = await api('/api/auth/login', {
// // //         method: 'POST',
// // //         body: { email, password },
// // //       });

// // //       console.log("2. Respon server:", data);

// // //       if (data.token) {
// // //         // Simpan Token
// // //         localStorage.setItem('token', data.token);
// // //         localStorage.setItem('user', JSON.stringify(data.user));

// // //         console.log("3. Token tersimpan. Melakukan redirect...");
        
// // //         // Ambil role dan pastikan huruf besar semua untuk pengecekan
// // //         const role = data.user.role ? data.user.role.toUpperCase() : 'STUDENT';

// // //         // GUNAKAN WINDOW.LOCATION UNTUK PAKSA PINDAH
// // //         if (role === 'SUPER_ADMIN' || role === 'FACILITATOR') {
// // //           window.location.href = '/admin/courses';
// // //         } else {
// // //           window.location.href = '/courses';
// // //         }
// // //       } else {
// // //         setError('Login berhasil tapi token tidak diterima.');
// // //       }

// // //     } catch (err: any) {
// // //       console.error("Login Gagal:", err);
// // //       setError(err.message || 'Email atau password salah');
// // //     } finally {
// // //       // Jika berhasil redirect, loading akan tetap true sampai halaman baru muncul
// // //       // Jika gagal, loading dimatikan agar user bisa coba lagi
// // //       if (!localStorage.getItem('token')) {
// // //         setLoading(false);
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
// // //       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
// // //         <div className="text-center">
// // //           <h2 className="text-3xl font-extrabold text-gray-900">Masuk Akun</h2>
// // //           <p className="mt-2 text-sm text-gray-600">LMS Pelatihan Online</p>
// // //         </div>

// // //         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
// // //           {error && (
// // //             <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200">
// // //               ⚠️ {error}
// // //             </div>
// // //           )}

// // //           <div className="space-y-4">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700">Email</label>
// // //               <input
// // //                 type="email"
// // //                 required
// // //                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
// // //                 placeholder="admin@example.com"
// // //                 value={email}
// // //                 onChange={(e) => setEmail(e.target.value)}
// // //               />
// // //             </div>
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700">Password</label>
// // //               <input
// // //                 type="password"
// // //                 required
// // //                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
// // //                 placeholder="••••••••"
// // //                 value={password}
// // //                 onChange={(e) => setPassword(e.target.value)}
// // //               />
// // //             </div>
// // //           </div>

// // //           <button
// // //             type="submit"
// // //             disabled={loading}
// // //             className="w-full py-3 px-4 bg-red-700 text-white font-bold rounded-xl hover:bg-red-800 transition-all disabled:opacity-50"
// // //           >
// // //             {loading ? 'Memproses...' : 'Masuk'}
// // //           </button>
// // //         </form>

// // //         <div className="text-center mt-4">
// // //           <p className="text-sm text-gray-500">
// // //             Belum punya akun?{' '}
// // //             <Link href="/register" className="font-bold text-red-700 hover:underline">
// // //               Daftar disini
// // //             </Link>
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useState } from 'react';
// // import { api } from '@/lib/api';
// // import Link from 'next/link';

// // export default function LoginPage() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');

// //     try {
// //       console.log("1. Mengirim data login...");
// //       const data = await api('/api/auth/login', {
// //         method: 'POST',
// //         body: { email, password },
// //       });

// //       console.log("2. Respon server:", data);

// //       if (data.token) {
// //         // Simpan Token dan Data User ke LocalStorage
// //         localStorage.setItem('token', data.token);
// //         localStorage.setItem('user', JSON.stringify(data.user));

// //         console.log("3. Token tersimpan. Melakukan redirect ke Landing Page...");
        
// //         /** * PERBAIKAN UTAMA:
// //          * Apapun role user-nya, kita arahkan ke halaman Landing ('/') 
// //          * agar user bisa langsung melihat Banner Slide Foto yang sudah dibuat.
// //          */
// //         window.location.href = '/'; 
        
// //       } else {
// //         setError('Login berhasil tapi token tidak diterima.');
// //         setLoading(false);
// //       }

// //     } catch (err: any) {
// //       console.error("Login Gagal:", err);
// //       setError(err.message || 'Email atau password salah');
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
// //       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
// //         <div className="text-center">
// //           <h2 className="text-3xl font-extrabold text-gray-900">Masuk Akun</h2>
// //           <p className="mt-2 text-sm text-gray-600">LMS Pelatihan Online PMI</p>
// //         </div>

// //         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
// //           {error && (
// //             <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200 animate-pulse">
// //               ⚠️ {error}
// //             </div>
// //           )}

// //           <div className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
// //               <input
// //                 type="email"
// //                 required
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
// //                 placeholder="email@example.com"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
// //               <input
// //                 type="password"
// //                 required
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
// //                 placeholder="••••••••"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //               />
// //             </div>
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full py-3 px-4 bg-red-700 text-white font-bold rounded-xl hover:bg-red-800 transition-all disabled:opacity-50 shadow-lg active:scale-95"
// //           >
// //             {loading ? 'Memproses...' : 'Masuk Sekarang'}
// //           </button>
// //         </form>

// //         <div className="text-center mt-6">
// //           <p className="text-sm text-gray-500">
// //             Belum punya akun?{' '}
// //             <Link href="/register" className="font-bold text-red-700 hover:underline">
// //               Daftar disini
// //             </Link>
// //           </p>
// //           <div className="mt-4">
// //             <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">
// //               Kembali ke Beranda
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import { useState } from 'react';
// import { api } from '@/lib/api';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // [TAMBAHAN PENTING]

// export default function LoginPage() {
//   const router = useRouter(); // [TAMBAHAN PENTING]
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       console.log("1. Mengirim data login...");
//       const data = await api('/api/auth/login', {
//         method: 'POST',
//         body: { email, password },
//       });

//       console.log("2. Respon server:", data);

//       if (data.token) {
//         // Simpan Token dan Data User ke LocalStorage
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));

//         console.log("3. Login berhasil. Mengalihkan ke Dashboard Router...");
        
//         // [PERBAIKAN KRUSIAL]
//         // Jangan ke '/', tapi ke '/dashboard' agar router bisa memilah user sesuai role
//         router.push('/dashboard'); 
        
//       } else {
//         setError('Login berhasil tapi token tidak diterima.');
//         setLoading(false);
//       }

//     } catch (err: any) {
//       console.error("Login Gagal:", err);
//       setError(err.message || 'Email atau password salah');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
//         <div className="text-center">
//           <h2 className="text-3xl font-extrabold text-gray-900">Masuk Akun</h2>
//           <p className="mt-2 text-sm text-gray-600">LMS Pelatihan Online PMI</p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//           {error && (
//             <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200 animate-pulse">
//               ⚠️ {error}
//             </div>
//           )}

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
//                 placeholder="email@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 px-4 bg-red-700 text-white font-bold rounded-xl hover:bg-red-800 transition-all disabled:opacity-50 shadow-lg active:scale-95"
//           >
//             {loading ? 'Memproses...' : 'Masuk Sekarang'}
//           </button>
//         </form>

//         <div className="text-center mt-6">
//           <p className="text-sm text-gray-500">
//             Belum punya akun?{' '}
//             <Link href="/register" className="font-bold text-red-700 hover:underline">
//               Daftar disini
//             </Link>
//           </p>
//           <div className="mt-4">
//             <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">
//               Kembali ke Beranda
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthProvider';
import { api } from '@/lib/api';
import { Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter(); // Gunakan Router Next.js
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log("Login start...");
      const res = await api('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });

      console.log("Login success payload:", res);

      if (res.token && res.user) {
         // 1. Simpan ke Context Global
         login(res.token, res.user);
         
         // 2. Redirect menggunakan Next Router (Lebih smooth)
         // Beri sedikit delay agar context terupdate
         setTimeout(() => {
             if (res.user.role === 'SUPER_ADMIN') {
                 router.push('/admin/dashboard');
             } else {
                 router.push('/');
             }
         }, 100);

      } else {
         setError('Token tidak valid.');
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Masuk Akun</h1>
            <p className="text-sm text-gray-500">LMS Pelatihan Online PMI</p>
        </div>

        {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-6 flex items-center gap-2">
                <AlertCircle size={16}/> {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-gray-600 uppercase mb-1">Email</label>
            <input 
                id="email" type="email" required 
                className="w-full p-3 border rounded-xl" 
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="pass" className="block text-xs font-bold text-gray-600 uppercase mb-1">Password</label>
            <input 
                id="pass" type="password" required 
                className="w-full p-3 border rounded-xl" 
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#990000] text-white py-3.5 rounded-xl font-bold hover:bg-[#7f0000]">
            {loading ? <Loader2 className="animate-spin mx-auto"/> : 'Masuk Sekarang'}
          </button>
        </form>
        <div className="mt-4 text-center"><Link href="/" className="text-xs text-gray-400">Kembali ke Beranda</Link></div>
      </div>
    </div>
  );
}
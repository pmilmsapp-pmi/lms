
// // // // 'use client';
// // // // import React, { createContext, useContext, useEffect, useState } from 'react';

// // // // type Role = 'STUDENT'|'FACILITATOR'|'SUPER_ADMIN';
// // // // export type User = { id: string; email: string; role: Role; name?: string; avatarUrl?: string };

// // // // type AuthCtx = {
// // // //   user: User | null;
// // // //   loading: boolean;
// // // //   refresh: () => Promise<void>;
// // // //   logout: () => void;
// // // // };

// // // // const AuthContext = createContext<AuthCtx>({ user: null, loading: true, refresh: async()=>{}, logout: ()=>{} });

// // // // export function AuthProvider({ children }: { children: React.ReactNode }) {
// // // //   const [user, setUser] = useState<User | null>(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   const refresh = async () => {
// // // //     try {
// // // //       const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
// // // //       if (!token) { setUser(null); setLoading(false); return; }
// // // //       const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
// // // //       const res = await fetch(`${apiUrl}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
// // // //       if (res.ok) {
// // // //         const me = await res.json();
// // // //         setUser(me);
// // // //       } else {
// // // //         setUser(null);
// // // //       }
// // // //     } catch (e) {
// // // //       setUser(null);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => { refresh(); }, []);
// // // //   useEffect(() => {
// // // //     const onStorage = (e: StorageEvent) => { if (e.key === 'access_token') refresh(); };
// // // //     if (typeof window !== 'undefined') {
// // // //       window.addEventListener('storage', onStorage);
// // // //       return () => window.removeEventListener('storage', onStorage);
// // // //     }
// // // //   }, []);

// // // //   const logout = () => {
// // // //     if (typeof window !== 'undefined') {
// // // //       localStorage.removeItem('access_token');
// // // //       localStorage.removeItem('refresh_token');
// // // //     }
// // // //     setUser(null);
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider value={{ user, loading, refresh, logout }}>
// // // //       {children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // }

// // // // export const useAuth = () => useContext(AuthContext);
// // // 'use client';
// // // import React, { createContext, useContext, useEffect, useState } from 'react';
// // // import { useRouter } from 'next/navigation';

// // // type Role = 'STUDENT' | 'FACILITATOR' | 'SUPER_ADMIN';

// // // export type User = { 
// // //   id: string; 
// // //   email: string; 
// // //   role: Role; 
// // //   name?: string; 
// // //   avatarUrl?: string 
// // // };

// // // type AuthCtx = {
// // //   user: User | null;
// // //   loading: boolean;
// // //   refresh: () => Promise<void>;
// // //   logout: () => void;
// // // };

// // // const AuthContext = createContext<AuthCtx>({ 
// // //   user: null, 
// // //   loading: true, 
// // //   refresh: async () => {}, 
// // //   logout: () => {} 
// // // });

// // // export function AuthProvider({ children }: { children: React.ReactNode }) {
// // //   const [user, setUser] = useState<User | null>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const router = useRouter();

// // //   const refresh = async () => {
// // //     try {
// // //       // PERBAIKAN 1: Gunakan key 'token' (bukan 'access_token')
// // //       const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
// // //       if (!token) { 
// // //         setUser(null); 
// // //         setLoading(false); 
// // //         return; 
// // //       }

// // //       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      
// // //       // PERBAIKAN 2: Gunakan URL '/api/auth/me'
// // //       const res = await fetch(`${apiUrl}/api/auth/me`, { 
// // //         headers: { Authorization: `Bearer ${token}` } 
// // //       });

// // //       if (res.ok) {
// // //         const data = await res.json();
// // //         // PERBAIKAN 3: Ambil properti .user dari respon backend
// // //         setUser(data.user || data);
// // //       } else {
// // //         // Jika token expired/invalid (401), hapus dari storage
// // //         localStorage.removeItem('token');
// // //         localStorage.removeItem('user');
// // //         setUser(null);
// // //       }
// // //     } catch (e) {
// // //       console.error("Auth Refresh Error:", e);
// // //       setUser(null);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => { 
// // //     refresh(); 
// // //   }, []);

// // //   // Event listener untuk sinkronisasi antar tab
// // //   useEffect(() => {
// // //     const onStorage = (e: StorageEvent) => { 
// // //       // Pantau perubahan pada key 'token'
// // //       if (e.key === 'token') refresh(); 
// // //     };
// // //     if (typeof window !== 'undefined') {
// // //       window.addEventListener('storage', onStorage);
// // //       return () => window.removeEventListener('storage', onStorage);
// // //     }
// // //   }, []);

// // //   const logout = () => {
// // //     if (typeof window !== 'undefined') {
// // //       localStorage.removeItem('token'); // Hapus 'token'
// // //       localStorage.removeItem('user');
// // //     }
// // //     setUser(null);
// // //     window.location.href = '/login'; // Redirect paksa ke login
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={{ user, loading, refresh, logout }}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // }

// // // export const useAuth = () => useContext(AuthContext);

// // 'use client';
// // import React, { createContext, useContext, useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';

// // // [FIX] Update Role agar mencakup semua jenis user
// // type Role = 'STUDENT' | 'FACILITATOR' | 'ADMIN' | 'SUPER_ADMIN';

// // // [FIX] Definisi Tipe User Lengkap
// // export type User = { 
// //   id: string; 
// //   email: string; 
// //   role: Role; 
// //   name?: string; 
// //   avatarUrl?: string;
  
// //   // Field Profil Anggota (KSR/PMR/dll)
// //   memberType?: 'PMR' | 'KSR' | 'TSR' | 'PEGAWAI' | 'PENGURUS' | 'UMUM';
// //   memberData?: {
// //       nik?: string;
// //       nia?: string;
// //       unit?: string;
// //       phone?: string;
// //       address?: string;
// //       bloodType?: string;
// //       gender?: string;
// //       birthPlace?: string;
// //       birthDate?: string | Date;
// //       [key: string]: any; // Allow loose typing for flexibility
// //   };

// //   // Field Admin / RBAC
// //   regionScope?: string;
// //   managedProvinces?: string[];
// //   permissions?: string[];
// // };

// // type AuthCtx = {
// //   user: User | null;
// //   loading: boolean;
// //   refresh: () => Promise<void>;
// //   logout: () => void;
// // };

// // const AuthContext = createContext<AuthCtx>({ 
// //   user: null, 
// //   loading: true, 
// //   refresh: async () => {}, 
// //   logout: () => {} 
// // });

// // export function AuthProvider({ children }: { children: React.ReactNode }) {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const router = useRouter();

// //   const refresh = async () => {
// //     try {
// //       const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
// //       if (!token) { 
// //         setUser(null); 
// //         setLoading(false); 
// //         return; 
// //       }

// //       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      
// //       const res = await fetch(`${apiUrl}/api/auth/me`, { 
// //         headers: { Authorization: `Bearer ${token}` } 
// //       });

// //       if (res.ok) {
// //         const data = await res.json();
// //         // Ambil objek user dari response (sesuaikan jika backend membungkusnya dalam data.user)
// //         setUser(data.user || data);
// //       } else {
// //         // Jika token invalid (401), bersihkan storage
// //         localStorage.removeItem('token');
// //         localStorage.removeItem('user');
// //         setUser(null);
// //       }
// //     } catch (e) {
// //       console.error("Auth Refresh Error:", e);
// //       setUser(null);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => { 
// //     refresh(); 
// //   }, []);

// //   // Event listener untuk sinkronisasi login antar tab browser
// //   useEffect(() => {
// //     const onStorage = (e: StorageEvent) => { 
// //       if (e.key === 'token') refresh(); 
// //     };
// //     if (typeof window !== 'undefined') {
// //       window.addEventListener('storage', onStorage);
// //       return () => window.removeEventListener('storage', onStorage);
// //     }
// //   }, []);

// //   const logout = () => {
// //     if (typeof window !== 'undefined') {
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('user');
// //     }
// //     setUser(null);
// //     window.location.href = '/login'; 
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, loading, refresh, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export const useAuth = () => useContext(AuthContext);


// 'use client';

// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';
// import { api } from './api'; // Pastikan import api wrapper Anda benar

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   avatarUrl?: string;
//   permissions?: string[];
//   regionScope?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   login: (token: string, userData: User) => void;
//   logout: () => void;
//   isInitialized: boolean;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   token: null,
//   login: () => {},
//   logout: () => {},
//   isInitialized: false,
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isInitialized, setIsInitialized] = useState(false);

//   // Fungsi untuk update data user dari server (Self-Healing)
//   const refreshUserData = async (currentToken: string) => {
//       try {
//           // Panggil endpoint baru
//           const res = await api('/api/auth/me', {
//               headers: { Authorization: `Bearer ${currentToken}` } // Kirim token manual jika perlu
//           });
          
//           if (res && res.user) {
//               console.log("🔄 [Auth] Data User Diperbarui:", res.user.permissions);
//               setUser(res.user);
//               // Update storage agar sinkron
//               localStorage.setItem('user', JSON.stringify(res.user));
//           }
//       } catch (err) {
//           console.error("⚠️ [Auth] Gagal refresh user data:", err);
//           // Jika token invalid (401), logout
//           if ((err as any).message?.includes('401')) {
//               logout();
//           }
//       }
//   };

//   useEffect(() => {
//     const initAuth = async () => {
//       const storedToken = localStorage.getItem('token');
//       const storedUser = localStorage.getItem('user');

//       if (storedToken) {
//         setToken(storedToken);
        
//         // 1. Load data sementara dari storage (agar cepat)
//         if (storedUser) {
//             try {
//                 const parsed = JSON.parse(storedUser);
//                 setUser(parsed);
//                 // Cek apakah permission hilang?
//                 if (!parsed.permissions) {
//                     console.warn("⚠️ Permission hilang di storage, mengambil ulang...");
//                 }
//             } catch (e) { localStorage.clear(); }
//         }

//         // 2. [PENTING] Selalu minta data terbaru dari server untuk memastikan permission ada
//         await refreshUserData(storedToken);
//       }
      
//       setIsInitialized(true);
//     };

//     initAuth();
//   }, []);

//   const login = (newToken: string, userData: User) => {
//     setToken(newToken);
//     setUser(userData);
//     localStorage.setItem('token', newToken);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.clear();
//     window.location.href = '/login';
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isInitialized }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api } from './api'; 

// [PENTING] Definisi Tipe User yang Diperbarui
// Menambahkan field memberData, city, province, dll agar dikenali TypeScript
export interface User {
  id: string;
  _id?: string; // MongoDB ID
  name: string;
  email: string;
  role: 'STUDENT' | 'FACILITATOR' | 'ADMIN' | 'SUPER_ADMIN';
  avatarUrl?: string;
  
  // Permissions & Security
  permissions?: string[];
  isVerified?: boolean;
  isBanned?: boolean;
  bannedReason?: string;

  // Wilayah Admin
  regionScope?: string;
  managedProvinces?: string[];
  managedRegencies?: string[];

  // [BARU] Data Tambahan Member (Hasil Import CSV / Update Profile)
  city?: string;
  province?: string;
  memberType?: string; // KSR, TSR, PMR, Pegawai, Pengurus
  status?: string;
  
  // Object Detail Member
  memberData?: {
    nia?: string;
    kode?: string;
    gender?: string;
    birthPlace?: string;
    birthDate?: string | Date;
    phone?: string;
    unit?: string;
    address?: string;
    position?: string; // Jabatan
    periodStart?: string | number;
    periodEnd?: string | number;
    [key: string]: any; // Allow properti lain jika ada
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean; // Tambahkan loading state agar komponen bisa menunggu auth check
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // 1. Cek Login saat Aplikasi Dimuat (Mount)
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

      if (storedToken) {
        setToken(storedToken);
        // Jika ada data user tersimpan, gunakan sementara agar UI cepat muncul
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error("Gagal parse user data dari local storage");
          }
        }

        // Validasi Token ke Backend (Optional tapi Recommended)
        try {
          // Panggil API /me untuk mendapatkan data user terbaru & validasi token
          const res = await api('/api/auth/me'); // Pastikan endpoint ini ada
          if (res && (res.user || res.id)) {
             const freshUser = res.user || res;
             setUser(freshUser);
             localStorage.setItem('user', JSON.stringify(freshUser));
          } else {
             throw new Error("Invalid user data");
          }
        } catch (err) {
          console.error("Token expired or invalid:", err);
          logout(); // Auto logout jika token tidak valid
        }
      }
      setLoading(false);
      setIsInitialized(true);
    };

    initAuth();
  }, []);

  // 2. Fungsi Login
  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    // Jangan redirect otomatis di sini, biarkan halaman Login yang handle redirect
    // agar lebih fleksibel
  };

  // 3. Fungsi Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook Custom untuk menggunakan Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
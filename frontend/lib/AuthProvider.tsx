
// 'use client';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// type Role = 'STUDENT'|'FACILITATOR'|'SUPER_ADMIN';
// export type User = { id: string; email: string; role: Role; name?: string; avatarUrl?: string };

// type AuthCtx = {
//   user: User | null;
//   loading: boolean;
//   refresh: () => Promise<void>;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthCtx>({ user: null, loading: true, refresh: async()=>{}, logout: ()=>{} });

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const refresh = async () => {
//     try {
//       const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
//       if (!token) { setUser(null); setLoading(false); return; }
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
//       const res = await fetch(`${apiUrl}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
//       if (res.ok) {
//         const me = await res.json();
//         setUser(me);
//       } else {
//         setUser(null);
//       }
//     } catch (e) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { refresh(); }, []);
//   useEffect(() => {
//     const onStorage = (e: StorageEvent) => { if (e.key === 'access_token') refresh(); };
//     if (typeof window !== 'undefined') {
//       window.addEventListener('storage', onStorage);
//       return () => window.removeEventListener('storage', onStorage);
//     }
//   }, []);

//   const logout = () => {
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');
//     }
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, refresh, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'STUDENT' | 'FACILITATOR' | 'SUPER_ADMIN';

export type User = { 
  id: string; 
  email: string; 
  role: Role; 
  name?: string; 
  avatarUrl?: string 
};

type AuthCtx = {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx>({ 
  user: null, 
  loading: true, 
  refresh: async () => {}, 
  logout: () => {} 
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refresh = async () => {
    try {
      // PERBAIKAN 1: Gunakan key 'token' (bukan 'access_token')
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) { 
        setUser(null); 
        setLoading(false); 
        return; 
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      
      // PERBAIKAN 2: Gunakan URL '/api/auth/me'
      const res = await fetch(`${apiUrl}/api/auth/me`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });

      if (res.ok) {
        const data = await res.json();
        // PERBAIKAN 3: Ambil properti .user dari respon backend
        setUser(data.user || data);
      } else {
        // Jika token expired/invalid (401), hapus dari storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    } catch (e) {
      console.error("Auth Refresh Error:", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    refresh(); 
  }, []);

  // Event listener untuk sinkronisasi antar tab
  useEffect(() => {
    const onStorage = (e: StorageEvent) => { 
      // Pantau perubahan pada key 'token'
      if (e.key === 'token') refresh(); 
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    }
  }, []);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token'); // Hapus 'token'
      localStorage.removeItem('user');
    }
    setUser(null);
    window.location.href = '/login'; // Redirect paksa ke login
  };

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
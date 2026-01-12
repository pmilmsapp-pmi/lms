
// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// /**
//  * Helper untuk request API standard
//  */
// export async function api(endpoint: string, options: any = {}) {
//   let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//   if (token === 'undefined' || token === 'null') token = null;

//   const headers = {
//     'Content-Type': 'application/json',
//     ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
//     ...options.headers,
//   };

//   if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
//     options.body = JSON.stringify(options.body);
//   }

//   if (options.body instanceof FormData) {
//     delete headers['Content-Type'];
//   }

//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     ...options,
//     headers,
//   });

//   let data;
//   try {
//     data = await response.json();
//   } catch (error) {
//     data = {};
//   }

//   if (!response.ok) {
//     throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
//   }

//   return data;
// }

// /**
//  * Helper khusus Upload (FormData)
//  */
// export async function apiUpload(endpoint: string, formData: FormData) {
//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     method: 'POST',
//     body: formData,
//     headers: {
//       ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
//     },
//   });

//   let data;
//   try {
//     data = await response.json();
//   } catch (error) {
//     data = {};
//   }

//   if (!response.ok) {
//     throw new Error(data.error || data.message || 'Gagal mengupload file');
//   }
  
//   return data;
// }

// /**
//  * --- SOLUSI GAMBAR 404 ---
//  * Mengubah path relatif (/uploads/foto.jpg) menjadi URL Absolut (http://localhost:4000/uploads/foto.jpg)
//  */
// export function getImageUrl(path: string | null | undefined): string {
//   // 1. Fallback jika path kosong
//   if (!path || path === '') {
//     return 'https://placehold.co/600x400?text=No+Cover';
//   }
  
//   // 2. Jika path sudah berupa URL lengkap (misal dari Google/UI Avatars), kembalikan langsung
//   if (path.startsWith('http') || path.startsWith('https')) {
//     return path;
//   }
  
//   // 3. Bersihkan slash di awal agar tidak double slash
//   const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
//   // 4. Gabungkan dengan URL Backend
//   return `${API_BASE_URL}${cleanPath}`;
// }
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Helper untuk request API standard
 */
export async function api(endpoint: string, options: any = {}) {
  let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token === 'undefined' || token === 'null') token = null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
  }

  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

/**
 * Helper khusus Upload (FormData)
 */
export async function apiUpload(endpoint: string, formData: FormData) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    body: formData,
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Gagal mengupload file');
  }
  
  return data;
}

/**
 * --- SOLUSI GAMBAR 404 ---
 * Mengubah path relatif (/uploads/foto.jpg) menjadi URL Absolut
 */
export function getImageUrl(path: string | null | undefined): string {
  if (!path || path === '') {
    return 'https://placehold.co/600x400?text=No+Cover';
  }
  
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

/**
 * --- INTEGRASI GOOGLE CLASSROOM ---
 */

/**
 * Mendapatkan URL Auth Google dari Backend
 * Digunakan untuk mengarahkan user ke halaman login Google
 */
export function getGoogleAuthUrl(): string {
  // Langsung arahkan ke endpoint auth di backend yang sudah dibuat
  return `${API_BASE_URL}/api/classroom/auth`;
}

/**
 * Mengambil daftar kelas dari Google Classroom
 * Fungsi ini memanggil endpoint /api/classroom/list di backend
 */
export async function getGoogleClassroomList() {
  try {
    // Menggunakan helper api() yang sudah ada untuk menangani token & base URL
    return await api('/api/classroom/list');
  } catch (error) {
    console.error("Gagal mengambil daftar Google Classroom:", error);
    throw error;
  }
}
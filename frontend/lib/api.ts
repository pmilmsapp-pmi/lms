// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://humanis.vercel.app';

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
//  * Mengubah path relatif (/uploads/foto.jpg) menjadi URL Absolut
//  */
// export function getImageUrl(path: string | null | undefined): string {
//   if (!path || path === '') {
//     return 'https://placehold.co/600x400?text=No+Cover';
//   }
  
//   if (path.startsWith('http') || path.startsWith('https')) {
//     return path;
//   }
  
//   const cleanPath = path.startsWith('/') ? path : `/${path}`;
//   return `${API_BASE_URL}${cleanPath}`;
// }

// /**
//  * --- INTEGRASI GOOGLE CLASSROOM ---
//  */

// /**
//  * Mendapatkan URL Auth Google dari Backend
//  * Digunakan untuk mengarahkan user ke halaman login Google
//  */
// export function getGoogleAuthUrl(): string {
//   // Langsung arahkan ke endpoint auth di backend yang sudah dibuat
//   return `${API_BASE_URL}/api/classroom/auth`;
// }

// /**
//  * Mengambil daftar kelas dari Google Classroom
//  * Fungsi ini memanggil endpoint /api/classroom/list di backend
//  */
// export async function getGoogleClassroomList() {
//   try {
//     // Menggunakan helper api() yang sudah ada untuk menangani token & base URL
//     return await api('/api/classroom/list');
//   } catch (error) {
//     console.error("Gagal mengambil daftar Google Classroom:", error);
//     throw error;
//   }
// }


// lib/api.ts

/**
 * Base URL API: diambil dari NEXT_PUBLIC_API_URL agar tersedia di browser.
 * Fallback ke domain backend produksi untuk keamanan.
 */
const RAW_API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://humanis.vercel.app';
export const API_BASE_URL = RAW_API_BASE.replace(/\/$/, ''); // hapus trailing slash

/**
 * Tipe opsi untuk helper api()
 */
export interface ApiOptions extends RequestInit {
  /** Apakah akan menambahkan Authorization dari localStorage (default: true di client) */
  auth?: boolean;
  /** Timeout request dalam ms (default: 30_000) */
  timeoutMs?: number;
}

/**
 * Helper: cek URL absolut
 */
function isAbsoluteUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

/**
 * Helper: gabungkan base + endpoint tanpa dobel slash
 */
function joinUrl(base: string, endpoint: string) {
  if (isAbsoluteUrl(endpoint)) return endpoint;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

/**
 * Helper: parse response secara aman
 */
async function parseResponse(res: Response) {
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    try {
      return await res.json();
    } catch {
      return {};
    }
  }
  try {
    return await res.text();
  } catch {
    return '';
  }
}

/**
 * Helper untuk request API standard (client-side).
 * - Menyisipkan Authorization dari localStorage jika ada
 * - Default credentials: 'include' (cocok untuk cookie-based session)
 * - Mendukung timeout via AbortController
 */
export async function api<T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const {
    auth = true,
    timeoutMs = 30_000,
    headers: customHeaders,
    credentials = 'include', // default include untuk cookie/session
    ...rest
  } = options;

  // AbortController untuk timeout
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Ambil token hanya di client (window tersedia)
  let token: string | null = null;
  if (typeof window !== 'undefined' && auth) {
    token = localStorage.getItem('token');
    if (token === 'undefined' || token === 'null') token = null;
  }

  // Bangun headers
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(customHeaders as Record<string, string>),
  };

  // Jika body adalah FormData, hapus Content-Type (biarkan browser mengatur boundary)
  if (rest.body instanceof FormData) {
    delete headers['Content-Type'];
  }
  // Jika body object biasa, stringify
  else if (rest.body && typeof rest.body === 'object' && !(rest.body instanceof Blob)) {
    rest.body = JSON.stringify(rest.body);
  }

  const url = joinUrl(API_BASE_URL, endpoint);

  let response: Response;
  try {
    response = await fetch(url, {
      ...rest,
      headers,
      credentials, // bisa di-override via options
      signal: controller.signal,
    });
  } catch (err: any) {
    clearTimeout(timer);
    if (err?.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeoutMs} ms`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    // Ambil pesan error dari server jika ada
    const serverMessage =
      (data && typeof data === 'object' && ('error' in data || 'message' in data))
        ? (data.error || data.message)
        : response.statusText;

    throw new Error(serverMessage || `Request failed with status ${response.status}`);
  }

  return data as T;
}

/**
 * Helper khusus Upload (FormData).
 * - Tetap menyisipkan Authorization dari localStorage jika ada
 * - Method default: POST
 */
export async function apiUpload<T = any>(endpoint: string, formData: FormData, options: ApiOptions = {}): Promise<T> {
  const { auth = true, timeoutMs = 60_000, headers: customHeaders, credentials = 'include', ...rest } = options;

  // AbortController untuk timeout upload
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Token (client-only)
  let token: string | null = null;
  if (typeof window !== 'undefined' && auth) {
    token = localStorage.getItem('token');
    if (token === 'undefined' || token === 'null') token = null;
  }

  // Headers (jangan set Content-Type untuk FormData)
  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(customHeaders as Record<string, string>),
  };

  const url = joinUrl(API_BASE_URL, endpoint);

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers,
      credentials,
      signal: controller.signal,
      ...rest, // bisa override method/others jika diperlukan
    });
  } catch (err: any) {
    clearTimeout(timer);
    if (err?.name === 'AbortError') {
      throw new Error(`Upload timeout after ${timeoutMs} ms`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    const serverMessage =
      (data && typeof data === 'object' && ('error' in data || 'message' in data))
        ? (data.error || data.message)
        : response.statusText;

    throw new Error(serverMessage || 'Gagal mengupload file');
  }

  return data as T;
}

/**
 * --- SOLUSI GAMBAR 404 ---
 * Mengubah path relatif (/uploads/foto.jpg) menjadi URL Absolut ke backend
 */
export function getImageUrl(path: string | null | undefined): string {
  if (!path || path.trim() === '') {
    return 'https://placehold.co/600x400?text=No+Cover';
  }
  if (isAbsoluteUrl(path)) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

/**
 * --- INTEGRASI GOOGLE CLASSROOM ---
 */
export function getGoogleAuthUrl(): string {
  return `${API_BASE_URL}/api/classroom/auth`;
}

export async function getGoogleClassroomList() {
  return await api('/api/classroom/list');
}


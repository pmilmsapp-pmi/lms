// // // // // // // export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://humanis.vercel.app';

// // // // // // // /**
// // // // // // //  * Helper untuk request API standard
// // // // // // //  */
// // // // // // // export async function api(endpoint: string, options: any = {}) {
// // // // // // //   let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
// // // // // // //   if (token === 'undefined' || token === 'null') token = null;

// // // // // // //   const headers = {
// // // // // // //     'Content-Type': 'application/json',
// // // // // // //     ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
// // // // // // //     ...options.headers,
// // // // // // //   };

// // // // // // //   if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
// // // // // // //     options.body = JSON.stringify(options.body);
// // // // // // //   }

// // // // // // //   if (options.body instanceof FormData) {
// // // // // // //     delete headers['Content-Type'];
// // // // // // //   }

// // // // // // //   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
// // // // // // //     ...options,
// // // // // // //     headers,
// // // // // // //   });

// // // // // // //   let data;
// // // // // // //   try {
// // // // // // //     data = await response.json();
// // // // // // //   } catch (error) {
// // // // // // //     data = {};
// // // // // // //   }

// // // // // // //   if (!response.ok) {
// // // // // // //     throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
// // // // // // //   }

// // // // // // //   return data;
// // // // // // // }

// // // // // // // /**
// // // // // // //  * Helper khusus Upload (FormData)
// // // // // // //  */
// // // // // // // export async function apiUpload(endpoint: string, formData: FormData) {
// // // // // // //   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

// // // // // // //   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
// // // // // // //     method: 'POST',
// // // // // // //     body: formData,
// // // // // // //     headers: {
// // // // // // //       ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
// // // // // // //     },
// // // // // // //   });

// // // // // // //   let data;
// // // // // // //   try {
// // // // // // //     data = await response.json();
// // // // // // //   } catch (error) {
// // // // // // //     data = {};
// // // // // // //   }

// // // // // // //   if (!response.ok) {
// // // // // // //     throw new Error(data.error || data.message || 'Gagal mengupload file');
// // // // // // //   }
  
// // // // // // //   return data;
// // // // // // // }

// // // // // // // /**
// // // // // // //  * --- SOLUSI GAMBAR 404 ---
// // // // // // //  * Mengubah path relatif (/uploads/foto.jpg) menjadi URL Absolut
// // // // // // //  */
// // // // // // // export function getImageUrl(path: string | null | undefined): string {
// // // // // // //   if (!path || path === '') {
// // // // // // //     return 'https://placehold.co/600x400?text=No+Cover';
// // // // // // //   }
  
// // // // // // //   if (path.startsWith('http') || path.startsWith('https')) {
// // // // // // //     return path;
// // // // // // //   }
  
// // // // // // //   const cleanPath = path.startsWith('/') ? path : `/${path}`;
// // // // // // //   return `${API_BASE_URL}${cleanPath}`;
// // // // // // // }

// // // // // // // /**
// // // // // // //  * --- INTEGRASI GOOGLE CLASSROOM ---
// // // // // // //  */

// // // // // // // /**
// // // // // // //  * Mendapatkan URL Auth Google dari Backend
// // // // // // //  * Digunakan untuk mengarahkan user ke halaman login Google
// // // // // // //  */
// // // // // // // export function getGoogleAuthUrl(): string {
// // // // // // //   // Langsung arahkan ke endpoint auth di backend yang sudah dibuat
// // // // // // //   return `${API_BASE_URL}/api/classroom/auth`;
// // // // // // // }

// // // // // // // /**
// // // // // // //  * Mengambil daftar kelas dari Google Classroom
// // // // // // //  * Fungsi ini memanggil endpoint /api/classroom/list di backend
// // // // // // //  */
// // // // // // // export async function getGoogleClassroomList() {
// // // // // // //   try {
// // // // // // //     // Menggunakan helper api() yang sudah ada untuk menangani token & base URL
// // // // // // //     return await api('/api/classroom/list');
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Gagal mengambil daftar Google Classroom:", error);
// // // // // // //     throw error;
// // // // // // //   }
// // // // // // // }


// // // // // // // lib/api.ts

// // // // // // /**
// // // // // //  * Base URL API: diambil dari NEXT_PUBLIC_API_URL agar tersedia di browser.
// // // // // //  * Fallback ke domain backend produksi untuk keamanan.
// // // // // //  */
// // // // // // const RAW_API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://humanis.vercel.app';
// // // // // // export const API_BASE_URL = RAW_API_BASE.replace(/\/$/, ''); // hapus trailing slash

// // // // // // /**
// // // // // //  * Tipe opsi untuk helper api()
// // // // // //  */

// // // // // // export type ApiOptions = Omit<RequestInit, 'body' | 'headers' | 'credentials'> & {
// // // // // //   /** Boleh object biasa; helper akan stringify jika bukan FormData/Blob */
// // // // // //   body?: any;
// // // // // //   /** Sederhanakan headers jadi key-value string */
// // // // // //   headers?: Record<string, string>;
// // // // // //   /** Tetap bisa diatur; default 'include' untuk cookie/session */
// // // // // //   credentials?: RequestCredentials;
// // // // // //   /** Tambahkan token Authorization dari localStorage (default: true di client) */
// // // // // //   auth?: boolean;
// // // // // //   /** Timeout request dalam ms (default: 30_000) */
// // // // // //   timeoutMs?: number;
// // // // // // };


// // // // // // /**
// // // // // //  * Helper: cek URL absolut
// // // // // //  */
// // // // // // function isAbsoluteUrl(url: string) {
// // // // // //   return /^https?:\/\//i.test(url);
// // // // // // }

// // // // // // /**
// // // // // //  * Helper: gabungkan base + endpoint tanpa dobel slash
// // // // // //  */
// // // // // // function joinUrl(base: string, endpoint: string) {
// // // // // //   if (isAbsoluteUrl(endpoint)) return endpoint;
// // // // // //   const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
// // // // // //   return `${base}${path}`;
// // // // // // }

// // // // // // /**
// // // // // //  * Helper: parse response secara aman
// // // // // //  */
// // // // // // async function parseResponse(res: Response) {
// // // // // //   const ct = res.headers.get('content-type') || '';
// // // // // //   if (ct.includes('application/json')) {
// // // // // //     try {
// // // // // //       return await res.json();
// // // // // //     } catch {
// // // // // //       return {};
// // // // // //     }
// // // // // //   }
// // // // // //   try {
// // // // // //     return await res.text();
// // // // // //   } catch {
// // // // // //     return '';
// // // // // //   }
// // // // // // }

// // // // // // /**
// // // // // //  * Helper untuk request API standard (client-side).
// // // // // //  * - Menyisipkan Authorization dari localStorage jika ada
// // // // // //  * - Default credentials: 'include' (cocok untuk cookie-based session)
// // // // // //  * - Mendukung timeout via AbortController
// // // // // //  */
// // // // // // export async function api<T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> {
// // // // // //   const {
// // // // // //     auth = true,
// // // // // //     timeoutMs = 30_000,
// // // // // //     headers: customHeaders,
// // // // // //     credentials = 'include', // default include untuk cookie/session
// // // // // //     ...rest
// // // // // //   } = options;

// // // // // //   // AbortController untuk timeout
// // // // // //   const controller = new AbortController();
// // // // // //   const timer = setTimeout(() => controller.abort(), timeoutMs);

// // // // // //   // Ambil token hanya di client (window tersedia)
// // // // // //   let token: string | null = null;
// // // // // //   if (typeof window !== 'undefined' && auth) {
// // // // // //     token = localStorage.getItem('token');
// // // // // //     if (token === 'undefined' || token === 'null') token = null;
// // // // // //   }

// // // // // //   // Bangun headers
// // // // // //   const headers: Record<string, string> = {
// // // // // //     'Accept': 'application/json',
// // // // // //     'Content-Type': 'application/json',
// // // // // //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // // // // //     ...(customHeaders as Record<string, string>),
// // // // // //   };

// // // // // //   // Jika body adalah FormData, hapus Content-Type (biarkan browser mengatur boundary)
// // // // // //   if (rest.body instanceof FormData) {
// // // // // //     delete headers['Content-Type'];
// // // // // //   }
// // // // // //   // Jika body object biasa, stringify
// // // // // //   else if (rest.body && typeof rest.body === 'object' && !(rest.body instanceof Blob)) {
// // // // // //     rest.body = JSON.stringify(rest.body);
// // // // // //   }

// // // // // //   const url = joinUrl(API_BASE_URL, endpoint);

// // // // // //   let response: Response;
// // // // // //   try {
// // // // // //     response = await fetch(url, {
// // // // // //       ...rest,
// // // // // //       headers,
// // // // // //       credentials, // bisa di-override via options
// // // // // //       signal: controller.signal,
// // // // // //     });
// // // // // //   } catch (err: any) {
// // // // // //     clearTimeout(timer);
// // // // // //     if (err?.name === 'AbortError') {
// // // // // //       throw new Error(`Request timeout after ${timeoutMs} ms`);
// // // // // //     }
// // // // // //     throw err;
// // // // // //   } finally {
// // // // // //     clearTimeout(timer);
// // // // // //   }

// // // // // //   const data = await parseResponse(response);

// // // // // //   if (!response.ok) {
// // // // // //     // Ambil pesan error dari server jika ada
// // // // // //     const serverMessage =
// // // // // //       (data && typeof data === 'object' && ('error' in data || 'message' in data))
// // // // // //         ? (data.error || data.message)
// // // // // //         : response.statusText;

// // // // // //     throw new Error(serverMessage || `Request failed with status ${response.status}`);
// // // // // //   }

// // // // // //   return data as T;
// // // // // // }

// // // // // // /**
// // // // // //  * Helper khusus Upload (FormData).
// // // // // //  * - Tetap menyisipkan Authorization dari localStorage jika ada
// // // // // //  * - Method default: POST
// // // // // //  */
// // // // // // export async function apiUpload<T = any>(endpoint: string, formData: FormData, options: ApiOptions = {}): Promise<T> {
// // // // // //   const { auth = true, timeoutMs = 60_000, headers: customHeaders, credentials = 'include', ...rest } = options;

// // // // // //   // AbortController untuk timeout upload
// // // // // //   const controller = new AbortController();
// // // // // //   const timer = setTimeout(() => controller.abort(), timeoutMs);

// // // // // //   // Token (client-only)
// // // // // //   let token: string | null = null;
// // // // // //   if (typeof window !== 'undefined' && auth) {
// // // // // //     token = localStorage.getItem('token');
// // // // // //     if (token === 'undefined' || token === 'null') token = null;
// // // // // //   }

// // // // // //   // Headers (jangan set Content-Type untuk FormData)
// // // // // //   const headers: Record<string, string> = {
// // // // // //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // // // // //     ...(customHeaders as Record<string, string>),
// // // // // //   };

// // // // // //   const url = joinUrl(API_BASE_URL, endpoint);

// // // // // //   let response: Response;
// // // // // //   try {
// // // // // //     response = await fetch(url, {
// // // // // //       method: 'POST',
// // // // // //       body: formData,
// // // // // //       headers,
// // // // // //       credentials,
// // // // // //       signal: controller.signal,
// // // // // //       ...rest, // bisa override method/others jika diperlukan
// // // // // //     });
// // // // // //   } catch (err: any) {
// // // // // //     clearTimeout(timer);
// // // // // //     if (err?.name === 'AbortError') {
// // // // // //       throw new Error(`Upload timeout after ${timeoutMs} ms`);
// // // // // //     }
// // // // // //     throw err;
// // // // // //   } finally {
// // // // // //     clearTimeout(timer);
// // // // // //   }

// // // // // //   const data = await parseResponse(response);

// // // // // //   if (!response.ok) {
// // // // // //     const serverMessage =
// // // // // //       (data && typeof data === 'object' && ('error' in data || 'message' in data))
// // // // // //         ? (data.error || data.message)
// // // // // //         : response.statusText;

// // // // // //     throw new Error(serverMessage || 'Gagal mengupload file');
// // // // // //   }

// // // // // //   return data as T;
// // // // // // }

// // // // // // /**
// // // // // //  * --- SOLUSI GAMBAR 404 ---
// // // // // //  * Mengubah path relatif (/uploads/foto.jpg) menjadi URL Absolut ke backend
// // // // // //  */
// // // // // // export function getImageUrl(path: string | null | undefined): string {
// // // // // //   if (!path || path.trim() === '') {
// // // // // //     return 'https://placehold.co/600x400?text=No+Cover';
// // // // // //   }
// // // // // //   if (isAbsoluteUrl(path)) {
// // // // // //     return path;
// // // // // //   }
// // // // // //   const cleanPath = path.startsWith('/') ? path : `/${path}`;
// // // // // //   return `${API_BASE_URL}${cleanPath}`;
// // // // // // }

// // // // // // /**
// // // // // //  * --- INTEGRASI GOOGLE CLASSROOM ---
// // // // // //  */
// // // // // // export function getGoogleAuthUrl(): string {
// // // // // //   return `${API_BASE_URL}/api/classroom/auth`;
// // // // // // }

// // // // // // export async function getGoogleClassroomList() {
// // // // // //   return await api('/api/classroom/list');
// // // // // // }



// // // // // // lib/api.ts

// // // // // /**
// // // // //  * Base URL API: diambil dari NEXT_PUBLIC_API_URL agar tersedia di browser.
// // // // //  * Fallback ke domain backend produksi.
// // // // //  */
// // // // // const RAW_API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://humanis.vercel.app';
// // // // // export const API_BASE_URL = RAW_API_BASE.replace(/\/$/, ''); // hapus trailing slash

// // // // // /**
// // // // //  * Tipe opsi untuk helper api()
// // // // //  * - Memperluas RequestInit namun mengambil alih typing 'body' supaya boleh object biasa.
// // // // //  * - Sederhanakan headers jadi key-value string.
// // // // //  */
// // // // // export type ApiOptions = Omit<RequestInit, 'body' | 'headers' | 'credentials'> & {
// // // // //   /** Boleh object biasa; helper akan stringify jika bukan FormData/Blob/string */
// // // // //   body?: any;
// // // // //   /** Header sederhana key-value */
// // // // //   headers?: Record<string, string>;
// // // // //   /** Default 'include' (cocok untuk cookie/session di CORS backend) */
// // // // //   credentials?: RequestCredentials;
// // // // //   /** Tambahkan Authorization dari localStorage (default: true di client) */
// // // // //   auth?: boolean;
// // // // //   /** Timeout request dalam ms (default: 30_000) */
// // // // //   timeoutMs?: number;
// // // // // };

// // // // // /** Cek URL absolut */
// // // // // function isAbsoluteUrl(url: string) {
// // // // //   return /^https?:\/\//i.test(url);
// // // // // }

// // // // // /** Gabungkan base + endpoint tanpa dobel slash */
// // // // // function joinUrl(base: string, endpoint: string) {
// // // // //   if (isAbsoluteUrl(endpoint)) return endpoint;
// // // // //   const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
// // // // //   return `${base}${path}`;
// // // // // }

// // // // // /** Parse response secara aman */
// // // // // async function parseResponse(res: Response) {
// // // // //   const ct = res.headers.get('content-type') || '';
// // // // //   if (ct.includes('application/json')) {
// // // // //     try {
// // // // //       return await res.json();
// // // // //     } catch {
// // // // //       return {};
// // // // //     }
// // // // //   }
// // // // //   try {
// // // // //     return await res.text();
// // // // //   } catch {
// // // // //     return '';
// // // // //   }
// // // // // }

// // // // // /**
// // // // //  * Helper untuk request API standard (client-side).
// // // // //  * - Menyisipkan Authorization dari localStorage jika ada
// // // // //  * - Default credentials: 'include' (cookie/session)
// // // // //  * - Mendukung timeout via AbortController
// // // // //  */
// // // // // export async function api<T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> {
// // // // //   const {
// // // // //     auth = true,
// // // // //     timeoutMs = 30_000,
// // // // //     headers: customHeaders,
// // // // //     credentials = 'include',
// // // // //     ...rest
// // // // //   } = options;

// // // // //   // AbortController untuk timeout
// // // // //   const controller = new AbortController();
// // // // //   const timer = setTimeout(() => controller.abort(), timeoutMs);

// // // // //   // Ambil token hanya di client
// // // // //   let token: string | null = null;
// // // // //   if (typeof window !== 'undefined' && auth) {
// // // // //     token = localStorage.getItem('token');
// // // // //     if (token === 'undefined' || token === 'null') token = null;
// // // // //   }

// // // // //   // Bangun headers
// // // // //   const headers: Record<string, string> = {
// // // // //     Accept: 'application/json',
// // // // //     'Content-Type': 'application/json',
// // // // //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // // // //     ...(customHeaders ?? {}),
// // // // //   };

// // // // //   // Jika body adalah FormData, hapus Content-Type (biarkan browser set boundary)
// // // // //   if (rest.body instanceof FormData) {
// // // // //     delete headers['Content-Type'];
// // // // //   }
// // // // //   // Jika body object biasa, stringify
// // // // //   else if (rest.body && typeof rest.body === 'object' && !(rest.body instanceof Blob)) {
// // // // //     rest.body = JSON.stringify(rest.body);
// // // // //   }

// // // // //   const url = joinUrl(API_BASE_URL, endpoint);

// // // // //   let response: Response;
// // // // //   try {
// // // // //     response = await fetch(url, {
// // // // //       ...rest,
// // // // //       headers,
// // // // //       credentials,
// // // // //       signal: controller.signal,
// // // // //     });
// // // // //   } catch (err: any) {
// // // // //     clearTimeout(timer);
// // // // //     if (err?.name === 'AbortError') {
// // // // //       throw new Error(`Request timeout after ${timeoutMs} ms`);
// // // // //     }
// // // // //     throw err;
// // // // //   } finally {
// // // // //     clearTimeout(timer);
// // // // //   }

// // // // //   const data = await parseResponse(response);

// // // // //   if (!response.ok) {
// // // // //     // Ambil pesan error dari server jika ada
// // // // //     const serverMessage =
// // // // //       (data && typeof data === 'object' && ('error' in data || 'message' in data))
// // // // //         ? (data.error || data.message)
// // // // //         : response.statusText;

// // // // //     throw new Error(serverMessage || `Request failed with status ${response.status}`);
// // // // //   }

// // // // //   return data as T;
// // // // // }

// // // // // /**
// // // // //  * Helper khusus Upload (FormData).
// // // // //  * - Tetap menyisipkan Authorization dari localStorage jika ada
// // // // //  * - Method default: POST
// // // // //  */
// // // // // export async function apiUpload<T = any>(
// // // // //   endpoint: string,
// // // // //   formData: FormData,
// // // // //   options: ApiOptions = {}
// // // // // ): Promise<T> {
// // // // //   const {
// // // // //     auth = true,
// // // // //     timeoutMs = 300_000,
// // // // //     headers: customHeaders,
// // // // //     credentials = 'include',
// // // // //     ...rest
// // // // //   } = options;

// // // // //   // AbortController untuk timeout upload
// // // // //   const controller = new AbortController();
// // // // //   const timer = setTimeout(() => controller.abort(), timeoutMs);

// // // // //   // Token (client-only)
// // // // //   let token: string | null = null;
// // // // //   if (typeof window !== 'undefined' && auth) {
// // // // //     token = localStorage.getItem('token');
// // // // //     if (token === 'undefined' || token === 'null') token = null;
// // // // //   }

// // // // //   // Headers (jangan set Content-Type untuk FormData)
// // // // //   const headers: Record<string, string> = {
// // // // //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // // // //     ...(customHeaders ?? {}),
// // // // //   };

// // // // //   const url = joinUrl(API_BASE_URL, endpoint);

// // // // //   let response: Response;
// // // // //   try {
// // // // //     response = await fetch(url, {
// // // // //       method: 'POST',
// // // // //       body: formData,
// // // // //       headers,
// // // // //       credentials,
// // // // //       signal: controller.signal,
// // // // //       ...rest, // bisa override method/others jika diperlukan
// // // // //     });
// // // // //   } catch (err: any) {
// // // // //     clearTimeout(timer);
// // // // //     if (err?.name === 'AbortError') {
// // // // //       throw new Error(`Upload timeout after ${timeoutMs} ms`);
// // // // //     }
// // // // //     throw err;
// // // // //   } finally {
// // // // //     clearTimeout(timer);
// // // // //   }

// // // // //   const data = await parseResponse(response);

// // // // //   if (!response.ok) {
// // // // //     const serverMessage =
// // // // //       (data && typeof data === 'object' && ('error' in data || 'message' in data))
// // // // //         ? (data.error || data.message)
// // // // //         : response.statusText;

// // // // //     throw new Error(serverMessage || 'Gagal mengupload file');
// // // // //   }

// // // // //   return data as T;
// // // // // }

// // // // // /**
// // // // //  * --- SOLUSI GAMBAR 404 ---
// // // // //  * Mengubah path relatif (/uploads/foto.jpg) menjadi URL Absolut ke backend
// // // // //  */
// // // // // export function getImageUrl(path: string | null | undefined): string {
// // // // //   if (!path || path.trim() === '') {
// // // // //     return 'https://placehold.co/600x400?text=No+Cover';
// // // // //   }
// // // // //   if (isAbsoluteUrl(path)) {
// // // // //     return path;
// // // // //   }
// // // // //   const cleanPath = path.startsWith('/') ? path : `/${path}`;
// // // // //   return `${API_BASE_URL}${cleanPath}`;
// // // // // }

// // // // // /**
// // // // //  * --- INTEGRASI GOOGLE CLASSROOM ---
// // // // //  */
// // // // // export function getGoogleAuthUrl(): string {
// // // // //   return `${API_BASE_URL}/api/classroom/auth`;
// // // // // }

// // // // // export async function getGoogleClassroomList() {
// // // // //   return await api('/api/classroom/list');
// // // // // }


// // // // const RAW_API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://humanis.vercel.app';
// // // // export const API_BASE_URL = RAW_API_BASE.replace(/\/$/, '');

// // // // export type ApiOptions = Omit<RequestInit, 'body' | 'headers' | 'credentials'> & {
// // // //   body?: any;
// // // //   headers?: Record<string, string>;
// // // //   credentials?: RequestCredentials;
// // // //   auth?: boolean;
// // // //   timeoutMs?: number;
// // // // };

// // // // function isAbsoluteUrl(url: string) {
// // // //   return /^https?:\/\//i.test(url);
// // // // }

// // // // function joinUrl(base: string, endpoint: string) {
// // // //   if (isAbsoluteUrl(endpoint)) return endpoint;
// // // //   const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
// // // //   return `${base}${path}`;
// // // // }

// // // // async function parseResponse(res: Response) {
// // // //   const ct = res.headers.get('content-type') || '';
// // // //   if (ct.includes('application/json')) {
// // // //     try { return await res.json(); } catch { return {}; }
// // // //   }
// // // //   try { return await res.text(); } catch { return ''; }
// // // // }

// // // // // --- FUNGSI FETCH STANDARD ---
// // // // export async function api<T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> {
// // // //   const {
// // // //     auth = true,
// // // //     timeoutMs = 30_000,
// // // //     headers: customHeaders,
// // // //     credentials = 'include',
// // // //     ...rest
// // // //   } = options;

// // // //   const controller = new AbortController();
// // // //   const timer = setTimeout(() => controller.abort(), timeoutMs);

// // // //   let token: string | null = null;
// // // //   if (typeof window !== 'undefined' && auth) {
// // // //     token = localStorage.getItem('token');
// // // //     if (token === 'undefined' || token === 'null') token = null;
// // // //   }

// // // //   const headers: Record<string, string> = {
// // // //     Accept: 'application/json',
// // // //     'Content-Type': 'application/json',
// // // //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // // //     ...(customHeaders ?? {}),
// // // //   };

// // // //   if (rest.body instanceof FormData) {
// // // //     delete headers['Content-Type'];
// // // //   } else if (rest.body && typeof rest.body === 'object' && !(rest.body instanceof Blob)) {
// // // //     rest.body = JSON.stringify(rest.body);
// // // //   }

// // // //   const url = joinUrl(API_BASE_URL, endpoint);

// // // //   try {
// // // //     const response = await fetch(url, {
// // // //       ...rest,
// // // //       headers,
// // // //       credentials,
// // // //       signal: controller.signal,
// // // //     });
// // // //     clearTimeout(timer);
    
// // // //     const data = await parseResponse(response);

// // // //     if (!response.ok) {
// // // //         const serverMessage = (data && typeof data === 'object' && ('error' in data || 'message' in data)) 
// // // //             ? (data.error || data.message) : response.statusText;
// // // //         throw new Error(serverMessage || `Request failed with status ${response.status}`);
// // // //     }
// // // //     return data as T;
// // // //   } catch (err: any) {
// // // //     clearTimeout(timer);
// // // //     if (err?.name === 'AbortError') throw new Error(`Request timeout after ${timeoutMs} ms`);
// // // //     throw err;
// // // //   }
// // // // }

// // // // // --- FUNGSI UPLOAD KHUSUS (Timer Normal 60 Detik) ---
// // // // export async function apiUpload<T = any>(
// // // //   endpoint: string,
// // // //   formData: FormData,
// // // //   options: ApiOptions = {}
// // // // ): Promise<T> {
// // // //   const {
// // // //     auth = true,
// // // //     // [FIX] Timer Normal (60.000 ms / 60 Detik)
// // // //     timeoutMs = 60_000, 
// // // //     headers: customHeaders,
// // // //     credentials = 'include',
// // // //     ...rest
// // // //   } = options;

// // // //   const controller = new AbortController();
// // // //   const timer = setTimeout(() => controller.abort(), timeoutMs);

// // // //   let token: string | null = null;
// // // //   if (typeof window !== 'undefined' && auth) {
// // // //     token = localStorage.getItem('token');
// // // //     if (token === 'undefined' || token === 'null') token = null;
// // // //   }

// // // //   const headers: Record<string, string> = {
// // // //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // // //     ...(customHeaders ?? {}),
// // // //   };

// // // //   const url = joinUrl(API_BASE_URL, endpoint);

// // // //   try {
// // // //     const response = await fetch(url, {
// // // //       method: 'POST',
// // // //       body: formData,
// // // //       headers,
// // // //       credentials,
// // // //       signal: controller.signal,
// // // //       ...rest,
// // // //     });
// // // //     clearTimeout(timer);
    
// // // //     const data = await parseResponse(response);

// // // //     if (!response.ok) {
// // // //       const serverMessage = (data && typeof data === 'object' && ('error' in data || 'message' in data))
// // // //           ? (data.error || data.message) : response.statusText;
// // // //       throw new Error(serverMessage || 'Gagal mengupload file');
// // // //     }
// // // //     return data as T;
// // // //   } catch (err: any) {
// // // //     clearTimeout(timer);
// // // //     if (err?.name === 'AbortError') {
// // // //         throw new Error(`Upload Timeout (60s). Koneksi internet lambat atau file terlalu besar.`);
// // // //     }
// // // //     throw err;
// // // //   }
// // // // }

// // // // export function getImageUrl(path: string | null | undefined): string {
// // // //   if (!path || path.trim() === '') return 'https://placehold.co/600x400?text=No+Cover';
// // // //   if (isAbsoluteUrl(path)) return path;
// // // //   const cleanPath = path.startsWith('/') ? path : `/${path}`;
// // // //   return `${API_BASE_URL}${cleanPath}`;
// // // // }

// // // // export function getGoogleAuthUrl(): string {
// // // //   return `${API_BASE_URL}/api/classroom/auth`;
// // // // }

// // // // export async function getGoogleClassroomList() {
// // // //   return await api('/api/classroom/list');
// // // // }

// // // import axios from 'axios';

// // // // Konfigurasi Base URL dari environment variable atau default ke port backend 4000
// // // const RAW_API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
// // // export const API_BASE_URL = RAW_API_BASE.replace(/\/$/, '');

// // // export type ApiOptions = Omit<RequestInit, 'body' | 'headers' | 'credentials'> & {
// // //   body?: any;
// // //   headers?: Record<string, string>;
// // //   credentials?: RequestCredentials;
// // //   auth?: boolean;
// // //   timeoutMs?: number;
// // // };

// // // // Fungsi pembantu untuk mengecek apakah URL bersifat absolut (Cloud Storage)
// // // function isAbsoluteUrl(url: string) {
// // //   return /^https?:\/\//i.test(url);
// // // }

// // // function joinUrl(base: string, endpoint: string) {
// // //   if (isAbsoluteUrl(endpoint)) return endpoint;
// // //   const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
// // //   return `${base}${path}`;
// // // }

// // // async function parseResponse(res: Response) {
// // //   const ct = res.headers.get('content-type') || '';
// // //   if (ct.includes('application/json')) {
// // //     try { return await res.json(); } catch { return {}; }
// // //   }
// // //   try { return await res.text(); } catch { return ''; }
// // // }

// // // /**
// // //  * Helper untuk request API standar (GET, POST, dsb)
// // //  */
// // // export async function api<T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> {
// // //   const {
// // //     auth = true,
// // //     timeoutMs = 30_000,
// // //     headers: customHeaders,
// // //     credentials = 'include',
// // //     ...rest
// // //   } = options;

// // //   const controller = new AbortController();
// // //   const timer = setTimeout(() => controller.abort(), timeoutMs);

// // //   let token: string | null = null;
// // //   if (typeof window !== 'undefined' && auth) {
// // //     token = localStorage.getItem('token');
// // //     if (token === 'undefined' || token === 'null') token = null;
// // //   }

// // //   const headers: Record<string, string> = {
// // //     Accept: 'application/json',
// // //     'Content-Type': 'application/json',
// // //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // //     ...(customHeaders ?? {}),
// // //   };

// // //   // Otomatis stringify body jika berupa objek
// // //   if (rest.body && typeof rest.body === 'object' && !(rest.body instanceof FormData) && !(rest.body instanceof Blob)) {
// // //     rest.body = JSON.stringify(rest.body);
// // //   }

// // //   // Jika FormData, biarkan browser mengatur Content-Type (multipart/form-data)
// // //   if (rest.body instanceof FormData) {
// // //     delete headers['Content-Type'];
// // //   }

// // //   const url = joinUrl(API_BASE_URL, endpoint);

// // //   try {
// // //     const response = await fetch(url, {
// // //       ...rest,
// // //       headers,
// // //       credentials,
// // //       signal: controller.signal,
// // //     });
// // //     clearTimeout(timer);
    
// // //     const data = await parseResponse(response);

// // //     if (!response.ok) {
// // //         const serverMessage = (data && typeof data === 'object' && ('error' in data || 'message' in data)) 
// // //             ? (data.error || data.message) : response.statusText;
// // //         throw new Error(serverMessage || `Request failed with status ${response.status}`);
// // //     }
// // //     return data as T;
// // //   } catch (err: any) {
// // //     clearTimeout(timer);
// // //     if (err?.name === 'AbortError') throw new Error(`Request timeout after ${timeoutMs} ms`);
// // //     throw err;
// // //   }
// // // }

// // // /**
// // //  * Fungsi khusus untuk mengunggah berkas menggunakan FormData
// // //  */
// // // export async function apiUpload<T = any>(
// // //   endpoint: string,
// // //   formData: FormData,
// // //   options: ApiOptions = {}
// // // ): Promise<T> {
// // //   const {
// // //     auth = true,
// // //     timeoutMs = 60_000, // Timeout lebih lama (60 detik) untuk upload
// // //     headers: customHeaders,
// // //     credentials = 'include',
// // //     ...rest
// // //   } = options;

// // //   const controller = new AbortController();
// // //   const timer = setTimeout(() => controller.abort(), timeoutMs);

// // //   let token: string | null = null;
// // //   if (typeof window !== 'undefined' && auth) {
// // //     token = localStorage.getItem('token');
// // //     if (token === 'undefined' || token === 'null') token = null;
// // //   }

// // //   const headers: Record<string, string> = {
// // //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // //     ...(customHeaders ?? {}),
// // //   };

// // //   const url = joinUrl(API_BASE_URL, endpoint);

// // //   try {
// // //     const response = await fetch(url, {
// // //       method: 'POST',
// // //       body: formData,
// // //       headers,
// // //       credentials,
// // //       signal: controller.signal,
// // //       ...rest,
// // //     });
// // //     clearTimeout(timer);
    
// // //     const data = await parseResponse(response);

// // //     if (!response.ok) {
// // //       const serverMessage = (data && typeof data === 'object' && ('error' in data || 'message' in data))
// // //           ? (data.error || data.message) : response.statusText;
// // //       throw new Error(serverMessage || 'Gagal mengupload file');
// // //     }
// // //     return data as T;
// // //   } catch (err: any) {
// // //     clearTimeout(timer);
// // //     if (err?.name === 'AbortError') {
// // //         throw new Error(`Upload Timeout (60s). Koneksi lambat atau file terlalu besar.`);
// // //     }
// // //     throw err;
// // //   }
// // // }

// // // /**
// // //  * Mengonversi path relatif menjadi URL absolut (Mendukung Lokal & Cloud)
// // //  */
// // // export function getImageUrl(path: string | null | undefined): string {
// // //   if (!path || path.trim() === '') return 'https://placehold.co/600x400?text=No+Cover';
  
// // //   if (isAbsoluteUrl(path)) return path;

// // //   // Normalisasi path: ubah backslash ke slash dan hapus prefix 'public/'
// // //   let cleanPath = path.replace(/\\/g, '/');
// // //   if (cleanPath.startsWith('public/')) {
// // //     cleanPath = cleanPath.replace('public/', '');
// // //   }

// // //   if (!cleanPath.startsWith('/')) {
// // //     cleanPath = `/${cleanPath}`;
// // //   }

// // //   return encodeURI(`${API_BASE_URL}${cleanPath}`);
// // // }

// // // /**
// // //  * Fungsi pembantu khusus untuk URL berkas/dokumen (tanpa placeholder gambar)
// // //  */
// // // export function getFileUrl(path: string | null | undefined): string {
// // //   if (!path || path.trim() === '') return '#';
// // //   if (isAbsoluteUrl(path)) return path;

// // //   let cleanPath = path.replace(/\\/g, '/');
// // //   if (cleanPath.startsWith('public/')) {
// // //     cleanPath = cleanPath.replace('public/', '');
// // //   }

// // //   if (!cleanPath.startsWith('/')) {
// // //     cleanPath = `/${cleanPath}`;
// // //   }

// // //   return encodeURI(`${API_BASE_URL}${cleanPath}`);
// // // }

// // // export function getGoogleAuthUrl(): string {
// // //   return `${API_BASE_URL}/api/classroom/auth`;
// // // }

// // // export async function getGoogleClassroomList() {
// // //   return await api('/api/classroom/list');
// // // }



// // // frontend/lib/api.ts

// // export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// // /**
// //  * Helper untuk request API standard
// //  */
// // export async function api(endpoint: string, options: any = {}) {
// //   let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
// //   if (token === 'undefined' || token === 'null') token = null;

// //   const headers = {
// //     'Content-Type': 'application/json',
// //     ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
// //     ...options.headers,
// //   };

// //   if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
// //     options.body = JSON.stringify(options.body);
// //   }

// //   if (options.body instanceof FormData) {
// //     delete headers['Content-Type'];
// //   }

// //   // Handle double slash issue if endpoint starts with /
// //   const finalEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
// //   const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}${finalEndpoint}`, {
// //     ...options,
// //     headers,
// //   });

// //   let data;
// //   try {
// //     data = await response.json();
// //   } catch (error) {
// //     data = {};
// //   }

// //   if (!response.ok) {
// //     throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
// //   }

// //   return data;
// // }

// // /**
// //  * Helper khusus Upload (FormData)
// //  */
// // export async function apiUpload(endpoint: string, formData: FormData) {
// //   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

// //   const finalEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
// //   const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}${finalEndpoint}`, {
// //     method: 'POST',
// //     body: formData,
// //     headers: {
// //       ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
// //     },
// //   });

// //   let data;
// //   try {
// //     data = await response.json();
// //   } catch (error) {
// //     data = {};
// //   }

// //   if (!response.ok) {
// //     throw new Error(data.error || data.message || 'Gagal mengupload file');
// //   }
  
// //   return data;
// // }

// // /**
// //  * --- SOLUSI GAMBAR 404 ---
// //  * Mengubah path relatif (/uploads/foto.jpg) menjadi URL Absolut
// //  */
// // export function getImageUrl(path: string | null | undefined): string {
// //   if (!path || path === '') {
// //     return 'https://placehold.co/600x400?text=No+Cover';
// //   }
  
// //   // Jika URL Cloudinary (dimulai http/https), kembalikan langsung
// //   if (path.startsWith('http') || path.startsWith('https')) {
// //     return path;
// //   }
  
// //   // Bersihkan path dari 'public/' jika ada
// //   let cleanPath = path.replace(/\\/g, '/'); // Ubah backslash windows
// //   if (cleanPath.startsWith('public/')) cleanPath = cleanPath.replace('public/', '');
  
// //   cleanPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
// //   return `${API_BASE_URL.replace(/\/$/, '')}${cleanPath}`;
// // }

// // /**
// //  * --- SOLUSI FILE PDF/DOC ---
// //  * Mirip getImageUrl tapi TIDAK me-return placeholder gambar jika kosong/rusak.
// //  * Penting untuk file tugas agar tidak muncul gambar "No Cover".
// //  */
// // export function getFileUrl(path: string | null | undefined): string {
// //     if (!path || path === '') {
// //       return '#';
// //     }
    
// //     // Prioritas: URL Cloudinary
// //     if (path.startsWith('http') || path.startsWith('https')) {
// //       return path;
// //     }
    
// //     // Fallback: Local Storage
// //     let cleanPath = path.replace(/\\/g, '/');
// //     if (cleanPath.startsWith('public/')) cleanPath = cleanPath.replace('public/', '');
    
// //     cleanPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    
// //     // Gunakan encodeURI untuk menangani spasi (misal: "CV Andi.pdf" -> "CV%20Andi.pdf")
// //     return encodeURI(`${API_BASE_URL.replace(/\/$/, '')}${cleanPath}`);
// //   }

// // /**
// //  * --- INTEGRASI GOOGLE CLASSROOM ---
// //  */

// // /**
// //  * Mendapatkan URL Auth Google dari Backend
// //  */
// // export function getGoogleAuthUrl(): string {
// //   return `${API_BASE_URL.replace(/\/$/, '')}/api/classroom/auth`;
// // }

// // /**
// //  * Mengambil daftar kelas dari Google Classroom
// //  */
// // export async function getGoogleClassroomList() {
// //   try {
// //     return await api('/api/classroom/list');
// //   } catch (error) {
// //     console.error("Gagal mengambil daftar Google Classroom:", error);
// //     throw error;
// //   }
// // }

// // frontend/lib/api.ts

// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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

//   const finalEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//   const baseUrl = API_BASE_URL.replace(/\/$/, '');
  
//   const response = await fetch(`${baseUrl}${finalEndpoint}`, {
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

// export async function apiUpload(endpoint: string, formData: FormData) {
//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//   const baseUrl = API_BASE_URL.replace(/\/$/, '');
//   const finalEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

//   const response = await fetch(`${baseUrl}${finalEndpoint}`, {
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

// export function getImageUrl(path: string | null | undefined): string {
//   if (!path || path === '') return 'https://placehold.co/600x400?text=No+Cover';
//   if (path.startsWith('http')) return path;
  
//   const baseUrl = API_BASE_URL.replace(/\/$/, '');
//   let cleanPath = path.replace(/\\/g, '/');
//   if (cleanPath.startsWith('public/')) cleanPath = cleanPath.replace('public/', '');
//   cleanPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
//   return `${baseUrl}${cleanPath}`;
// }

// export function getFileUrl(path: string | null | undefined): string {
//     if (!path || path === '') return '#';
//     // 1. Jika URL Cloudinary (http/https), kembalikan langsung!
//     if (path.startsWith('http')) return path;

//     // 2. Jika path lokal
//     const baseUrl = API_BASE_URL.replace(/\/$/, '');
//     let cleanPath = path.replace(/\\/g, '/');
//     if (cleanPath.startsWith('public/')) cleanPath = cleanPath.replace('public/', '');
//     if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;
    
//     return encodeURI(`${baseUrl}${cleanPath}`);
// }

// export function getGoogleAuthUrl(): string {
//   return `${API_BASE_URL.replace(/\/$/, '')}/api/classroom/auth`;
// }

// export async function getGoogleClassroomList() {
//   return await api('/api/classroom/list');
// }


export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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

  const finalEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const baseUrl = API_BASE_URL.replace(/\/$/, '');
  
  const response = await fetch(`${baseUrl}${finalEndpoint}`, {
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

export async function apiUpload(endpoint: string, formData: FormData) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const baseUrl = API_BASE_URL.replace(/\/$/, '');
  const finalEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  const response = await fetch(`${baseUrl}${finalEndpoint}`, {
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

export function getImageUrl(path: string | null | undefined): string {
  if (!path || path === '') return 'https://placehold.co/600x400?text=No+Cover';
  if (path.startsWith('http')) return path;
  
  const baseUrl = API_BASE_URL.replace(/\/$/, '');
  let cleanPath = path.replace(/\\/g, '/');
  if (cleanPath.startsWith('public/')) cleanPath = cleanPath.replace('public/', '');
  cleanPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  return `${baseUrl}${cleanPath}`;
}

export function getFileUrl(path: string | null | undefined): string {
    if (!path || path === '') return '#';
    // 1. Jika URL Cloudinary (http/https), kembalikan langsung!
    if (path.startsWith('http')) return path;

    // 2. Jika path lokal
    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    let cleanPath = path.replace(/\\/g, '/');
    if (cleanPath.startsWith('public/')) cleanPath = cleanPath.replace('public/', '');
    if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;
    
    return encodeURI(`${baseUrl}${cleanPath}`);
}

// [BARU DITAMBAHKAN] Helper untuk menampilkan URL umum (gambar/file)
export function getDisplayUrl(path: string | null | undefined): string {
    if (!path || path === '') return '';
    if (path.startsWith('http')) return path;

    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    let cleanPath = path.replace(/\\/g, '/');
    if (cleanPath.startsWith('public/')) cleanPath = cleanPath.replace('public/', '');
    if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;

    return `${baseUrl}${cleanPath}`;
}

export function getGoogleAuthUrl(): string {
  return `${API_BASE_URL.replace(/\/$/, '')}/api/classroom/auth`;
}

export async function getGoogleClassroomList() {
  return await api('/api/classroom/list');
}
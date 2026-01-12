// // // // // // // // backend/src/routes/classroom.ts
// // // // // // // import express from 'express';
// // // // // // // import { google } from 'googleapis';

// // // // // // // const router = express.Router();

// // // // // // // // Helper to initialize OAuth2 Client
// // // // // // // // This ensures environment variables are read at runtime
// // // // // // // const getOAuthClient = () => {
// // // // // // //   const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// // // // // // //   const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// // // // // // //   const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;

// // // // // // //   if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URL) {
// // // // // // //     throw new Error('Google Client configuration missing in .env');
// // // // // // //   }

// // // // // // //   return new google.auth.OAuth2(
// // // // // // //     GOOGLE_CLIENT_ID,
// // // // // // //     GOOGLE_CLIENT_SECRET,
// // // // // // //     GOOGLE_REDIRECT_URL
// // // // // // //   );
// // // // // // // };

// // // // // // // // Global variable to store user token temporarily (for demo purposes)
// // // // // // // let userCredential: any = null;

// // // // // // // // Route 1: Initiate Google Login
// // // // // // // router.get('/auth', (req, res) => {
// // // // // // //   try {
// // // // // // //     const oauth2Client = getOAuthClient();
// // // // // // //     const scopes = [
// // // // // // //       'https://www.googleapis.com/auth/classroom.courses.readonly'
// // // // // // //     ];

// // // // // // //     const url = oauth2Client.generateAuthUrl({
// // // // // // //       access_type: 'offline',
// // // // // // //       scope: scopes,
// // // // // // //       prompt: 'consent'
// // // // // // //     });

// // // // // // //     res.redirect(url);
// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).send(`Backend Error: ${error.message}`);
// // // // // // //   }
// // // // // // // });

// // // // // // // // Route 2: Handle Google Callback
// // // // // // // router.get('/auth/callback', async (req, res) => {
// // // // // // //   const { code } = req.query;

// // // // // // //   if (!code) return res.status(400).send('No code provided by Google.');

// // // // // // //   try {
// // // // // // //     const oauth2Client = getOAuthClient();
// // // // // // //     const { tokens } = await oauth2Client.getToken(code as string);
    
// // // // // // //     oauth2Client.setCredentials(tokens);
// // // // // // //     userCredential = tokens; 

// // // // // // //     // Redirect to frontend after successful login
// // // // // // //     res.redirect('http://localhost:3000/admin/courses?google_auth=success');
// // // // // // //   } catch (error) {
// // // // // // //     res.status(500).send('Google login failed.');
// // // // // // //   }
// // // // // // // });

// // // // // // // // Route 3: Fetch Course List
// // // // // // // router.get('/list', async (req, res) => {
// // // // // // //   try {
// // // // // // //     if (!userCredential) {
// // // // // // //       return res.status(401).json({ error: 'User not logged in to Google.' });
// // // // // // //     }

// // // // // // //     const oauth2Client = getOAuthClient();
// // // // // // //     oauth2Client.setCredentials(userCredential);

// // // // // // //     const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    
// // // // // // //     const response = await classroom.courses.list({
// // // // // // //       courseStates: ['ACTIVE'],
// // // // // // //       pageSize: 20,
// // // // // // //     });

// // // // // // //     const courses = response.data.courses || [];
    
// // // // // // //     const formattedCourses = courses.map((c) => ({
// // // // // // //       id: c.id,
// // // // // // //       name: c.name,
// // // // // // //       section: c.section,
// // // // // // //       description: c.descriptionHeading,
// // // // // // //       link: c.alternateLink 
// // // // // // //     }));

// // // // // // //     res.json(formattedCourses);

// // // // // // //   } catch (error: any) {
// // // // // // //     res.status(500).json({ error: error.message });
// // // // // // //   }
// // // // // // // });

// // // // // // // export default router;
// // // // // // import { Router } from 'express';
// // // // // // import { google } from 'googleapis';

// // // // // // const router = Router();

// // // // // // // --- DEBUGGING: Cek apakah env terbaca ---
// // // // // // console.log("GOOGLE CLIENT ID:", process.env.GOOGLE_CLIENT_ID ? "Terbaca ✅" : "Tidak Terbaca ❌");
// // // // // // console.log("GOOGLE REDIRECT URL:", process.env.GOOGLE_REDIRECT_URL);

// // // // // // // Konfigurasi Client
// // // // // // const oauth2Client = new google.auth.OAuth2(
// // // // // //   process.env.GOOGLE_CLIENT_ID,
// // // // // //   process.env.GOOGLE_CLIENT_SECRET,
// // // // // //   process.env.GOOGLE_REDIRECT_URL
// // // // // // );

// // // // // // // 1. Generate URL Login Google
// // // // // // router.get('/auth', (req, res) => {
// // // // // //   const scopes = [
// // // // // //     'https://www.googleapis.com/auth/classroom.courses.readonly',
// // // // // //     'https://www.googleapis.com/auth/classroom.coursework.me.readonly' 
// // // // // //   ];

// // // // // //   const url = oauth2Client.generateAuthUrl({
// // // // // //     access_type: 'offline',
// // // // // //     scope: scopes,
// // // // // //     prompt: 'consent'
// // // // // //   });

// // // // // //   res.json({ url });
// // // // // // });

// // // // // // // 2. Callback OAuth
// // // // // // router.get('/auth/callback', async (req, res) => {
// // // // // //   const { code } = req.query;
// // // // // //   try {
// // // // // //     const { tokens } = await oauth2Client.getToken(code as string);
// // // // // //     // Simpan token di cookie HTTP-Only agar aman
// // // // // //     res.cookie('g_classroom_token', JSON.stringify(tokens), { 
// // // // // //       httpOnly: true, 
// // // // // //       secure: process.env.NODE_ENV === 'production',
// // // // // //       maxAge: 3600 * 1000 * 24 // 1 hari
// // // // // //     });
    
// // // // // //     // Script untuk menutup popup dan memberi sinyal ke window utama
// // // // // //     res.send(`
// // // // // //       <script>
// // // // // //         window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS' }, '*');
// // // // // //         window.close();
// // // // // //       </script>
// // // // // //     `);
// // // // // //   } catch (error) {
// // // // // //     console.error('Error Auth Google:', error);
// // // // // //     res.status(500).send('Authentication failed');
// // // // // //   }
// // // // // // });

// // // // // // // 3. Ambil Daftar Kelas (Courses)
// // // // // // router.get('/courses', async (req, res) => {
// // // // // //   try {
// // // // // //     const tokenStr = req.cookies.g_classroom_token;
// // // // // //     if (!tokenStr) return res.status(401).json({ error: 'Belum terhubung ke Google' });

// // // // // //     const tokens = JSON.parse(tokenStr);
// // // // // //     oauth2Client.setCredentials(tokens);

// // // // // //     const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    
// // // // // //     const response = await classroom.courses.list({
// // // // // //       courseStates: ['ACTIVE'],
// // // // // //       pageSize: 50
// // // // // //     });

// // // // // //     const courses = response.data.courses || [];
    
// // // // // //     const formatted = courses.map(c => ({
// // // // // //       id: c.id,
// // // // // //       name: c.name,
// // // // // //       section: c.section,
// // // // // //       alternateLink: c.alternateLink
// // // // // //     }));

// // // // // //     res.json({ courses: formatted });
// // // // // //   } catch (error: any) {
// // // // // //     console.error('API Error:', error);
// // // // // //     res.status(500).json({ error: error.message });
// // // // // //   }
// // // // // // });

// // // // // // export default router;
// // // // // import { Router } from 'express';
// // // // // import { google } from 'googleapis';

// // // // // const router = Router();

// // // // // // --- PERBAIKAN UTAMA: Lazy Initialization ---
// // // // // // Kita bungkus inisialisasi OAuth dalam fungsi.
// // // // // // Ini menjamin process.env DIBACA SAAT REQUEST MASUK, bukan saat server start.
// // // // // // Sehingga variabel .env pasti sudah siap.
// // // // // const getOAuthClient = () => {
// // // // //   const clientId = process.env.GOOGLE_CLIENT_ID;
// // // // //   const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
// // // // //   const redirectUrl = process.env.GOOGLE_REDIRECT_URL;

// // // // //   if (!clientId || !clientSecret || !redirectUrl) {
// // // // //     console.error("❌ Google Credential Missing in .env");
// // // // //     throw new Error("Konfigurasi Google Classroom belum lengkap di server.");
// // // // //   }

// // // // //   return new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
// // // // // };

// // // // // // 1. Generate URL Auth untuk Login Google
// // // // // router.get('/auth', (req, res) => {
// // // // //   try {
// // // // //     const oauth2Client = getOAuthClient(); // Panggil fungsi di sini
    
// // // // //     const scopes = [
// // // // //       'https://www.googleapis.com/auth/classroom.courses.readonly', // Izin baca list course
// // // // //       'https://www.googleapis.com/auth/classroom.coursework.me.readonly' // Izin baca tugas
// // // // //     ];

// // // // //     const url = oauth2Client.generateAuthUrl({
// // // // //       access_type: 'offline',
// // // // //       scope: scopes,
// // // // //       prompt: 'consent'
// // // // //     });

// // // // //     res.json({ url });
// // // // //   } catch (error: any) {
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // });

// // // // // // 2. Callback setelah user login Google
// // // // // router.get('/auth/callback', async (req, res) => {
// // // // //   const { code } = req.query;
// // // // //   try {
// // // // //     const oauth2Client = getOAuthClient(); // Panggil fungsi di sini
// // // // //     const { tokens } = await oauth2Client.getToken(code as string);
    
// // // // //     // Simpan token di cookie (httpOnly)
// // // // //     res.cookie('g_classroom_token', JSON.stringify(tokens), { 
// // // // //       httpOnly: true, 
// // // // //       secure: process.env.NODE_ENV === 'production',
// // // // //       maxAge: 3600 * 1000 * 24 // 1 hari
// // // // //     });
    
// // // // //     // Script penutup popup
// // // // //     res.send(`
// // // // //       <script>
// // // // //         window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS' }, '*');
// // // // //         window.close();
// // // // //       </script>
// // // // //     `);
// // // // //   } catch (error) {
// // // // //     console.error('Error Auth Google:', error);
// // // // //     res.status(500).send('Authentication failed');
// // // // //   }
// // // // // });

// // // // // // 3. Ambil Daftar Kelas dari Google Classroom
// // // // // router.get('/courses', async (req, res) => {
// // // // //   try {
// // // // //     const tokenStr = req.cookies.g_classroom_token;
// // // // //     if (!tokenStr) return res.status(401).json({ error: 'Belum terhubung ke Google' });

// // // // //     const tokens = JSON.parse(tokenStr);
// // // // //     const oauth2Client = getOAuthClient(); // Panggil fungsi di sini
// // // // //     oauth2Client.setCredentials(tokens);

// // // // //     const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    
// // // // //     const response = await classroom.courses.list({
// // // // //       courseStates: ['ACTIVE'],
// // // // //       pageSize: 20
// // // // //     });

// // // // //     const courses = response.data.courses || [];
    
// // // // //     const formatted = courses.map(c => ({
// // // // //       id: c.id,
// // // // //       name: c.name,
// // // // //       section: c.section,
// // // // //       alternateLink: c.alternateLink
// // // // //     }));

// // // // //     res.json({ courses: formatted });
// // // // //   } catch (error: any) {
// // // // //     console.error('Gagal ambil course classroom:', error);
// // // // //     res.status(500).json({ error: error.message });
// // // // //   }
// // // // // });

// // // // // export default router;
// // // // import { Router } from 'express';
// // // // import { google } from 'googleapis';

// // // // const router = Router();

// // // // // --- Helper: Get OAuth Client dengan Sanitasi ---
// // // // const getOAuthClient = () => {
// // // //   // .trim() digunakan untuk menghapus spasi yang tidak sengaja terikut di .env
// // // //   const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
// // // //   const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
// // // //   const redirectUrl = process.env.GOOGLE_REDIRECT_URL?.trim();

// // // //   if (!clientId || !clientSecret || !redirectUrl) {
// // // //     console.error("❌ Google Credential Missing/Empty in .env");
// // // //     throw new Error("Konfigurasi Google Classroom belum lengkap.");
// // // //   }

// // // //   return new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
// // // // };

// // // // // 1. Generate URL Auth
// // // // router.get('/auth', (req, res) => {
// // // //   try {
// // // //     const oauth2Client = getOAuthClient();
    
// // // //     const scopes = [
// // // //       'https://www.googleapis.com/auth/classroom.courses.readonly',
// // // //       'https://www.googleapis.com/auth/classroom.coursework.me.readonly'
// // // //     ];

// // // //     const url = oauth2Client.generateAuthUrl({
// // // //       access_type: 'offline',
// // // //       scope: scopes,
// // // //       prompt: 'consent' // Memaksa muncul prompt agar dapat refresh token
// // // //     });

// // // //     res.json({ url });
// // // //   } catch (error: any) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // });

// // // // // 2. Callback OAuth
// // // // router.get('/auth/callback', async (req, res) => {
// // // //   const { code } = req.query;

// // // //   if (!code) {
// // // //     return res.status(400).send('Error: No code provided from Google.');
// // // //   }

// // // //   try {
// // // //     const oauth2Client = getOAuthClient();
    
// // // //     // Tukar Authorization Code dengan Access Token
// // // //     const { tokens } = await oauth2Client.getToken(code as string);
    
// // // //     // Simpan token di cookie
// // // //     res.cookie('g_classroom_token', JSON.stringify(tokens), { 
// // // //       httpOnly: true, 
// // // //       secure: process.env.NODE_ENV === 'production',
// // // //       maxAge: 3600 * 1000 * 24 // 1 hari
// // // //     });
    
// // // //     console.log("✅ Google Auth Success!");

// // // //     // Script menutup popup
// // // //     res.send(`
// // // //       <script>
// // // //         window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS' }, '*');
// // // //         window.close();
// // // //       </script>
// // // //     `);
// // // //   } catch (error: any) {
// // // //     console.error('❌ Error Auth Google:', error.response?.data || error.message);
    
// // // //     // Tampilkan pesan error yang lebih jelas di browser
// // // //     res.status(400).send(`
// // // //       <div style="font-family: sans-serif; text-align: center; padding: 20px;">
// // // //         <h2 style="color: red;">Gagal Menghubungkan Akun</h2>
// // // //         <p>Error: ${error.response?.data?.error || error.message}</p>
// // // //         <p>Silakan tutup jendela ini dan coba lagi.</p>
// // // //         <button onclick="window.close()">Tutup</button>
// // // //       </div>
// // // //     `);
// // // //   }
// // // // });

// // // // // 3. Get Courses
// // // // router.get('/courses', async (req, res) => {
// // // //   try {
// // // //     const tokenStr = req.cookies.g_classroom_token;
// // // //     if (!tokenStr) return res.status(401).json({ error: 'Belum terhubung ke Google' });

// // // //     const tokens = JSON.parse(tokenStr);
// // // //     const oauth2Client = getOAuthClient();
// // // //     oauth2Client.setCredentials(tokens);

// // // //     const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    
// // // //     const response = await classroom.courses.list({
// // // //       courseStates: ['ACTIVE'],
// // // //       pageSize: 50
// // // //     });

// // // //     const courses = response.data.courses || [];
    
// // // //     const formatted = courses.map(c => ({
// // // //       id: c.id,
// // // //       name: c.name,
// // // //       section: c.section,
// // // //       alternateLink: c.alternateLink
// // // //     }));

// // // //     res.json({ courses: formatted });
// // // //   } catch (error: any) {
// // // //     // Jika token expired atau invalid
// // // //     if (error.code === 401 || error.message?.includes('invalid_grant')) {
// // // //         res.clearCookie('g_classroom_token'); // Hapus cookie lama
// // // //         return res.status(401).json({ error: 'Sesi Google habis. Silakan hubungkan ulang.' });
// // // //     }
// // // //     console.error('API Error:', error);
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // });

// // // // export default router;
// // // import { Router } from 'express';
// // // import { google } from 'googleapis';

// // // const router = Router();

// // // // --- Helper: Get OAuth Client dengan Sanitasi ---
// // // // Menggunakan Lazy Loading agar .env terbaca sempurna
// // // const getOAuthClient = () => {
// // //   const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
// // //   const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
// // //   const redirectUrl = process.env.GOOGLE_REDIRECT_URL?.trim();

// // //   if (!clientId || !clientSecret || !redirectUrl) {
// // //     console.error("❌ Google Credential Missing/Empty in .env");
// // //     throw new Error("Konfigurasi Google Classroom belum lengkap.");
// // //   }

// // //   return new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
// // // };

// // // // 1. Generate URL Auth
// // // router.get('/auth', (req, res) => {
// // //   try {
// // //     const oauth2Client = getOAuthClient();
    
// // //     const scopes = [
// // //       'https://www.googleapis.com/auth/classroom.courses.readonly',
// // //       'https://www.googleapis.com/auth/classroom.coursework.me.readonly'
// // //     ];

// // //     const url = oauth2Client.generateAuthUrl({
// // //       access_type: 'offline',
// // //       scope: scopes,
// // //       prompt: 'consent' // Memaksa prompt agar refresh token didapat (jika perlu)
// // //     });

// // //     res.json({ url });
// // //   } catch (error: any) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // 2. Callback OAuth (PERBAIKAN UTAMA PADA SCRIPT POPUP)
// // // router.get('/auth/callback', async (req, res) => {
// // //   const { code } = req.query;

// // //   if (!code) {
// // //     return res.status(400).send('Error: No code provided from Google.');
// // //   }

// // //   try {
// // //     const oauth2Client = getOAuthClient();
// // //     const { tokens } = await oauth2Client.getToken(code as string);
    
// // //     // Simpan token di cookie
// // //     // secure: false penting untuk development di localhost (http)
// // //     res.cookie('g_classroom_token', JSON.stringify(tokens), { 
// // //       httpOnly: true, 
// // //       secure: process.env.NODE_ENV === 'production', 
// // //       sameSite: 'lax', 
// // //       maxAge: 3600 * 1000 * 24 // 1 hari
// // //     });
    
// // //     console.log("✅ Google Auth Success! Token stored.");

// // //     // HTML & Script untuk menutup popup dan memberi info ke user
// // //     res.send(`
// // //       <html>
// // //         <body style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; background-color:#f0f9ff;">
// // //           <h2 style="color:#166534;">✅ Berhasil Terhubung!</h2>
// // //           <p>Akun Google Classroom Anda telah aktif.</p>
// // //           <p style="color:#64748b; font-size:12px;">Jendela ini akan tertutup otomatis dalam 2 detik...</p>
// // //           <script>
// // //             try {
// // //               // Kirim pesan ke window induk (Halaman Admin)
// // //               if (window.opener) {
// // //                 window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS' }, '*');
// // //                 console.log('Message sent to opener');
// // //               }
// // //             } catch (e) {
// // //               console.error('Failed to communicate with opener', e);
// // //             } finally {
// // //               // Tutup window setelah jeda sedikit agar pesan sempat terkirim
// // //               setTimeout(() => { window.close(); }, 1500);
// // //             }
// // //           </script>
// // //         </body>
// // //       </html>
// // //     `);
// // //   } catch (error: any) {
// // //     console.error('❌ Error Auth Google:', error.response?.data || error.message);
// // //     res.status(400).send(`
// // //       <div style="text-align:center; padding:20px; font-family:sans-serif;">
// // //         <h2 style="color:red;">Gagal Menghubungkan</h2>
// // //         <p>${error.message}</p>
// // //         <button onclick="window.close()">Tutup</button>
// // //       </div>
// // //     `);
// // //   }
// // // });

// // // // 3. Get Courses
// // // router.get('/courses', async (req, res) => {
// // //   try {
// // //     const tokenStr = req.cookies.g_classroom_token;
// // //     if (!tokenStr) return res.status(401).json({ error: 'Belum terhubung ke Google' });

// // //     const tokens = JSON.parse(tokenStr);
// // //     const oauth2Client = getOAuthClient();
// // //     oauth2Client.setCredentials(tokens);

// // //     const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    
// // //     // Ambil hanya course yang statusnya ACTIVE
// // //     const response = await classroom.courses.list({
// // //       courseStates: ['ACTIVE'],
// // //       pageSize: 50
// // //     });

// // //     const courses = response.data.courses || [];
    
// // //     const formatted = courses.map(c => ({
// // //       id: c.id,
// // //       name: c.name,
// // //       section: c.section,
// // //       alternateLink: c.alternateLink
// // //     }));

// // //     res.json({ courses: formatted });
// // //   } catch (error: any) {
// // //     // Jika token expired/invalid, beri status 401 agar frontend tahu
// // //     if (error.code === 401 || error.message?.includes('invalid_grant')) {
// // //         res.clearCookie('g_classroom_token');
// // //         return res.status(401).json({ error: 'Sesi habis' });
// // //     }
// // //     console.error('API Error:', error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // export default router;
// // import { Router } from 'express';
// // import { google } from 'googleapis';

// // const router = Router();

// // // Helper Auth
// // const getOAuthClient = () => {
// //   const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
// //   const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
// //   const redirectUrl = process.env.GOOGLE_REDIRECT_URL?.trim();

// //   if (!clientId || !clientSecret || !redirectUrl) {
// //     throw new Error("Konfigurasi Google Classroom belum lengkap.");
// //   }

// //   return new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
// // };

// // // 1. Generate URL
// // router.get('/auth', (req, res) => {
// //   try {
// //     const oauth2Client = getOAuthClient();
// //     const url = oauth2Client.generateAuthUrl({
// //       access_type: 'offline',
// //       scope: [
// //         'https://www.googleapis.com/auth/classroom.courses.readonly',
// //         'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
// //         'https://www.googleapis.com/auth/classroom.rosters.readonly' // Tambahan izin agar lebih lengkap
// //       ],
// //       prompt: 'consent'
// //     });
// //     res.json({ url });
// //   } catch (error: any) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // 2. Callback (Tetap menggunakan Redirect yang sudah berhasil)
// // router.get('/auth/callback', async (req, res) => {
// //   const { code } = req.query;
// //   if (!code) return res.status(400).send('Error: No code.');

// //   try {
// //     const oauth2Client = getOAuthClient();
// //     const { tokens } = await oauth2Client.getToken(code as string);
// //     const tokenStr = Buffer.from(JSON.stringify(tokens)).toString('base64');
    
// //     // Redirect ke frontend
// //     res.redirect(`http://localhost:3000/auth/google-success#${tokenStr}`);
// //   } catch (error: any) {
// //     res.status(400).send(`Error: ${error.message}`);
// //   }
// // });

// // // 3. Get Courses (PERBAIKAN UTAMA: Hapus Filter & Debug Log)
// // router.get('/courses', async (req, res) => {
// //   try {
// //     const tokenHeader = req.headers['x-google-token'];
    
// //     if (!tokenHeader || Array.isArray(tokenHeader)) {
// //       return res.status(401).json({ error: 'Token Google tidak ditemukan.' });
// //     }

// //     const tokens = JSON.parse(tokenHeader as string);
// //     const oauth2Client = getOAuthClient();
// //     oauth2Client.setCredentials(tokens);

// //     const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    
// //     console.log("[Backend] Fetching courses from Google...");

// //     // Hapus 'courseStates' agar semua kelas (Active/Archived) terambil
// //     const response = await classroom.courses.list({
// //       pageSize: 100, // Ambil lebih banyak
// //       // courseStates: ['ACTIVE'] <-- KITA HAPUS INI SEMENTARA
// //     });

// //     const courses = response.data.courses || [];
// //     console.log(`[Backend] Found ${courses.length} courses.`);

// //     const formatted = courses.map(c => ({
// //       id: c.id,
// //       name: c.name,
// //       section: c.section,
// //       alternateLink: c.alternateLink,
// //       status: c.courseState // Kita kirim statusnya juga untuk info
// //     }));

// //     res.json({ courses: formatted });
// //   } catch (error: any) {
// //     console.error("[Backend API Error]:", error.message);
// //     if (error.code === 401 || error.message?.includes('invalid_grant')) {
// //         return res.status(401).json({ error: 'Sesi habis, silakan login ulang.' });
// //     }
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // export default router;
// import { Router } from 'express';
// import { google } from 'googleapis';

// const router = Router();

// const getOAuthClient = () => {
//   const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
//   const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
//   const redirectUrl = process.env.GOOGLE_REDIRECT_URL?.trim();

//   if (!clientId || !clientSecret || !redirectUrl) {
//     throw new Error("Konfigurasi Google Classroom belum lengkap.");
//   }

//   return new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
// };

// // 1. Generate URL Auth
// router.get('/auth', (req, res) => {
//   try {
//     const oauth2Client = getOAuthClient();
//     const url = oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       // Tambahkan scope userinfo.email untuk debugging
//       scope: [
//         'https://www.googleapis.com/auth/classroom.courses.readonly',
//         'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
//         'https://www.googleapis.com/auth/userinfo.email' 
//       ],
//       prompt: 'consent'
//     });
//     res.json({ url });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 2. Callback OAuth
// router.get('/auth/callback', async (req, res) => {
//   const { code } = req.query;
//   if (!code) return res.status(400).send('Error: No code.');

//   try {
//     const oauth2Client = getOAuthClient();
//     const { tokens } = await oauth2Client.getToken(code as string);
    
//     // Redirect ke frontend dengan token
//     const tokenStr = Buffer.from(JSON.stringify(tokens)).toString('base64');
//     res.redirect(`http://localhost:3000/auth/google-success#${tokenStr}`);

//   } catch (error: any) {
//     res.status(400).send(`Error: ${error.message}`);
//   }
// });

// // 3. Get Courses (DEBUG MODE)
// router.get('/courses', async (req, res) => {
//   try {
//     const tokenHeader = req.headers['x-google-token'];
    
//     if (!tokenHeader || Array.isArray(tokenHeader)) {
//       return res.status(401).json({ error: 'Token Google tidak ditemukan di Header' });
//     }

//     const tokens = JSON.parse(tokenHeader as string);
//     const oauth2Client = getOAuthClient();
//     oauth2Client.setCredentials(tokens);

//     // Cek Email User (Untuk memastikan akun benar)
//     const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
//     const userInfo = await oauth2.userinfo.get();
//     console.log(`[Backend Debug] Connected as: ${userInfo.data.email}`);

//     const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    
//     console.log("[Backend Debug] Fetching ALL courses (No Filter)...");

//     // Ambil daftar kelas TANPA filter status
//     const response = await classroom.courses.list({
//       pageSize: 100,
//       // courseStates: ['ACTIVE'] // <-- Dihapus agar semua status muncul
//     });

//     const courses = response.data.courses || [];
//     console.log(`[Backend Debug] Found ${courses.length} courses from Google.`);

//     if (courses.length === 0) {
//         console.log("⚠️ Peringatan: Akun ini memang tidak memiliki kelas di Google Classroom.");
//     }

//     const formatted = courses.map(c => ({
//       id: c.id,
//       name: c.name,
//       section: c.section,
//       alternateLink: c.alternateLink,
//       status: c.courseState // Kirim status ke frontend
//     }));

//     res.json({ courses: formatted });
//   } catch (error: any) {
//     console.error("API Error:", error.message);
//     if (error.code === 401) return res.status(401).json({ error: 'Token Expired' });
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;
import { Router } from 'express';
import { google } from 'googleapis';

const router = Router();

const getOAuthClient = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const redirectUrl = process.env.GOOGLE_REDIRECT_URL?.trim();

  if (!clientId || !clientSecret || !redirectUrl) {
    throw new Error("Konfigurasi Google Classroom belum lengkap.");
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
};

// 1. Generate URL Auth
router.get('/auth', (req, res) => {
  try {
    const oauth2Client = getOAuthClient();
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/classroom.courses.readonly',
        'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
        'https://www.googleapis.com/auth/userinfo.email' 
      ],
      prompt: 'consent'
    });
    res.json({ url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Callback OAuth (REDIRECT STRATEGY)
router.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Error: No code.');

  try {
    const oauth2Client = getOAuthClient();
    const { tokens } = await oauth2Client.getToken(code as string);
    
    // Encode token ke Base64 agar aman di URL
    const tokenStr = Buffer.from(JSON.stringify(tokens)).toString('base64');

    // Redirect ke halaman frontend khusus untuk menyimpan token
    res.redirect(`http://localhost:3000/auth/google-success#${tokenStr}`);

  } catch (error: any) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

// 3. Get Courses (INCLUDE ENROLLMENT CODE)
router.get('/courses', async (req, res) => {
  try {
    const tokenHeader = req.headers['x-google-token'];
    
    if (!tokenHeader || Array.isArray(tokenHeader)) {
      return res.status(401).json({ error: 'Token Google tidak ditemukan di Header' });
    }

    const tokens = JSON.parse(tokenHeader as string);
    const oauth2Client = getOAuthClient();
    oauth2Client.setCredentials(tokens);

    // Cek Email User (Info Debugging di Terminal)
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    console.log(`[Backend Debug] Connected as: ${userInfo.data.email}`);

    const classroom = google.classroom({ version: 'v1', auth: oauth2Client });
    
    // Ambil daftar kelas (Tanpa filter status agar semua muncul)
    const response = await classroom.courses.list({
      pageSize: 100,
    });

    const courses = response.data.courses || [];
    console.log(`[Backend Debug] Found ${courses.length} courses.`);

    const formatted = courses.map(c => ({
      id: c.id,
      name: c.name,
      section: c.section,
      alternateLink: c.alternateLink,
      status: c.courseState,
      enrollmentCode: c.enrollmentCode // <--- PENTING: Kode Kelas untuk siswa join
    }));

    res.json({ courses: formatted });
  } catch (error: any) {
    console.error("API Error:", error.message);
    if (error.code === 401) return res.status(401).json({ error: 'Token Expired' });
    res.status(500).json({ error: error.message });
  }
});

export default router;
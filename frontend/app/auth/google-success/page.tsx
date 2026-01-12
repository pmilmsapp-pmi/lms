'use client';

import { useEffect } from 'react';

export default function GoogleSuccessPage() {
  useEffect(() => {
    // Ambil token dari URL Hash (setelah tanda #)
    const hash = window.location.hash.substring(1); // Hapus '#'
    
    if (hash) {
      try {
        // Decode dari Base64
        const tokenJson = atob(hash);
        const tokens = JSON.parse(tokenJson);

        // 1. Simpan di LocalStorage (Halaman Admin akan mendeteksi ini)
        localStorage.setItem('google_class_token', JSON.stringify(tokens));
        
        // 2. Trigger event storage manual (opsional, untuk browser lama)
        window.localStorage.setItem('google_sync_event', Date.now().toString());

        // 3. Kirim pesan ke opener (jika masih ada)
        if (window.opener) {
          window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', tokens }, '*');
        }

      } catch (e) {
        console.error("Gagal memproses token", e);
      }
    }

    // Tutup jendela ini secepat mungkin
    setTimeout(() => {
        window.close();
    }, 500);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-green-800 font-sans">
      <h2 className="text-2xl font-bold mb-2">✅ Berhasil!</h2>
      <p>Akun terhubung. Menutup jendela...</p>
    </div>
  );
}
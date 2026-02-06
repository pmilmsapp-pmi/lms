import { useState, useEffect } from 'react';

// Simulasi Database/API (Pengganti RestDataSource & DatabaseHelper)
const fetchUserData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        // Ganti data ini nanti dengan respons API asli Anda
        nama: "Nandi Rizki Ramadan",
        kodeAnggota: "327701100226001",
        email: "nandirr66@gmail.com",
        namaKategori: "KSR", // Coba ubah ke "STAF" untuk tes kartu putih
        unit: "STKIP PASUNDAN",
        parentPmi: "KOTA CIMAHI",
        avatarUrl: "https://mis.pmi.or.id/assets/img/default.png", // Ganti URL foto asli
      });
    }, 1000); // Simulasi delay 1 detik
  });
};

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserData();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { user, loading, error };
};
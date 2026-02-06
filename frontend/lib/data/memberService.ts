// frontend/lib/data/memberService.ts

// 1. Definisikan Interface (Tipe Data)
export interface Profil {
    nama: string;
    kodeAnggota: string;
    email?: string;
    namaKategori?: string;
    unit?: string;
    parentPmi?: string;
    avatarUrl?: string;
    // Tambahkan field lain sesuai respon API Anda
}

// 2. Fungsi Fetch Data
export const getProfilUser = async (kodeAnggota: string): Promise<Profil | null> => {
    try {
        // Ganti URL ini dengan endpoint backend Anda yang sebenarnya
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        const response = await fetch(`${baseUrl}/api/members/${kodeAnggota}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`, // Jika butuh token
            },
        });

        if (!response.ok) {
            console.warn(`Gagal mengambil profil: ${response.statusText}`);
            return null;
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching member profile:", error);
        throw error;
    }
};
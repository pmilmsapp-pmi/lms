// frontend/hooks/useMemberData.ts
import { useState, useEffect } from 'react';
import { getProfilUser, Profil } from '@/lib/data/memberService'; // Pastikan path ini benar sesuai struktur folder
import { useAuth } from '@/lib/AuthProvider'; // Ganti path ini
export const useMemberData = () => {
    const { user } = useAuth();
    
    const [profil, setProfil] = useState<Profil | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // Jangan fetch jika user belum load atau tidak punya kode anggota
        // @ts-ignore: Abaikan jika typing user belum sempurna
        const kodeAnggota = user?.memberData?.kode_anggota || user?.username;

        if (!kodeAnggota) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getProfilUser(kodeAnggota);
                setProfil(data);
            } catch (err: any) {
                setError(err.message || 'Gagal memuat data profil');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    return { profil, loading, error };
};
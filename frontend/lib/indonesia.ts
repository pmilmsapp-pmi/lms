// humanis/frontend/lib/indonesia.ts

// Import langsung JSON local (Pastikan path ini sesuai dengan struktur folder Anda)
// Jika error "Cannot resolve", pastikan file json ada di folder 'data' sejajar dengan folder 'lib' atau 'app'
import regionData from '../data/indonesia_provinces_regencies.json';

export const getProvinces = () => {
    // Mengembalikan list provinsi dari JSON
    return regionData.provinces.map((p: any) => ({
        code: p.code,
        name: p.name
    }));
};

export const getRegencies = (provinceCode: string) => {
    // Mencari provinsi berdasarkan code, lalu ambil regencies-nya
    const province = regionData.provinces.find((p: any) => p.code === provinceCode);
    return province ? province.regencies : [];
};
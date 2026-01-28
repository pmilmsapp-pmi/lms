import { prisma } from '../lib/prisma'; // Koneksi Postgres
import { User } from '../models/User';   // Koneksi MongoDB

// Helper: Serialisasi BigInt agar tidak Error JSON
const serializeBigInt = (obj: any) => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
};

// Helper Mapping: Ubah Struktur Postgres Jadi Struktur Web Anda
const mapPostgresToWebStructure = (pgData: any) => {
    if (!pgData) return null;

    // [FIX] Cek keberadaan relasi sebelum akses (Optional Chaining)
    // Karena di schema saat ini relasi pmi/pmi_unit tidak terdeteksi langsung di pmi_anggota
    const unitName = pgData.pmi_unit?.nama || pgData.pmi?.nama || '';
    
    let gender = 'L';
    if (pgData.kelamin === 'P' || pgData.kelamin === 'Perempuan') gender = 'P';

    return {
        nia: pgData.kode_anggota || pgData.no_identitas,
        name: pgData.nama,
        email: pgData.email,
        phone: pgData.no_hp,
        unit: unitName,
        gender: gender,
        birthPlace: pgData.tempat_lahir,
        birthDate: pgData.tanggal_lahir,
        address: pgData.alamat || pgData.domisili_alamat,
        position: pgData.pekerjaan || 'Anggota',
        status: pgData.status_aktif ? 'Active' : 'Inactive',
        _raw: serializeBigInt(pgData) 
    };
};

export const findMemberHybrid = async (nia: string) => {
    let source = 'NONE';
    let data = null;
    let message = '';

    console.log(`\n=================================================`);
    console.log(`[HYBRID] 🔍 Memulai Pengecekan Anggota: ${nia}`);

    // ---------------------------------------------------------
    // SKENARIO 1: MODE UTAMA (KONEKSI KE POSTGRES / VPN NYALA)
    // ---------------------------------------------------------
    try {
        console.log(`[HYBRID] 🔌 Mencoba koneksi ke Postgres (Server Pusat)...`);
        
        const pgPromise = prisma.pmi_anggota.findFirst({
            where: {
                OR: [
                    { kode_anggota: nia },
                    { no_identitas: nia }
                ]
            },
            // [FIX ERROR 2353] 
            // Kita hapus include 'pmi_unit' dan 'pmi' karena tidak ada di schema pmi_anggota
            // Kita hanya include yang pasti ada di schema Anda (pmi_golongan_darah)
            include: {
                pmi_golongan_darah: true
            }
        });

        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Koneksi Timeout (3s)')), 3000)
        );

        const pgMember: any = await Promise.race([pgPromise, timeoutPromise]);

        if (pgMember) {
            console.log(`[HYBRID] ✅ SUKSES: Data ditemukan di Postgres (Mode Online).`);
            
            source = 'POSTGRES_LIVE';
            const mappedResult = mapPostgresToWebStructure(pgMember); // Simpan di var sementara

            // [FIX ERROR 18047] Pastikan data tidak null sebelum dipakai
            if (mappedResult) {
                data = mappedResult;
                message = 'Data Real-time dari Server Pusat.';

                // [AUTO-SYNC]
                console.log(`[HYBRID] 💾 Menyimpan cache ke MongoDB...`);
                await User.findOneAndUpdate(
                    { "memberData.nia": mappedResult.nia }, // Aman karena sudah dicek if(mappedResult)
                    { 
                        $set: { 
                            memberData: {
                                ...mappedResult,
                                lastSynced: new Date()
                            }
                        }
                    }
                );
            }
        } else {
            console.log(`[HYBRID] ❌ Postgres Terhubung, tapi data NIA tidak ditemukan.`);
        }

    } catch (error: any) {
        // Tangkap error timeout atau koneksi putus
        console.log(`[HYBRID] ⚠️ GAGAL KONEKSI POSTGRES: ${error.message}`);
        console.log(`[HYBRID] 🔄 Mengalihkan ke Mode Offline (MongoDB)...`);
    }

    // ---------------------------------------------------------
    // SKENARIO 2: MODE FALLBACK (VPN MATI / DATA TIDAK ADA DI PUSAT)
    // ---------------------------------------------------------
    if (!data) {
        console.log(`[HYBRID] 📂 Mencari di Cache Lokal (MongoDB)...`);
        
        const mongoUser = await User.findOne({ 
            $or: [
                { "memberData.nia": nia },
                { "memberData.ktp": nia },
                { "email": nia }
            ]
        }).select('memberData name email avatarUrl role');

        if (mongoUser && mongoUser.memberData) {
            console.log(`[HYBRID] ✅ SUKSES: Data ditemukan di MongoDB (Mode Offline).`);
            
            source = 'MONGODB_CACHE';
            data = mongoUser.memberData;
            
            if (!data.name) data.name = mongoUser.name;
            if (!data.email) data.email = mongoUser.email;

            message = 'Mode Offline (Data Cache/Import).';
        } else {
            console.log(`[HYBRID] ❌ GAGAL: Data tidak ditemukan di Cache Lokal.`);
        }
    }

    if (!data) {
        console.log(`[HYBRID] ⛔ HASIL AKHIR: Data Anggota Tidak Ditemukan.`);
        message = 'Anggota tidak ditemukan di Database Pusat maupun Lokal.';
    }

    console.log(`=================================================\n`);
    return { source, data, message };
};
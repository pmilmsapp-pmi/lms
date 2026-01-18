import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import csv from 'csv-parser'; 
import { User } from '../models/User';

dotenv.config();

// KONEKSI DB (Pastikan URI benar)
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

// --- HELPER 1: FORMAT TANGGAL ---
const excelDateToJSDate = (serial: number) => {
   if (!serial) return null;
   const utc_days  = Math.floor(serial - 25569);
   const utc_value = utc_days * 86400;                                        
   return new Date(utc_value * 1000);
}

// --- HELPER 2: FORMAT WILAYAH (FIX MASALAH CSV ANDA) ---
const formatRegionName = (name: string, type: 'province' | 'regency') => {
    if (!name) return '';
    let cleanName = name.trim().toUpperCase();

    if (type === 'regency') {
        // Jika sudah ada KAB/KOTA, biarkan. Jika belum, tambahkan KABUPATEN.
        // Asumsi default CSV Anda adalah Kabupaten (kecuali ada kata KOTA)
        if (cleanName.startsWith('KAB') || cleanName.startsWith('KOTA')) return cleanName;
        return `KABUPATEN ${cleanName}`; 
    }
    
    // Opsional: Format Provinsi jika perlu (biasanya backend simpan "JAWA TIMUR" saja sudah oke, 
    // tapi kalau mau "PROVINSI JAWA TIMUR" sesuaikan di sini).
    // if (type === 'province' && !cleanName.startsWith('PROVINSI')) return `PROVINSI ${cleanName}`;
    
    return cleanName;
}

const importData = async () => {
    try {
        console.log('⏳ Menghubungkan ke MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Terhubung!');

        const results: any[] = [];
        const filePath = 'data-ksr.csv';

        if (!fs.existsSync(filePath)) {
            console.error(`❌ File ${filePath} tidak ditemukan.`);
            process.exit(1);
        }

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: any) => results.push(data)) 
            .on('end', async () => {
                console.log(`📂 Memproses ${results.length} data...`);
                let successCount = 0;
                
                // Hash Password Default
                const defaultPassword = await bcrypt.hash('123456', 10); 

                for (const row of results) {
                    try {
                        if (!row.email || row.email === '-' || row.email === '') continue;

                        // Cek Duplikat (Hapus ini jika ingin update data existing)
                        const existingUser = await User.findOne({ email: row.email });
                        if (existingUser) {
                            console.log(`⚠️ Skip (Sudah ada): ${row.email}`);
                            continue; 
                        }

                        // --- FORMAT DATA BARU ---
                        const fixedRegency = formatRegionName(row.kabupaten, 'regency'); // Jadi "KABUPATEN SAMPANG"
                        const fixedProvince = formatRegionName(row.nama_provinsi, 'province');

                        const newUser = new User({
                            name: row.nama,
                            email: row.email,
                            password: defaultPassword,
                            role: 'STUDENT', 
                            memberType: 'KSR',
                            regionScope: 'national', 
                            
                            memberData: {
                                nia: row.noanggota,
                                unit: row.nama_unit,
                                gender: row.kelamin === 'Laki-Laki' ? 'L' : 'P',
                                birthPlace: row.tempat_lahir,
                                birthDate: row.tgl_lahir ? excelDateToJSDate(parseFloat(row.tgl_lahir)) : null,
                                
                                // DATA WILAYAH YANG SUDAH DIPERBAIKI
                                province: fixedProvince, 
                                regency: fixedRegency,      
                                
                                status: row.status,
                                bloodType: 'O',
                                address: `${fixedRegency}, ${fixedProvince}`,
                                phone: '08' // Placeholder agar tidak null
                            }
                        });

                        await newUser.save();
                        process.stdout.write('.');
                        successCount++;

                    } catch (err: any) {
                        console.error(`❌ Gagal: ${row.nama}`);
                    }
                }

                console.log(`\n🎉 SELESAI! ${successCount} user berhasil diimport.`);
                process.exit();
            });

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

importData();
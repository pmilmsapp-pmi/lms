// // // import { Request, Response } from 'express';
// // // import csv from 'csv-parser';
// // // import fs from 'fs';
// // // import { User } from '../models/User';
// // // import bcrypt from 'bcryptjs';

// // // // --- HELPER NORMALISASI ---
// // // const normalizeCityName = (rawName: string): string => {
// // //     if (!rawName) return '';
// // //     let clean = rawName.toUpperCase().trim();
// // //     clean = clean.replace(/\s+/g, ' ').replace(/^(KAB\.|KAB )/i, 'KABUPATEN ');
    
// // //     const knownCities = ["SURABAYA", "MALANG", "BATU", "PASURUAN", "PROBOLINGGO", "MOJOKERTO", "MADIUN", "KEDIRI", "BLITAR", "JAKARTA", "BOGOR", "DEPOK", "TANGERANG", "BEKASI", "BANDUNG", "CIREBON", "SUKABUMI", "TASIKMALAYA", "BANJAR", "CIMAHI", "SEMARANG", "SURAKARTA", "SALATIGA", "MAGELANG", "PEKALONGAN", "TEGAL", "YOGYAKARTA", "DENPASAR", "KUPANG", "MATARAM", "PONTIANAK", "SINGKAWANG", "BANJARMASIN", "BANJARBARU", "BALIKPAPAN", "SAMARINDA", "BONTANG", "TARAKAN", "MANADO", "BITUNG", "TOMOHON", "KOTAMOBAGU", "MAKASSAR", "PAREPARE", "PALOPO", "KENDARI", "BAUBAU", "GORONTALO", "AMBON", "TUAL", "TERNATE", "TIDORE", "JAYAPURA", "SORONG"];

// // //     if (clean.startsWith('KOTA ') || clean.startsWith('KABUPATEN ')) return clean;
// // //     if (knownCities.includes(clean)) return `KOTA ${clean}`;
    
// // //     return `KABUPATEN ${clean}`;
// // // };

// // // const parseDate = (dateVal: any): Date | null => {
// // //     if (!dateVal) return null;
// // //     if (!isNaN(dateVal) && String(dateVal).indexOf('-') === -1) {
// // //         return new Date(Math.round((Number(dateVal) - 25569) * 864e5));
// // //     }
// // //     const d = new Date(dateVal);
// // //     return isNaN(d.getTime()) ? null : d;
// // // };

// // // export const importMembersFromCSV = async (req: Request, res: Response) => {
// // //     if (!req.file) return res.status(400).json({ error: "File CSV wajib diupload" });

// // //     const filePath = req.file.path;
// // //     const results: any[] = [];
// // //     const errors: any[] = [];
// // //     let successCount = 0;
// // //     let updatedCount = 0;

// // //     const defaultPassword = await bcrypt.hash("123456", 10);

// // //     fs.createReadStream(filePath)
// // //         .pipe(csv())
// // //         .on('data', (data: any) => results.push(data))
// // //         .on('end', async () => {
// // //             try {
// // //                 for (const row of results) {
// // //                     try {
// // //                         const email = row['email'] || row['Email'] || row['EMAIL'] || '';
// // //                         const nama = row['nama'] || row['Nama'] || row['NAMA'] || '';
// // //                         if (!email || !nama) continue;

// // //                         const rawCity = row['kabupaten'] || row['Kabupaten'] || row['Kota'] || row['City'] || row['pmi'] || row['nama_pmi'] || row['tempat_lahir'] || '';
// // //                         const cleanCity = normalizeCityName(rawCity.replace(/^PMI\s+/i, '').replace(/^MARKAS\s+/i, ''));
// // //                         const cleanProv = (row['nama_provinsi'] || row['Provinsi'] || 'JAWA TIMUR').toUpperCase();
                        
// // //                         let memberType = 'KSR'; 
// // //                         if (row['jenis']) memberType = row['jenis'];
// // //                         else if (row['jenis_sdm']) memberType = 'Pegawai';
// // //                         else if (row['jabatan'] && row['jabatan'].trim() !== '') memberType = 'Pengurus';

// // //                         const memberDataPayload = {
// // //                             nia: row['noanggota'] || row['kodeanggota'] || row['kode'] || row['NIA'] || '',
// // //                             unit: row['nama_unit'] || row['unit'] || row['Unit'] || row['pmi'] || row['nama_pmi'] || '',
// // //                             phone: row['no_hp'] || row['no_telp'] || row['telp'] || '',
// // //                             position: row['jabatan'] || row['jenis_sdm'] || row['posisi'] || '',
// // //                             birthDate: parseDate(row['tgl_lahir'] || row['Tanggal Lahir']),
// // //                             birthPlace: row['tempat_lahir'] || row['Tempat Lahir'] || '',
// // //                             gender: row['kelamin'] || row['Jenis Kelamin'] || 'Laki-Laki',
// // //                             address: row['alamat'] || row['Alamat'] || '',
// // //                             periodStart: row['awal_periode'] || row['Awal Periode'] || '',
// // //                             periodEnd: row['akhir_periode'] || row['Akhir Periode'] || ''
// // //                         };

// // //                         const existingUser = await User.findOne({ email });

// // //                         if (existingUser) {
// // //                             // [FIX TYPESCRIPT] Cast ke 'any' agar properti memberData bisa diakses/ditulis
// // //                             const userObj = existingUser as any;

// // //                             userObj.name = nama;
// // //                             userObj.city = cleanCity;
// // //                             userObj.province = cleanProv;
// // //                             userObj.memberType = memberType;
                            
// // //                             // Merge memberData
// // //                             userObj.memberData = {
// // //                                 ...userObj.memberData,
// // //                                 ...memberDataPayload
// // //                             };
                            
// // //                             await existingUser.save();
// // //                             updatedCount++;
// // //                         } else {
// // //                             const newUser = new User({
// // //                                 name: nama,
// // //                                 email: email,
// // //                                 password: defaultPassword,
// // //                                 role: 'STUDENT', 
// // //                                 memberType: memberType,
// // //                                 city: cleanCity,
// // //                                 province: cleanProv,
// // //                                 status: 'active',
// // //                                 isVerified: true,
// // //                                 memberData: memberDataPayload,
// // //                                 managedProvinces: [],
// // //                                 managedRegencies: []
// // //                             });
// // //                             await newUser.save();
// // //                             successCount++;
// // //                         }

// // //                     } catch (rowErr: any) {
// // //                         errors.push(`Error ${row['email']}: ${rowErr.message}`);
// // //                     }
// // //                 }
// // //             } catch (err: any) {
// // //                 return res.status(500).json({ error: "Gagal memproses CSV" });
// // //             } finally {
// // //                 try { fs.unlinkSync(filePath); } catch (e) {}
                
// // //                 res.json({
// // //                     message: "Proses Selesai",
// // //                     created: successCount,
// // //                     updated: updatedCount,
// // //                     failed: errors.length,
// // //                     errors
// // //                 });
// // //             }
// // //         });
// // // };


// // import { Request, Response } from 'express';
// // import csv from 'csv-parser';
// // import fs from 'fs';
// // import { User } from '../models/User';
// // import bcrypt from 'bcryptjs';

// // // --- HELPER 1: FORMAT TANGGAL ---
// // const excelDateToJSDate = (serial: any) => {
// //    if (!serial) return null;
// //    // Format string
// //    if (typeof serial === 'string' && (serial.includes('-') || serial.includes('/'))) {
// //        const d = new Date(serial);
// //        return isNaN(d.getTime()) ? null : d;
// //    }
// //    // Format Excel Serial Number
// //    const num = parseFloat(serial);
// //    if (isNaN(num)) return null;
// //    const utc_days  = Math.floor(num - 25569);
// //    const utc_value = utc_days * 86400;                                           
// //    return new Date(utc_value * 1000);
// // }

// // // --- HELPER 2: FORMAT WILAYAH ---
// // const formatRegionName = (name: string, type: 'province' | 'regency') => {
// //     if (!name) return '';
// //     let cleanName = name.trim().toUpperCase();
// //     cleanName = cleanName.replace(/^PMI\s+/i, '').replace(/^MARKAS\s+/i, '');

// //     if (type === 'regency') {
// //         if (cleanName.startsWith('KAB') || cleanName.startsWith('KOTA')) return cleanName;
// //         const cities = ['SURABAYA', 'MALANG', 'BATU', 'KEDIRI', 'BLITAR', 'MADIUN', 'MOJOKERTO', 'PASURUAN', 'PROBOLINGGO'];
// //         if (cities.includes(cleanName)) return `KOTA ${cleanName}`;
// //         return `KABUPATEN ${cleanName}`; 
// //     }
// //     if (type === 'province') {
// //         if (!cleanName.includes('JAWA')) return cleanName; 
// //     }
// //     return cleanName;
// // }

// // export const importMembersFromCSV = async (req: Request, res: Response) => {
// //     if (!req.file) return res.status(400).json({ error: "File CSV wajib diupload" });

// //     const filePath = req.file.path;
    
// //     // Hash password sekali saja di awal
// //     const defaultPassword = await bcrypt.hash("123456", 10);

// //     // Gunakan Map untuk Dedupikasi data CSV (Jika ada email kembar di CSV, ambil yang terakhir)
// //     const processedRows = new Map<string, any>();

// //     fs.createReadStream(filePath)
// //         .pipe(csv())
// //         .on('data', (data: any) => {
// //             // Normalisasi Email ke Lowercase agar konsisten
// //             const email = (data.email || data.Email || data.EMAIL || '').trim().toLowerCase();
// //             const nama = data.nama || data.Nama || data.NAMA;

// //             // Hanya proses jika email & nama ada
// //             if (email && nama && email !== '-') {
// //                 processedRows.set(email, data); // Simpan/Timpa ke Map (Key: Email)
// //             }
// //         })
// //         .on('end', async () => {
// //             try {
// //                 if (processedRows.size === 0) {
// //                     return res.status(400).json({ error: "File CSV kosong atau format salah" });
// //                 }

// //                 const bulkOps: any[] = [];

// //                 // Loop dari Map yang sudah bersih (unik)
// //                 for (const [email, row] of processedRows.entries()) {
                    
// //                     const nama = row.nama || row.Nama || row.NAMA;

// //                     // Format Data
// //                     const fixedRegency = formatRegionName(row.kabupaten || row.Kabupaten || row.City || row.pmi || row.nama_pmi, 'regency');
// //                     const fixedProvince = formatRegionName(row.nama_provinsi || row.Provinsi || 'JAWA TIMUR', 'province');
// //                     const birthDate = excelDateToJSDate(row.tgl_lahir || row.Tgl_Lahir);

// //                     // Tipe Anggota
// //                     let mType = 'KSR';
// //                     if (row.jenis) mType = row.jenis;
// //                     else if (row.jenis_sdm) mType = 'Pegawai';
// //                     else if (row.jabatan) mType = 'Pengurus';

// //                     const memberDataPayload = {
// //                         nia: row.noanggota || row.nia || row.NIA || row.kode || row.kodeanggota,
// //                         unit: row.nama_unit || row.unit || row.Unit || row.pmi || row.nama_pmi,
// //                         gender: (row.kelamin === 'Laki-Laki' || row.kelamin === 'L') ? 'L' : 'P',
// //                         birthPlace: row.tempat_lahir || row.Tempat_Lahir,
// //                         birthDate: birthDate,
// //                         province: fixedProvince,
// //                         regency: fixedRegency,
// //                         status: row.status || 'Active',
// //                         address: row.alamat || `${fixedRegency}, ${fixedProvince}`,
// //                         phone: row.no_hp || row.phone || '-',
// //                         position: row.jabatan || row.jenis_sdm || '' 
// //                     };

// //                     // --- STRATEGI UPSERT (UPDATE OR INSERT) ---
// //                     bulkOps.push({
// //                         updateOne: {
// //                             filter: { email: email }, // Cari berdasarkan email
// //                             update: {
// //                                 // 1. $set: Update data ini baik user lama maupun baru (DITIBAN)
// //                                 $set: {
// //                                     name: nama,
// //                                     city: fixedRegency,
// //                                     province: fixedProvince,
// //                                     memberType: mType, // Update tipe anggota
// //                                     // Update detail memberData
// //                                     "memberData.nia": memberDataPayload.nia,
// //                                     "memberData.unit": memberDataPayload.unit,
// //                                     "memberData.gender": memberDataPayload.gender,
// //                                     "memberData.birthPlace": memberDataPayload.birthPlace,
// //                                     "memberData.birthDate": memberDataPayload.birthDate,
// //                                     "memberData.phone": memberDataPayload.phone,
// //                                     "memberData.position": memberDataPayload.position,
// //                                     "memberData.address": memberDataPayload.address,
// //                                     "memberData.status": memberDataPayload.status,
// //                                 },
// //                                 // 2. $setOnInsert: Hanya set ini jika user BARU dibuat (JANGAN TIMPA yang lama)
// //                                 $setOnInsert: {
// //                                     email: email, // Email wajib set saat insert
// //                                     password: defaultPassword, // Password default hanya untuk user baru
// //                                     role: 'STUDENT', // Default role student, jangan ubah Admin jadi Student
// //                                     regionScope: 'national',
// //                                     isVerified: true,
// //                                     permissions: [],
// //                                     managedProvinces: [],
// //                                     managedRegencies: []
// //                                 }
// //                             },
// //                             upsert: true // PENTING: Buat baru jika tidak ada
// //                         }
// //                     });
// //                 }

// //                 // Eksekusi Bulk Operations
// //                 if (bulkOps.length > 0) {
// //                     const result = await User.bulkWrite(bulkOps);
                    
// //                     res.json({
// //                         message: "Import Selesai (Upsert Strategy)",
// //                         matched: result.matchedCount, // Jumlah user lama yang ditemukan
// //                         modified: result.modifiedCount, // Jumlah user lama yang diedit
// //                         upserted: result.upsertedCount, // Jumlah user baru yang dibuat
// //                         total: processedRows.size
// //                     });
// //                 } else {
// //                     res.json({ message: "Tidak ada data yang diproses." });
// //                 }

// //             } catch (err: any) {
// //                 console.error("Import Error:", err);
// //                 // Cek error duplicate key spesifik (seharusnya tidak muncul lagi karena upsert)
// //                 if (err.code === 11000) {
// //                     return res.status(400).json({ error: "Terdeteksi duplikat data yang tidak bisa di-merge otomatis. Cek CSV Anda." });
// //                 }
// //                 return res.status(500).json({ error: "Gagal memproses data: " + err.message });
// //             } finally {
// //                 try { fs.unlinkSync(filePath); } catch (e) {}
// //             }
// //         });
// // };


// import { Request, Response } from 'express';
// import csv from 'csv-parser';
// import fs from 'fs';
// import { User } from '../models/User';
// import bcrypt from 'bcryptjs';

// // --- HELPER 1: FORMAT TANGGAL ---
// const excelDateToJSDate = (serial: any) => {
//    if (!serial) return null;
//    if (typeof serial === 'string' && (serial.includes('-') || serial.includes('/'))) {
//        const d = new Date(serial);
//        return isNaN(d.getTime()) ? null : d;
//    }
//    const num = parseFloat(serial);
//    if (isNaN(num)) return null;
//    const utc_days  = Math.floor(num - 25569);
//    const utc_value = utc_days * 86400;                                           
//    return new Date(utc_value * 1000);
// }

// // --- HELPER 2: FORMAT WILAYAH (UPDATED) ---
// const formatRegionName = (name: string, type: 'province' | 'regency') => {
//     if (!name) return '';
//     let cleanName = name.trim().toUpperCase();
    
//     // Bersihkan prefix umum
//     cleanName = cleanName.replace(/^PMI\s+/i, '').replace(/^MARKAS\s+/i, '');

//     if (type === 'regency') {
//         // [FIX UTAMA] Standarisasi "KAB." atau "KAB " menjadi "KABUPATEN "
//         // Regex ini mencari awalan "KAB" diikuti titik opsional dan spasi
//         if (cleanName.startsWith('KAB.') || cleanName.startsWith('KAB ')) {
//              cleanName = cleanName.replace(/^KAB\.?\s+/, 'KABUPATEN ');
//         }

//         // Jika sudah benar (KABUPATEN atau KOTA), kembalikan
//         if (cleanName.startsWith('KABUPATEN') || cleanName.startsWith('KOTA')) return cleanName;

//         // Cek Kota Otonom (tambah list jika kurang)
//         const cities = ['SURABAYA', 'MALANG', 'BATU', 'KEDIRI', 'BLITAR', 'MADIUN', 'MOJOKERTO', 'PASURUAN', 'PROBOLINGGO'];
//         if (cities.includes(cleanName)) return `KOTA ${cleanName}`;
        
//         // Default: Tambah KABUPATEN
//         return `KABUPATEN ${cleanName}`; 
//     }
    
//     if (type === 'province') {
//         // Fix kode angka provinsi (contoh: 35 -> JAWA TIMUR)
//         if (cleanName === '35') return 'JAWA TIMUR';
//         if (cleanName === '31') return 'DKI JAKARTA';
//         if (cleanName === '32') return 'JAWA BARAT';
//         if (cleanName === '33') return 'JAWA TENGAH';
        
//         if (!cleanName.includes('JAWA') && !cleanName.includes('DKI') && !cleanName.includes('DI ')) return cleanName; 
//     }
//     return cleanName;
// }

// export const importMembersFromCSV = async (req: Request, res: Response) => {
//     if (!req.file) return res.status(400).json({ error: "File CSV wajib diupload" });

//     const filePath = req.file.path;
//     const defaultPassword = await bcrypt.hash("123456", 10);
//     const processedRows = new Map<string, any>();

//     fs.createReadStream(filePath)
//         .pipe(csv())
//         .on('data', (data: any) => {
//             const email = (data.email || data.Email || data.EMAIL || '').trim().toLowerCase();
//             const nama = data.nama || data.Nama || data.NAMA;
//             if (email && nama && email !== '-') {
//                 processedRows.set(email, data);
//             }
//         })
//         .on('end', async () => {
//             try {
//                 if (processedRows.size === 0) return res.status(400).json({ error: "File CSV kosong/salah." });

//                 const bulkOps: any[] = [];

//                 for (const [email, row] of processedRows.entries()) {
//                     const nama = row.nama || row.Nama || row.NAMA;

//                     // Gunakan Helper Baru
//                     const fixedRegency = formatRegionName(row.kabupaten || row.Kabupaten || row.City || row.pmi || row.nama_pmi, 'regency');
//                     const fixedProvince = formatRegionName(row.nama_provinsi || row.Provinsi || 'JAWA TIMUR', 'province');
//                     const birthDate = excelDateToJSDate(row.tgl_lahir || row.Tgl_Lahir);

//                     let mType = 'KSR';
//                     if (row.jenis) mType = row.jenis;
//                     else if (row.jenis_sdm) mType = 'Pegawai';
//                     else if (row.jabatan) mType = 'Pengurus';

//                     const memberDataPayload = {
//                         nia: row.noanggota || row.nia || row.NIA || row.kode || row.kodeanggota,
//                         unit: row.nama_unit || row.unit || row.Unit || row.pmi || row.nama_pmi,
//                         gender: (row.kelamin === 'Laki-Laki' || row.kelamin === 'L') ? 'L' : 'P',
//                         birthPlace: row.tempat_lahir || row.Tempat_Lahir,
//                         birthDate: birthDate,
//                         province: fixedProvince,
//                         regency: fixedRegency,
//                         status: row.status || 'Active',
//                         address: row.alamat || `${fixedRegency}, ${fixedProvince}`,
//                         phone: row.no_hp || row.phone || '-',
//                         position: row.jabatan || row.jenis_sdm || '' 
//                     };

//                     bulkOps.push({
//                         updateOne: {
//                             filter: { email: email },
//                             update: {
//                                 $set: {
//                                     name: nama,
//                                     city: fixedRegency, // <--- Ini akan mengupdate KAB. jadi KABUPATEN
//                                     province: fixedProvince,
//                                     memberType: mType,
//                                     "memberData.nia": memberDataPayload.nia,
//                                     "memberData.unit": memberDataPayload.unit,
//                                     "memberData.regency": memberDataPayload.regency, // Update juga di memberData
//                                     "memberData.province": memberDataPayload.province,
//                                     "memberData.gender": memberDataPayload.gender,
//                                     "memberData.birthPlace": memberDataPayload.birthPlace,
//                                     "memberData.birthDate": memberDataPayload.birthDate,
//                                     "memberData.phone": memberDataPayload.phone,
//                                     "memberData.position": memberDataPayload.position,
//                                     "memberData.address": memberDataPayload.address,
//                                 },
//                                 $setOnInsert: {
//                                     email: email, 
//                                     password: defaultPassword, 
//                                     role: 'STUDENT', 
//                                     regionScope: 'national',
//                                     isVerified: true,
//                                     permissions: [],
//                                     managedProvinces: [],
//                                     managedRegencies: []
//                                 }
//                             },
//                             upsert: true
//                         }
//                     });
//                 }

//                 if (bulkOps.length > 0) {
//                     const result = await User.bulkWrite(bulkOps);
//                     res.json({
//                         message: "Import Selesai",
//                         matched: result.matchedCount, 
//                         modified: result.modifiedCount,
//                         upserted: result.upsertedCount,
//                         total: processedRows.size
//                     });
//                 } else {
//                     res.json({ message: "Tidak ada data." });
//                 }

//             } catch (err: any) {
//                 console.error("Import Error:", err);
//                 res.status(500).json({ error: "Gagal: " + err.message });
//             } finally {
//                 try { fs.unlinkSync(filePath); } catch (e) {}
//             }
//         });
// };


import { Request, Response } from 'express';
import csv from 'csv-parser';
import fs from 'fs';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

// --- HELPER 1: FORMAT TANGGAL ---
const excelDateToJSDate = (serial: any) => {
   if (!serial) return null;
   if (typeof serial === 'string' && (serial.includes('-') || serial.includes('/'))) {
       const d = new Date(serial);
       return isNaN(d.getTime()) ? null : d;
   }
   const num = parseFloat(serial);
   if (isNaN(num)) return null;
   const utc_days  = Math.floor(num - 25569);
   const utc_value = utc_days * 86400;                                      
   return new Date(utc_value * 1000);
}

// --- HELPER 2: FORMAT WILAYAH (UPDATED) ---
const formatRegionName = (name: string, type: 'province' | 'regency') => {
    if (!name) return '';
    let cleanName = name.trim().toUpperCase();
    
    // Bersihkan prefix umum
    cleanName = cleanName.replace(/^PMI\s+/i, '').replace(/^MARKAS\s+/i, '');

    if (type === 'regency') {
        // [FIX UTAMA] Standarisasi "KAB." atau "KAB " menjadi "KABUPATEN "
        if (cleanName.startsWith('KAB.') || cleanName.startsWith('KAB ')) {
             cleanName = cleanName.replace(/^KAB\.?\s+/, 'KABUPATEN ');
        }

        // Jika sudah benar (KABUPATEN atau KOTA), kembalikan
        if (cleanName.startsWith('KABUPATEN') || cleanName.startsWith('KOTA')) return cleanName;

        // Cek Kota Otonom (tambah list jika kurang)
        const cities = ['SURABAYA', 'MALANG', 'BATU', 'KEDIRI', 'BLITAR', 'MADIUN', 'MOJOKERTO', 'PASURUAN', 'PROBOLINGGO', 'BANDUNG', 'BOGOR', 'BEKASI', 'DEPOK', 'CIMAHI', 'CIREBON', 'SUKABUMI', 'TASIKMALAYA', 'BANJAR', 'JAKARTA PUSAT', 'JAKARTA UTARA', 'JAKARTA BARAT', 'JAKARTA SELATAN', 'JAKARTA TIMUR'];
        
        // Cek apakah ini nama kota
        const isCity = cities.some(c => cleanName === c || cleanName === `KOTA ${c}`);
        if (isCity && !cleanName.startsWith('KOTA')) return `KOTA ${cleanName}`;
        
        // Default: Tambah KABUPATEN
        return `KABUPATEN ${cleanName}`; 
    }
    
    if (type === 'province') {
        // Fix kode angka provinsi (contoh: 35 -> JAWA TIMUR)
        if (cleanName === '35') return 'JAWA TIMUR';
        if (cleanName === '31') return 'DKI JAKARTA';
        if (cleanName === '32') return 'JAWA BARAT';
        if (cleanName === '33') return 'JAWA TENGAH';
        if (cleanName === '34') return 'DAERAH ISTIMEWA YOGYAKARTA';
        if (cleanName === '36') return 'BANTEN';
        if (cleanName === '51') return 'BALI';
        
        if (!cleanName.includes('JAWA') && !cleanName.includes('DKI') && !cleanName.includes('DI ') && !cleanName.includes('SUMATERA') && !cleanName.includes('KALIMANTAN') && !cleanName.includes('SULAWESI')) return cleanName; 
    }
    return cleanName;
}

export const importMembersFromCSV = async (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ error: "File CSV wajib diupload" });

    const filePath = req.file.path;
    const defaultPassword = await bcrypt.hash("123456", 10);
    const processedRows = new Map<string, any>();

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: any) => {
            // Normalisasi key
            const keys = Object.keys(data);
            const row: any = {};
            keys.forEach(k => row[k.toLowerCase()] = data[k]);

            const email = (row.email || '').trim().toLowerCase();
            const nama = row.nama;
            if (email && nama && email !== '-') {
                processedRows.set(email, row);
            }
        })
        .on('end', async () => {
            try {
                if (processedRows.size === 0) return res.status(400).json({ error: "File CSV kosong/salah." });

                const bulkOps: any[] = [];

                for (const [email, row] of processedRows.entries()) {
                    const nama = row.nama;

                    // 1. Format Wilayah
                    // Mapping kolom CSV ke variabel (Sesuaikan key jika CSV beda header)
                    const rawRegency = row.kabupaten || row.city || row.pmi || row.nama_pmi || row.nama_kabupaten;
                    const rawProvince = row.nama_provinsi || row.provinsi || row.province || row.id_provinsi || 'JAWA TIMUR'; // Default Jatim jika kosong

                    const fixedRegency = formatRegionName(rawRegency, 'regency');
                    const fixedProvince = formatRegionName(rawProvince, 'province');
                    const birthDate = excelDateToJSDate(row.tgl_lahir || row.birthdate);

                    // 2. Tentukan Tipe
                    let mType = 'KSR';
                    if (row.jenis) mType = row.jenis;
                    else if (row.jenis_sdm) mType = 'Pegawai';
                    else if (row.jabatan) mType = 'Pengurus';

                    // 3. HITUNG SCOPE (WAJIB UPDATE UNTUK USER LAMA JUGA)
                    let calculatedScope = 'national';
                    let managedProvinces: string[] = [];
                    let managedRegencies: string[] = [];

                    if (fixedRegency) {
                        calculatedScope = 'regency';
                        managedRegencies.push(fixedRegency);
                        // Jika regency ada, province otomatis jadi parent scope
                        if(fixedProvince) managedProvinces.push(fixedProvince);
                    } else if (fixedProvince) {
                        calculatedScope = 'province';
                        managedProvinces.push(fixedProvince);
                    }

                    // 4. Siapkan Data Profil
                    const memberDataPayload = {
                        nia: row.noanggota || row.nia || row.kode || '',
                        unit: row.nama_unit || row.unit || row.pmi || '',
                        gender: (row.kelamin === 'Laki-Laki' || row.kelamin === 'L') ? 'L' : 'P',
                        birthPlace: row.tempat_lahir || '',
                        birthDate: birthDate,
                        province: fixedProvince,
                        regency: fixedRegency,
                        status: row.status || 'Active',
                        address: row.alamat || `${fixedRegency}, ${fixedProvince}`,
                        phone: row.no_hp || row.phone || '-',
                        position: row.jabatan || row.jenis_sdm || '' 
                    };

                    bulkOps.push({
                        updateOne: {
                            filter: { email: email },
                            update: {
                                // [PENTING] $set AKAN MENIMPA DATA USER LAMA
                                $set: {
                                    name: nama,
                                    city: fixedRegency, 
                                    province: fixedProvince,
                                    memberType: mType,
                                    
                                    // [PERUBAHAN UTAMA]
                                    // Kita pindahkan logika Scope ke $set agar User Lama ikut terupdate
                                    // Rita (National) -> akan menjadi (Province/Regency) sesuai CSV
                                    regionScope: calculatedScope, 
                                    managedProvinces: managedProvinces, 
                                    managedRegencies: managedRegencies,

                                    // Update detail member
                                    "memberData.nia": memberDataPayload.nia,
                                    "memberData.unit": memberDataPayload.unit,
                                    "memberData.regency": memberDataPayload.regency,
                                    "memberData.province": memberDataPayload.province,
                                    "memberData.gender": memberDataPayload.gender,
                                    "memberData.birthPlace": memberDataPayload.birthPlace,
                                    "memberData.birthDate": memberDataPayload.birthDate,
                                    "memberData.phone": memberDataPayload.phone,
                                    "memberData.position": memberDataPayload.position,
                                    "memberData.address": memberDataPayload.address,
                                },
                                // $setOnInsert HANYA JALAN JIKA USER BARU
                                // Password & Role tidak akan kereset jika user sudah ada
                                $setOnInsert: {
                                    email: email, 
                                    password: defaultPassword, 
                                    role: 'STUDENT', // Default role user baru
                                    isVerified: true,
                                    permissions: [],
                                }
                            },
                            upsert: true
                        }
                    });
                }

                if (bulkOps.length > 0) {
                    const result = await User.bulkWrite(bulkOps);
                    res.json({
                        message: "Import Selesai",
                        matched: result.matchedCount, 
                        modified: result.modifiedCount,
                        upserted: result.upsertedCount,
                        total: processedRows.size
                    });
                } else {
                    res.json({ message: "Tidak ada data." });
                }

            } catch (err: any) {
                console.error("Import Error:", err);
                res.status(500).json({ error: "Gagal: " + err.message });
            } finally {
                try { fs.unlinkSync(filePath); } catch (e) {}
            }
        });
};
// 'use client';

// import { useState } from 'react';
// import { api } from '@/lib/api';
// import Protected from '@/components/Protected';
// import { Upload, FileText, CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
// import Link from 'next/link';
// import axios from 'axios';

// // URL BACKEND (Sesuaikan Port)
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// export default function ImportMembersPage() {
//     const [file, setFile] = useState<File | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState<any>(null);

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) setFile(e.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!file) return alert("Pilih file CSV dulu!");
//         setLoading(true);
//         setResult(null);

//         const fd = new FormData();
//         fd.append('file', file);

//         try {
//             // Ambil token manual
//             const userStr = localStorage.getItem('user');
//             const token = userStr ? JSON.parse(userStr).token : '';

//             // Gunakan Axios langsung untuk upload file (lebih stabil utk multipart)
//             const res = await axios.post(`${API_BASE_URL}/api/users/import`, fd, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             setResult(res.data);
//         } catch (err: any) {
//             console.error(err);
//             alert("Gagal Import: " + (err.response?.data?.error || err.message));
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Protected>
//             <div className="max-w-4xl mx-auto p-6 font-sans min-h-screen">
                
//                 {/* Header */}
//                 <div className="flex items-center gap-4 mb-8">
//                     <Link href="/admin/members" className="p-2 bg-white border rounded-lg hover:bg-gray-50">
//                         <ArrowLeft size={20}/>
//                     </Link>
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-900">Import Anggota CSV</h1>
//                         <p className="text-gray-500 text-sm">Upload data anggota dari database lama (PostgreSQL)</p>
//                     </div>
//                 </div>

//                 {/* Upload Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
//                     <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Upload size={32}/>
//                     </div>
                    
//                     <h3 className="text-lg font-bold text-gray-800 mb-2">Upload File CSV</h3>
//                     <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
//                         Format kolom yang didukung: <b>Email, Nama, NIA/Kode, Unit/PMI, Kabupaten/Kota, Jenis</b>. 
//                         Sistem otomatis mendeteksi tipe anggota.
//                     </p>

//                     <div className="flex justify-center items-center gap-4 mb-6">
//                         <label className="cursor-pointer">
//                             <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
//                             <div className="px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center gap-2 text-gray-600 font-medium">
//                                 <FileText size={20}/>
//                                 {file ? file.name : "Pilih File CSV..."}
//                             </div>
//                         </label>
//                     </div>

//                     <button 
//                         onClick={handleUpload} 
//                         disabled={!file || loading}
//                         className="px-8 py-3 bg-[#990000] text-white rounded-lg font-bold hover:bg-[#7f0000] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
//                     >
//                         {loading ? <Loader2 className="animate-spin"/> : <Upload size={20}/>}
//                         {loading ? "Memproses Data..." : "Mulai Import"}
//                     </button>
//                 </div>

//                 {/* Result Section */}
//                 {result && (
//                     <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-4">
//                                 <div className="p-3 bg-green-100 rounded-full text-green-700"><CheckCircle size={24}/></div>
//                                 <div>
//                                     <p className="text-sm font-bold text-green-800">Berhasil Disimpan</p>
//                                     <p className="text-2xl font-black text-green-900">{result.successCount} Data</p>
//                                 </div>
//                             </div>
//                             <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-4">
//                                 <div className="p-3 bg-red-100 rounded-full text-red-700"><AlertCircle size={24}/></div>
//                                 <div>
//                                     <p className="text-sm font-bold text-red-800">Gagal / Skip</p>
//                                     <p className="text-2xl font-black text-red-900">{result.failedCount} Data</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Error Logs */}
//                         {result.errors.length > 0 && (
//                             <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 max-h-60 overflow-y-auto">
//                                 <h4 className="font-bold text-gray-700 mb-2 text-sm sticky top-0 bg-gray-50">Log Error:</h4>
//                                 <ul className="space-y-1">
//                                     {result.errors.map((err: string, idx: number) => (
//                                         <li key={idx} className="text-xs text-red-600 font-mono border-b border-gray-100 pb-1 last:border-0">
//                                             • {err}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 )}

//             </div>
//         </Protected>
//     );
// }



'use client';

import { useState } from 'react';
import Protected from '@/components/Protected';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

// URL BACKEND (Pastikan portnya benar)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function ImportMembersPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Pilih file CSV dulu!");
        
        setLoading(true);
        setResult(null);

        const fd = new FormData();
        fd.append('file', file);

        try {
            // [FIX TOKEN] Ambil token secara manual dari localStorage
            let token = '';
            if (typeof window !== 'undefined') {
                token = localStorage.getItem('token') || '';
            }

            if (!token) {
                throw new Error("Sesi habis. Silakan login ulang.");
            }

            // Kirim ke endpoint backend
            const res = await axios.post(`${API_BASE_URL}/api/import/members`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Wajib ada untuk lolos middleware requireAuth
                }
            });

            setResult(res.data);
        } catch (err: any) {
            console.error(err);
            const msg = err.response?.data?.error || err.message || "Gagal menghubungi server";
            alert("Gagal Import: " + msg);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi Reset untuk upload lagi
    const handleReset = () => {
        setFile(null);
        setResult(null);
    };

    return (
        <Protected>
            <div className="max-w-4xl mx-auto p-6 font-sans min-h-screen">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/users" className="p-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
                        <ArrowLeft size={20}/>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Import Anggota CSV</h1>
                        <p className="text-gray-500 text-sm">Upload data KSR, TSR, PMR, atau Pegawai.</p>
                    </div>
                </div>

                {/* Upload Card - Hanya Tampil Jika Belum Ada Hasil */}
                {!result ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center animate-in fade-in zoom-in-95">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload size={32}/>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Upload File CSV</h3>
                        <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                            Sistem otomatis mendeteksi format tanggal Excel dan menstandarisasi nama Kabupaten (Contoh: "SAMPANG" menjadi "KABUPATEN SAMPANG").
                        </p>

                        <div className="flex justify-center items-center gap-4 mb-6">
                            <label className="cursor-pointer group">
                                <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
                                <div className="px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl group-hover:border-blue-500 group-hover:bg-blue-50 transition-colors flex items-center gap-2 text-gray-600 font-medium">
                                    <FileText size={20} className="group-hover:text-blue-600"/>
                                    {file ? <span className="text-blue-600">{file.name}</span> : "Pilih File CSV..."}
                                </div>
                            </label>
                        </div>

                        <button 
                            onClick={handleUpload} 
                            disabled={!file || loading}
                            className="px-8 py-3 bg-[#990000] text-white rounded-lg font-bold hover:bg-[#7f0000] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto shadow-lg shadow-red-100 transition-all active:scale-95"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20}/> : <Upload size={20}/>}
                            {loading ? "Memproses Data..." : "Mulai Import"}
                        </button>
                    </div>
                ) : (
                    /* Result Section (Tampil setelah upload sukses) */
                    <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        
                        <div className="text-center mb-6">
                            <div className="inline-flex p-3 bg-green-100 text-green-700 rounded-full mb-3">
                                <CheckCircle size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Proses Selesai!</h2>
                            <p className="text-gray-500">Data telah berhasil diproses ke database.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* KOTAK HIJAU: User Baru (Upserted) */}
                            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                                <div className="p-3 bg-green-100 rounded-full text-green-700 mb-3"><CheckCircle size={24}/></div>
                                <p className="text-xs font-bold text-green-800 uppercase tracking-wider mb-1">Baru Dibuat</p>
                                {/* Menggunakan data upserted dari backend baru */}
                                <p className="text-4xl font-black text-green-900">
                                    {result.upserted || result.upsertedCount || result.created || 0}
                                </p>
                            </div>

                            {/* KOTAK BIRU: User Lama (Modified) */}
                            <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                                <div className="p-3 bg-blue-100 rounded-full text-blue-700 mb-3"><FileText size={24}/></div>
                                <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">Diperbarui</p>
                                {/* Menggunakan data modified dari backend baru */}
                                <p className="text-4xl font-black text-blue-900">
                                    {result.modified || result.modifiedCount || result.updated || 0}
                                </p>
                            </div>

                            {/* KOTAK MERAH: Gagal */}
                            <div className="bg-red-50 border border-red-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                                <div className="p-3 bg-red-100 rounded-full text-red-700 mb-3"><AlertCircle size={24}/></div>
                                <p className="text-xs font-bold text-red-800 uppercase tracking-wider mb-1">Gagal / Skip</p>
                                <p className="text-4xl font-black text-red-900">
                                    {result.failed || (result.errors ? result.errors.length : 0)}
                                </p>
                            </div>
                        </div>

                        {/* Error Logs (Jika Ada) */}
                        {result.errors && result.errors.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                                    <AlertCircle size={18}/> Detail Error ({result.errors.length})
                                </h4>
                                <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto border border-gray-100">
                                    <ul className="space-y-2">
                                        {result.errors.map((err: string, idx: number) => (
                                            <li key={idx} className="text-xs text-gray-600 font-mono border-b border-gray-200 pb-2 last:border-0">
                                                • {err}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Tombol Reset */}
                        <div className="flex justify-center pt-4">
                             <button 
                                onClick={handleReset}
                                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all flex items-center gap-2 shadow-lg"
                             >
                                <RefreshCw size={18}/> Upload File Lain
                             </button>
                        </div>
                    </div>
                )}
            </div>
        </Protected>
    );
}
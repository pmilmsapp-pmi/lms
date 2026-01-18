// 'use client';

// import { useState, useEffect } from 'react';
// import { api } from '@/lib/api';
// import Protected from '@/components/Protected';
// import { 
//     Database, RefreshCw, CloudLightning, Download, 
//     CheckCircle, XCircle, Archive, Server, HardDrive 
// } from 'lucide-react';

// export default function DatabaseCenterPage() {
//   // State untuk Data Log
//   const [syncLogs, setSyncLogs] = useState<any[]>([]);
//   const [backupLogs, setBackupLogs] = useState<any[]>([]);
  
//   // State Loading
//   const [loading, setLoading] = useState(false);
//   const [isSyncing, setIsSyncing] = useState(false);
//   const [isBackingUp, setIsBackingUp] = useState(false);

//   // Load History saat halaman dibuka
//   useEffect(() => { 
//       fetchAllHistory(); 
//   }, []);

//   const fetchAllHistory = async () => {
//       setLoading(true);
//       try {
//           // Panggil 2 API history sekaligus
//           const [resSync, resBackup] = await Promise.all([
//               api('/api/admin/sync/history').catch(() => ({ logs: [] })),
//               api('/api/admin/backup/history').catch(() => ({ logs: [] }))
//           ]);
//           setSyncLogs(resSync.logs || []);
//           setBackupLogs(resBackup.logs || []);
//       } catch (e) { console.error(e); } 
//       finally { setLoading(false); }
//   };

//   // --- HANDLER: LIVE SYNC (DATABASE) ---
//   const handleSync = async () => {
//       if(!confirm("Mulai Replikasi Database?\nData MongoDB akan disalin ke Tabel Supabase (PostgreSQL).")) return;
//       setIsSyncing(true);
//       try {
//           const res = await api('/api/admin/sync/trigger', { method: 'POST' });
//           alert(res.message || "Sinkronisasi Berhasil!");
//           fetchAllHistory();
//       } catch (e: any) {
//           alert("Gagal Sync: " + e.message);
//       } finally {
//           setIsSyncing(false);
//       }
//   };

//   // --- HANDLER: BACKUP ZIP (FILE) ---
//   const handleBackupZip = async () => {
//       if(!confirm("Buat Full Backup ZIP?\nSistem akan membuat file .zip dan menguploadnya ke Supabase Storage.")) return;
//       setIsBackingUp(true);
//       try {
//           const res = await api('/api/admin/backup/trigger', { method: 'POST' });
//           alert("Backup ZIP Berhasil! File tersimpan di Storage.");
//           fetchAllHistory();
//       } catch (e: any) {
//           alert("Gagal Backup: " + e.message);
//       } finally {
//           setIsBackingUp(false);
//       }
//   };

//   const formatSize = (bytes: number) => {
//     if (!bytes) return '0 B';
//     const k = 1024;
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <Protected roles={['SUPER_ADMIN']}>
//       <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
        
//         <div className="mb-8 flex justify-between items-center">
//             <div>
//                 <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//                     <Database className="text-gray-700"/> Database Center
//                 </h1>
//                 <p className="text-gray-500 text-sm mt-1">
//                     Pusat kendali replikasi data dan backup arsip (Disaster Recovery).
//                 </p>
//             </div>
//             <button onClick={fetchAllHistory} className="text-sm font-bold text-blue-600 hover:underline">
//                 Refresh Data
//             </button>
//         </div>

//         {/* --- CONTROL PANELS --- */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            
//             {/* PANEL 1: LIVE SYNC (HIJAU) */}
//             <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-xl shadow-green-100/50 flex flex-col">
//                 <div className="flex items-center gap-3 mb-4">
//                     <div className="p-3 bg-green-50 text-green-600 rounded-xl"><RefreshCw size={24}/></div>
//                     <div>
//                         <h3 className="font-bold text-gray-800 text-lg">Live Sync</h3>
//                         <p className="text-xs text-gray-400">Mongo JSON ➔ Postgres Table</p>
//                     </div>
//                 </div>
//                 <p className="text-sm text-gray-500 mb-6 flex-1">
//                     Menyalin data User, Course, Enrollment secara real-time ke struktur tabel SQL di Supabase agar mudah di-query.
//                 </p>
//                 <button 
//                     onClick={handleSync} 
//                     disabled={isSyncing}
//                     className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
//                 >
//                     {isSyncing ? <RefreshCw className="animate-spin"/> : <Server size={20}/>}
//                     {isSyncing ? 'Sedang Menyalin...' : 'Mulai Sinkronisasi'}
//                 </button>
//             </div>

//             {/* PANEL 2: BACKUP ZIP (BIRU) */}
//             <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-xl shadow-blue-100/50 flex flex-col">
//                 <div className="flex items-center gap-3 mb-4">
//                     <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Archive size={24}/></div>
//                     <div>
//                         <h3 className="font-bold text-gray-800 text-lg">Backup Arsip (ZIP)</h3>
//                         <p className="text-xs text-gray-400">Mongo Dump ➔ Storage Bucket</p>
//                     </div>
//                 </div>
//                 <p className="text-sm text-gray-500 mb-6 flex-1">
//                     Membungkus seluruh database menjadi satu file <strong>.zip</strong> dan menyimpannya di Supabase Storage sebagai "Cold Backup".
//                 </p>
//                 <button 
//                     onClick={handleBackupZip} 
//                     disabled={isBackingUp}
//                     className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
//                 >
//                     {isBackingUp ? <RefreshCw className="animate-spin"/> : <HardDrive size={20}/>}
//                     {isBackingUp ? 'Membuat ZIP...' : 'Buat Backup ZIP'}
//                 </button>
//             </div>
//         </div>

//         {/* --- LOG TABLES --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
//             {/* TABEL LOG SYNC */}
//             <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
//                 <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
//                     <h3 className="font-bold text-gray-700 text-sm">Riwayat Live Sync</h3>
//                     <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">{syncLogs.length} Data</span>
//                 </div>
//                 <div className="overflow-x-auto max-h-[400px]">
//                     <table className="w-full text-left text-xs">
//                         <thead className="bg-gray-50 text-gray-400 uppercase">
//                             <tr><th className="px-4 py-3">Waktu</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Pesan</th></tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-50">
//                             {syncLogs.length === 0 ? <tr><td colSpan={3} className="p-4 text-center text-gray-400">Kosong</td></tr> : syncLogs.map((log: any) => (
//                                 <tr key={log.id} className="hover:bg-gray-50">
//                                     <td className="px-4 py-3 font-medium">{new Date(log.created_at).toLocaleString()}</td>
//                                     <td className="px-4 py-3">{log.status === 'success' ? <span className="text-green-600 flex items-center gap-1"><CheckCircle size={10}/> OK</span> : <span className="text-red-500 flex items-center gap-1"><XCircle size={10}/> Gagal</span>}</td>
//                                     <td className="px-4 py-3 text-gray-500 truncate max-w-[150px]" title={log.message}>{log.message}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* TABEL LOG BACKUP ZIP */}
//             <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
//                 <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
//                     <h3 className="font-bold text-gray-700 text-sm">Riwayat Backup ZIP</h3>
//                     <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">{backupLogs.length} File</span>
//                 </div>
//                 <div className="overflow-x-auto max-h-[400px]">
//                     <table className="w-full text-left text-xs">
//                         <thead className="bg-gray-50 text-gray-400 uppercase">
//                             <tr><th className="px-4 py-3">Waktu</th><th className="px-4 py-3">Ukuran</th><th className="px-4 py-3 text-right">Aksi</th></tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-50">
//                             {backupLogs.length === 0 ? <tr><td colSpan={3} className="p-4 text-center text-gray-400">Kosong</td></tr> : backupLogs.map((log: any) => (
//                                 <tr key={log._id} className="hover:bg-gray-50">
//                                     <td className="px-4 py-3 font-medium">
//                                         {new Date(log.createdAt).toLocaleString()}
//                                         <div className="text-[10px] text-gray-400">{log.filename}</div>
//                                     </td>
//                                     <td className="px-4 py-3 text-gray-600">{formatSize(log.size)}</td>
//                                     <td className="px-4 py-3 text-right">
//                                         <a href={log.url} target="_blank" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
//                                             <Download size={12}/> Unduh
//                                         </a>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//         </div>
//       </div>
//     </Protected>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Protected from '@/components/Protected';
import { 
    Database, RefreshCw, Archive, Server, 
    HardDrive, Download, CheckCircle, XCircle, Cloud 
} from 'lucide-react';

export default function DatabaseCenterPage() {
  const [syncLogs, setSyncLogs] = useState<any[]>([]);
  const [backupLogs, setBackupLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  useEffect(() => { 
      fetchAllHistory(); 
  }, []);

  const fetchAllHistory = async () => {
      setLoading(true);
      try {
          const [resSync, resBackup] = await Promise.all([
              api('/api/admin/sync/history').catch(() => ({ logs: [] })),
              api('/api/admin/backup/history').catch(() => ({ logs: [] }))
          ]);
          setSyncLogs(resSync.logs || []);
          setBackupLogs(resBackup.logs || []);
      } catch (e) { 
          console.error("Gagal memuat log:", e); 
      } finally { 
          setLoading(false); 
      }
  };

  const handleAction = async (endpoint: string, label: string) => {
      if(!confirm(`Apakah Anda yakin ingin menjalankan ${label}?`)) return;
      
      setActiveAction(label);
      try {
          const res = await api(endpoint, { method: 'POST' });
          alert(res.message || `${label} Berhasil!`);
          fetchAllHistory();
      } catch (e: any) {
          alert(`Gagal ${label}: ` + e.message);
      } finally {
          setActiveAction(null);
      }
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Protected roles={['SUPER_ADMIN']}>
      <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
        
        {/* HEADER */}
        <div className="mb-8 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <Database className="text-indigo-600"/> Database Center
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Redundansi Data: Replikasi ke Cloud Supabase & Server PostgreSQL Pribadi.
                </p>
            </div>
            <button 
                onClick={fetchAllHistory} 
                className="px-4 py-2 bg-white border rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
            >
                Refresh History
            </button>
        </div>

        {/* --- 3 PANEL KONTROL UTAMA --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            
            {/* PANEL 1: SUPABASE SYNC */}
            <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-lg shadow-blue-100/20 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Cloud size={24}/></div>
                    <h3 className="font-bold text-gray-800">Supabase Sync</h3>
                </div>
                <p className="text-sm text-gray-500 mb-6 flex-1">
                    Replikasi data MongoDB ke <strong>PostgreSQL Cloud (Supabase)</strong>. Aman untuk redundansi luar server.
                </p>
                <button 
                    onClick={() => handleAction('/api/admin/sync/supabase', 'Sync Supabase')} 
                    disabled={activeAction !== null}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                    {activeAction === 'Sync Supabase' ? <RefreshCw className="animate-spin" size={18}/> : <RefreshCw size={18}/>}
                    Mulai Sync Cloud
                </button>
            </div>

            {/* PANEL 2: PRIVATE POSTGRES SYNC */}
            <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-lg shadow-green-100/20 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Server size={24}/></div>
                    <h3 className="font-bold text-gray-800">Private Postgres</h3>
                </div>
                <p className="text-sm text-gray-500 mb-6 flex-1">
                    Replikasi data ke <strong>Server PostgreSQL Pribadi</strong> Anda melalui koneksi Pool Langsung.
                </p>
                <button 
                    onClick={() => handleAction('/api/admin/sync/postgres', 'Sync Postgres')} 
                    disabled={activeAction !== null}
                    className="w-full bg-green-600 text-white py-2.5 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                    {activeAction === 'Sync Postgres' ? <RefreshCw className="animate-spin" size={18}/> : <Server size={18}/>}
                    Mulai Sync Lokal
                </button>
            </div>

            {/* PANEL 3: BACKUP ZIP */}
            <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-lg shadow-orange-100/20 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Archive size={24}/></div>
                    <h3 className="font-bold text-gray-800">Backup ZIP</h3>
                </div>
                <p className="text-sm text-gray-500 mb-6 flex-1">
                    Membuat file <strong>.zip</strong> dari seluruh database dan mengunggahnya ke bucket Supabase Storage.
                </p>
                <button 
                    onClick={() => handleAction('/api/admin/backup/trigger', 'Backup ZIP')} 
                    disabled={activeAction !== null}
                    className="w-full bg-orange-600 text-white py-2.5 rounded-xl font-bold hover:bg-orange-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                    {activeAction === 'Backup ZIP' ? <RefreshCw className="animate-spin" size={18}/> : <HardDrive size={18}/>}
                    Buat Arsip ZIP
                </button>
            </div>
        </div>

        {/* --- TABEL LOG --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 bg-gray-50 border-b font-bold text-gray-700 text-sm">Riwayat Sinkronisasi (Log Gabungan)</div>
                <div className="overflow-x-auto max-h-[400px]">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-400 uppercase tracking-wider">
                            <tr><th className="px-4 py-3">Waktu</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Keterangan</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {syncLogs.length === 0 ? <tr><td colSpan={3} className="p-4 text-center text-gray-400">Belum ada data</td></tr> : syncLogs.map((log: any) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium whitespace-nowrap">{new Date(log.created_at || log.synced_at).toLocaleString()}</td>
                                    <td className="px-4 py-3">
                                        {log.status === 'success' ? <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle size={12}/> OK</span> : <span className="text-red-500 font-bold flex items-center gap-1"><XCircle size={12}/> Gagal</span>}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">{log.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 bg-gray-50 border-b font-bold text-gray-700 text-sm">Riwayat Backup ZIP</div>
                <div className="overflow-x-auto max-h-[400px]">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-400 uppercase tracking-wider">
                            <tr><th className="px-4 py-3">Waktu</th><th className="px-4 py-3">Ukuran</th><th className="px-4 py-3 text-right">Aksi</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {backupLogs.length === 0 ? <tr><td colSpan={3} className="p-4 text-center text-gray-400">Belum ada file</td></tr> : backupLogs.map((log: any) => (
                                <tr key={log._id || log.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">
                                        {new Date(log.createdAt || log.created_at).toLocaleString()}
                                        <div className="text-[10px] text-gray-400 font-normal">{log.filename}</div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{formatSize(log.size)}</td>
                                    <td className="px-4 py-3 text-right">
                                        <a href={log.url} target="_blank" className="inline-flex items-center gap-1 text-blue-600 font-bold hover:underline">
                                            <Download size={14}/> Unduh
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
      </div>
    </Protected>
  );
}
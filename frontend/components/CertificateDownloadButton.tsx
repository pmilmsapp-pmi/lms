'use client';

import { useState } from 'react';
import { Download, Loader2, FileCheck } from 'lucide-react';

interface Props {
    courseId: string;
    userId?: string;   // Jika kosong, berarti siswa download punya sendiri
    userName?: string; // Untuk nama file
    userRole?: 'student' | 'admin'; 
    className?: string;
}

export default function CertificateDownloadButton({ 
    courseId, 
    userId, 
    userName = 'Sertifikat', 
    userRole = 'student',
    className = ""
}: Props) {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const BACKEND_URL = 'http://localhost:4000'; // Sesuaikan port

            let certId = '';

            if (userRole === 'admin' && userId) {
                // ADMIN: Ambil sertifikat milik siswa tertentu
                const res = await fetch(`${BACKEND_URL}/api/courses/certificate/admin-access`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ courseId, userId })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                certId = data.certificate._id;
            } else {
                // SISWA: Claim sertifikat milik sendiri
                const res = await fetch(`${BACKEND_URL}/api/courses/certificate/claim`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ courseId })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                certId = data.certificate._id;
            }

            // Buka Link Download di Tab Baru
            window.open(`${BACKEND_URL}/api/courses/certificate/download/${certId}`, '_blank');

        } catch (err: any) {
            alert("Gagal memproses sertifikat: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            onClick={handleDownload} 
            disabled={loading}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${className} ${loading ? 'bg-gray-100 text-gray-400' : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'}`}
            title="Download Sertifikat"
        >
            {loading ? <Loader2 size={14} className="animate-spin"/> : <FileCheck size={14}/>}
            {loading ? 'Processing...' : 'Sertifikat'}
        </button>
    );
}
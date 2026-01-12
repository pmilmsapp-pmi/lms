'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import CompetencyForm from '@/components/admin/CompetencyForm';
import CertificateConfigForm from '@/components/admin/CertificateConfigForm';
import { FileBadge, Hash, Calendar, MapPin, UserCheck } from 'lucide-react';

interface Props {
    course: any;       // Data course dari parent
    courseId: string;
    refreshData: () => void; // Fungsi untuk reload data di parent
}

export default function CourseCertificateTab({ course, courseId, refreshData }: Props) {
    // --- STATE ---
    const [competencies, setCompetencies] = useState<any[]>([]);
    const [includeCompetencies, setIncludeCompetencies] = useState(true);
    const [certConfig, setCertConfig] = useState<any>({});
    const [isSaving, setIsSaving] = useState(false);

    // --- EFFECT: Load Data saat course berubah ---
    useEffect(() => {
        if (course) {
            setCompetencies(course.competencies || []);
            setIncludeCompetencies(course.includeCompetenciesInCertificate ?? true);
            setCertConfig(course.certificateConfig || {});
        }
    }, [course]);

    // --- LOGIC SIMPAN (Satu tombol untuk semua atau terpisah, terserah Anda) ---
    const handleSaveAll = async (configData: any) => {
        try {
            setIsSaving(true);
            const payload = {
                certificateConfig: configData,
                competencies: competencies,
                includeCompetenciesInCertificate: includeCompetencies
            };

            // Tetap menembak ke endpoint course yang sama
            await api(`/api/courses/${courseId}`, { 
                method: 'PUT', 
                body: payload 
            });
            
            alert("Pengaturan sertifikat & kompetensi disimpan!");
            refreshData(); // Refresh data di parent agar sinkron
        } catch (e: any) {
            alert("Gagal menyimpan: " + e.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* BAGIAN 1: KOMPETENSI */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Unit Kompetensi</h2>
                <CompetencyForm 
                    initialData={competencies} 
                    onChange={(data) => setCompetencies(data)} 
                />
                
                <div className="mt-6 flex items-center gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <input 
                        type="checkbox" 
                        id="showComp"
                        checked={includeCompetencies} 
                        onChange={e => setIncludeCompetencies(e.target.checked)} 
                        className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                    />
                    <label htmlFor="showComp" className="text-sm font-bold text-gray-700 cursor-pointer">
                        Tampilkan daftar kompetensi di halaman belakang sertifikat?
                    </label>
                </div>
            </div>

            {/* BAGIAN 2: KONFIGURASI SERTIFIKAT */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">2. Pengaturan Tampilan Sertifikat</h2>
                
                {/* Form Config menerima competencies agar Preview PDF bisa jalan */}
                <CertificateConfigForm 
                    initialData={certConfig} 
                    onSave={handleSaveAll} 
                    isSaving={isSaving} 
                    competencies={competencies} 
                    includeCompetencies={includeCompetencies} 
                    courseId={courseId} 
                />

                {/* PREVIEW CARD (Opsional - Pemanis UI) */}
                {certConfig.signatoryName && (
                    <div className="mt-6 border rounded-xl overflow-hidden bg-gray-50/50">
                        <div className="bg-gray-100 px-5 py-3 border-b flex items-center gap-2 font-bold text-gray-600 text-xs uppercase">
                            <FileBadge size={14}/> Ringkasan Data
                        </div>
                        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-xs text-gray-400 block mb-1">Penanda Tangan</span>
                                <span className="font-bold text-gray-800">{certConfig.signatoryName}</span>
                                <span className="block text-xs text-gray-500">{certConfig.signatoryPosition}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block mb-1">Format Nomor</span>
                                <span className="font-mono bg-white border px-2 py-1 rounded text-xs">{certConfig.certificateNumber}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
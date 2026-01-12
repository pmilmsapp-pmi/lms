'use client';

import { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2, Calculator, Calendar, Clock, User } from 'lucide-react';
import { api } from '@/lib/api';

interface GradingSchemeFormProps {
    courseId: string;
    modules: any[];
    refreshData: () => void;
    facilitators: any[]; 
}

export default function GradingSchemeForm({ courseId, modules, refreshData, facilitators }: GradingSchemeFormProps) {
    const [localModules, setLocalModules] = useState<any[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [totalScore, setTotalScore] = useState(0);

    // Init data saat component load
    useEffect(() => {
        if (modules) {
            setLocalModules(JSON.parse(JSON.stringify(modules)));
        }
    }, [modules]);

    // Hitung total poin realtime
    useEffect(() => {
        let sum = 0;
        localModules.forEach(mod => {
            if (mod.isActive) {
                mod.lessons.forEach((les: any) => {
                    if (les.isActive) {
                        sum += (les.points || 0);
                    }
                });
            }
        });
        setTotalScore(sum);
    }, [localModules]);

    const handlePointChange = (modIdx: number, lesIdx: number, val: string) => {
        const newVal = parseInt(val) || 0;
        const newMods = [...localModules];
        newMods[modIdx].lessons[lesIdx].points = newVal;
        setLocalModules(newMods);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await api(`/api/courses/${courseId}/grading`, {
                method: 'PUT',
                body: { modules: localModules }
            });
            alert("Skema penilaian berhasil disimpan!");
            refreshData();
        } catch (e: any) {
            alert("Gagal menyimpan: " + e.message);
        } finally {
            setIsSaving(false);
        }
    };

    // Helper: Cari Nama Fasilitator
    const getFacilitatorName = (id: string) => {
        if (!id) return '-';
        const f = facilitators.find(fac => fac._id === id || fac.id === id);
        return f ? f.name : 'Unknown';
    };

    // Helper: Format Tanggal
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    // [NEW] Helper: Hitung JP Komulatif dalam satu modul
    const calculateModuleJP = (lessons: any[]) => {
        if (!lessons) return 0;
        // Hanya hitung lesson yang aktif
        return lessons.reduce((acc, curr) => acc + (curr.isActive ? (curr.jp || 0) : 0), 0);
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-in slide-in-from-right-4">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Calculator className="text-indigo-600" /> Skema Penilaian
                    </h2>
                    <p className="text-sm text-gray-500">Tentukan bobot nilai konten (Total harus 100).</p>
                </div>
                
                <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${totalScore === 100 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-yellow-50 border-yellow-200 text-yellow-700'}`}>
                    <div className="text-right">
                        <div className="text-[10px] font-bold uppercase tracking-wider">Total Poin</div>
                        <div className="text-2xl font-black">{totalScore}/100</div>
                    </div>
                    {totalScore === 100 ? <CheckCircle2 size={32}/> : <AlertCircle size={32}/>}
                </div>
            </div>

            <div className="space-y-6">
                {localModules.map((mod, modIdx) => {
                    // Hitung JP Komulatif untuk modul ini
                    const cumulativeJP = calculateModuleJP(mod.lessons);

                    return (
                        <div key={mod._id} className={`border rounded-xl overflow-hidden ${!mod.isActive ? 'opacity-50 grayscale' : 'bg-white'}`}>
                            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-gray-700">{mod.title}</h3>
                                    {/* Tampilkan JP Komulatif */}
                                    <div className="flex gap-3 text-[10px] text-gray-500 mt-1 font-bold">
                                        <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border">
                                            <Clock size={10} className="text-blue-600"/> Total: {cumulativeJP} JP
                                        </span>
                                        {mod.facilitatorId && <span className="flex items-center gap-1"><User size={10}/> PJ: {getFacilitatorName(mod.facilitatorId)}</span>}
                                    </div>
                                </div>
                                {!mod.isActive && <span className="text-[10px] bg-gray-200 px-2 py-1 rounded">Non-Aktif</span>}
                            </div>
                            <div className="divide-y">
                                {mod.lessons.map((les: any, lesIdx: number) => (
                                    <div key={les._id} className="p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 gap-4">
                                        <div className="flex items-start gap-3 flex-1">
                                            <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${les.points > 0 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                                                {les.points || 0}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-gray-800">{les.title}</p>
                                                    <span className="text-[9px] uppercase font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border">{les.type?.replace('_', ' ')}</span>
                                                    {!les.isActive && <span className="text-[9px] text-red-500 font-bold">(Non-Aktif)</span>}
                                                </div>
                                                
                                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                                    <div className="flex items-center gap-1.5" title="Fasilitator Pengampu">
                                                        <User size={12} className="text-indigo-400"/> 
                                                        <span>{les.facilitatorId ? getFacilitatorName(les.facilitatorId) : '-'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5" title="Jam Pelajaran">
                                                        <Clock size={12} className="text-green-500"/> 
                                                        <span>{les.jp || 0} JP</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5" title="Tanggal Pelaksanaan">
                                                        <Calendar size={12} className="text-orange-400"/> 
                                                        <span>{formatDate(les.scheduleDate)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 md:border-l md:pl-4">
                                            <label className="text-xs font-bold text-gray-500" htmlFor={`pt-${les._id}`}>Poin:</label>
                                            <input 
                                                id={`pt-${les._id}`}
                                                type="number" 
                                                min="0" 
                                                max="100" 
                                                disabled={!mod.isActive || !les.isActive}
                                                value={les.points || 0}
                                                onChange={(e) => handlePointChange(modIdx, lesIdx, e.target.value)}
                                                className="w-20 p-2 border rounded-lg text-center font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                aria-label={`Poin untuk ${les.title}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {mod.lessons.length === 0 && <div className="p-4 text-center text-gray-400 text-xs italic">Belum ada materi di modul ini.</div>}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 pt-4 border-t flex justify-end">
                <button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    <Save size={18} />
                    {isSaving ? 'Menyimpan...' : 'Simpan Skema Penilaian'}
                </button>
            </div>
        </div>
    );
}
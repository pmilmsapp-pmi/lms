'use client';

import { useState, useEffect } from 'react';
import { Upload, Loader2, FileText, MapPin, LayoutGrid, User, Book, CheckCircle2, Trash2, Info, X, AlertCircle, Users } from 'lucide-react';
import { api } from '@/lib/api';
import BaseModal from '@/components/ui/BaseModal';
import RegionSelector from '@/components/admin/RegionSelector';
import axios from 'axios';
import { getProvinces, getRegencies } from '@/lib/indonesia'; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface CourseProposalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    currentUser: any;
}

// [FIX] 'Anggota' SUDAH DIHAPUS dari daftar pilihan
const MEMBER_TYPES = ['PMR', 'KSR', 'TSR', 'Pegawai', 'Pengurus', 'Umum'];

export default function CourseProposalModal({ isOpen, onClose, onSuccess, currentUser }: CourseProposalModalProps) {
    const [loading, setLoading] = useState(false);
    const [configLoading, setConfigLoading] = useState(true);
    const [uploadingKey, setUploadingKey] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    
    // State User
    const [freshUser, setFreshUser] = useState<any>(currentUser);

    // Form
    const [title, setTitle] = useState('');
    const [programType, setProgramType] = useState<'training' | 'course'>('training');
    
    // [BARU] State Unsur Peserta
    const [targetParticipants, setTargetParticipants] = useState<string[]>([]);

    const [description, setDescription] = useState('');
    
    // Wilayah State
    const [regionConfig, setRegionConfig] = useState<any>({ scope: 'national', provinces: [], regencies: [] });
    
    const [requiredDocsList, setRequiredDocsList] = useState<string[]>([]);
    const [courseDocsList, setCourseDocsList] = useState<string[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<Record<string, { url: string, originalName: string }>>({});

    const isLockedRegion = freshUser && (
        freshUser.role === 'FACILITATOR' || 
        (freshUser.role === 'ADMIN' && freshUser.regionScope !== 'national')
    );

    // 0. FETCH USER
    useEffect(() => {
        const loadFreshUser = async () => {
            if (!isOpen) return;
            try {
                const res = await api('/api/auth/me').catch(()=>null) || await api('/api/users/me').catch(()=>null);
                if(res && (res.user || res.id)) setFreshUser(res.user || res);
            } catch (e) { console.error(e); }
        };
        loadFreshUser();
    }, [isOpen]);

    // 1. LOGIC DETEKSI WILAYAH & RESET FORM
    useEffect(() => {
        if (isOpen && freshUser) {
            setTitle(''); 
            setDescription(''); 
            setProgramType('training'); 
            // Default kosong, user harus memilih manual
            setTargetParticipants([]); 
            setUploadedFiles({}); 
            setShowConfirm(false);

            let rawProv = freshUser.province || freshUser.memberData?.province || '';
            let rawCity = freshUser.city || freshUser.memberData?.regency || '';
            rawProv = rawProv.trim().toUpperCase();
            rawCity = rawCity.trim().toUpperCase();

            const localProvinces = getProvinces(); 
            let newScope = 'national';
            let newProvinces: string[] = [];
            let newRegencies: string[] = [];

            // Logic Managed Scope
            if (freshUser.managedProvinces?.length > 0) {
                const managedItem = freshUser.managedProvinces[0];
                const matchedProv = localProvinces.find((p: any) => 
                    p.name.toUpperCase() === managedItem.toUpperCase() || p.code === managedItem
                );

                if (matchedProv) {
                    newProvinces = [matchedProv.code];
                    
                    if (freshUser.regionScope === 'regency') {
                        newScope = 'regency';
                        if (freshUser.managedRegencies?.length > 0) {
                            const managedReg = freshUser.managedRegencies[0];
                            const localRegs = getRegencies(matchedProv.code);
                            const matchedCity = localRegs.find((r: any) => 
                                r.name.toUpperCase() === managedReg.toUpperCase() || r.code === managedReg
                            );
                            if (matchedCity) newRegencies = [matchedCity.code];
                        } 
                        else if (rawCity) {
                            const localRegs = getRegencies(matchedProv.code);
                            const matchedCity = localRegs.find((r: any) => 
                                r.name.toUpperCase().includes(rawCity) || rawCity.includes(r.name.toUpperCase())
                            );
                            if (matchedCity) newRegencies = [matchedCity.code];
                        }
                    } else {
                        newScope = 'province';
                    }
                }
            } 
            else if (rawProv) {
                const matchedProv = localProvinces.find((p: any) => p.name.toUpperCase() === rawProv);
                if (matchedProv) {
                    if (isLockedRegion) {
                        if (freshUser.role === 'FACILITATOR' && rawCity) {
                            newScope = 'regency';
                            newProvinces = [matchedProv.code];
                            const localRegs = getRegencies(matchedProv.code);
                            const matchedCity = localRegs.find((r: any) => r.name.toUpperCase().includes(rawCity) || rawCity.includes(r.name.toUpperCase()));
                            if (matchedCity) newRegencies = [matchedCity.code];
                        } else {
                            newScope = 'province';
                            newProvinces = [matchedProv.code];
                        }
                    }
                }
            }

            if (isLockedRegion && newScope !== 'national') {
                setRegionConfig({ scope: newScope, provinces: newProvinces, regencies: newRegencies });
            }
        }
    }, [isOpen, freshUser]);

    // 2. LOAD CONFIG
    useEffect(() => {
        if (isOpen) {
            const fetchConfig = async () => {
                setConfigLoading(true);
                try {
                    const res = await api('/api/content').catch(() => ({}));
                    setRequiredDocsList(res.trainingRequirements || ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
                    setCourseDocsList(res.courseRequirements || ['Outline Materi']);
                } catch {
                    setRequiredDocsList(['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)']);
                    setCourseDocsList(['Outline Materi']);
                } finally { setConfigLoading(false); }
            };
            fetchConfig();
        }
    }, [isOpen]);

    // HANDLERS
    const handleUpload = async (file: File, docName: string) => {
        if (!file) return;
        setUploadingKey(docName);
        const userStr = localStorage.getItem('user');
        const token = userStr ? JSON.parse(userStr).token : null;
        const fd = new FormData(); fd.append('file', file);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/materials/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } });
            setUploadedFiles(prev => ({ ...prev, [docName]: { url: res.data?.data?.url || res.data?.url, originalName: file.name } }));
        } catch { alert("Gagal upload"); } finally { setUploadingKey(null); }
    };

    const removeFile = (docName: string) => {
        if(!confirm("Hapus file?")) return;
        const newFile = {...uploadedFiles}; delete newFile[docName]; setUploadedFiles(newFile);
    };

    // [BARU] Handler Toggle Checkbox Peserta
    const toggleParticipant = (type: string) => {
        setTargetParticipants(prev => 
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handlePreSubmit = () => {
        if (!title.trim()) return alert("Judul wajib diisi");
        if (targetParticipants.length === 0) return alert("Pilih minimal satu unsur peserta (PMR, KSR, dll)");
        
        const reqs = programType === 'training' ? requiredDocsList : courseDocsList;
        if (reqs.some(d => !uploadedFiles[d])) return alert("Lengkapi dokumen wajib");
        
        if (!isLockedRegion && regionConfig.scope === 'province' && regionConfig.provinces.length === 0) return alert("Pilih Provinsi");
        if (!isLockedRegion && regionConfig.scope === 'regency' && regionConfig.regencies.length === 0) return alert("Pilih Kota/Kabupaten");
        
        setShowConfirm(true);
    };

    const handleFinalSubmit = async () => {
        setLoading(true);
        try {
            const { scope, provinces, regencies } = regionConfig;
            
            const localProvs = getProvinces();
            const pCode = provinces[0];
            const pData = pCode ? localProvs.find((p:any) => p.code === pCode) : null;
            const pName = pData ? pData.name : '';
            
            let cName = '';
            let finalRegionCode = 'national';

            if (scope === 'province') {
                finalRegionCode = pCode; 
            } else if (scope === 'regency') {
                if (pCode && regencies[0]) {
                    const localRegs = getRegencies(pCode);
                    const cData = localRegs.find((r:any) => r.code === regencies[0]);
                    if (cData) cName = cData.name;
                }
                finalRegionCode = regencies[0]; 
            }

            let organizerLabel = 'PMI Pusat';
            if (scope === 'province') organizerLabel = `PMI Provinsi ${pName}`;
            else if (scope === 'regency') organizerLabel = `PMI ${cName}`; 

            const payload = {
                title, description, programType,
                organizer: organizerLabel,
                regionCode: finalRegionCode,
                // [BARU] Kirim data target participants yang dipilih
                targetParticipants: targetParticipants, 
                proposalDocuments: Object.entries(uploadedFiles).map(([k, v]) => ({ name: v.originalName, url: v.url, label: k })),
                facilitatorIds: [freshUser.id || freshUser._id],
                status: 'proposed', isPublished: false, isInfoCompleted: false
            };

            await api('/api/courses', { method: 'POST', body: payload });
            setShowConfirm(false); onSuccess(); onClose();
        } catch (e: any) { alert("Gagal: " + e.message); setShowConfirm(false); } finally { setLoading(false); }
    };

    const activeRequirements = programType === 'training' ? requiredDocsList : courseDocsList;
    const userLocationDisplay = () => {
        if (regionConfig.scope === 'regency' && regionConfig.regencies.length > 0) {
            const pCode = regionConfig.provinces[0];
            if(pCode) {
                const regs = getRegencies(pCode);
                const r = regs.find((x:any) => x.code === regionConfig.regencies[0]);
                if (r) return r.name.toUpperCase();
            }
        }
        if (regionConfig.scope === 'province' && regionConfig.provinces.length > 0) {
             const localProvs = getProvinces();
             const p = localProvs.find((x:any) => x.code === regionConfig.provinces[0]);
             if (p) return `PROVINSI ${p.name.toUpperCase()}`;
        }
        const c = freshUser.city || freshUser.memberData?.regency;
        const p = freshUser.province || freshUser.memberData?.province;
        if (c) return c.toUpperCase();
        if (p) return `PROVINSI ${p.toUpperCase()}`;
        return 'NASIONAL / PUSAT';
    };

    return (
        <>
        <BaseModal isOpen={isOpen} onClose={onClose} title="" size="2xl">
            <div className="flex flex-col h-full bg-white -m-6">
                <div className="bg-[#990000] px-6 py-4 flex justify-between items-center text-white rounded-t-xl">
                    <h2 className="text-lg font-bold">Pengajuan Pelatihan Baru</h2>
                    <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full" aria-label="Tutup"><X size={24}/></button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[80vh] custom-scrollbar">
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">{freshUser?.name?.charAt(0)}</div>
                        <div>
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">PENGAJU USULAN</p>
                            <h3 className="font-bold text-gray-900 text-base">{freshUser?.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-blue-200">{freshUser?.role}</span>
                                <div className="flex items-center gap-1 text-xs text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                                    <MapPin size={12} className="text-orange-500"/>
                                    <span className="font-bold uppercase tracking-tight">{userLocationDisplay()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-7 space-y-5">
                            <div><label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">JUDUL USULAN *</label><input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none font-bold text-gray-800" placeholder="Contoh: Diklat..." value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Judul Pelatihan"/></div>
                            
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">JENIS PROGRAM</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => setProgramType('training')} className={`py-2.5 rounded-lg border text-sm font-bold flex items-center justify-center gap-2 ${programType === 'training' ? 'bg-red-50 border-[#990000] text-[#990000]' : 'bg-white text-gray-500'}`} aria-label="Pilih Diklat"><LayoutGrid size={16}/> DIKLAT</button>
                                    <button onClick={() => setProgramType('course')} className={`py-2.5 rounded-lg border text-sm font-bold flex items-center justify-center gap-2 ${programType === 'course' ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white text-gray-500'}`} aria-label="Pilih Kursus"><Book size={16}/> KURSUS</button>
                                </div>
                            </div>

                            {/* [BARU] SECTION UNSUR PESERTA (Anggota dihapus dari list) */}
                            <div>
                                <label className="text-[11px] font-bold text-gray-500 uppercase block mb-2 flex items-center gap-1">
                                    <Users size={12}/> UNSUR PESERTA (WAJIB)
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {MEMBER_TYPES.map(type => {
                                        const isSelected = targetParticipants.includes(type);
                                        return (
                                            <button
                                                key={type}
                                                onClick={() => toggleParticipant(type)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${isSelected ? 'bg-gray-800 text-white border-gray-900 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
                                            >
                                                {isSelected && <CheckCircle2 size={12} className="inline mr-1 -mt-0.5"/>}
                                                {type}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 italic">* Hanya user dengan posisi/jabatan terpilih yang bisa melihat/mendaftar.</p>
                            </div>

                            <div><label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">ALASAN / LATAR BELAKANG</label><textarea className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none h-32 resize-none" placeholder="Jelaskan..." value={description} onChange={(e) => setDescription(e.target.value)} aria-label="Alasan"/></div>
                        </div>

                        <div className="lg:col-span-5 space-y-6">
                            <div className={`p-4 rounded-xl border ${isLockedRegion ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200'}`}>
                                <label className="text-[11px] font-bold text-orange-800 uppercase flex items-center gap-1 mb-2"><MapPin size={12}/> PELAKSANA {isLockedRegion && "(TERKUNCI)"}</label>
                                <RegionSelector value={regionConfig} onChange={setRegionConfig} disabled={isLockedRegion} />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2"><label className="text-[11px] font-bold text-gray-500 uppercase">DOKUMEN WAJIB</label><span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded font-bold text-gray-600">{activeRequirements.length}</span></div>
                                <div className="space-y-2">
                                    {activeRequirements.map((docName, idx) => (
                                        <div key={idx} className={`p-3 border rounded-lg ${uploadedFiles[docName] ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                                            <div className="flex items-center gap-2 mb-2">{uploadedFiles[docName] ? <CheckCircle2 size={14} className="text-green-600"/> : <AlertCircle size={14} className="text-orange-500"/>}<span className="text-xs font-bold text-gray-700 truncate">{docName}</span></div>
                                            {uploadedFiles[docName] ? <div className="flex justify-between items-center bg-white p-2 rounded border border-green-100"><span className="text-[10px] font-bold text-green-700 truncate w-32">{uploadedFiles[docName].originalName}</span><button onClick={() => removeFile(docName)} className="text-red-500 hover:bg-red-50 p-1 rounded" aria-label={`Hapus ${docName}`}><Trash2 size={12}/></button></div> : <label className="w-full flex items-center justify-center gap-2 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded text-[10px] font-bold cursor-pointer hover:bg-blue-100">{uploadingKey === docName ? <Loader2 className="animate-spin" size={12}/> : <Upload size={12}/>} Upload<input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], docName)} aria-label={`Upload ${docName}`}/></label>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3 rounded-b-xl">
                    <button onClick={onClose} className="flex-1 py-3 border border-gray-300 rounded-lg font-bold text-sm text-gray-600 hover:bg-white">Batal</button>
                    <button onClick={handlePreSubmit} disabled={loading} className="flex-[3] py-3 bg-[#990000] text-white rounded-lg font-bold text-sm hover:bg-[#7f0000] shadow-md flex items-center justify-center gap-2" aria-label="Kirim Usulan">{loading ? <Loader2 className="animate-spin" size={18}/> : <FileText size={18}/>} KIRIM USULAN</button>
                </div>
            </div>
        </BaseModal>

        {showConfirm && <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"><div className="bg-white w-[350px] p-6 rounded-xl shadow-2xl text-center space-y-4 animate-in zoom-in-95"><div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600"><Info size={28}/></div><div><h4 className="font-bold text-gray-900">Konfirmasi</h4><p className="text-xs text-gray-500 mt-1">Kirim usulan ini ke <b>Pengajuan Masuk</b>?</p></div><div className="flex gap-2 mt-2"><button onClick={() => setShowConfirm(false)} className="flex-1 py-2 border rounded-lg text-xs font-bold">Batal</button><button onClick={handleFinalSubmit} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">Ya, Kirim</button></div></div></div>}
        </>
    );
}
'use client';
import { useState } from 'react';
import { Camera, UploadCloud, CheckCircle } from 'lucide-react';
import { apiUpload } from '@/lib/api';

export default function GameScavenger({ content, onComplete, lessonId }: any) {
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Preview lokal instan
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            // Upload ke server
            await apiUpload('/api/upload', formData); 
            
            // Simulasi sukses & selesai
            setTimeout(() => {
                setUploading(false);
                setIsDone(true);
                onComplete(lessonId); // Tandai materi selesai otomatis
            }, 1500);
        } catch (err) {
            alert("Gagal upload, coba lagi.");
            setUploading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-rose-50 to-orange-50 p-8 rounded-3xl border-2 border-rose-100 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12"><Camera size={120} className="text-rose-500"/></div>
            
            <h2 className="text-2xl font-black text-rose-800 mb-2 uppercase tracking-wide">📸 Misi: Scavenger Hunt</h2>
            <div className="prose prose-rose mx-auto mb-8 bg-white/50 p-4 rounded-xl border border-rose-100" dangerouslySetInnerHTML={{ __html: content }} />

            {!isDone ? (
                <div className="flex flex-col items-center gap-4">
                    <label className="cursor-pointer group relative">
                        <div className="w-64 h-40 border-4 border-dashed border-rose-300 rounded-2xl flex flex-col items-center justify-center bg-white group-hover:bg-rose-50 transition-all shadow-sm">
                            {preview ? (
                                <img src={preview} className="w-full h-full object-cover rounded-xl opacity-50" alt="Preview"/>
                            ) : (
                                <Camera size={48} className="text-rose-400 group-hover:scale-110 transition-transform"/>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {uploading ? <span className="font-bold text-rose-600 bg-white/80 px-3 py-1 rounded-full animate-pulse">Mengirim...</span> : <span className="font-bold text-rose-500 bg-white/80 px-3 py-1 rounded-full shadow-sm group-hover:text-rose-700">Ambil / Upload Foto</span>}
                            </div>
                        </div>
                        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleUpload} disabled={uploading}/>
                    </label>
                    <p className="text-xs text-gray-400">Gunakan kamera HP atau upload dari galeri.</p>
                </div>
            ) : (
                <div className="animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 shadow-lg shadow-green-200">
                        <CheckCircle size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-green-700">Misi Berhasil!</h3>
                    <p className="text-green-600 text-sm">Foto kamu keren sekali!</p>
                </div>
            )}
        </div>
    );
}
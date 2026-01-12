// // // // // // // // // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // // // // // // // // // // // import { api } from '@/lib/api';
// // // // // // // // // // // // // // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // // // // // // // // // // // // // import { useRouter } from 'next/navigation';

// // // // // // // // // // // // // // // // // // // // // export default function AdminContentPage() {
// // // // // // // // // // // // // // // // // // // // //   const router = useRouter();
// // // // // // // // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // // // // // // // // //   const [form, setForm] = useState({
// // // // // // // // // // // // // // // // // // // // //     heroTitle: '',
// // // // // // // // // // // // // // // // // // // // //     heroDescription: '',
// // // // // // // // // // // // // // // // // // // // //     features: [
// // // // // // // // // // // // // // // // // // // // //       { title: '', description: '' },
// // // // // // // // // // // // // // // // // // // // //       { title: '', description: '' },
// // // // // // // // // // // // // // // // // // // // //       { title: '', description: '' }
// // // // // // // // // // // // // // // // // // // // //     ]
// // // // // // // // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // // // //     api('/api/content').then(data => {
// // // // // // // // // // // // // // // // // // // // //       setForm({
// // // // // // // // // // // // // // // // // // // // //         heroTitle: data.heroTitle,
// // // // // // // // // // // // // // // // // // // // //         heroDescription: data.heroDescription,
// // // // // // // // // // // // // // // // // // // // //         features: data.features.length ? data.features : form.features
// // // // // // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // // // // // // //   const handleFeatureChange = (idx: number, field: string, value: string) => {
// // // // // // // // // // // // // // // // // // // // //     const newFeats = [...form.features];
// // // // // // // // // // // // // // // // // // // // //     (newFeats[idx] as any)[field] = value;
// // // // // // // // // // // // // // // // // // // // //     setForm({ ...form, features: newFeats });
// // // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // // //   const save = async () => {
// // // // // // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // // // // // //       await api('/api/content', { method: 'PUT', body: form });
// // // // // // // // // // // // // // // // // // // // //       alert("Tampilan Dashboard Berhasil Diupdate!");
// // // // // // // // // // // // // // // // // // // // //       router.push('/');
// // // // // // // // // // // // // // // // // // // // //     } catch (e: any) { alert("Gagal: " + e.message); }
// // // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // // //   if(loading) return <div className="p-10 text-center">Loading...</div>;

// // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // // // // // // // // // // // // // //       <div className="max-w-4xl mx-auto p-6 pb-20">
// // // // // // // // // // // // // // // // // // // // //         <div className="flex justify-between items-center mb-6">
// // // // // // // // // // // // // // // // // // // // //            <h1 className="text-2xl font-bold">Edit Konten Dashboard</h1>
// // // // // // // // // // // // // // // // // // // // //            <button onClick={() => router.push('/')} className="text-gray-500 text-sm">Kembali</button>
// // // // // // // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // // // // // // //         <div className="bg-white p-6 rounded-xl shadow border space-y-6">
// // // // // // // // // // // // // // // // // // // // //           {/* Hero Section */}
// // // // // // // // // // // // // // // // // // // // //           <div>
// // // // // // // // // // // // // // // // // // // // //             <h3 className="font-bold text-red-700 mb-3 border-b pb-1">Bagian Hero (Atas)</h3>
// // // // // // // // // // // // // // // // // // // // //             <div className="space-y-3">
// // // // // // // // // // // // // // // // // // // // //                <div>
// // // // // // // // // // // // // // // // // // // // //                  <label className="text-xs font-bold text-gray-500">Judul Utama</label>
// // // // // // // // // // // // // // // // // // // // //                  <input className="w-full p-2 border rounded" value={form.heroTitle} onChange={e=>setForm({...form, heroTitle: e.target.value})} />
// // // // // // // // // // // // // // // // // // // // //                </div>
// // // // // // // // // // // // // // // // // // // // //                <div>
// // // // // // // // // // // // // // // // // // // // //                  <label className="text-xs font-bold text-gray-500">Deskripsi</label>
// // // // // // // // // // // // // // // // // // // // //                  <textarea className="w-full p-2 border rounded h-24" value={form.heroDescription} onChange={e=>setForm({...form, heroDescription: e.target.value})} />
// // // // // // // // // // // // // // // // // // // // //                </div>
// // // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // // //           </div>

// // // // // // // // // // // // // // // // // // // // //           {/* Features Section */}
// // // // // // // // // // // // // // // // // // // // //           <div>
// // // // // // // // // // // // // // // // // // // // //             <h3 className="font-bold text-red-700 mb-3 border-b pb-1">Kartu Fitur (3 Kolom)</h3>
// // // // // // // // // // // // // // // // // // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // // // // // // // // // // // // // //               {form.features.map((feat, idx) => (
// // // // // // // // // // // // // // // // // // // // //                 <div key={idx} className="p-3 bg-gray-50 rounded border">
// // // // // // // // // // // // // // // // // // // // //                   <p className="text-xs font-bold mb-2 text-center">Kartu {idx+1}</p>
// // // // // // // // // // // // // // // // // // // // //                   <input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Judul" value={feat.title} onChange={e=>handleFeatureChange(idx, 'title', e.target.value)} />
// // // // // // // // // // // // // // // // // // // // //                   <textarea className="w-full p-2 border rounded text-xs h-20" placeholder="Deskripsi" value={feat.description} onChange={e=>handleFeatureChange(idx, 'description', e.target.value)} />
// // // // // // // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // // // // // // //               ))}
// // // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // // //           </div>

// // // // // // // // // // // // // // // // // // // // //           <button onClick={save} className="w-full bg-red-700 text-white py-3 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg">
// // // // // // // // // // // // // // // // // // // // //             Simpan Perubahan
// // // // // // // // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // //     </Protected>
// // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // // // // // // // // // // import { api } from '@/lib/api';
// // // // // // // // // // // // // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // // // // // // // // // // // // import { useRouter } from 'next/navigation';

// // // // // // // // // // // // // // // // // // // // export default function AdminContentPage() {
// // // // // // // // // // // // // // // // // // // //   const router = useRouter();
// // // // // // // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // // // // // // // //   const [form, setForm] = useState({
// // // // // // // // // // // // // // // // // // // //     heroTitle: '',
// // // // // // // // // // // // // // // // // // // //     heroDescription: '',
// // // // // // // // // // // // // // // // // // // //     features: [
// // // // // // // // // // // // // // // // // // // //       { title: '', description: '' },
// // // // // // // // // // // // // // // // // // // //       { title: '', description: '' },
// // // // // // // // // // // // // // // // // // // //       { title: '', description: '' }
// // // // // // // // // // // // // // // // // // // //     ]
// // // // // // // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // // //     api('/api/content').then(data => {
// // // // // // // // // // // // // // // // // // // //       setForm({
// // // // // // // // // // // // // // // // // // // //         heroTitle: data.heroTitle || '',
// // // // // // // // // // // // // // // // // // // //         heroDescription: data.heroDescription || '',
// // // // // // // // // // // // // // // // // // // //         features: data.features?.length ? data.features : form.features
// // // // // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // // // // // // // // // //     }).catch(() => setLoading(false));
// // // // // // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // // // // // //   const handleFeatureChange = (idx: number, field: string, value: string) => {
// // // // // // // // // // // // // // // // // // // //     const newFeats = [...form.features];
// // // // // // // // // // // // // // // // // // // //     (newFeats[idx] as any)[field] = value;
// // // // // // // // // // // // // // // // // // // //     setForm({ ...form, features: newFeats });
// // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // //   const save = async () => {
// // // // // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // // // // //       await api('/api/content', { method: 'PUT', body: form });
// // // // // // // // // // // // // // // // // // // //       alert("Tampilan Dashboard Berhasil Diupdate!");
// // // // // // // // // // // // // // // // // // // //       router.push('/');
// // // // // // // // // // // // // // // // // // // //     } catch (e: any) { alert("Gagal: " + e.message); }
// // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // //   if(loading) return <div className="p-10 text-center">Loading...</div>;

// // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // // // // // // // // // // // // //       <div className="max-w-4xl mx-auto p-6 pb-20">
// // // // // // // // // // // // // // // // // // // //         <div className="flex justify-between items-center mb-6">
// // // // // // // // // // // // // // // // // // // //            <h1 className="text-2xl font-bold">Edit Konten Dashboard</h1>
// // // // // // // // // // // // // // // // // // // //            <button onClick={() => router.push('/')} className="text-gray-500 text-sm">Kembali</button>
// // // // // // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // // // // // //         <div className="bg-white p-6 rounded-xl shadow border space-y-6">
// // // // // // // // // // // // // // // // // // // //           <div>
// // // // // // // // // // // // // // // // // // // //             <h3 className="font-bold text-red-700 mb-3 border-b pb-1">Bagian Hero (Atas)</h3>
// // // // // // // // // // // // // // // // // // // //             <div className="space-y-3">
// // // // // // // // // // // // // // // // // // // //                <div>
// // // // // // // // // // // // // // // // // // // //                  <label htmlFor="heroTitle" className="text-xs font-bold text-gray-500">Judul Utama</label>
// // // // // // // // // // // // // // // // // // // //                  <input 
// // // // // // // // // // // // // // // // // // // //                     id="heroTitle"
// // // // // // // // // // // // // // // // // // // //                     title="Judul Utama Hero"
// // // // // // // // // // // // // // // // // // // //                     className="w-full p-2 border rounded" 
// // // // // // // // // // // // // // // // // // // //                     value={form.heroTitle} 
// // // // // // // // // // // // // // // // // // // //                     onChange={e=>setForm({...form, heroTitle: e.target.value})} 
// // // // // // // // // // // // // // // // // // // //                  />
// // // // // // // // // // // // // // // // // // // //                </div>
// // // // // // // // // // // // // // // // // // // //                <div>
// // // // // // // // // // // // // // // // // // // //                  <label htmlFor="heroDesc" className="text-xs font-bold text-gray-500">Deskripsi</label>
// // // // // // // // // // // // // // // // // // // //                  <textarea 
// // // // // // // // // // // // // // // // // // // //                     id="heroDesc"
// // // // // // // // // // // // // // // // // // // //                     title="Deskripsi Hero"
// // // // // // // // // // // // // // // // // // // //                     className="w-full p-2 border rounded h-24" 
// // // // // // // // // // // // // // // // // // // //                     value={form.heroDescription} 
// // // // // // // // // // // // // // // // // // // //                     onChange={e=>setForm({...form, heroDescription: e.target.value})} 
// // // // // // // // // // // // // // // // // // // //                  />
// // // // // // // // // // // // // // // // // // // //                </div>
// // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // //           </div>

// // // // // // // // // // // // // // // // // // // //           <div>
// // // // // // // // // // // // // // // // // // // //             <h3 className="font-bold text-red-700 mb-3 border-b pb-1">Kartu Fitur (3 Kolom)</h3>
// // // // // // // // // // // // // // // // // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // // // // // // // // // // // // //               {form.features.map((feat, idx) => (
// // // // // // // // // // // // // // // // // // // //                 <div key={idx} className="p-3 bg-gray-50 rounded border">
// // // // // // // // // // // // // // // // // // // //                   <p className="text-xs font-bold mb-2 text-center">Kartu {idx+1}</p>
// // // // // // // // // // // // // // // // // // // //                   <input 
// // // // // // // // // // // // // // // // // // // //                     title={`Judul Fitur ${idx+1}`}
// // // // // // // // // // // // // // // // // // // //                     className="w-full p-2 border rounded mb-2 text-sm" 
// // // // // // // // // // // // // // // // // // // //                     placeholder="Judul" 
// // // // // // // // // // // // // // // // // // // //                     value={feat.title} 
// // // // // // // // // // // // // // // // // // // //                     onChange={e=>handleFeatureChange(idx, 'title', e.target.value)} 
// // // // // // // // // // // // // // // // // // // //                   />
// // // // // // // // // // // // // // // // // // // //                   <textarea 
// // // // // // // // // // // // // // // // // // // //                     title={`Deskripsi Fitur ${idx+1}`}
// // // // // // // // // // // // // // // // // // // //                     className="w-full p-2 border rounded text-xs h-20" 
// // // // // // // // // // // // // // // // // // // //                     placeholder="Deskripsi" 
// // // // // // // // // // // // // // // // // // // //                     value={feat.description} 
// // // // // // // // // // // // // // // // // // // //                     onChange={e=>handleFeatureChange(idx, 'description', e.target.value)} 
// // // // // // // // // // // // // // // // // // // //                   />
// // // // // // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // // // // // //               ))}
// // // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // // //           </div>

// // // // // // // // // // // // // // // // // // // //           <button onClick={save} className="w-full bg-red-700 text-white py-3 rounded-xl font-bold hover:bg-red-800 transition-all shadow-lg">
// // // // // // // // // // // // // // // // // // // //             Simpan Perubahan
// // // // // // // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // //     </Protected>
// // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // // // // // // // // // import Link from 'next/link';
// // // // // // // // // // // // // // // // // // // import { api } from '@/lib/api';
// // // // // // // // // // // // // // // // // // // import { useAuth } from '@/lib/AuthProvider';

// // // // // // // // // // // // // // // // // // // export default function Dashboard() {
// // // // // // // // // // // // // // // // // // //   const { user } = useAuth();
// // // // // // // // // // // // // // // // // // //   const [content, setContent] = useState<any>(null);
// // // // // // // // // // // // // // // // // // //   const [currentSlide, setCurrentSlide] = useState(0);

// // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // //     api('/api/content').then(setContent).catch(console.error);
// // // // // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // // // // //   // Logika auto-slide setiap 5 detik
// // // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // // //     if (content?.slides?.length > 0) {
// // // // // // // // // // // // // // // // // // //       const timer = setInterval(() => {
// // // // // // // // // // // // // // // // // // //         setCurrentSlide((prev) => (prev + 1) % content.slides.length);
// // // // // // // // // // // // // // // // // // //       }, 5000);
// // // // // // // // // // // // // // // // // // //       return () => clearInterval(timer);
// // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // //   }, [content]);

// // // // // // // // // // // // // // // // // // //   if (!content) return <div className="text-center p-20">Memuat...</div>;

// // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // //     <div className="bg-gray-50 min-h-screen flex flex-col">
// // // // // // // // // // // // // // // // // // //       {/* HERO SECTION */}
// // // // // // // // // // // // // // // // // // //       <div className="bg-red-700 text-white py-16 px-6">
// // // // // // // // // // // // // // // // // // //         <div className="max-w-6xl mx-auto">
// // // // // // // // // // // // // // // // // // //           <h1 className="text-4xl font-bold mb-4">{content.heroTitle}</h1>
// // // // // // // // // // // // // // // // // // //           <p className="text-red-100 max-w-2xl mb-8">{content.heroDescription}</p>
// // // // // // // // // // // // // // // // // // //           <div className="flex gap-4">
// // // // // // // // // // // // // // // // // // //             <Link href="/courses" className="bg-white text-red-700 px-6 py-3 rounded-lg font-bold shadow-lg">
// // // // // // // // // // // // // // // // // // //               Lihat Kursus
// // // // // // // // // // // // // // // // // // //             </Link>
// // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // // // // // // //       {/* SECTION SLIDE FOTO (PENGGANTI STATISTIK) */}
// // // // // // // // // // // // // // // // // // //       <div className="max-w-6xl mx-auto px-6 -mt-8 w-full">
// // // // // // // // // // // // // // // // // // //         {content.slides && content.slides.length > 0 ? (
// // // // // // // // // // // // // // // // // // //           <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
// // // // // // // // // // // // // // // // // // //             {content.slides.map((slide: string, index: number) => (
// // // // // // // // // // // // // // // // // // //               <div
// // // // // // // // // // // // // // // // // // //                 key={index}
// // // // // // // // // // // // // // // // // // //                 className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
// // // // // // // // // // // // // // // // // // //                   index === currentSlide ? 'opacity-100' : 'opacity-0'
// // // // // // // // // // // // // // // // // // //                 }`}
// // // // // // // // // // // // // // // // // // //               >
// // // // // // // // // // // // // // // // // // //                 <img src={slide} alt={`Slide ${index}`} className="w-full h-full object-cover" />
// // // // // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // // // // //             ))}
// // // // // // // // // // // // // // // // // // //             {/* Navigasi Titik */}
// // // // // // // // // // // // // // // // // // //             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
// // // // // // // // // // // // // // // // // // //               {content.slides.map((_: any, i: number) => (
// // // // // // // // // // // // // // // // // // //                 <div 
// // // // // // // // // // // // // // // // // // //                   key={i} 
// // // // // // // // // // // // // // // // // // //                   className={`h-2 w-2 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/40'}`}
// // // // // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // // // // //               ))}
// // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // //         ) : (
// // // // // // // // // // // // // // // // // // //           <div className="h-40 bg-white rounded-3xl border-2 border-dashed flex items-center justify-center text-gray-400">
// // // // // // // // // // // // // // // // // // //             Belum ada foto slide. Tambahkan melalui CMS.
// // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // // // // // // //       {/* FEATURES SECTION */}
// // // // // // // // // // // // // // // // // // //       <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
// // // // // // // // // // // // // // // // // // //         {content.features?.map((feat: any, idx: number) => (
// // // // // // // // // // // // // // // // // // //           <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border hover:border-red-500 transition-all">
// // // // // // // // // // // // // // // // // // //             <h3 className="font-bold text-gray-900 text-xl mb-3">{feat.title}</h3>
// // // // // // // // // // // // // // // // // // //             <p className="text-gray-600 leading-relaxed">{feat.description}</p>
// // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // //         ))}
// // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // // // // // import { useEffect, useState } from 'react';
// // // // // // // // // // // // // // // // // // import { api, apiUpload } from '@/lib/api';
// // // // // // // // // // // // // // // // // // import Protected from '@/components/Protected';
// // // // // // // // // // // // // // // // // // import { useRouter } from 'next/navigation';

// // // // // // // // // // // // // // // // // // export default function AdminContentPage() {
// // // // // // // // // // // // // // // // // //   const router = useRouter();
// // // // // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // // // // // //   const [uploading, setUploading] = useState(false);
// // // // // // // // // // // // // // // // // //   const [form, setForm] = useState<any>({
// // // // // // // // // // // // // // // // // //     heroTitle: '',
// // // // // // // // // // // // // // // // // //     heroDescription: '',
// // // // // // // // // // // // // // // // // //     slides: [],
// // // // // // // // // // // // // // // // // //     features: [
// // // // // // // // // // // // // // // // // //       { title: '', description: '' },
// // // // // // // // // // // // // // // // // //       { title: '', description: '' },
// // // // // // // // // // // // // // // // // //       { title: '', description: '' }
// // // // // // // // // // // // // // // // // //     ]
// // // // // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // // //     // Ambil data konten yang sudah ada dari database
// // // // // // // // // // // // // // // // // //     api('/api/content')
// // // // // // // // // // // // // // // // // //       .then((data) => {
// // // // // // // // // // // // // // // // // //         setForm({
// // // // // // // // // // // // // // // // // //           heroTitle: data.heroTitle || '',
// // // // // // // // // // // // // // // // // //           heroDescription: data.heroDescription || '',
// // // // // // // // // // // // // // // // // //           slides: data.slides || [],
// // // // // // // // // // // // // // // // // //           features: data.features?.length ? data.features : form.features
// // // // // // // // // // // // // // // // // //         });
// // // // // // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // // // // // //       })
// // // // // // // // // // // // // // // // // //       .catch((err) => {
// // // // // // // // // // // // // // // // // //         console.error("Gagal memuat data CMS:", err);
// // // // // // // // // // // // // // // // // //         setLoading(false);
// // // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // // // //   // Handler untuk upload foto slide baru
// // // // // // // // // // // // // // // // // //   const handleSlideUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // // // // // // // //     const file = e.target.files?.[0];
// // // // // // // // // // // // // // // // // //     if (!file) return;

// // // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // // //       setUploading(true);
// // // // // // // // // // // // // // // // // //       const formData = new FormData();
// // // // // // // // // // // // // // // // // //       formData.append('file', file);
      
// // // // // // // // // // // // // // // // // //       // Upload ke endpoint generik /api/upload
// // // // // // // // // // // // // // // // // //       const res = await apiUpload('/api/upload', formData);
// // // // // // // // // // // // // // // // // //       const newUrl = res.url || res.file?.url;
      
// // // // // // // // // // // // // // // // // //       // Tambahkan URL foto baru ke dalam array slides
// // // // // // // // // // // // // // // // // //       setForm({ ...form, slides: [...form.slides, newUrl] });
// // // // // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // // // // //       alert("Gagal mengunggah foto slide");
// // // // // // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // // // // // //       setUploading(false);
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // //   const removeSlide = (index: number) => {
// // // // // // // // // // // // // // // // // //     const newSlides = form.slides.filter((_: any, i: number) => i !== index);
// // // // // // // // // // // // // // // // // //     setForm({ ...form, slides: newSlides });
// // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // //   const handleFeatureChange = (idx: number, field: string, value: string) => {
// // // // // // // // // // // // // // // // // //     const newFeats = [...form.features];
// // // // // // // // // // // // // // // // // //     newFeats[idx] = { ...newFeats[idx], [field]: value };
// // // // // // // // // // // // // // // // // //     setForm({ ...form, features: newFeats });
// // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // //   const saveContent = async () => {
// // // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // // //       await api('/api/content', { method: 'PUT', body: form });
// // // // // // // // // // // // // // // // // //       alert("Konten dashboard berhasil diperbarui!");
// // // // // // // // // // // // // // // // // //       router.push('/'); // Kembali ke dashboard setelah simpan
// // // // // // // // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // // // // // // // //       alert("Gagal menyimpan perubahan");
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // //     <Protected roles={['FACILITATOR', 'SUPER_ADMIN']}>
// // // // // // // // // // // // // // // // // //       <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8 pb-20">
// // // // // // // // // // // // // // // // // //         <div className="flex justify-between items-center">
// // // // // // // // // // // // // // // // // //           <h1 className="text-2xl font-bold text-gray-800">CMS Pengaturan Dashboard</h1>
// // // // // // // // // // // // // // // // // //           <button onClick={() => router.push('/')} className="text-gray-500 hover:text-red-700 font-medium">
// // // // // // // // // // // // // // // // // //             Batal
// // // // // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // // // //         {/* 1. PENGATURAN SLIDE FOTO */}
// // // // // // // // // // // // // // // // // //         <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
// // // // // // // // // // // // // // // // // //           <h2 className="font-bold text-lg text-red-700 border-b pb-2">Foto Slide (Carousel)</h2>
// // // // // // // // // // // // // // // // // //           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
// // // // // // // // // // // // // // // // // //             {form.slides?.map((url: string, i: number) => (
// // // // // // // // // // // // // // // // // //               <div key={i} className="relative group aspect-video rounded-xl overflow-hidden border bg-gray-100">
// // // // // // // // // // // // // // // // // //                 <img src={url} className="w-full h-full object-cover" alt="preview slide" />
// // // // // // // // // // // // // // // // // //                 <button 
// // // // // // // // // // // // // // // // // //                   onClick={() => removeSlide(i)}
// // // // // // // // // // // // // // // // // //                   className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
// // // // // // // // // // // // // // // // // //                   title="Hapus Foto"
// // // // // // // // // // // // // // // // // //                 >
// // // // // // // // // // // // // // // // // //                   ✕
// // // // // // // // // // // // // // // // // //                 </button>
// // // // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // // // //             ))}
            
// // // // // // // // // // // // // // // // // //             {/* Tombol Tambah Slide */}
// // // // // // // // // // // // // // // // // //             <label className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video transition-colors">
// // // // // // // // // // // // // // // // // //               <span className="text-3xl text-gray-400 mb-1">{uploading ? '...' : '+'}</span>
// // // // // // // // // // // // // // // // // //               <span className="text-xs font-bold text-gray-400 uppercase">Upload Slide</span>
// // // // // // // // // // // // // // // // // //               <input type="file" className="hidden" accept="image/*" onChange={handleSlideUpload} disabled={uploading} title="Pilih foto slide" />
// // // // // // // // // // // // // // // // // //             </label>
// // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // // // //         {/* 2. EDIT TEKS HERO */}
// // // // // // // // // // // // // // // // // //         <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
// // // // // // // // // // // // // // // // // //           <h2 className="font-bold text-lg text-red-700 border-b pb-2">Bagian Hero Atas</h2>
// // // // // // // // // // // // // // // // // //           <div>
// // // // // // // // // // // // // // // // // //             <label htmlFor="heroTitle" className="text-xs font-bold text-gray-500 uppercase">Judul Utama</label>
// // // // // // // // // // // // // // // // // //             <input 
// // // // // // // // // // // // // // // // // //               id="heroTitle"
// // // // // // // // // // // // // // // // // //               className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-red-500 outline-none" 
// // // // // // // // // // // // // // // // // //               value={form.heroTitle} 
// // // // // // // // // // // // // // // // // //               onChange={e => setForm({...form, heroTitle: e.target.value})} 
// // // // // // // // // // // // // // // // // //               title="Input Judul Hero"
// // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // //           <div>
// // // // // // // // // // // // // // // // // //             <label htmlFor="heroDesc" className="text-xs font-bold text-gray-500 uppercase">Deskripsi</label>
// // // // // // // // // // // // // // // // // //             <textarea 
// // // // // // // // // // // // // // // // // //               id="heroDesc"
// // // // // // // // // // // // // // // // // //               className="w-full p-3 border rounded-lg mt-1 h-28 focus:ring-2 focus:ring-red-500 outline-none" 
// // // // // // // // // // // // // // // // // //               value={form.heroDescription} 
// // // // // // // // // // // // // // // // // //               onChange={e => setForm({...form, heroDescription: e.target.value})} 
// // // // // // // // // // // // // // // // // //               title="Input Deskripsi Hero"
// // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // // // //         {/* 3. EDIT FITUR (KARTU) */}
// // // // // // // // // // // // // // // // // //         <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
// // // // // // // // // // // // // // // // // //           <h2 className="font-bold text-lg text-red-700 border-b pb-2">Kartu Informasi (Fitur)</h2>
// // // // // // // // // // // // // // // // // //           <div className="space-y-6">
// // // // // // // // // // // // // // // // // //             {form.features.map((feat: any, idx: number) => (
// // // // // // // // // // // // // // // // // //               <div key={idx} className="p-4 bg-gray-50 rounded-xl border space-y-3">
// // // // // // // // // // // // // // // // // //                 <p className="font-bold text-sm text-gray-400">KARTU {idx + 1}</p>
// // // // // // // // // // // // // // // // // //                 <input 
// // // // // // // // // // // // // // // // // //                   className="w-full p-2 border rounded-lg text-sm font-bold" 
// // // // // // // // // // // // // // // // // //                   placeholder="Judul Fitur" 
// // // // // // // // // // // // // // // // // //                   value={feat.title} 
// // // // // // // // // // // // // // // // // //                   onChange={e => handleFeatureChange(idx, 'title', e.target.value)} 
// // // // // // // // // // // // // // // // // //                   title={`Judul Fitur ${idx+1}`}
// // // // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // // // //                 <textarea 
// // // // // // // // // // // // // // // // // //                   className="w-full p-2 border rounded-lg text-sm h-20" 
// // // // // // // // // // // // // // // // // //                   placeholder="Deskripsi Singkat" 
// // // // // // // // // // // // // // // // // //                   value={feat.description} 
// // // // // // // // // // // // // // // // // //                   onChange={e => handleFeatureChange(idx, 'description', e.target.value)} 
// // // // // // // // // // // // // // // // // //                   title={`Deskripsi Fitur ${idx+1}`}
// // // // // // // // // // // // // // // // // //                 />
// // // // // // // // // // // // // // // // // //               </div>
// // // // // // // // // // // // // // // // // //             ))}
// // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // //         </div>

// // // // // // // // // // // // // // // // // //         {/* TOMBOL AKSI */}
// // // // // // // // // // // // // // // // // //         <button 
// // // // // // // // // // // // // // // // // //           onClick={saveContent} 
// // // // // // // // // // // // // // // // // //           className="w-full bg-red-700 text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-800 transition-all shadow-xl active:scale-[0.98]"
// // // // // // // // // // // // // // // // // //         >
// // // // // // // // // // // // // // // // // //           Simpan Semua Perubahan
// // // // // // // // // // // // // // // // // //         </button>
// // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // //     </Protected>
// // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // // // // // // // // // // export default function AdminContentPage() {
// // // // // // // // // // // // // // // // //   const [slides, setSlides] = useState<string[]>([]);
// // // // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // // // // //   const [uploading, setUploading] = useState(false);

// // // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // // //     loadSlides();
// // // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // // //   const loadSlides = async () => {
// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //       // Ambil data dengan key 'dashboard_slides'
// // // // // // // // // // // // // // // // //       const data = await api('/api/content/dashboard_slides');
// // // // // // // // // // // // // // // // //       // Pastikan data adalah array
// // // // // // // // // // // // // // // // //       setSlides(Array.isArray(data) ? data : []);
// // // // // // // // // // // // // // // // //     } catch (e) {
// // // // // // // // // // // // // // // // //       console.error(e);
// // // // // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // // // // // // // // // //     setUploading(true);
// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //       const fd = new FormData();
// // // // // // // // // // // // // // // // //       fd.append('file', e.target.files[0]);
      
// // // // // // // // // // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // // // // // // // // // //       const newUrl = res.url || res.file?.url; // Sesuaikan dengan response backend upload
      
// // // // // // // // // // // // // // // // //       if (newUrl) {
// // // // // // // // // // // // // // // // //         const newSlides = [...slides, newUrl];
// // // // // // // // // // // // // // // // //         setSlides(newSlides);
// // // // // // // // // // // // // // // // //         // Auto save setelah upload
// // // // // // // // // // // // // // // // //         await saveSlides(newSlides);
// // // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // // //     } catch (e: any) {
// // // // // // // // // // // // // // // // //       alert("Gagal upload: " + e.message);
// // // // // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // // // // //       setUploading(false);
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   const removeSlide = async (index: number) => {
// // // // // // // // // // // // // // // // //     if(!confirm("Hapus slide ini?")) return;
// // // // // // // // // // // // // // // // //     const newSlides = slides.filter((_, i) => i !== index);
// // // // // // // // // // // // // // // // //     setSlides(newSlides);
// // // // // // // // // // // // // // // // //     await saveSlides(newSlides);
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   const saveSlides = async (data: string[]) => {
// // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // //       await api('/api/content', {
// // // // // // // // // // // // // // // // //         method: 'POST',
// // // // // // // // // // // // // // // // //         body: { key: 'dashboard_slides', value: data }
// // // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // // //     } catch (e: any) {
// // // // // // // // // // // // // // // // //       alert("Gagal menyimpan: " + e.message);
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6">
// // // // // // // // // // // // // // // // //         <h1 className="text-2xl font-bold mb-6 text-gray-800">CMS Pengaturan Dashboard</h1>
        
// // // // // // // // // // // // // // // // //         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // // // // // //           <h2 className="text-lg font-bold text-red-700 mb-4">Foto Slide (Carousel)</h2>
          
// // // // // // // // // // // // // // // // //           {loading ? (
// // // // // // // // // // // // // // // // //             <div className="text-center py-10">Loading...</div>
// // // // // // // // // // // // // // // // //           ) : (
// // // // // // // // // // // // // // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// // // // // // // // // // // // // // // // //               {slides.map((url, idx) => (
// // // // // // // // // // // // // // // // //                 <div key={idx} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border">
// // // // // // // // // // // // // // // // //                   {/* FIX: Gunakan getImageUrl disini agar preview muncul */}
// // // // // // // // // // // // // // // // //                   <img 
// // // // // // // // // // // // // // // // //                     src={getImageUrl(url)} 
// // // // // // // // // // // // // // // // //                     className="w-full h-full object-cover" 
// // // // // // // // // // // // // // // // //                     alt={`Slide ${idx + 1}`} 
// // // // // // // // // // // // // // // // //                   />
// // // // // // // // // // // // // // // // //                   <button 
// // // // // // // // // // // // // // // // //                     onClick={() => removeSlide(idx)}
// // // // // // // // // // // // // // // // //                     className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs"
// // // // // // // // // // // // // // // // //                   >
// // // // // // // // // // // // // // // // //                     🗑️ Hapus
// // // // // // // // // // // // // // // // //                   </button>
// // // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // // //               ))}

// // // // // // // // // // // // // // // // //               {/* Upload Button Placeholder */}
// // // // // // // // // // // // // // // // //               <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video transition-colors">
// // // // // // // // // // // // // // // // //                 <span className="text-4xl text-gray-300 mb-2">+</span>
// // // // // // // // // // // // // // // // //                 <span className="text-sm text-gray-500 font-bold">{uploading ? 'Mengupload...' : 'UPLOAD SLIDE'}</span>
// // // // // // // // // // // // // // // // //                 <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
// // // // // // // // // // // // // // // // //               </label>
// // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // //           )}
          
// // // // // // // // // // // // // // // // //           <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded">
// // // // // // // // // // // // // // // // //             💡 <strong>Tips:</strong> Gunakan gambar dengan rasio 16:9 (Landscape) untuk hasil terbaik di halaman dashboard. Perubahan tersimpan otomatis.
// // // // // // // // // // // // // // // // //           </p>
// // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // //     </Protected>
// // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // // // // // // // // // export default function AdminContentPage() {
// // // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // // // //   const [saving, setSaving] = useState(false);
// // // // // // // // // // // // // // // //   const [uploading, setUploading] = useState(false);

// // // // // // // // // // // // // // // //   // State untuk menyimpan semua data konten
// // // // // // // // // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // // // // // // // // //     heroTitle: '',
// // // // // // // // // // // // // // // //     heroDescription: '',
// // // // // // // // // // // // // // // //     slides: [] as string[],
// // // // // // // // // // // // // // // //     features: [] as { title: string; description: string }[]
// // // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // // //     loadContent();
// // // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // // //   const loadContent = async () => {
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       const data = await api('/api/content');
// // // // // // // // // // // // // // // //       setFormData({
// // // // // // // // // // // // // // // //         heroTitle: data.heroTitle || '',
// // // // // // // // // // // // // // // //         heroDescription: data.heroDescription || '',
// // // // // // // // // // // // // // // //         slides: data.slides || [],
// // // // // // // // // // // // // // // //         features: data.features || [
// // // // // // // // // // // // // // // //             { title: '', description: '' },
// // // // // // // // // // // // // // // //             { title: '', description: '' },
// // // // // // // // // // // // // // // //             { title: '', description: '' }
// // // // // // // // // // // // // // // //         ]
// // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // //     } catch (e) {
// // // // // // // // // // // // // // // //       console.error(e);
// // // // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Handler Upload Slide
// // // // // // // // // // // // // // // //   const handleUploadSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // // // // // // // // //     setUploading(true);
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       const fd = new FormData();
// // // // // // // // // // // // // // // //       fd.append('file', e.target.files[0]);
      
// // // // // // // // // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // // // // // // // // //       const newUrl = res.url || res.file?.url;
      
// // // // // // // // // // // // // // // //       if (newUrl) {
// // // // // // // // // // // // // // // //         // Tambahkan ke state slides (belum disimpan ke DB sampai tombol Simpan diklik)
// // // // // // // // // // // // // // // //         setFormData(prev => ({
// // // // // // // // // // // // // // // //             ...prev,
// // // // // // // // // // // // // // // //             slides: [...prev.slides, newUrl]
// // // // // // // // // // // // // // // //         }));
// // // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // // //     } catch (e: any) {
// // // // // // // // // // // // // // // //       alert("Gagal upload: " + e.message);
// // // // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // // // //       setUploading(false);
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Handler Hapus Slide
// // // // // // // // // // // // // // // //   const removeSlide = (index: number) => {
// // // // // // // // // // // // // // // //     if(!confirm("Hapus slide ini?")) return;
// // // // // // // // // // // // // // // //     const newSlides = formData.slides.filter((_, i) => i !== index);
// // // // // // // // // // // // // // // //     setFormData(prev => ({ ...prev, slides: newSlides }));
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Handler Simpan Semua Data
// // // // // // // // // // // // // // // //   const handleSave = async (e: React.FormEvent) => {
// // // // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // // // //     setSaving(true);
// // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // //       // Menggunakan Method PUT sesuai route backend
// // // // // // // // // // // // // // // //       await api('/api/content', {
// // // // // // // // // // // // // // // //         method: 'PUT',
// // // // // // // // // // // // // // // //         body: formData
// // // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // // //       alert("Pengaturan Berhasil Disimpan! 🎉");
// // // // // // // // // // // // // // // //     } catch (e: any) {
// // // // // // // // // // // // // // // //       alert("Gagal menyimpan: " + e.message);
// // // // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // // // //       setSaving(false);
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   // Handler ubah text feature
// // // // // // // // // // // // // // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // // // // // // // // // // // // // //       const newFeatures = [...formData.features];
// // // // // // // // // // // // // // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // // // // // // // // // // // // // //       setFormData({ ...formData, features: newFeatures });
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 pb-24">
// // // // // // // // // // // // // // // //         <div className="flex justify-between items-center mb-6">
// // // // // // // // // // // // // // // //             <h1 className="text-2xl font-bold text-gray-800">CMS Pengaturan Dashboard</h1>
// // // // // // // // // // // // // // // //             <button 
// // // // // // // // // // // // // // // //                 onClick={handleSave} 
// // // // // // // // // // // // // // // //                 disabled={saving}
// // // // // // // // // // // // // // // //                 className="bg-red-700 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md disabled:opacity-50 flex items-center gap-2"
// // // // // // // // // // // // // // // //             >
// // // // // // // // // // // // // // // //                 {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
// // // // // // // // // // // // // // // //             </button>
// // // // // // // // // // // // // // // //         </div>
        
// // // // // // // // // // // // // // // //         <form onSubmit={handleSave} className="space-y-8">
            
// // // // // // // // // // // // // // // //             {/* 1. BAGIAN SLIDE FOTO */}
// // // // // // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Foto Slide (Carousel)</h2>
                
// // // // // // // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // // // // // // // // // // // // //                     {formData.slides.map((url, idx) => (
// // // // // // // // // // // // // // // //                         <div key={idx} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border">
// // // // // // // // // // // // // // // //                             <img 
// // // // // // // // // // // // // // // //                                 src={getImageUrl(url)} 
// // // // // // // // // // // // // // // //                                 className="w-full h-full object-cover" 
// // // // // // // // // // // // // // // //                                 alt={`Slide ${idx + 1}`} 
// // // // // // // // // // // // // // // //                             />
// // // // // // // // // // // // // // // //                             <button 
// // // // // // // // // // // // // // // //                                 type="button"
// // // // // // // // // // // // // // // //                                 onClick={() => removeSlide(idx)}
// // // // // // // // // // // // // // // //                                 className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs shadow-sm hover:scale-110"
// // // // // // // // // // // // // // // //                                 title="Hapus Foto"
// // // // // // // // // // // // // // // //                             >
// // // // // // // // // // // // // // // //                                 🗑️
// // // // // // // // // // // // // // // //                             </button>
// // // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // // //                     ))}

// // // // // // // // // // // // // // // //                     {/* Tombol Upload */}
// // // // // // // // // // // // // // // //                     <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video transition-colors group">
// // // // // // // // // // // // // // // //                         <span className="text-4xl text-gray-300 group-hover:text-red-400 transition-colors">+</span>
// // // // // // // // // // // // // // // //                         <span className="text-sm text-gray-500 font-bold mt-2">{uploading ? 'Mengupload...' : 'TAMBAH SLIDE'}</span>
// // // // // // // // // // // // // // // //                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadSlide} disabled={uploading} />
// // // // // // // // // // // // // // // //                     </label>
// // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // //                 <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
// // // // // // // // // // // // // // // //                     ℹ️ Upload foto landscape (Rasio 16:9) untuk hasil terbaik. Klik "Simpan Perubahan" setelah menambah/menghapus foto.
// // // // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // // //             {/* 2. BAGIAN INFO HERO (Judul & Deskripsi) */}
// // // // // // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informasi Utama (Hero Section)</h2>
                
// // // // // // // // // // // // // // // //                 <div className="space-y-4">
// // // // // // // // // // // // // // // //                     <div>
// // // // // // // // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama (Hero Title)</label>
// // // // // // // // // // // // // // // //                         <input 
// // // // // // // // // // // // // // // //                             type="text" 
// // // // // // // // // // // // // // // //                             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
// // // // // // // // // // // // // // // //                             value={formData.heroTitle}
// // // // // // // // // // // // // // // //                             onChange={e => setFormData({...formData, heroTitle: e.target.value})}
// // // // // // // // // // // // // // // //                         />
// // // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // // //                     <div>
// // // // // // // // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // // // // // // // // // // // // // //                         <textarea 
// // // // // // // // // // // // // // // //                             rows={3}
// // // // // // // // // // // // // // // //                             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
// // // // // // // // // // // // // // // //                             value={formData.heroDescription}
// // // // // // // // // // // // // // // //                             onChange={e => setFormData({...formData, heroDescription: e.target.value})}
// // // // // // // // // // // // // // // //                         />
// // // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // // //             {/* 3. BAGIAN FITUR (3 Kotak Bawah) */}
// // // // // // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Info Fitur (3 Kotak)</h2>
                
// // // // // // // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // // // // // // // // // //                     {formData.features.map((feat, idx) => (
// // // // // // // // // // // // // // // //                         <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // // // // // // // // // // // // // // //                             <h3 className="text-sm font-bold text-red-700 mb-2 uppercase">Kotak {idx + 1}</h3>
// // // // // // // // // // // // // // // //                             <div className="space-y-3">
// // // // // // // // // // // // // // // //                                 <div>
// // // // // // // // // // // // // // // //                                     <label className="block text-xs font-bold text-gray-600 mb-1">Judul</label>
// // // // // // // // // // // // // // // //                                     <input 
// // // // // // // // // // // // // // // //                                         type="text" 
// // // // // // // // // // // // // // // //                                         className="w-full border rounded p-2 text-sm"
// // // // // // // // // // // // // // // //                                         value={feat.title}
// // // // // // // // // // // // // // // //                                         onChange={e => handleFeatureChange(idx, 'title', e.target.value)}
// // // // // // // // // // // // // // // //                                     />
// // // // // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // // // // //                                 <div>
// // // // // // // // // // // // // // // //                                     <label className="block text-xs font-bold text-gray-600 mb-1">Deskripsi</label>
// // // // // // // // // // // // // // // //                                     <textarea 
// // // // // // // // // // // // // // // //                                         rows={2}
// // // // // // // // // // // // // // // //                                         className="w-full border rounded p-2 text-sm"
// // // // // // // // // // // // // // // //                                         value={feat.description}
// // // // // // // // // // // // // // // //                                         onChange={e => handleFeatureChange(idx, 'description', e.target.value)}
// // // // // // // // // // // // // // // //                                     />
// // // // // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // // //         </form>
// // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // //     </Protected>
// // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // // // // // // // // export default function AdminContentPage() {
// // // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // // //   const [saving, setSaving] = useState(false);
// // // // // // // // // // // // // // //   const [uploading, setUploading] = useState(false);

// // // // // // // // // // // // // // //   // State untuk menyimpan semua data konten
// // // // // // // // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // // // // // // // //     heroTitle: '',
// // // // // // // // // // // // // // //     heroDescription: '',
// // // // // // // // // // // // // // //     slides: [] as string[],
// // // // // // // // // // // // // // //     features: [] as { title: string; description: string }[]
// // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // // //     loadContent();
// // // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // // //   const loadContent = async () => {
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const data = await api('/api/content');
// // // // // // // // // // // // // // //       setFormData({
// // // // // // // // // // // // // // //         heroTitle: data.heroTitle || '',
// // // // // // // // // // // // // // //         heroDescription: data.heroDescription || '',
// // // // // // // // // // // // // // //         slides: data.slides || [],
// // // // // // // // // // // // // // //         features: data.features || [
// // // // // // // // // // // // // // //             { title: '', description: '' },
// // // // // // // // // // // // // // //             { title: '', description: '' },
// // // // // // // // // // // // // // //             { title: '', description: '' }
// // // // // // // // // // // // // // //         ]
// // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // //     } catch (e) {
// // // // // // // // // // // // // // //       console.error(e);
// // // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Handler Upload Slide
// // // // // // // // // // // // // // //   const handleUploadSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // // // // // // // //     setUploading(true);
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       const fd = new FormData();
// // // // // // // // // // // // // // //       fd.append('file', e.target.files[0]);
      
// // // // // // // // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // // // // // // // //       const newUrl = res.url || res.file?.url;
      
// // // // // // // // // // // // // // //       if (newUrl) {
// // // // // // // // // // // // // // //         setFormData(prev => ({
// // // // // // // // // // // // // // //             ...prev,
// // // // // // // // // // // // // // //             slides: [...prev.slides, newUrl]
// // // // // // // // // // // // // // //         }));
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     } catch (e: any) {
// // // // // // // // // // // // // // //       alert("Gagal upload: " + e.message);
// // // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // // //       setUploading(false);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Handler Hapus Slide
// // // // // // // // // // // // // // //   const removeSlide = (index: number) => {
// // // // // // // // // // // // // // //     if(!confirm("Hapus slide ini?")) return;
// // // // // // // // // // // // // // //     const newSlides = formData.slides.filter((_, i) => i !== index);
// // // // // // // // // // // // // // //     setFormData(prev => ({ ...prev, slides: newSlides }));
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Handler Simpan Semua Data
// // // // // // // // // // // // // // //   const handleSave = async (e: React.FormEvent) => {
// // // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // // //     setSaving(true);
// // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // //       await api('/api/content', {
// // // // // // // // // // // // // // //         method: 'PUT',
// // // // // // // // // // // // // // //         body: formData
// // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // //       alert("Pengaturan Berhasil Disimpan! 🎉");
// // // // // // // // // // // // // // //     } catch (e: any) {
// // // // // // // // // // // // // // //       alert("Gagal menyimpan: " + e.message);
// // // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // // //       setSaving(false);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   // Handler ubah text feature
// // // // // // // // // // // // // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // // // // // // // // // // // // //       const newFeatures = [...formData.features];
// // // // // // // // // // // // // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // // // // // // // // // // // // //       setFormData({ ...formData, features: newFeatures });
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 pb-24">
// // // // // // // // // // // // // // //         <div className="flex justify-between items-center mb-6">
// // // // // // // // // // // // // // //             <h1 className="text-2xl font-bold text-gray-800">CMS Pengaturan Dashboard</h1>
// // // // // // // // // // // // // // //             <button 
// // // // // // // // // // // // // // //                 onClick={handleSave} 
// // // // // // // // // // // // // // //                 disabled={saving}
// // // // // // // // // // // // // // //                 className="bg-red-700 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md disabled:opacity-50 flex items-center gap-2"
// // // // // // // // // // // // // // //             >
// // // // // // // // // // // // // // //                 {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
// // // // // // // // // // // // // // //             </button>
// // // // // // // // // // // // // // //         </div>
        
// // // // // // // // // // // // // // //         <form onSubmit={handleSave} className="space-y-8">
            
// // // // // // // // // // // // // // //             {/* 1. BAGIAN SLIDE FOTO */}
// // // // // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Foto Slide (Carousel)</h2>
                
// // // // // // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // // // // // // // // // // // //                     {formData.slides.map((url, idx) => (
// // // // // // // // // // // // // // //                         <div key={idx} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border">
// // // // // // // // // // // // // // //                             <img 
// // // // // // // // // // // // // // //                                 src={getImageUrl(url)} 
// // // // // // // // // // // // // // //                                 className="w-full h-full object-cover" 
// // // // // // // // // // // // // // //                                 alt={`Slide ${idx + 1}`} 
// // // // // // // // // // // // // // //                             />
// // // // // // // // // // // // // // //                             <button 
// // // // // // // // // // // // // // //                                 type="button"
// // // // // // // // // // // // // // //                                 onClick={() => removeSlide(idx)}
// // // // // // // // // // // // // // //                                 className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs shadow-sm hover:scale-110"
// // // // // // // // // // // // // // //                                 title="Hapus Foto"
// // // // // // // // // // // // // // //                                 aria-label={`Hapus Slide ${idx + 1}`}
// // // // // // // // // // // // // // //                             >
// // // // // // // // // // // // // // //                                 🗑️
// // // // // // // // // // // // // // //                             </button>
// // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // //                     ))}

// // // // // // // // // // // // // // //                     {/* Tombol Upload */}
// // // // // // // // // // // // // // //                     <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video transition-colors group">
// // // // // // // // // // // // // // //                         <span className="text-4xl text-gray-300 group-hover:text-red-400 transition-colors">+</span>
// // // // // // // // // // // // // // //                         <span className="text-sm text-gray-500 font-bold mt-2">{uploading ? 'Mengupload...' : 'TAMBAH SLIDE'}</span>
                        
// // // // // // // // // // // // // // //                         {/* --- FIX ACCESSIBILITY: Ditambahkan aria-label & title --- */}
// // // // // // // // // // // // // // //                         <input 
// // // // // // // // // // // // // // //                             type="file" 
// // // // // // // // // // // // // // //                             className="hidden" 
// // // // // // // // // // // // // // //                             accept="image/*" 
// // // // // // // // // // // // // // //                             onChange={handleUploadSlide} 
// // // // // // // // // // // // // // //                             disabled={uploading}
// // // // // // // // // // // // // // //                             aria-label="Upload Slide Baru"
// // // // // // // // // // // // // // //                             title="Upload Slide Baru"
// // // // // // // // // // // // // // //                         />
// // // // // // // // // // // // // // //                     </label>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //                 <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
// // // // // // // // // // // // // // //                     ℹ️ Upload foto landscape (Rasio 16:9) untuk hasil terbaik. Klik "Simpan Perubahan" setelah menambah/menghapus foto.
// // // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // //             {/* 2. BAGIAN INFO HERO (Judul & Deskripsi) */}
// // // // // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informasi Utama (Hero Section)</h2>
                
// // // // // // // // // // // // // // //                 <div className="space-y-4">
// // // // // // // // // // // // // // //                     <div>
// // // // // // // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama (Hero Title)</label>
// // // // // // // // // // // // // // //                         {/* --- FIX ACCESSIBILITY --- */}
// // // // // // // // // // // // // // //                         <input 
// // // // // // // // // // // // // // //                             type="text" 
// // // // // // // // // // // // // // //                             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
// // // // // // // // // // // // // // //                             value={formData.heroTitle}
// // // // // // // // // // // // // // //                             onChange={e => setFormData({...formData, heroTitle: e.target.value})}
// // // // // // // // // // // // // // //                             aria-label="Input Judul Utama"
// // // // // // // // // // // // // // //                             placeholder="Masukkan Judul Dashboard"
// // // // // // // // // // // // // // //                         />
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                     <div>
// // // // // // // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // // // // // // // // // // // // //                         {/* --- FIX ACCESSIBILITY --- */}
// // // // // // // // // // // // // // //                         <textarea 
// // // // // // // // // // // // // // //                             rows={3}
// // // // // // // // // // // // // // //                             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
// // // // // // // // // // // // // // //                             value={formData.heroDescription}
// // // // // // // // // // // // // // //                             onChange={e => setFormData({...formData, heroDescription: e.target.value})}
// // // // // // // // // // // // // // //                             aria-label="Input Deskripsi Singkat"
// // // // // // // // // // // // // // //                             placeholder="Masukkan Deskripsi Singkat"
// // // // // // // // // // // // // // //                         />
// // // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // //             {/* 3. BAGIAN FITUR (3 Kotak Bawah) */}
// // // // // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Info Fitur (3 Kotak)</h2>
                
// // // // // // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // // // // // // // // //                     {formData.features.map((feat, idx) => (
// // // // // // // // // // // // // // //                         <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // // // // // // // // // // // // // //                             <h3 className="text-sm font-bold text-red-700 mb-2 uppercase">Kotak {idx + 1}</h3>
// // // // // // // // // // // // // // //                             <div className="space-y-3">
// // // // // // // // // // // // // // //                                 <div>
// // // // // // // // // // // // // // //                                     <label className="block text-xs font-bold text-gray-600 mb-1">Judul</label>
// // // // // // // // // // // // // // //                                     {/* --- FIX ACCESSIBILITY --- */}
// // // // // // // // // // // // // // //                                     <input 
// // // // // // // // // // // // // // //                                         type="text" 
// // // // // // // // // // // // // // //                                         className="w-full border rounded p-2 text-sm"
// // // // // // // // // // // // // // //                                         value={feat.title}
// // // // // // // // // // // // // // //                                         onChange={e => handleFeatureChange(idx, 'title', e.target.value)}
// // // // // // // // // // // // // // //                                         aria-label={`Judul Fitur ${idx + 1}`}
// // // // // // // // // // // // // // //                                         placeholder="Judul Fitur"
// // // // // // // // // // // // // // //                                     />
// // // // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // // // //                                 <div>
// // // // // // // // // // // // // // //                                     <label className="block text-xs font-bold text-gray-600 mb-1">Deskripsi</label>
// // // // // // // // // // // // // // //                                     {/* --- FIX ACCESSIBILITY --- */}
// // // // // // // // // // // // // // //                                     <textarea 
// // // // // // // // // // // // // // //                                         rows={2}
// // // // // // // // // // // // // // //                                         className="w-full border rounded p-2 text-sm"
// // // // // // // // // // // // // // //                                         value={feat.description}
// // // // // // // // // // // // // // //                                         onChange={e => handleFeatureChange(idx, 'description', e.target.value)}
// // // // // // // // // // // // // // //                                         aria-label={`Deskripsi Fitur ${idx + 1}`}
// // // // // // // // // // // // // // //                                         placeholder="Deskripsi Fitur"
// // // // // // // // // // // // // // //                                     />
// // // // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // //         </form>
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //     </Protected>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // // // // import { useRouter } from 'next/navigation'; // Import Router untuk redirect
// // // // // // // // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // // // // // // // export default function AdminContentPage() {
// // // // // // // // // // // // // //   const router = useRouter();
// // // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // // //   const [saving, setSaving] = useState(false);
// // // // // // // // // // // // // //   const [uploading, setUploading] = useState(false);

// // // // // // // // // // // // // //   // State Data Lengkap (Slide + Teks)
// // // // // // // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // // // // // // //     heroTitle: '',
// // // // // // // // // // // // // //     heroDescription: '',
// // // // // // // // // // // // // //     slides: [] as string[],
// // // // // // // // // // // // // //     features: [] as { title: string; description: string }[]
// // // // // // // // // // // // // //   });

// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     loadContent();
// // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // //   const loadContent = async () => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const data = await api('/api/content');
// // // // // // // // // // // // // //       setFormData({
// // // // // // // // // // // // // //         heroTitle: data.heroTitle || '',
// // // // // // // // // // // // // //         heroDescription: data.heroDescription || '',
// // // // // // // // // // // // // //         slides: data.slides || [],
// // // // // // // // // // // // // //         features: data.features?.length ? data.features : [
// // // // // // // // // // // // // //             { title: '', description: '' },
// // // // // // // // // // // // // //             { title: '', description: '' },
// // // // // // // // // // // // // //             { title: '', description: '' }
// // // // // // // // // // // // // //         ]
// // // // // // // // // // // // // //       });
// // // // // // // // // // // // // //     } catch (e) {
// // // // // // // // // // // // // //       console.error(e);
// // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // Upload Slide
// // // // // // // // // // // // // //   const handleUploadSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // // // // // // //     setUploading(true);
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const fd = new FormData();
// // // // // // // // // // // // // //       fd.append('file', e.target.files[0]);
      
// // // // // // // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // // // // // // //       const newUrl = res.url || res.file?.url;
      
// // // // // // // // // // // // // //       if (newUrl) {
// // // // // // // // // // // // // //         // Masukkan URL gambar baru ke state slides
// // // // // // // // // // // // // //         setFormData(prev => ({
// // // // // // // // // // // // // //             ...prev,
// // // // // // // // // // // // // //             slides: [...prev.slides, newUrl]
// // // // // // // // // // // // // //         }));
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     } catch (e: any) {
// // // // // // // // // // // // // //       alert("Gagal upload: " + e.message);
// // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // //       setUploading(false);
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // Hapus Slide
// // // // // // // // // // // // // //   const removeSlide = (index: number) => {
// // // // // // // // // // // // // //     if(!confirm("Hapus slide ini?")) return;
// // // // // // // // // // // // // //     const newSlides = formData.slides.filter((_, i) => i !== index);
// // // // // // // // // // // // // //     setFormData(prev => ({ ...prev, slides: newSlides }));
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // Ubah Teks Fitur (3 Kotak Bawah)
// // // // // // // // // // // // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // // // // // // // // // // // //       const newFeatures = [...formData.features];
// // // // // // // // // // // // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // // // // // // // // // // // //       setFormData({ ...formData, features: newFeatures });
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // SIMPAN SEMUA PERUBAHAN
// // // // // // // // // // // // // //   const handleSave = async (e: React.FormEvent) => {
// // // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // // //     setSaving(true);
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       await api('/api/content', {
// // // // // // // // // // // // // //         method: 'PUT',
// // // // // // // // // // // // // //         body: formData
// // // // // // // // // // // // // //       });
// // // // // // // // // // // // // //       alert("Pengaturan Berhasil Disimpan! Mengalihkan ke Halaman Utama...");
// // // // // // // // // // // // // //       router.push('/'); // Redirect ke halaman depan agar user melihat hasil
// // // // // // // // // // // // // //     } catch (e: any) {
// // // // // // // // // // // // // //       alert("Gagal menyimpan: " + e.message);
// // // // // // // // // // // // // //     } finally {
// // // // // // // // // // // // // //       setSaving(false);
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 pb-24">
        
// // // // // // // // // // // // // //         {/* Header dengan Tombol Simpan */}
// // // // // // // // // // // // // //         <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border sticky top-4 z-50">
// // // // // // // // // // // // // //             <h1 className="text-xl font-bold text-gray-800">CMS Pengaturan Dashboard</h1>
// // // // // // // // // // // // // //             <button 
// // // // // // // // // // // // // //                 onClick={handleSave} 
// // // // // // // // // // // // // //                 disabled={saving}
// // // // // // // // // // // // // //                 className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md disabled:opacity-50 flex items-center gap-2"
// // // // // // // // // // // // // //             >
// // // // // // // // // // // // // //                 {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
// // // // // // // // // // // // // //             </button>
// // // // // // // // // // // // // //         </div>
        
// // // // // // // // // // // // // //         <form onSubmit={handleSave} className="space-y-8">
            
// // // // // // // // // // // // // //             {/* 1. SLIDE CAROUSEL */}
// // // // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Foto Slide (Carousel)</h2>
                
// // // // // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // // // // // // // // // // //                     {formData.slides.map((url, idx) => (
// // // // // // // // // // // // // //                         <div key={idx} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border">
// // // // // // // // // // // // // //                             {/* PREVIEW GAMBAR (Menggunakan getImageUrl) */}
// // // // // // // // // // // // // //                             <img 
// // // // // // // // // // // // // //                                 src={getImageUrl(url)} 
// // // // // // // // // // // // // //                                 className="w-full h-full object-cover" 
// // // // // // // // // // // // // //                                 alt={`Slide ${idx + 1}`} 
// // // // // // // // // // // // // //                             />
// // // // // // // // // // // // // //                             <button 
// // // // // // // // // // // // // //                                 type="button"
// // // // // // // // // // // // // //                                 onClick={() => removeSlide(idx)}
// // // // // // // // // // // // // //                                 className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs shadow-sm hover:scale-110"
// // // // // // // // // // // // // //                                 title="Hapus Foto"
// // // // // // // // // // // // // //                             >
// // // // // // // // // // // // // //                                 🗑️
// // // // // // // // // // // // // //                             </button>
// // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // //                     ))}

// // // // // // // // // // // // // //                     {/* Tombol Upload */}
// // // // // // // // // // // // // //                     <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video transition-colors group">
// // // // // // // // // // // // // //                         <span className="text-4xl text-gray-300 group-hover:text-red-400 transition-colors">+</span>
// // // // // // // // // // // // // //                         <span className="text-sm text-gray-500 font-bold mt-2">{uploading ? 'Mengupload...' : 'TAMBAH SLIDE'}</span>
// // // // // // // // // // // // // //                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadSlide} disabled={uploading} />
// // // // // // // // // // // // // //                     </label>
// // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // //                 <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
// // // // // // // // // // // // // //                     ℹ️ Upload foto landscape (Rasio 16:9). Gambar yang diupload akan muncul di preview, tapi <strong>belum tersimpan</strong> ke halaman utama sampai Anda menekan tombol "Simpan Perubahan".
// // // // // // // // // // // // // //                 </p>
// // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // //             {/* 2. INFORMASI UTAMA (HERO) */}
// // // // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informasi Utama (Hero Section)</h2>
                
// // // // // // // // // // // // // //                 <div className="space-y-4">
// // // // // // // // // // // // // //                     <div>
// // // // // // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // // // // // // // // // // // // //                         <input 
// // // // // // // // // // // // // //                             type="text" 
// // // // // // // // // // // // // //                             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
// // // // // // // // // // // // // //                             value={formData.heroTitle}
// // // // // // // // // // // // // //                             onChange={e => setFormData({...formData, heroTitle: e.target.value})}
// // // // // // // // // // // // // //                         />
// // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // //                     <div>
// // // // // // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // // // // // // // // // // // //                         <textarea 
// // // // // // // // // // // // // //                             rows={3}
// // // // // // // // // // // // // //                             className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
// // // // // // // // // // // // // //                             value={formData.heroDescription}
// // // // // // // // // // // // // //                             onChange={e => setFormData({...formData, heroDescription: e.target.value})}
// // // // // // // // // // // // // //                         />
// // // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // //             {/* 3. FITUR (3 KOTAK) */}
// // // // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Info Fitur (3 Kotak Bawah)</h2>
                
// // // // // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // // // // // // // //                     {formData.features.map((feat, idx) => (
// // // // // // // // // // // // // //                         <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // // // // // // // // // // // // //                             <h3 className="text-sm font-bold text-red-700 mb-2 uppercase">Kotak {idx + 1}</h3>
// // // // // // // // // // // // // //                             <div className="space-y-3">
// // // // // // // // // // // // // //                                 <div>
// // // // // // // // // // // // // //                                     <label className="block text-xs font-bold text-gray-600 mb-1">Judul</label>
// // // // // // // // // // // // // //                                     <input 
// // // // // // // // // // // // // //                                         type="text" 
// // // // // // // // // // // // // //                                         className="w-full border rounded p-2 text-sm"
// // // // // // // // // // // // // //                                         value={feat.title}
// // // // // // // // // // // // // //                                         onChange={e => handleFeatureChange(idx, 'title', e.target.value)}
// // // // // // // // // // // // // //                                     />
// // // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // // //                                 <div>
// // // // // // // // // // // // // //                                     <label className="block text-xs font-bold text-gray-600 mb-1">Deskripsi</label>
// // // // // // // // // // // // // //                                     <textarea 
// // // // // // // // // // // // // //                                         rows={2}
// // // // // // // // // // // // // //                                         className="w-full border rounded p-2 text-sm"
// // // // // // // // // // // // // //                                         value={feat.description}
// // // // // // // // // // // // // //                                         onChange={e => handleFeatureChange(idx, 'description', e.target.value)}
// // // // // // // // // // // // // //                                     />
// // // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // // //                             </div>
// // // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // //         </form>
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //     </Protected>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // }
// // // // // // // // // // // // // 'use client';

// // // // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // // // // // // export default function AdminContentPage() {
// // // // // // // // // // // // //   const router = useRouter();
// // // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // // //   const [saving, setSaving] = useState(false);
// // // // // // // // // // // // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // // // // // // // // // // // //   const [uploadingBg, setUploadingBg] = useState(false); // State upload BG

// // // // // // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // // // // // //     heroTitle: '',
// // // // // // // // // // // // //     heroDescription: '',
// // // // // // // // // // // // //     heroBgUrl: '', // State BG Url
// // // // // // // // // // // // //     slides: [] as string[],
// // // // // // // // // // // // //     features: [] as { title: string; description: string }[]
// // // // // // // // // // // // //   });

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     loadContent();
// // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // //   const loadContent = async () => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const data = await api('/api/content');
// // // // // // // // // // // // //       setFormData({
// // // // // // // // // // // // //         heroTitle: data.heroTitle || '',
// // // // // // // // // // // // //         heroDescription: data.heroDescription || '',
// // // // // // // // // // // // //         heroBgUrl: data.heroBgUrl || '',
// // // // // // // // // // // // //         slides: data.slides || [],
// // // // // // // // // // // // //         features: data.features?.length ? data.features : [
// // // // // // // // // // // // //             { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }
// // // // // // // // // // // // //         ]
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Upload Slide
// // // // // // // // // // // // //   const handleUploadSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // // // // // //     setUploadingSlide(true);
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const fd = new FormData();
// // // // // // // // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // // // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, slides: [...prev.slides, newUrl] }));
// // // // // // // // // // // // //     } catch (e: any) { alert("Gagal upload: " + e.message); } finally { setUploadingSlide(false); }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Upload Background Hero (BARU)
// // // // // // // // // // // // //   const handleUploadBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // // // // // //     setUploadingBg(true);
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const fd = new FormData();
// // // // // // // // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // // // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, heroBgUrl: newUrl }));
// // // // // // // // // // // // //     } catch (e: any) { alert("Gagal upload: " + e.message); } finally { setUploadingBg(false); }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const removeSlide = (index: number) => {
// // // // // // // // // // // // //     if(!confirm("Hapus slide ini?")) return;
// // // // // // // // // // // // //     const newSlides = formData.slides.filter((_, i) => i !== index);
// // // // // // // // // // // // //     setFormData(prev => ({ ...prev, slides: newSlides }));
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // // // // // // // // // // //       const newFeatures = [...formData.features];
// // // // // // // // // // // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // // // // // // // // // // //       setFormData({ ...formData, features: newFeatures });
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleSave = async (e: React.FormEvent) => {
// // // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // // //     setSaving(true);
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       await api('/api/content', { method: 'PUT', body: formData });
// // // // // // // // // // // // //       alert("Pengaturan Berhasil Disimpan!");
// // // // // // // // // // // // //       router.push('/');
// // // // // // // // // // // // //     } catch (e: any) { alert("Gagal menyimpan: " + e.message); } finally { setSaving(false); }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 pb-24">
        
// // // // // // // // // // // // //         <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border sticky top-4 z-50">
// // // // // // // // // // // // //             <h1 className="text-xl font-bold text-gray-800">CMS Pengaturan Dashboard</h1>
// // // // // // // // // // // // //             <button onClick={handleSave} disabled={saving} className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md disabled:opacity-50">
// // // // // // // // // // // // //                 {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
// // // // // // // // // // // // //             </button>
// // // // // // // // // // // // //         </div>
        
// // // // // // // // // // // // //         <form onSubmit={handleSave} className="space-y-8">
            
// // // // // // // // // // // // //             {/* 1. INFORMASI UTAMA & BACKGROUND */}
// // // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informasi Utama (Hero Section)</h2>
// // // // // // // // // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // // // // //                         <div>
// // // // // // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // // // // // // // // // // // //                             <input type="text" className="w-full border rounded-lg p-2.5" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} />
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                         <div>
// // // // // // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // // // // // // // // // // //                             <textarea rows={3} className="w-full border rounded-lg p-2.5" value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} />
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                     </div>

// // // // // // // // // // // // //                     {/* UPLOAD BACKGROUND */}
// // // // // // // // // // // // //                     <div>
// // // // // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Background Hero</label>
// // // // // // // // // // // // //                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[150px]">
// // // // // // // // // // // // //                             {formData.heroBgUrl ? (
// // // // // // // // // // // // //                                 <div className="relative w-full h-32 mb-2">
// // // // // // // // // // // // //                                     <img src={getImageUrl(formData.heroBgUrl)} className="w-full h-full object-cover rounded" alt="Hero Bg" />
// // // // // // // // // // // // //                                     <button type="button" onClick={() => setFormData({...formData, heroBgUrl: ''})} className="absolute top-1 right-1 bg-red-600 text-white text-xs p-1 rounded">Hapus</button>
// // // // // // // // // // // // //                                 </div>
// // // // // // // // // // // // //                             ) : (
// // // // // // // // // // // // //                                 <p className="text-sm text-gray-400 mb-2">Belum ada gambar background</p>
// // // // // // // // // // // // //                             )}
// // // // // // // // // // // // //                             <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700">
// // // // // // // // // // // // //                                 {uploadingBg ? 'Mengupload...' : 'Ganti Background'}
// // // // // // // // // // // // //                                 <input type="file" className="hidden" accept="image/*" onChange={handleUploadBg} disabled={uploadingBg} />
// // // // // // // // // // // // //                             </label>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                     </div>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             {/* 2. SLIDE CAROUSEL */}
// // // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Foto Slide (Carousel)</h2>
// // // // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // // // // // //                     {formData.slides.map((url, idx) => (
// // // // // // // // // // // // //                         <div key={idx} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border">
// // // // // // // // // // // // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt={`Slide ${idx}`} />
// // // // // // // // // // // // //                             <button type="button" onClick={() => removeSlide(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">🗑️</button>
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // //                     <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video">
// // // // // // // // // // // // //                         <span className="text-4xl text-gray-300">+</span>
// // // // // // // // // // // // //                         <span className="text-sm text-gray-500 font-bold mt-2">{uploadingSlide ? '...' : 'TAMBAH SLIDE'}</span>
// // // // // // // // // // // // //                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadSlide} disabled={uploadingSlide} />
// // // // // // // // // // // // //                     </label>
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             {/* 3. FITUR */}
// // // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Info Fitur</h2>
// // // // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // // // // // // //                     {formData.features.map((feat, idx) => (
// // // // // // // // // // // // //                         <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // // // // // // // // // // // //                             <h3 className="text-sm font-bold text-red-700 mb-2 uppercase">Kotak {idx + 1}</h3>
// // // // // // // // // // // // //                             <input type="text" className="w-full border rounded p-2 text-sm mb-2" value={feat.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} placeholder="Judul" />
// // // // // // // // // // // // //                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={feat.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} placeholder="Deskripsi" />
// // // // // // // // // // // // //                         </div>
// // // // // // // // // // // // //                     ))}
// // // // // // // // // // // // //                 </div>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //         </form>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </Protected>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // }
// // // // // // // // // // // // 'use client';

// // // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // // // // // export default function AdminContentPage() {
// // // // // // // // // // // //   const router = useRouter();
// // // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // // //   const [saving, setSaving] = useState(false);
// // // // // // // // // // // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // // // // // // // // // // //   const [uploadingBg, setUploadingBg] = useState(false);

// // // // // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // // // // //     heroTitle: '',
// // // // // // // // // // // //     heroDescription: '',
// // // // // // // // // // // //     heroBgUrl: '',
// // // // // // // // // // // //     slides: [] as string[],
// // // // // // // // // // // //     features: [] as { title: string; description: string }[]
// // // // // // // // // // // //   });

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     loadContent();
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   const loadContent = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const data = await api('/api/content');
// // // // // // // // // // // //       setFormData({
// // // // // // // // // // // //         heroTitle: data.heroTitle || '',
// // // // // // // // // // // //         heroDescription: data.heroDescription || '',
// // // // // // // // // // // //         heroBgUrl: data.heroBgUrl || '',
// // // // // // // // // // // //         slides: data.slides || [],
// // // // // // // // // // // //         features: data.features?.length ? data.features : [
// // // // // // // // // // // //             { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }
// // // // // // // // // // // //         ]
// // // // // // // // // // // //       });
// // // // // // // // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Upload Slide
// // // // // // // // // // // //   const handleUploadSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // // // // //     setUploadingSlide(true);
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const fd = new FormData();
// // // // // // // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, slides: [...prev.slides, newUrl] }));
// // // // // // // // // // // //     } catch (e: any) { alert("Gagal upload: " + e.message); } finally { setUploadingSlide(false); }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Upload Background Hero
// // // // // // // // // // // //   const handleUploadBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // // // // //     setUploadingBg(true);
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const fd = new FormData();
// // // // // // // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, heroBgUrl: newUrl }));
// // // // // // // // // // // //     } catch (e: any) { alert("Gagal upload: " + e.message); } finally { setUploadingBg(false); }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const removeSlide = (index: number) => {
// // // // // // // // // // // //     if(!confirm("Hapus slide ini?")) return;
// // // // // // // // // // // //     const newSlides = formData.slides.filter((_, i) => i !== index);
// // // // // // // // // // // //     setFormData(prev => ({ ...prev, slides: newSlides }));
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // // // // // // // // // //       const newFeatures = [...formData.features];
// // // // // // // // // // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // // // // // // // // // //       setFormData({ ...formData, features: newFeatures });
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const handleSave = async (e: React.FormEvent) => {
// // // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // // //     setSaving(true);
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       await api('/api/content', { method: 'PUT', body: formData });
// // // // // // // // // // // //       alert("Pengaturan Berhasil Disimpan!");
// // // // // // // // // // // //       router.push('/');
// // // // // // // // // // // //     } catch (e: any) { alert("Gagal menyimpan: " + e.message); } finally { setSaving(false); }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 pb-24">
        
// // // // // // // // // // // //         <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border sticky top-4 z-50">
// // // // // // // // // // // //             <h1 className="text-xl font-bold text-gray-800">CMS Pengaturan Dashboard</h1>
// // // // // // // // // // // //             <button onClick={handleSave} disabled={saving} className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md disabled:opacity-50">
// // // // // // // // // // // //                 {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
// // // // // // // // // // // //             </button>
// // // // // // // // // // // //         </div>
        
// // // // // // // // // // // //         <form onSubmit={handleSave} className="space-y-8">
            
// // // // // // // // // // // //             {/* 1. INFORMASI UTAMA & BACKGROUND */}
// // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informasi Utama (Hero Section)</h2>
// // // // // // // // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // // // //                         <div>
// // // // // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // // // // // // // // // // //                             {/* FIX ACCESSIBILITY: aria-label */}
// // // // // // // // // // // //                             <input 
// // // // // // // // // // // //                                 type="text" 
// // // // // // // // // // // //                                 className="w-full border rounded-lg p-2.5" 
// // // // // // // // // // // //                                 value={formData.heroTitle} 
// // // // // // // // // // // //                                 onChange={e => setFormData({...formData, heroTitle: e.target.value})} 
// // // // // // // // // // // //                                 aria-label="Judul Utama Hero"
// // // // // // // // // // // //                             />
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                         <div>
// // // // // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // // // // // // // // // //                             {/* FIX ACCESSIBILITY: aria-label */}
// // // // // // // // // // // //                             <textarea 
// // // // // // // // // // // //                                 rows={3} 
// // // // // // // // // // // //                                 className="w-full border rounded-lg p-2.5" 
// // // // // // // // // // // //                                 value={formData.heroDescription} 
// // // // // // // // // // // //                                 onChange={e => setFormData({...formData, heroDescription: e.target.value})} 
// // // // // // // // // // // //                                 aria-label="Deskripsi Singkat Hero"
// // // // // // // // // // // //                             />
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     </div>

// // // // // // // // // // // //                     {/* UPLOAD BACKGROUND */}
// // // // // // // // // // // //                     <div>
// // // // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Background Hero</label>
// // // // // // // // // // // //                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[150px]">
// // // // // // // // // // // //                             {formData.heroBgUrl ? (
// // // // // // // // // // // //                                 <div className="relative w-full h-32 mb-2">
// // // // // // // // // // // //                                     <img src={getImageUrl(formData.heroBgUrl)} className="w-full h-full object-cover rounded" alt="Hero Bg" />
// // // // // // // // // // // //                                     <button type="button" onClick={() => setFormData({...formData, heroBgUrl: ''})} className="absolute top-1 right-1 bg-red-600 text-white text-xs p-1 rounded">Hapus</button>
// // // // // // // // // // // //                                 </div>
// // // // // // // // // // // //                             ) : (
// // // // // // // // // // // //                                 <p className="text-sm text-gray-400 mb-2">Belum ada gambar background</p>
// // // // // // // // // // // //                             )}
// // // // // // // // // // // //                             <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700">
// // // // // // // // // // // //                                 {uploadingBg ? 'Mengupload...' : 'Ganti Background'}
// // // // // // // // // // // //                                 {/* FIX ACCESSIBILITY: aria-label */}
// // // // // // // // // // // //                                 <input 
// // // // // // // // // // // //                                     type="file" 
// // // // // // // // // // // //                                     className="hidden" 
// // // // // // // // // // // //                                     accept="image/*" 
// // // // // // // // // // // //                                     onChange={handleUploadBg} 
// // // // // // // // // // // //                                     disabled={uploadingBg} 
// // // // // // // // // // // //                                     aria-label="Upload Gambar Background"
// // // // // // // // // // // //                                 />
// // // // // // // // // // // //                             </label>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     </div>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* 2. SLIDE CAROUSEL */}
// // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Foto Slide (Carousel)</h2>
// // // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // // // // //                     {formData.slides.map((url, idx) => (
// // // // // // // // // // // //                         <div key={idx} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border">
// // // // // // // // // // // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt={`Slide ${idx}`} />
// // // // // // // // // // // //                             <button 
// // // // // // // // // // // //                                 type="button" 
// // // // // // // // // // // //                                 onClick={() => removeSlide(idx)} 
// // // // // // // // // // // //                                 className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
// // // // // // // // // // // //                                 aria-label={`Hapus Slide ${idx + 1}`}
// // // // // // // // // // // //                             >
// // // // // // // // // // // //                                 🗑️
// // // // // // // // // // // //                             </button>
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     ))}
// // // // // // // // // // // //                     <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video">
// // // // // // // // // // // //                         <span className="text-4xl text-gray-300">+</span>
// // // // // // // // // // // //                         <span className="text-sm text-gray-500 font-bold mt-2">{uploadingSlide ? '...' : 'TAMBAH SLIDE'}</span>
// // // // // // // // // // // //                         {/* FIX ACCESSIBILITY: aria-label */}
// // // // // // // // // // // //                         <input 
// // // // // // // // // // // //                             type="file" 
// // // // // // // // // // // //                             className="hidden" 
// // // // // // // // // // // //                             accept="image/*" 
// // // // // // // // // // // //                             onChange={handleUploadSlide} 
// // // // // // // // // // // //                             disabled={uploadingSlide} 
// // // // // // // // // // // //                             aria-label="Upload Slide Baru"
// // // // // // // // // // // //                         />
// // // // // // // // // // // //                     </label>
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             {/* 3. FITUR */}
// // // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Info Fitur</h2>
// // // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // // // // // //                     {formData.features.map((feat, idx) => (
// // // // // // // // // // // //                         <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // // // // // // // // // // //                             <h3 className="text-sm font-bold text-red-700 mb-2 uppercase">Kotak {idx + 1}</h3>
// // // // // // // // // // // //                             {/* FIX ACCESSIBILITY: aria-label */}
// // // // // // // // // // // //                             <input 
// // // // // // // // // // // //                                 type="text" 
// // // // // // // // // // // //                                 className="w-full border rounded p-2 text-sm mb-2" 
// // // // // // // // // // // //                                 value={feat.title} 
// // // // // // // // // // // //                                 onChange={e => handleFeatureChange(idx, 'title', e.target.value)} 
// // // // // // // // // // // //                                 placeholder="Judul" 
// // // // // // // // // // // //                                 aria-label={`Judul Fitur ${idx + 1}`}
// // // // // // // // // // // //                             />
// // // // // // // // // // // //                             {/* FIX ACCESSIBILITY: aria-label */}
// // // // // // // // // // // //                             <textarea 
// // // // // // // // // // // //                                 rows={2} 
// // // // // // // // // // // //                                 className="w-full border rounded p-2 text-sm" 
// // // // // // // // // // // //                                 value={feat.description} 
// // // // // // // // // // // //                                 onChange={e => handleFeatureChange(idx, 'description', e.target.value)} 
// // // // // // // // // // // //                                 placeholder="Deskripsi" 
// // // // // // // // // // // //                                 aria-label={`Deskripsi Fitur ${idx + 1}`}
// // // // // // // // // // // //                             />
// // // // // // // // // // // //                         </div>
// // // // // // // // // // // //                     ))}
// // // // // // // // // // // //                 </div>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //         </form>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </Protected>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }
// // // // // // // // // // // 'use client';

// // // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // // // // export default function AdminContentPage() {
// // // // // // // // // // //   const router = useRouter();
// // // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // // //   const [saving, setSaving] = useState(false);
// // // // // // // // // // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // // // // // // // // // //   const [uploadingBg, setUploadingBg] = useState(false);

// // // // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // // // //     heroTitle: '',
// // // // // // // // // // //     heroDescription: '',
// // // // // // // // // // //     heroBgUrl: '', // URL Background Hero
// // // // // // // // // // //     slides: [] as string[],
// // // // // // // // // // //     features: [] as { title: string; description: string }[]
// // // // // // // // // // //   });

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     loadContent();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   const loadContent = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       const data = await api('/api/content');
// // // // // // // // // // //       setFormData({
// // // // // // // // // // //         heroTitle: data.heroTitle || '',
// // // // // // // // // // //         heroDescription: data.heroDescription || '',
// // // // // // // // // // //         heroBgUrl: data.heroBgUrl || '',
// // // // // // // // // // //         slides: data.slides || [],
// // // // // // // // // // //         features: data.features?.length ? data.features : [
// // // // // // // // // // //             { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }
// // // // // // // // // // //         ]
// // // // // // // // // // //       });
// // // // // // // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Upload Slide Carousel
// // // // // // // // // // //   const handleUploadSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // // // //     setUploadingSlide(true);
// // // // // // // // // // //     try {
// // // // // // // // // // //       const fd = new FormData();
// // // // // // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, slides: [...prev.slides, newUrl] }));
// // // // // // // // // // //     } catch (e: any) { alert("Gagal upload slide: " + e.message); } finally { setUploadingSlide(false); }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Upload Background Hero
// // // // // // // // // // //   const handleUploadBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // // // //     setUploadingBg(true);
// // // // // // // // // // //     try {
// // // // // // // // // // //       const fd = new FormData();
// // // // // // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, heroBgUrl: newUrl }));
// // // // // // // // // // //     } catch (e: any) { alert("Gagal upload background: " + e.message); } finally { setUploadingBg(false); }
// // // // // // // // // // //   };

// // // // // // // // // // //   const removeSlide = (index: number) => {
// // // // // // // // // // //     if(!confirm("Hapus slide ini?")) return;
// // // // // // // // // // //     const newSlides = formData.slides.filter((_, i) => i !== index);
// // // // // // // // // // //     setFormData(prev => ({ ...prev, slides: newSlides }));
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // // // // // // // // //       const newFeatures = [...formData.features];
// // // // // // // // // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // // // // // // // // //       setFormData({ ...formData, features: newFeatures });
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleSave = async (e: React.FormEvent) => {
// // // // // // // // // // //     e.preventDefault();
// // // // // // // // // // //     setSaving(true);
// // // // // // // // // // //     try {
// // // // // // // // // // //       await api('/api/content', { method: 'PUT', body: formData });
// // // // // // // // // // //       alert("Pengaturan Berhasil Disimpan!");
// // // // // // // // // // //       router.push('/'); // Redirect ke home agar melihat hasil
// // // // // // // // // // //     } catch (e: any) { alert("Gagal menyimpan: " + e.message); } finally { setSaving(false); }
// // // // // // // // // // //   };

// // // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // // // // // // // //   return (
// // // // // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 pb-24">
        
// // // // // // // // // // //         {/* HEADER DENGAN TOMBOL SIMPAN */}
// // // // // // // // // // //         <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border sticky top-4 z-50">
// // // // // // // // // // //             <h1 className="text-xl font-bold text-gray-800">CMS Pengaturan Dashboard</h1>
// // // // // // // // // // //             <button onClick={handleSave} disabled={saving} className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md disabled:opacity-50">
// // // // // // // // // // //                 {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
// // // // // // // // // // //             </button>
// // // // // // // // // // //         </div>
        
// // // // // // // // // // //         <form onSubmit={handleSave} className="space-y-8">
            
// // // // // // // // // // //             {/* 1. INFORMASI UTAMA & BACKGROUND */}
// // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informasi Utama (Hero Section)</h2>
// // // // // // // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // // //                         <div>
// // // // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // // // // // // // // // //                             <input type="text" className="w-full border rounded-lg p-2.5" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} aria-label="Input Judul Utama"/>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                         <div>
// // // // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // // // // // // // // //                             <textarea rows={3} className="w-full border rounded-lg p-2.5" value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} aria-label="Input Deskripsi Singkat"/>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     </div>

// // // // // // // // // // //                     {/* UPLOAD BACKGROUND HERO */}
// // // // // // // // // // //                     <div>
// // // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Background Hero</label>
// // // // // // // // // // //                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[150px]">
// // // // // // // // // // //                             {formData.heroBgUrl ? (
// // // // // // // // // // //                                 <div className="relative w-full h-32 mb-2">
// // // // // // // // // // //                                     <img src={getImageUrl(formData.heroBgUrl)} className="w-full h-full object-cover rounded" alt="Hero Bg" />
// // // // // // // // // // //                                     <button type="button" onClick={() => setFormData({...formData, heroBgUrl: ''})} className="absolute top-1 right-1 bg-red-600 text-white text-xs p-1 rounded">Hapus</button>
// // // // // // // // // // //                                 </div>
// // // // // // // // // // //                             ) : (
// // // // // // // // // // //                                 <p className="text-sm text-gray-400 mb-2">Belum ada gambar background</p>
// // // // // // // // // // //                             )}
// // // // // // // // // // //                             <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700">
// // // // // // // // // // //                                 {uploadingBg ? 'Mengupload...' : 'Ganti Background'}
// // // // // // // // // // //                                 <input type="file" className="hidden" accept="image/*" onChange={handleUploadBg} disabled={uploadingBg} aria-label="Upload Background" />
// // // // // // // // // // //                             </label>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                         <p className="text-xs text-gray-500 mt-2">Gambar ini akan menggantikan warna merah di header.</p>
// // // // // // // // // // //                     </div>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             {/* 2. SLIDE CAROUSEL */}
// // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Foto Slide (Carousel)</h2>
// // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // // // //                     {formData.slides.map((url, idx) => (
// // // // // // // // // // //                         <div key={idx} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border">
// // // // // // // // // // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt={`Slide ${idx}`} />
// // // // // // // // // // //                             <button type="button" onClick={() => removeSlide(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Hapus Slide">🗑️</button>
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     ))}
// // // // // // // // // // //                     <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video">
// // // // // // // // // // //                         <span className="text-4xl text-gray-300">+</span>
// // // // // // // // // // //                         <span className="text-sm text-gray-500 font-bold mt-2">{uploadingSlide ? '...' : 'TAMBAH SLIDE'}</span>
// // // // // // // // // // //                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadSlide} disabled={uploadingSlide} aria-label="Upload Slide Baru" />
// // // // // // // // // // //                     </label>
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             {/* 3. FITUR */}
// // // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Info Fitur (3 Kotak Bawah)</h2>
// // // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // // // // //                     {formData.features.map((feat, idx) => (
// // // // // // // // // // //                         <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // // // // // // // // // //                             <h3 className="text-sm font-bold text-red-700 mb-2 uppercase">Kotak {idx + 1}</h3>
// // // // // // // // // // //                             <input type="text" className="w-full border rounded p-2 text-sm mb-2" value={feat.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} placeholder="Judul" aria-label={`Judul Fitur ${idx+1}`} />
// // // // // // // // // // //                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={feat.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} placeholder="Deskripsi" aria-label={`Deskripsi Fitur ${idx+1}`} />
// // // // // // // // // // //                         </div>
// // // // // // // // // // //                     ))}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //             </div>

// // // // // // // // // // //         </form>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </Protected>
// // // // // // // // // // //   );
// // // // // // // // // // // }
// // // // // // // // // // 'use client';

// // // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // // // export default function AdminContentPage() {
// // // // // // // // // //   const router = useRouter();
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [saving, setSaving] = useState(false);
// // // // // // // // // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // // // // // // // // //   const [uploadingBg, setUploadingBg] = useState(false);

// // // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // // //     heroTitle: '',
// // // // // // // // // //     heroDescription: '',
// // // // // // // // // //     heroBgUrl: '',
// // // // // // // // // //     slides: [] as string[],
// // // // // // // // // //     features: [] as { title: string; description: string }[],
// // // // // // // // // //     // State Footer
// // // // // // // // // //     footer: {
// // // // // // // // // //         about: '',
// // // // // // // // // //         address: '',
// // // // // // // // // //         phone: '',
// // // // // // // // // //         email: '',
// // // // // // // // // //         copyright: '',
// // // // // // // // // //         socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// // // // // // // // // //     }
// // // // // // // // // //   });

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     loadContent();
// // // // // // // // // //   }, []);

// // // // // // // // // //   const loadContent = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const data = await api('/api/content');
// // // // // // // // // //       setFormData({
// // // // // // // // // //         heroTitle: data.heroTitle || '',
// // // // // // // // // //         heroDescription: data.heroDescription || '',
// // // // // // // // // //         heroBgUrl: data.heroBgUrl || '',
// // // // // // // // // //         slides: data.slides || [],
// // // // // // // // // //         features: data.features?.length ? data.features : [
// // // // // // // // // //             { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }
// // // // // // // // // //         ],
// // // // // // // // // //         footer: data.footer || {
// // // // // // // // // //             about: '', address: '', phone: '', email: '', copyright: '',
// // // // // // // // // //             socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// // // // // // // // // //         }
// // // // // // // // // //       });
// // // // // // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // // // // // //   };

// // // // // // // // // //   // Upload Logic
// // // // // // // // // //   const handleUploadSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // // //     setUploadingSlide(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const fd = new FormData();
// // // // // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, slides: [...prev.slides, newUrl] }));
// // // // // // // // // //     } catch (e: any) { alert("Gagal upload slide: " + e.message); } finally { setUploadingSlide(false); }
// // // // // // // // // //   };

// // // // // // // // // //   const handleUploadBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // // //     setUploadingBg(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const fd = new FormData();
// // // // // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, heroBgUrl: newUrl }));
// // // // // // // // // //     } catch (e: any) { alert("Gagal upload background: " + e.message); } finally { setUploadingBg(false); }
// // // // // // // // // //   };

// // // // // // // // // //   const removeSlide = (index: number) => {
// // // // // // // // // //     if(!confirm("Hapus slide ini?")) return;
// // // // // // // // // //     const newSlides = formData.slides.filter((_, i) => i !== index);
// // // // // // // // // //     setFormData(prev => ({ ...prev, slides: newSlides }));
// // // // // // // // // //   };

// // // // // // // // // //   // Text Change Logics
// // // // // // // // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // // // // // // // //       const newFeatures = [...formData.features];
// // // // // // // // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // // // // // // // //       setFormData({ ...formData, features: newFeatures });
// // // // // // // // // //   };

// // // // // // // // // //   const handleFooterChange = (field: string, value: string) => {
// // // // // // // // // //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// // // // // // // // // //   };
  
// // // // // // // // // //   const handleSocialChange = (platform: string, value: string) => {
// // // // // // // // // //       setFormData(prev => ({ 
// // // // // // // // // //           ...prev, 
// // // // // // // // // //           footer: { 
// // // // // // // // // //               ...prev.footer, 
// // // // // // // // // //               socials: { ...prev.footer.socials, [platform]: value } 
// // // // // // // // // //           } 
// // // // // // // // // //       }));
// // // // // // // // // //   };

// // // // // // // // // //   const handleSave = async (e: React.FormEvent) => {
// // // // // // // // // //     e.preventDefault();
// // // // // // // // // //     setSaving(true);
// // // // // // // // // //     try {
// // // // // // // // // //       await api('/api/content', { method: 'PUT', body: formData });
// // // // // // // // // //       alert("Pengaturan Berhasil Disimpan!");
// // // // // // // // // //       router.push('/'); 
// // // // // // // // // //     } catch (e: any) { alert("Gagal menyimpan: " + e.message); } finally { setSaving(false); }
// // // // // // // // // //   };

// // // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // // // // // // //   return (
// // // // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // // //       <div className="max-w-5xl mx-auto p-6 pb-24">
        
// // // // // // // // // //         <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border sticky top-4 z-50">
// // // // // // // // // //             <h1 className="text-xl font-bold text-gray-800">CMS Pengaturan Konten</h1>
// // // // // // // // // //             <button onClick={handleSave} disabled={saving} className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md disabled:opacity-50">
// // // // // // // // // //                 {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
// // // // // // // // // //             </button>
// // // // // // // // // //         </div>
        
// // // // // // // // // //         <form onSubmit={handleSave} className="space-y-8">
            
// // // // // // // // // //             {/* 1. HERO */}
// // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Informasi Utama (Hero Section)</h2>
// // // // // // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // //                         <div>
// // // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // // // // // // // // //                             <input type="text" className="w-full border rounded-lg p-2.5" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} aria-label="Input Judul Utama"/>
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <div>
// // // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // // // // // // // //                             <textarea rows={3} className="w-full border rounded-lg p-2.5" value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} aria-label="Input Deskripsi Singkat"/>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                     <div>
// // // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Background Hero</label>
// // // // // // // // // //                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[150px]">
// // // // // // // // // //                             {formData.heroBgUrl ? (
// // // // // // // // // //                                 <div className="relative w-full h-32 mb-2">
// // // // // // // // // //                                     <img src={getImageUrl(formData.heroBgUrl)} className="w-full h-full object-cover rounded" alt="Hero Bg" />
// // // // // // // // // //                                     <button type="button" onClick={() => setFormData({...formData, heroBgUrl: ''})} className="absolute top-1 right-1 bg-red-600 text-white text-xs p-1 rounded">Hapus</button>
// // // // // // // // // //                                 </div>
// // // // // // // // // //                             ) : (
// // // // // // // // // //                                 <p className="text-sm text-gray-400 mb-2">Belum ada gambar background</p>
// // // // // // // // // //                             )}
// // // // // // // // // //                             <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700">
// // // // // // // // // //                                 {uploadingBg ? 'Mengupload...' : 'Ganti Background'}
// // // // // // // // // //                                 <input type="file" className="hidden" accept="image/*" onChange={handleUploadBg} disabled={uploadingBg} aria-label="Upload Background" />
// // // // // // // // // //                             </label>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* 2. SLIDES */}
// // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Foto Slide (Carousel)</h2>
// // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // // //                     {formData.slides.map((url, idx) => (
// // // // // // // // // //                         <div key={idx} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border">
// // // // // // // // // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt={`Slide ${idx}`} />
// // // // // // // // // //                             <button type="button" onClick={() => removeSlide(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Hapus Slide">🗑️</button>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     ))}
// // // // // // // // // //                     <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video">
// // // // // // // // // //                         <span className="text-4xl text-gray-300">+</span>
// // // // // // // // // //                         <span className="text-sm text-gray-500 font-bold mt-2">{uploadingSlide ? '...' : 'TAMBAH SLIDE'}</span>
// // // // // // // // // //                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadSlide} disabled={uploadingSlide} aria-label="Upload Slide Baru" />
// // // // // // // // // //                     </label>
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* 3. FITUR */}
// // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Info Fitur (3 Kotak)</h2>
// // // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // // // //                     {formData.features.map((feat, idx) => (
// // // // // // // // // //                         <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // // // // // // // // //                             <h3 className="text-sm font-bold text-red-700 mb-2 uppercase">Kotak {idx + 1}</h3>
// // // // // // // // // //                             <input type="text" className="w-full border rounded p-2 text-sm mb-2" value={feat.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} placeholder="Judul" aria-label={`Judul Fitur ${idx+1}`} />
// // // // // // // // // //                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={feat.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} placeholder="Deskripsi" aria-label={`Deskripsi Fitur ${idx+1}`} />
// // // // // // // // // //                         </div>
// // // // // // // // // //                     ))}
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* 4. FOOTER */}
// // // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">4. Pengaturan Footer</h2>
// // // // // // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // // //                     <div className="space-y-4">
// // // // // // // // // //                         <div>
// // // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat (About)</label>
// // // // // // // // // //                             <textarea rows={3} className="w-full border rounded p-2.5 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)} aria-label="Footer About" />
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <div>
// // // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Alamat Kantor</label>
// // // // // // // // // //                             <textarea rows={2} className="w-full border rounded p-2.5 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)} aria-label="Footer Address" />
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <div className="grid grid-cols-2 gap-4">
// // // // // // // // // //                             <div>
// // // // // // // // // //                                 <label className="block text-xs font-bold text-gray-600 mb-1">No. Telepon</label>
// // // // // // // // // //                                 <input type="text" className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)} aria-label="Footer Phone" />
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div>
// // // // // // // // // //                                 <label className="block text-xs font-bold text-gray-600 mb-1">Email Kontak</label>
// // // // // // // // // //                                 <input type="text" className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)} aria-label="Footer Email" />
// // // // // // // // // //                             </div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                         <div>
// // // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Teks Copyright</label>
// // // // // // // // // //                             <input type="text" className="w-full border rounded p-2.5 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)} aria-label="Footer Copyright" />
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>

// // // // // // // // // //                     <div className="bg-gray-50 p-4 rounded-xl border">
// // // // // // // // // //                         <h3 className="text-sm font-bold text-gray-800 mb-3">Link Social Media</h3>
// // // // // // // // // //                         <div className="space-y-3">
// // // // // // // // // //                             <div>
// // // // // // // // // //                                 <label className="block text-xs font-bold text-gray-600 mb-1">Facebook URL</label>
// // // // // // // // // //                                 <input type="text" className="w-full border rounded p-2 text-sm" placeholder="https://facebook.com/..." value={formData.footer.socials.facebook} onChange={e => handleSocialChange('facebook', e.target.value)} aria-label="Facebook URL" />
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div>
// // // // // // // // // //                                 <label className="block text-xs font-bold text-gray-600 mb-1">Instagram URL</label>
// // // // // // // // // //                                 <input type="text" className="w-full border rounded p-2 text-sm" placeholder="https://instagram.com/..." value={formData.footer.socials.instagram} onChange={e => handleSocialChange('instagram', e.target.value)} aria-label="Instagram URL" />
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div>
// // // // // // // // // //                                 <label className="block text-xs font-bold text-gray-600 mb-1">Twitter / X URL</label>
// // // // // // // // // //                                 <input type="text" className="w-full border rounded p-2 text-sm" placeholder="https://twitter.com/..." value={formData.footer.socials.twitter} onChange={e => handleSocialChange('twitter', e.target.value)} aria-label="Twitter URL" />
// // // // // // // // // //                             </div>
// // // // // // // // // //                             <div>
// // // // // // // // // //                                 <label className="block text-xs font-bold text-gray-600 mb-1">Youtube URL</label>
// // // // // // // // // //                                 <input type="text" className="w-full border rounded p-2 text-sm" placeholder="https://youtube.com/..." value={formData.footer.socials.youtube} onChange={e => handleSocialChange('youtube', e.target.value)} aria-label="Youtube URL" />
// // // // // // // // // //                             </div>
// // // // // // // // // //                         </div>
// // // // // // // // // //                     </div>
// // // // // // // // // //                 </div>
// // // // // // // // // //             </div>

// // // // // // // // // //         </form>
// // // // // // // // // //       </div>
// // // // // // // // // //     </Protected>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // 'use client';

// // // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // // export default function AdminContentPage() {
// // // // // // // // //   const router = useRouter();
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [saving, setSaving] = useState(false);
// // // // // // // // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // // // // // // // //   const [uploadingBg, setUploadingBg] = useState(false);

// // // // // // // // //   // State untuk Input Tambahan Kategori
// // // // // // // // //   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
// // // // // // // // //   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);
// // // // // // // // //   const [newCourseCat, setNewCourseCat] = useState('');
// // // // // // // // //   const [newLibCat, setNewLibCat] = useState('');

// // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // //     heroTitle: '',
// // // // // // // // //     heroDescription: '',
// // // // // // // // //     heroBgUrl: '',
// // // // // // // // //     slides: [] as string[],
// // // // // // // // //     features: [] as { title: string; description: string }[],
// // // // // // // // //     footer: {
// // // // // // // // //         about: '', address: '', phone: '', email: '', copyright: '',
// // // // // // // // //         socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// // // // // // // // //     },
// // // // // // // // //     // Kategori
// // // // // // // // //     forumCategories: [] as { name: string; iconUrl: string }[],
// // // // // // // // //     courseCategories: [] as string[],
// // // // // // // // //     libraryCategories: [] as string[]
// // // // // // // // //   });

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     loadContent();
// // // // // // // // //   }, []);

// // // // // // // // //   const loadContent = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const data = await api('/api/content');
// // // // // // // // //       setFormData({
// // // // // // // // //         heroTitle: data.heroTitle || '',
// // // // // // // // //         heroDescription: data.heroDescription || '',
// // // // // // // // //         heroBgUrl: data.heroBgUrl || '',
// // // // // // // // //         slides: data.slides || [],
// // // // // // // // //         features: data.features?.length ? data.features : [
// // // // // // // // //             { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }
// // // // // // // // //         ],
// // // // // // // // //         footer: data.footer || {
// // // // // // // // //             about: '', address: '', phone: '', email: '', copyright: '',
// // // // // // // // //             socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// // // // // // // // //         },
// // // // // // // // //         forumCategories: data.forumCategories || [],
// // // // // // // // //         courseCategories: data.courseCategories || [],
// // // // // // // // //         libraryCategories: data.libraryCategories || []
// // // // // // // // //       });
// // // // // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // // // // //   };

// // // // // // // // //   // --- HANDLERS UPLOAD UMUM ---
// // // // // // // // //   const handleUploadSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // //     setUploadingSlide(true);
// // // // // // // // //     try {
// // // // // // // // //       const fd = new FormData();
// // // // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, slides: [...prev.slides, newUrl] }));
// // // // // // // // //     } catch (e: any) { alert(e.message); } finally { setUploadingSlide(false); }
// // // // // // // // //   };

// // // // // // // // //   const handleUploadBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // // //     setUploadingBg(true);
// // // // // // // // //     try {
// // // // // // // // //       const fd = new FormData();
// // // // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, heroBgUrl: newUrl }));
// // // // // // // // //     } catch (e: any) { alert(e.message); } finally { setUploadingBg(false); }
// // // // // // // // //   };

// // // // // // // // //   const removeSlide = (index: number) => {
// // // // // // // // //     if(!confirm("Hapus slide ini?")) return;
// // // // // // // // //     const newSlides = formData.slides.filter((_, i) => i !== index);
// // // // // // // // //     setFormData(prev => ({ ...prev, slides: newSlides }));
// // // // // // // // //   };

// // // // // // // // //   // --- HANDLERS TEXT & FOOTER ---
// // // // // // // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // // // // // // //       const newFeatures = [...formData.features];
// // // // // // // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // // // // // // //       setFormData({ ...formData, features: newFeatures });
// // // // // // // // //   };
// // // // // // // // //   const handleFooterChange = (field: string, value: string) => {
// // // // // // // // //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// // // // // // // // //   };
// // // // // // // // //   const handleSocialChange = (platform: string, value: string) => {
// // // // // // // // //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } }));
// // // // // // // // //   };

// // // // // // // // //   // --- HANDLERS KATEGORI ---
  
// // // // // // // // //   // 1. Forum Categories
// // // // // // // // //   const handleUploadForumIcon = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //       if (!e.target.files?.[0]) return;
// // // // // // // // //       setUploadingForumIcon(true);
// // // // // // // // //       try {
// // // // // // // // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // // // // // // // //           const res = await apiUpload('/api/upload', fd);
// // // // // // // // //           const newUrl = res.url || res.file?.url;
// // // // // // // // //           if (newUrl) setNewForumCat(prev => ({ ...prev, iconUrl: newUrl }));
// // // // // // // // //       } catch (e: any) { alert(e.message); } finally { setUploadingForumIcon(false); }
// // // // // // // // //   };
// // // // // // // // //   const addForumCat = () => {
// // // // // // // // //       if (!newForumCat.name) return alert("Nama kategori harus diisi");
// // // // // // // // //       setFormData(prev => ({ ...prev, forumCategories: [...prev.forumCategories, newForumCat] }));
// // // // // // // // //       setNewForumCat({ name: '', iconUrl: '' });
// // // // // // // // //   };
// // // // // // // // //   const removeForumCat = (idx: number) => {
// // // // // // // // //       setFormData(prev => ({ ...prev, forumCategories: prev.forumCategories.filter((_, i) => i !== idx) }));
// // // // // // // // //   };

// // // // // // // // //   // 2. Course Categories
// // // // // // // // //   const addCourseCat = () => {
// // // // // // // // //       if (!newCourseCat) return;
// // // // // // // // //       setFormData(prev => ({ ...prev, courseCategories: [...prev.courseCategories, newCourseCat] }));
// // // // // // // // //       setNewCourseCat('');
// // // // // // // // //   };
// // // // // // // // //   const removeCourseCat = (idx: number) => {
// // // // // // // // //       setFormData(prev => ({ ...prev, courseCategories: prev.courseCategories.filter((_, i) => i !== idx) }));
// // // // // // // // //   };

// // // // // // // // //   // 3. Library Categories
// // // // // // // // //   const addLibCat = () => {
// // // // // // // // //       if (!newLibCat) return;
// // // // // // // // //       setFormData(prev => ({ ...prev, libraryCategories: [...prev.libraryCategories, newLibCat] }));
// // // // // // // // //       setNewLibCat('');
// // // // // // // // //   };
// // // // // // // // //   const removeLibCat = (idx: number) => {
// // // // // // // // //       setFormData(prev => ({ ...prev, libraryCategories: prev.libraryCategories.filter((_, i) => i !== idx) }));
// // // // // // // // //   };

// // // // // // // // //   // --- SAVE ---
// // // // // // // // //   const handleSave = async (e: React.FormEvent) => {
// // // // // // // // //     e.preventDefault();
// // // // // // // // //     setSaving(true);
// // // // // // // // //     try {
// // // // // // // // //       await api('/api/content', { method: 'PUT', body: formData });
// // // // // // // // //       alert("Pengaturan Berhasil Disimpan!");
// // // // // // // // //       router.push('/'); 
// // // // // // // // //     } catch (e: any) { alert("Gagal menyimpan: " + e.message); } finally { setSaving(false); }
// // // // // // // // //   };

// // // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // // // // // //   return (
// // // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // // //       <div className="max-w-5xl mx-auto p-6 pb-24">
        
// // // // // // // // //         <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border sticky top-4 z-50">
// // // // // // // // //             <h1 className="text-xl font-bold text-gray-800">CMS Pengaturan Konten</h1>
// // // // // // // // //             <button onClick={handleSave} disabled={saving} className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md disabled:opacity-50">
// // // // // // // // //                 {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
// // // // // // // // //             </button>
// // // // // // // // //         </div>
        
// // // // // // // // //         <form onSubmit={handleSave} className="space-y-8">
            
// // // // // // // // //             {/* 1. HERO */}
// // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Informasi Utama (Hero Section)</h2>
// // // // // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // //                     <div className="space-y-4">
// // // // // // // // //                         <div>
// // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // // // // // // // //                             <input type="text" className="w-full border rounded-lg p-2.5" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} />
// // // // // // // // //                         </div>
// // // // // // // // //                         <div>
// // // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // // // // // // //                             <textarea rows={3} className="w-full border rounded-lg p-2.5" value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} />
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Background</label>
// // // // // // // // //                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[150px]">
// // // // // // // // //                             {formData.heroBgUrl ? (
// // // // // // // // //                                 <div className="relative w-full h-32 mb-2">
// // // // // // // // //                                     <img src={getImageUrl(formData.heroBgUrl)} className="w-full h-full object-cover rounded" alt="Bg" />
// // // // // // // // //                                     <button type="button" onClick={() => setFormData({...formData, heroBgUrl: ''})} className="absolute top-1 right-1 bg-red-600 text-white text-xs p-1 rounded">Hapus</button>
// // // // // // // // //                                 </div>
// // // // // // // // //                             ) : (<p className="text-sm text-gray-400 mb-2">Belum ada gambar</p>)}
// // // // // // // // //                             <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700">
// // // // // // // // //                                 {uploadingBg ? '...' : 'Ganti Background'}
// // // // // // // // //                                 <input type="file" className="hidden" accept="image/*" onChange={handleUploadBg} disabled={uploadingBg} />
// // // // // // // // //                             </label>
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* 2. SLIDES */}
// // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Foto Slide (Carousel)</h2>
// // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // // //                     {formData.slides.map((url, idx) => (
// // // // // // // // //                         <div key={idx} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border">
// // // // // // // // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt="slide" />
// // // // // // // // //                             <button type="button" onClick={() => removeSlide(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">🗑️</button>
// // // // // // // // //                         </div>
// // // // // // // // //                     ))}
// // // // // // // // //                     <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video">
// // // // // // // // //                         <span className="text-4xl text-gray-300">+</span>
// // // // // // // // //                         <span className="text-sm text-gray-500 font-bold mt-2">{uploadingSlide ? '...' : 'TAMBAH SLIDE'}</span>
// // // // // // // // //                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadSlide} disabled={uploadingSlide} />
// // // // // // // // //                     </label>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* 3. FITUR */}
// // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Info Fitur (3 Kotak)</h2>
// // // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // // //                     {formData.features.map((feat, idx) => (
// // // // // // // // //                         <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // // // // // // // //                             <h3 className="text-sm font-bold text-red-700 mb-2 uppercase">Kotak {idx + 1}</h3>
// // // // // // // // //                             <input type="text" className="w-full border rounded p-2 text-sm mb-2" value={feat.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} placeholder="Judul" />
// // // // // // // // //                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={feat.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} placeholder="Deskripsi" />
// // // // // // // // //                         </div>
// // // // // // // // //                     ))}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* 4. FOOTER */}
// // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">4. Pengaturan Footer</h2>
// // // // // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // // // // //                     <div className="space-y-4">
// // // // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">About</label><textarea rows={3} className="w-full border rounded p-2.5 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)} /></div>
// // // // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">Alamat</label><textarea rows={2} className="w-full border rounded p-2.5 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)} /></div>
// // // // // // // // //                         <div className="grid grid-cols-2 gap-4">
// // // // // // // // //                             <div><label className="block text-xs font-bold text-gray-600 mb-1">Telepon</label><input type="text" className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)} /></div>
// // // // // // // // //                             <div><label className="block text-xs font-bold text-gray-600 mb-1">Email</label><input type="text" className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)} /></div>
// // // // // // // // //                         </div>
// // // // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">Copyright</label><input type="text" className="w-full border rounded p-2.5 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)} /></div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <div className="bg-gray-50 p-4 rounded-xl border">
// // // // // // // // //                         <h3 className="text-sm font-bold text-gray-800 mb-3">Link Social Media</h3>
// // // // // // // // //                         <div className="space-y-3">
// // // // // // // // //                             {['facebook', 'instagram', 'twitter', 'youtube'].map((soc) => (
// // // // // // // // //                                 <div key={soc}><label className="block text-xs font-bold text-gray-600 mb-1 capitalize">{soc}</label><input type="text" className="w-full border rounded p-2 text-sm" placeholder={`https://${soc}.com/...`} value={(formData.footer.socials as any)[soc]} onChange={e => handleSocialChange(soc, e.target.value)} /></div>
// // // // // // // // //                             ))}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                 </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* 5. KATEGORI FORUM (ICON & NAMA) */}
// // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">5. Kategori Forum & Avatar</h2>
                
// // // // // // // // //                 <div className="flex gap-4 mb-4 items-end">
// // // // // // // // //                     <div className="flex-1">
// // // // // // // // //                         <label className="block text-xs font-bold text-gray-600 mb-1">Nama Kategori Baru</label>
// // // // // // // // //                         <input type="text" className="w-full border rounded p-2 text-sm" value={newForumCat.name} onChange={e => setNewForumCat({...newForumCat, name: e.target.value})} placeholder="Contoh: Diskusi Umum" />
// // // // // // // // //                     </div>
// // // // // // // // //                     <div>
// // // // // // // // //                         <label className="block text-xs font-bold text-gray-600 mb-1">Upload Icon (Opsional)</label>
// // // // // // // // //                         <div className="flex items-center gap-2">
// // // // // // // // //                             <label className="cursor-pointer bg-gray-100 border border-gray-300 px-3 py-1.5 rounded text-xs font-bold hover:bg-gray-200">
// // // // // // // // //                                 {uploadingForumIcon ? '...' : 'Pilih Icon'}
// // // // // // // // //                                 <input type="file" className="hidden" accept="image/*" onChange={handleUploadForumIcon} disabled={uploadingForumIcon} />
// // // // // // // // //                             </label>
// // // // // // // // //                             {newForumCat.iconUrl && <img src={getImageUrl(newForumCat.iconUrl)} className="w-8 h-8 rounded object-cover border" alt="icon" />}
// // // // // // // // //                         </div>
// // // // // // // // //                     </div>
// // // // // // // // //                     <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 h-[38px]">Tambah</button>
// // // // // // // // //                 </div>

// // // // // // // // //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// // // // // // // // //                     {formData.forumCategories.map((cat, idx) => (
// // // // // // // // //                         <div key={idx} className="flex items-center justify-between p-2 border rounded bg-gray-50">
// // // // // // // // //                             <div className="flex items-center gap-2">
// // // // // // // // //                                 {cat.iconUrl ? <img src={getImageUrl(cat.iconUrl)} className="w-6 h-6 rounded-full" alt="icon" /> : <span className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px]">#</span>}
// // // // // // // // //                                 <span className="text-sm font-bold text-gray-700">{cat.name}</span>
// // // // // // // // //                             </div>
// // // // // // // // //                             <button type="button" onClick={() => removeForumCat(idx)} className="text-red-500 hover:text-red-700 text-xs font-bold">✕</button>
// // // // // // // // //                         </div>
// // // // // // // // //                     ))}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* 6. KATEGORI PELATIHAN (TEXT ONLY) */}
// // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">6. Kategori Pelatihan (Health, Disaster, dll)</h2>
// // // // // // // // //                 <div className="flex gap-2 mb-4">
// // // // // // // // //                     <input type="text" className="flex-1 border rounded p-2 text-sm" value={newCourseCat} onChange={e => setNewCourseCat(e.target.value)} placeholder="Contoh: Leadership" />
// // // // // // // // //                     <button type="button" onClick={addCourseCat} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700">Tambah</button>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="flex flex-wrap gap-2">
// // // // // // // // //                     {formData.courseCategories.map((cat, idx) => (
// // // // // // // // //                         <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-2">
// // // // // // // // //                             {cat}
// // // // // // // // //                             <button type="button" onClick={() => removeCourseCat(idx)} className="text-green-900 hover:text-red-600">✕</button>
// // // // // // // // //                         </span>
// // // // // // // // //                     ))}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* 7. KATEGORI PERPUSTAKAAN (TEXT ONLY) */}
// // // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">7. Kategori Perpustakaan (Flyer, Booklet, dll)</h2>
// // // // // // // // //                 <div className="flex gap-2 mb-4">
// // // // // // // // //                     <input type="text" className="flex-1 border rounded p-2 text-sm" value={newLibCat} onChange={e => setNewLibCat(e.target.value)} placeholder="Contoh: Video Edukasi" />
// // // // // // // // //                     <button type="button" onClick={addLibCat} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700">Tambah</button>
// // // // // // // // //                 </div>
// // // // // // // // //                 <div className="flex flex-wrap gap-2">
// // // // // // // // //                     {formData.libraryCategories.map((cat, idx) => (
// // // // // // // // //                         <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold flex items-center gap-2">
// // // // // // // // //                             {cat}
// // // // // // // // //                             <button type="button" onClick={() => removeLibCat(idx)} className="text-purple-900 hover:text-red-600">✕</button>
// // // // // // // // //                         </span>
// // // // // // // // //                     ))}
// // // // // // // // //                 </div>
// // // // // // // // //             </div>

// // // // // // // // //         </form>
// // // // // // // // //       </div>
// // // // // // // // //     </Protected>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // 'use client';

// // // // // // // // import { useState, useEffect } from 'react';
// // // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // // import Protected from '@/components/Protected';

// // // // // // // // export default function AdminContentPage() {
// // // // // // // //   const router = useRouter();
// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [saving, setSaving] = useState(false);
// // // // // // // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // // // // // // //   const [uploadingBg, setUploadingBg] = useState(false);

// // // // // // // //   // State untuk Input Tambahan Kategori
// // // // // // // //   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
// // // // // // // //   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);
// // // // // // // //   const [newCourseCat, setNewCourseCat] = useState('');
// // // // // // // //   const [newLibCat, setNewLibCat] = useState('');

// // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // //     heroTitle: '',
// // // // // // // //     heroDescription: '',
// // // // // // // //     heroBgUrl: '',
// // // // // // // //     slides: [] as string[],
// // // // // // // //     features: [] as { title: string; description: string }[],
// // // // // // // //     footer: {
// // // // // // // //         about: '', address: '', phone: '', email: '', copyright: '',
// // // // // // // //         socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// // // // // // // //     },
// // // // // // // //     // Kategori
// // // // // // // //     forumCategories: [] as { name: string; iconUrl: string }[],
// // // // // // // //     courseCategories: [] as string[],
// // // // // // // //     libraryCategories: [] as string[]
// // // // // // // //   });

// // // // // // // //   useEffect(() => {
// // // // // // // //     loadContent();
// // // // // // // //   }, []);

// // // // // // // //   const loadContent = async () => {
// // // // // // // //     try {
// // // // // // // //       const data = await api('/api/content');
// // // // // // // //       setFormData({
// // // // // // // //         heroTitle: data.heroTitle || '',
// // // // // // // //         heroDescription: data.heroDescription || '',
// // // // // // // //         heroBgUrl: data.heroBgUrl || '',
// // // // // // // //         slides: data.slides || [],
// // // // // // // //         features: data.features?.length ? data.features : [
// // // // // // // //             { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }
// // // // // // // //         ],
// // // // // // // //         footer: data.footer || {
// // // // // // // //             about: '', address: '', phone: '', email: '', copyright: '',
// // // // // // // //             socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// // // // // // // //         },
// // // // // // // //         forumCategories: data.forumCategories || [],
// // // // // // // //         courseCategories: data.courseCategories || [],
// // // // // // // //         libraryCategories: data.libraryCategories || []
// // // // // // // //       });
// // // // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // // // //   };

// // // // // // // //   // --- HANDLERS UPLOAD UMUM ---
// // // // // // // //   const handleUploadSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // //     setUploadingSlide(true);
// // // // // // // //     try {
// // // // // // // //       const fd = new FormData();
// // // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, slides: [...prev.slides, newUrl] }));
// // // // // // // //     } catch (e: any) { alert(e.message); } finally { setUploadingSlide(false); }
// // // // // // // //   };

// // // // // // // //   const handleUploadBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // // //     setUploadingBg(true);
// // // // // // // //     try {
// // // // // // // //       const fd = new FormData();
// // // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, heroBgUrl: newUrl }));
// // // // // // // //     } catch (e: any) { alert(e.message); } finally { setUploadingBg(false); }
// // // // // // // //   };

// // // // // // // //   const removeSlide = (index: number) => {
// // // // // // // //     if(!confirm("Hapus slide ini?")) return;
// // // // // // // //     const newSlides = formData.slides.filter((_, i) => i !== index);
// // // // // // // //     setFormData(prev => ({ ...prev, slides: newSlides }));
// // // // // // // //   };

// // // // // // // //   // --- HANDLERS TEXT & FOOTER ---
// // // // // // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // // // // // //       const newFeatures = [...formData.features];
// // // // // // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // // // // // //       setFormData({ ...formData, features: newFeatures });
// // // // // // // //   };
// // // // // // // //   const handleFooterChange = (field: string, value: string) => {
// // // // // // // //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// // // // // // // //   };
// // // // // // // //   const handleSocialChange = (platform: string, value: string) => {
// // // // // // // //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } }));
// // // // // // // //   };

// // // // // // // //   // --- HANDLERS KATEGORI ---
  
// // // // // // // //   // 1. Forum Categories
// // // // // // // //   const handleUploadForumIcon = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //       if (!e.target.files?.[0]) return;
// // // // // // // //       setUploadingForumIcon(true);
// // // // // // // //       try {
// // // // // // // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // // // // // // //           const res = await apiUpload('/api/upload', fd);
// // // // // // // //           const newUrl = res.url || res.file?.url;
// // // // // // // //           if (newUrl) setNewForumCat(prev => ({ ...prev, iconUrl: newUrl }));
// // // // // // // //       } catch (e: any) { alert(e.message); } finally { setUploadingForumIcon(false); }
// // // // // // // //   };
// // // // // // // //   const addForumCat = () => {
// // // // // // // //       if (!newForumCat.name) return alert("Nama kategori harus diisi");
// // // // // // // //       setFormData(prev => ({ ...prev, forumCategories: [...prev.forumCategories, newForumCat] }));
// // // // // // // //       setNewForumCat({ name: '', iconUrl: '' });
// // // // // // // //   };
// // // // // // // //   const removeForumCat = (idx: number) => {
// // // // // // // //       setFormData(prev => ({ ...prev, forumCategories: prev.forumCategories.filter((_, i) => i !== idx) }));
// // // // // // // //   };

// // // // // // // //   // 2. Course Categories
// // // // // // // //   const addCourseCat = () => {
// // // // // // // //       if (!newCourseCat) return;
// // // // // // // //       setFormData(prev => ({ ...prev, courseCategories: [...prev.courseCategories, newCourseCat] }));
// // // // // // // //       setNewCourseCat('');
// // // // // // // //   };
// // // // // // // //   const removeCourseCat = (idx: number) => {
// // // // // // // //       setFormData(prev => ({ ...prev, courseCategories: prev.courseCategories.filter((_, i) => i !== idx) }));
// // // // // // // //   };

// // // // // // // //   // 3. Library Categories
// // // // // // // //   const addLibCat = () => {
// // // // // // // //       if (!newLibCat) return;
// // // // // // // //       setFormData(prev => ({ ...prev, libraryCategories: [...prev.libraryCategories, newLibCat] }));
// // // // // // // //       setNewLibCat('');
// // // // // // // //   };
// // // // // // // //   const removeLibCat = (idx: number) => {
// // // // // // // //       setFormData(prev => ({ ...prev, libraryCategories: prev.libraryCategories.filter((_, i) => i !== idx) }));
// // // // // // // //   };

// // // // // // // //   // --- SAVE ---
// // // // // // // //   const handleSave = async (e: React.FormEvent) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     setSaving(true);
// // // // // // // //     try {
// // // // // // // //       await api('/api/content', { method: 'PUT', body: formData });
// // // // // // // //       alert("Pengaturan Berhasil Disimpan!");
// // // // // // // //       router.push('/'); 
// // // // // // // //     } catch (e: any) { alert("Gagal menyimpan: " + e.message); } finally { setSaving(false); }
// // // // // // // //   };

// // // // // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // // // // //   return (
// // // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // // //       <div className="max-w-5xl mx-auto p-6 pb-24">
        
// // // // // // // //         <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border sticky top-4 z-50">
// // // // // // // //             <h1 className="text-xl font-bold text-gray-800">CMS Pengaturan Konten</h1>
// // // // // // // //             <button onClick={handleSave} disabled={saving} className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md disabled:opacity-50">
// // // // // // // //                 {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
// // // // // // // //             </button>
// // // // // // // //         </div>
        
// // // // // // // //         <form onSubmit={handleSave} className="space-y-8">
            
// // // // // // // //             {/* 1. HERO */}
// // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Informasi Utama (Hero Section)</h2>
// // // // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // // // //                     <div className="space-y-4">
// // // // // // // //                         <div>
// // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // // // // // // //                             <input type="text" className="w-full border rounded-lg p-2.5" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} aria-label="Judul Utama Hero" />
// // // // // // // //                         </div>
// // // // // // // //                         <div>
// // // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // // // // // //                             <textarea rows={3} className="w-full border rounded-lg p-2.5" value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} aria-label="Deskripsi Singkat Hero" />
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Background</label>
// // // // // // // //                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[150px]">
// // // // // // // //                             {formData.heroBgUrl ? (
// // // // // // // //                                 <div className="relative w-full h-32 mb-2">
// // // // // // // //                                     <img src={getImageUrl(formData.heroBgUrl)} className="w-full h-full object-cover rounded" alt="Bg" />
// // // // // // // //                                     <button type="button" onClick={() => setFormData({...formData, heroBgUrl: ''})} className="absolute top-1 right-1 bg-red-600 text-white text-xs p-1 rounded">Hapus</button>
// // // // // // // //                                 </div>
// // // // // // // //                             ) : (<p className="text-sm text-gray-400 mb-2">Belum ada gambar</p>)}
// // // // // // // //                             <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700">
// // // // // // // //                                 {uploadingBg ? '...' : 'Ganti Background'}
// // // // // // // //                                 <input type="file" className="hidden" accept="image/*" onChange={handleUploadBg} disabled={uploadingBg} aria-label="Upload Background Hero" />
// // // // // // // //                             </label>
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             </div>

// // // // // // // //             {/* 2. SLIDES */}
// // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Foto Slide (Carousel)</h2>
// // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // // //                     {formData.slides.map((url, idx) => (
// // // // // // // //                         <div key={idx} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border">
// // // // // // // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt="slide" />
// // // // // // // //                             <button type="button" onClick={() => removeSlide(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">🗑️</button>
// // // // // // // //                         </div>
// // // // // // // //                     ))}
// // // // // // // //                     <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video">
// // // // // // // //                         <span className="text-4xl text-gray-300">+</span>
// // // // // // // //                         <span className="text-sm text-gray-500 font-bold mt-2">{uploadingSlide ? '...' : 'TAMBAH SLIDE'}</span>
// // // // // // // //                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadSlide} disabled={uploadingSlide} aria-label="Upload Slide Baru" />
// // // // // // // //                     </label>
// // // // // // // //                 </div>
// // // // // // // //             </div>

// // // // // // // //             {/* 3. FITUR */}
// // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Info Fitur (3 Kotak)</h2>
// // // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // //                     {formData.features.map((feat, idx) => (
// // // // // // // //                         <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // // // // // // //                             <h3 className="text-sm font-bold text-red-700 mb-2 uppercase">Kotak {idx + 1}</h3>
// // // // // // // //                             <input type="text" className="w-full border rounded p-2 text-sm mb-2" value={feat.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} placeholder="Judul" aria-label={`Judul Fitur ${idx+1}`} />
// // // // // // // //                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={feat.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} placeholder="Deskripsi" aria-label={`Deskripsi Fitur ${idx+1}`} />
// // // // // // // //                         </div>
// // // // // // // //                     ))}
// // // // // // // //                 </div>
// // // // // // // //             </div>

// // // // // // // //             {/* 4. FOOTER */}
// // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">4. Pengaturan Footer</h2>
// // // // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // // // //                     <div className="space-y-4">
// // // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">About</label><textarea rows={3} className="w-full border rounded p-2.5 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)} aria-label="Footer About" /></div>
// // // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">Alamat</label><textarea rows={2} className="w-full border rounded p-2.5 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)} aria-label="Footer Address" /></div>
// // // // // // // //                         <div className="grid grid-cols-2 gap-4">
// // // // // // // //                             <div><label className="block text-xs font-bold text-gray-600 mb-1">Telepon</label><input type="text" className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)} aria-label="Footer Phone" /></div>
// // // // // // // //                             <div><label className="block text-xs font-bold text-gray-600 mb-1">Email</label><input type="text" className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)} aria-label="Footer Email" /></div>
// // // // // // // //                         </div>
// // // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">Copyright</label><input type="text" className="w-full border rounded p-2.5 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)} aria-label="Footer Copyright" /></div>
// // // // // // // //                     </div>
// // // // // // // //                     <div className="bg-gray-50 p-4 rounded-xl border">
// // // // // // // //                         <h3 className="text-sm font-bold text-gray-800 mb-3">Link Social Media</h3>
// // // // // // // //                         <div className="space-y-3">
// // // // // // // //                             {['facebook', 'instagram', 'twitter', 'youtube'].map((soc) => (
// // // // // // // //                                 <div key={soc}><label className="block text-xs font-bold text-gray-600 mb-1 capitalize">{soc}</label><input type="text" className="w-full border rounded p-2 text-sm" placeholder={`https://${soc}.com/...`} value={(formData.footer.socials as any)[soc]} onChange={e => handleSocialChange(soc, e.target.value)} aria-label={`Footer Social ${soc}`} /></div>
// // // // // // // //                             ))}
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                 </div>
// // // // // // // //             </div>

// // // // // // // //             {/* 5. KATEGORI FORUM (ICON & NAMA) */}
// // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">5. Kategori Forum & Avatar</h2>
                
// // // // // // // //                 <div className="flex gap-4 mb-4 items-end">
// // // // // // // //                     <div className="flex-1">
// // // // // // // //                         <label className="block text-xs font-bold text-gray-600 mb-1">Nama Kategori Baru</label>
// // // // // // // //                         <input type="text" className="w-full border rounded p-2 text-sm" value={newForumCat.name} onChange={e => setNewForumCat({...newForumCat, name: e.target.value})} placeholder="Contoh: Diskusi Umum" aria-label="Nama Kategori Forum" />
// // // // // // // //                     </div>
// // // // // // // //                     <div>
// // // // // // // //                         <label className="block text-xs font-bold text-gray-600 mb-1">Upload Icon (Opsional)</label>
// // // // // // // //                         <div className="flex items-center gap-2">
// // // // // // // //                             <label className="cursor-pointer bg-gray-100 border border-gray-300 px-3 py-1.5 rounded text-xs font-bold hover:bg-gray-200">
// // // // // // // //                                 {uploadingForumIcon ? '...' : 'Pilih Icon'}
// // // // // // // //                                 <input type="file" className="hidden" accept="image/*" onChange={handleUploadForumIcon} disabled={uploadingForumIcon} aria-label="Upload Icon Kategori Forum" />
// // // // // // // //                             </label>
// // // // // // // //                             {newForumCat.iconUrl && <img src={getImageUrl(newForumCat.iconUrl)} className="w-8 h-8 rounded object-cover border" alt="icon" />}
// // // // // // // //                         </div>
// // // // // // // //                     </div>
// // // // // // // //                     <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 h-[38px]" aria-label="Tambah Kategori Forum">Tambah</button>
// // // // // // // //                 </div>

// // // // // // // //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// // // // // // // //                     {formData.forumCategories.map((cat, idx) => (
// // // // // // // //                         <div key={idx} className="flex items-center justify-between p-2 border rounded bg-gray-50">
// // // // // // // //                             <div className="flex items-center gap-2">
// // // // // // // //                                 {cat.iconUrl ? <img src={getImageUrl(cat.iconUrl)} className="w-6 h-6 rounded-full" alt="icon" /> : <span className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px]">#</span>}
// // // // // // // //                                 <span className="text-sm font-bold text-gray-700">{cat.name}</span>
// // // // // // // //                             </div>
// // // // // // // //                             <button type="button" onClick={() => removeForumCat(idx)} className="text-red-500 hover:text-red-700 text-xs font-bold" aria-label="Hapus Kategori Forum">✕</button>
// // // // // // // //                         </div>
// // // // // // // //                     ))}
// // // // // // // //                 </div>
// // // // // // // //             </div>

// // // // // // // //             {/* 6. KATEGORI PELATIHAN (TEXT ONLY) */}
// // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">6. Kategori Pelatihan (Health, Disaster, dll)</h2>
// // // // // // // //                 <div className="flex gap-2 mb-4">
// // // // // // // //                     <input type="text" className="flex-1 border rounded p-2 text-sm" value={newCourseCat} onChange={e => setNewCourseCat(e.target.value)} placeholder="Contoh: Leadership" aria-label="Nama Kategori Pelatihan Baru" />
// // // // // // // //                     <button type="button" onClick={addCourseCat} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700" aria-label="Tambah Kategori Pelatihan">Tambah</button>
// // // // // // // //                 </div>
// // // // // // // //                 <div className="flex flex-wrap gap-2">
// // // // // // // //                     {formData.courseCategories.map((cat, idx) => (
// // // // // // // //                         <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-2">
// // // // // // // //                             {cat}
// // // // // // // //                             <button type="button" onClick={() => removeCourseCat(idx)} className="text-green-900 hover:text-red-600" aria-label="Hapus Kategori Pelatihan">✕</button>
// // // // // // // //                         </span>
// // // // // // // //                     ))}
// // // // // // // //                 </div>
// // // // // // // //             </div>

// // // // // // // //             {/* 7. KATEGORI PERPUSTAKAAN (TEXT ONLY) */}
// // // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">7. Kategori Perpustakaan (Flyer, Booklet, dll)</h2>
// // // // // // // //                 <div className="flex gap-2 mb-4">
// // // // // // // //                     <input type="text" className="flex-1 border rounded p-2 text-sm" value={newLibCat} onChange={e => setNewLibCat(e.target.value)} placeholder="Contoh: Video Edukasi" aria-label="Nama Kategori Perpustakaan Baru" />
// // // // // // // //                     <button type="button" onClick={addLibCat} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700" aria-label="Tambah Kategori Perpustakaan">Tambah</button>
// // // // // // // //                 </div>
// // // // // // // //                 <div className="flex flex-wrap gap-2">
// // // // // // // //                     {formData.libraryCategories.map((cat, idx) => (
// // // // // // // //                         <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold flex items-center gap-2">
// // // // // // // //                             {cat}
// // // // // // // //                             <button type="button" onClick={() => removeLibCat(idx)} className="text-purple-900 hover:text-red-600" aria-label="Hapus Kategori Perpustakaan">✕</button>
// // // // // // // //                         </span>
// // // // // // // //                     ))}
// // // // // // // //                 </div>
// // // // // // // //             </div>

// // // // // // // //         </form>
// // // // // // // //       </div>
// // // // // // // //     </Protected>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // 'use client';

// // // // // // // import { useState, useEffect } from 'react';
// // // // // // // import { useRouter } from 'next/navigation';
// // // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // // import Protected from '@/components/Protected';

// // // // // // // // --- TIPE DATA UTAMA ---
// // // // // // // interface Feature {
// // // // // // //   title: string;
// // // // // // //   description: string;
// // // // // // // }

// // // // // // // interface ForumCategory {
// // // // // // //   name: string;
// // // // // // //   iconUrl: string;
// // // // // // // }

// // // // // // // interface FormDataState {
// // // // // // //   heroTitle: string;
// // // // // // //   heroDescription: string;
// // // // // // //   heroBgUrl: string;
// // // // // // //   slides: string[];
// // // // // // //   features: Feature[];
// // // // // // //   footer: {
// // // // // // //     about: string;
// // // // // // //     address: string;
// // // // // // //     phone: string;
// // // // // // //     email: string;
// // // // // // //     copyright: string;
// // // // // // //     socials: {
// // // // // // //       facebook: string;
// // // // // // //       instagram: string;
// // // // // // //       twitter: string;
// // // // // // //       youtube: string;
// // // // // // //       [key: string]: string; // Index signature untuk akses dynamic
// // // // // // //     };
// // // // // // //   };
// // // // // // //   forumCategories: ForumCategory[];
// // // // // // //   courseCategories: string[];
// // // // // // //   libraryCategories: string[];
// // // // // // // }

// // // // // // // export default function AdminContentPage() {
// // // // // // //   const router = useRouter();
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [saving, setSaving] = useState(false);
// // // // // // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // // // // // //   const [uploadingBg, setUploadingBg] = useState(false);

// // // // // // //   // State untuk Input Tambahan Kategori
// // // // // // //   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
// // // // // // //   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);
// // // // // // //   const [newCourseCat, setNewCourseCat] = useState('');
// // // // // // //   const [newLibCat, setNewLibCat] = useState('');

// // // // // // //   // --- STATE DATA UTAMA ---
// // // // // // //   const [formData, setFormData] = useState<FormDataState>({
// // // // // // //     heroTitle: '',
// // // // // // //     heroDescription: '',
// // // // // // //     heroBgUrl: '',
// // // // // // //     slides: [],
// // // // // // //     features: [
// // // // // // //         { title: '', description: '' }, 
// // // // // // //         { title: '', description: '' }, 
// // // // // // //         { title: '', description: '' }
// // // // // // //     ],
// // // // // // //     footer: {
// // // // // // //         about: '', address: '', phone: '', email: '', copyright: '',
// // // // // // //         socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// // // // // // //     },
// // // // // // //     forumCategories: [],
// // // // // // //     courseCategories: [],
// // // // // // //     libraryCategories: []
// // // // // // //   });

// // // // // // //   useEffect(() => {
// // // // // // //     loadContent();
// // // // // // //   }, []);

// // // // // // //   const loadContent = async () => {
// // // // // // //     try {
// // // // // // //       const data = await api('/api/content');
// // // // // // //       if (data) {
// // // // // // //           setFormData({
// // // // // // //             heroTitle: data.heroTitle || '',
// // // // // // //             heroDescription: data.heroDescription || '',
// // // // // // //             heroBgUrl: data.heroBgUrl || '',
// // // // // // //             slides: data.slides || [],
// // // // // // //             features: data.features?.length ? data.features : [
// // // // // // //                 { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }
// // // // // // //             ],
// // // // // // //             footer: {
// // // // // // //                 about: data.footer?.about || '',
// // // // // // //                 address: data.footer?.address || '',
// // // // // // //                 phone: data.footer?.phone || '',
// // // // // // //                 email: data.footer?.email || '',
// // // // // // //                 copyright: data.footer?.copyright || '',
// // // // // // //                 socials: { 
// // // // // // //                     facebook: '', instagram: '', twitter: '', youtube: '',
// // // // // // //                     ...(data.footer?.socials || {}) 
// // // // // // //                 }
// // // // // // //             },
// // // // // // //             forumCategories: data.forumCategories || [],
// // // // // // //             courseCategories: data.courseCategories || [],
// // // // // // //             libraryCategories: data.libraryCategories || []
// // // // // // //           });
// // // // // // //       }
// // // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // // //   };

// // // // // // //   // --- HANDLERS UPLOAD UMUM ---
// // // // // // //   const handleUploadSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // //     setUploadingSlide(true);
// // // // // // //     try {
// // // // // // //       const fd = new FormData();
// // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, slides: [...prev.slides, newUrl] }));
// // // // // // //     } catch (e: any) { alert(e.message); } finally { setUploadingSlide(false); }
// // // // // // //   };

// // // // // // //   const handleUploadBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     if (!e.target.files?.[0]) return;
// // // // // // //     setUploadingBg(true);
// // // // // // //     try {
// // // // // // //       const fd = new FormData();
// // // // // // //       fd.append('file', e.target.files[0]);
// // // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // // //       const newUrl = res.url || res.file?.url;
// // // // // // //       if (newUrl) setFormData(prev => ({ ...prev, heroBgUrl: newUrl }));
// // // // // // //     } catch (e: any) { alert(e.message); } finally { setUploadingBg(false); }
// // // // // // //   };

// // // // // // //   const removeSlide = (index: number) => {
// // // // // // //     if(!confirm("Hapus slide ini?")) return;
// // // // // // //     const newSlides = formData.slides.filter((_, i) => i !== index);
// // // // // // //     setFormData(prev => ({ ...prev, slides: newSlides }));
// // // // // // //   };

// // // // // // //   // --- HANDLERS TEXT & FOOTER ---
// // // // // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // // // // //       const newFeatures = [...formData.features];
// // // // // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // // // // //       setFormData({ ...formData, features: newFeatures });
// // // // // // //   };
// // // // // // //   const handleFooterChange = (field: string, value: string) => {
// // // // // // //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// // // // // // //   };
// // // // // // //   const handleSocialChange = (platform: string, value: string) => {
// // // // // // //       setFormData(prev => ({ 
// // // // // // //           ...prev, 
// // // // // // //           footer: { 
// // // // // // //               ...prev.footer, 
// // // // // // //               socials: { ...prev.footer.socials, [platform]: value } 
// // // // // // //           } 
// // // // // // //       }));
// // // // // // //   };

// // // // // // //   // --- HANDLERS KATEGORI ---
  
// // // // // // //   // 1. Forum Categories
// // // // // // //   const handleUploadForumIcon = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //       if (!e.target.files?.[0]) return;
// // // // // // //       setUploadingForumIcon(true);
// // // // // // //       try {
// // // // // // //           const fd = new FormData(); fd.append('file', e.target.files[0]);
// // // // // // //           const res = await apiUpload('/api/upload', fd);
// // // // // // //           const newUrl = res.url || res.file?.url;
// // // // // // //           if (newUrl) setNewForumCat(prev => ({ ...prev, iconUrl: newUrl }));
// // // // // // //       } catch (e: any) { alert(e.message); } finally { setUploadingForumIcon(false); }
// // // // // // //   };
// // // // // // //   const addForumCat = () => {
// // // // // // //       if (!newForumCat.name) return alert("Nama kategori harus diisi");
// // // // // // //       setFormData(prev => ({ ...prev, forumCategories: [...prev.forumCategories, newForumCat] }));
// // // // // // //       setNewForumCat({ name: '', iconUrl: '' });
// // // // // // //   };
// // // // // // //   const removeForumCat = (idx: number) => {
// // // // // // //       setFormData(prev => ({ ...prev, forumCategories: prev.forumCategories.filter((_, i) => i !== idx) }));
// // // // // // //   };

// // // // // // //   // 2. Course Categories
// // // // // // //   const addCourseCat = () => {
// // // // // // //       if (!newCourseCat) return;
// // // // // // //       setFormData(prev => ({ ...prev, courseCategories: [...prev.courseCategories, newCourseCat] }));
// // // // // // //       setNewCourseCat('');
// // // // // // //   };
// // // // // // //   const removeCourseCat = (idx: number) => {
// // // // // // //       setFormData(prev => ({ ...prev, courseCategories: prev.courseCategories.filter((_, i) => i !== idx) }));
// // // // // // //   };

// // // // // // //   // 3. Library Categories
// // // // // // //   const addLibCat = () => {
// // // // // // //       if (!newLibCat) return;
// // // // // // //       setFormData(prev => ({ ...prev, libraryCategories: [...prev.libraryCategories, newLibCat] }));
// // // // // // //       setNewLibCat('');
// // // // // // //   };
// // // // // // //   const removeLibCat = (idx: number) => {
// // // // // // //       setFormData(prev => ({ ...prev, libraryCategories: prev.libraryCategories.filter((_, i) => i !== idx) }));
// // // // // // //   };

// // // // // // //   // --- SAVE ---
// // // // // // //   const handleSave = async (e: React.FormEvent) => {
// // // // // // //     e.preventDefault();
// // // // // // //     setSaving(true);
// // // // // // //     try {
// // // // // // //       // Menggunakan PUT agar sesuai dengan logika Update
// // // // // // //       await api('/api/content', { method: 'PUT', body: formData });
// // // // // // //       alert("Pengaturan Berhasil Disimpan!");
// // // // // // //       // router.push('/'); // Opsional: redirect ke home
// // // // // // //     } catch (e: any) { alert("Gagal menyimpan: " + e.message); } finally { setSaving(false); }
// // // // // // //   };

// // // // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // // // //   return (
// // // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // // //       <div className="max-w-5xl mx-auto p-6 pb-24 font-sans">
        
// // // // // // //         <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border sticky top-4 z-50">
// // // // // // //             <h1 className="text-xl font-bold text-gray-800">CMS Pengaturan Konten</h1>
// // // // // // //             <button onClick={handleSave} disabled={saving} className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md disabled:opacity-50">
// // // // // // //                 {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
// // // // // // //             </button>
// // // // // // //         </div>
        
// // // // // // //         <form onSubmit={handleSave} className="space-y-8">
            
// // // // // // //             {/* 1. HERO */}
// // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Informasi Utama (Hero Section)</h2>
// // // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // // //                     <div className="space-y-4">
// // // // // // //                         <div>
// // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // // // // // //                             <input type="text" className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} aria-label="Judul Utama Hero" />
// // // // // // //                         </div>
// // // // // // //                         <div>
// // // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // // // // //                             <textarea rows={3} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-red-500" value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} aria-label="Deskripsi Singkat Hero" />
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                     <div>
// // // // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Background</label>
// // // // // // //                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[150px]">
// // // // // // //                             {formData.heroBgUrl ? (
// // // // // // //                                 <div className="relative w-full h-32 mb-2">
// // // // // // //                                     <img src={getImageUrl(formData.heroBgUrl)} className="w-full h-full object-cover rounded" alt="Bg" />
// // // // // // //                                     <button type="button" onClick={() => setFormData({...formData, heroBgUrl: ''})} className="absolute top-1 right-1 bg-red-600 text-white text-xs p-1 rounded">Hapus</button>
// // // // // // //                                 </div>
// // // // // // //                             ) : (<p className="text-sm text-gray-400 mb-2">Belum ada gambar</p>)}
// // // // // // //                             <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700">
// // // // // // //                                 {uploadingBg ? '...' : 'Ganti Background'}
// // // // // // //                                 <input type="file" className="hidden" accept="image/*" onChange={handleUploadBg} disabled={uploadingBg} aria-label="Upload Background Hero" />
// // // // // // //                             </label>
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             </div>

// // // // // // //             {/* 2. SLIDES */}
// // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Foto Slide (Carousel)</h2>
// // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // // //                     {formData.slides.map((url, idx) => (
// // // // // // //                         <div key={idx} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border">
// // // // // // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt="slide" />
// // // // // // //                             <button type="button" onClick={() => removeSlide(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">🗑️</button>
// // // // // // //                         </div>
// // // // // // //                     ))}
// // // // // // //                     <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-video">
// // // // // // //                         <span className="text-4xl text-gray-300">+</span>
// // // // // // //                         <span className="text-sm text-gray-500 font-bold mt-2">{uploadingSlide ? '...' : 'TAMBAH SLIDE'}</span>
// // // // // // //                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadSlide} disabled={uploadingSlide} aria-label="Upload Slide Baru" />
// // // // // // //                     </label>
// // // // // // //                 </div>
// // // // // // //             </div>

// // // // // // //             {/* 3. FITUR */}
// // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Info Fitur (3 Kotak)</h2>
// // // // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // //                     {formData.features.map((feat, idx) => (
// // // // // // //                         <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // // // // // //                             <h3 className="text-sm font-bold text-red-700 mb-2 uppercase">Kotak {idx + 1}</h3>
// // // // // // //                             <input type="text" className="w-full border rounded p-2 text-sm mb-2" value={feat.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} placeholder="Judul" aria-label={`Judul Fitur ${idx+1}`} />
// // // // // // //                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={feat.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} placeholder="Deskripsi" aria-label={`Deskripsi Fitur ${idx+1}`} />
// // // // // // //                         </div>
// // // // // // //                     ))}
// // // // // // //                 </div>
// // // // // // //             </div>

// // // // // // //             {/* 4. FOOTER */}
// // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">4. Pengaturan Footer</h2>
// // // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // // //                     <div className="space-y-4">
// // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">About</label><textarea rows={3} className="w-full border rounded p-2.5 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)} aria-label="Footer About" /></div>
// // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">Alamat</label><textarea rows={2} className="w-full border rounded p-2.5 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)} aria-label="Footer Address" /></div>
// // // // // // //                         <div className="grid grid-cols-2 gap-4">
// // // // // // //                             <div><label className="block text-xs font-bold text-gray-600 mb-1">Telepon</label><input type="text" className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)} aria-label="Footer Phone" /></div>
// // // // // // //                             <div><label className="block text-xs font-bold text-gray-600 mb-1">Email</label><input type="text" className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)} aria-label="Footer Email" /></div>
// // // // // // //                         </div>
// // // // // // //                         <div><label className="block text-sm font-bold text-gray-700 mb-1">Copyright</label><input type="text" className="w-full border rounded p-2.5 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)} aria-label="Footer Copyright" /></div>
// // // // // // //                     </div>
// // // // // // //                     <div className="bg-gray-50 p-4 rounded-xl border">
// // // // // // //                         <h3 className="text-sm font-bold text-gray-800 mb-3">Link Social Media</h3>
// // // // // // //                         <div className="space-y-3">
// // // // // // //                             {['facebook', 'instagram', 'twitter', 'youtube'].map((soc) => (
// // // // // // //                                 <div key={soc}>
// // // // // // //                                     <label className="block text-xs font-bold text-gray-600 mb-1 capitalize">{soc}</label>
// // // // // // //                                     <input 
// // // // // // //                                         type="text" 
// // // // // // //                                         className="w-full border rounded p-2 text-sm" 
// // // // // // //                                         placeholder={`https://${soc}.com/...`} 
// // // // // // //                                         // AMAN DARI ERROR UNDEFINED:
// // // // // // //                                         value={formData.footer.socials?.[soc] || ''} 
// // // // // // //                                         onChange={e => handleSocialChange(soc, e.target.value)} 
// // // // // // //                                         aria-label={`Footer Social ${soc}`} 
// // // // // // //                                     />
// // // // // // //                                 </div>
// // // // // // //                             ))}
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             </div>

// // // // // // //             {/* 5. KATEGORI FORUM (ICON & NAMA) */}
// // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">5. Kategori Forum & Avatar</h2>
                
// // // // // // //                 <div className="flex gap-4 mb-4 items-end">
// // // // // // //                     <div className="flex-1">
// // // // // // //                         <label className="block text-xs font-bold text-gray-600 mb-1">Nama Kategori Baru</label>
// // // // // // //                         <input type="text" className="w-full border rounded p-2 text-sm" value={newForumCat.name} onChange={e => setNewForumCat({...newForumCat, name: e.target.value})} placeholder="Contoh: Diskusi Umum" aria-label="Nama Kategori Forum" />
// // // // // // //                     </div>
// // // // // // //                     <div>
// // // // // // //                         <label className="block text-xs font-bold text-gray-600 mb-1">Upload Icon (Opsional)</label>
// // // // // // //                         <div className="flex items-center gap-2">
// // // // // // //                             <label className="cursor-pointer bg-gray-100 border border-gray-300 px-3 py-1.5 rounded text-xs font-bold hover:bg-gray-200">
// // // // // // //                                 {uploadingForumIcon ? '...' : 'Pilih Icon'}
// // // // // // //                                 <input type="file" className="hidden" accept="image/*" onChange={handleUploadForumIcon} disabled={uploadingForumIcon} aria-label="Upload Icon Kategori Forum" />
// // // // // // //                             </label>
// // // // // // //                             {newForumCat.iconUrl && <img src={getImageUrl(newForumCat.iconUrl)} className="w-8 h-8 rounded object-cover border" alt="icon" />}
// // // // // // //                         </div>
// // // // // // //                     </div>
// // // // // // //                     <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 h-[38px]" aria-label="Tambah Kategori Forum">Tambah</button>
// // // // // // //                 </div>

// // // // // // //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// // // // // // //                     {formData.forumCategories.map((cat, idx) => (
// // // // // // //                         <div key={idx} className="flex items-center justify-between p-2 border rounded bg-gray-50">
// // // // // // //                             <div className="flex items-center gap-2">
// // // // // // //                                 {cat.iconUrl ? <img src={getImageUrl(cat.iconUrl)} className="w-6 h-6 rounded-full" alt="icon" /> : <span className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px]">#</span>}
// // // // // // //                                 <span className="text-sm font-bold text-gray-700">{cat.name}</span>
// // // // // // //                             </div>
// // // // // // //                             <button type="button" onClick={() => removeForumCat(idx)} className="text-red-500 hover:text-red-700 text-xs font-bold" aria-label="Hapus Kategori Forum">✕</button>
// // // // // // //                         </div>
// // // // // // //                     ))}
// // // // // // //                 </div>
// // // // // // //             </div>

// // // // // // //             {/* 6. KATEGORI PELATIHAN (TEXT ONLY) */}
// // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">6. Kategori Pelatihan (Health, Disaster, dll)</h2>
// // // // // // //                 <div className="flex gap-2 mb-4">
// // // // // // //                     <input type="text" className="flex-1 border rounded p-2 text-sm" value={newCourseCat} onChange={e => setNewCourseCat(e.target.value)} placeholder="Contoh: Leadership" aria-label="Nama Kategori Pelatihan Baru" />
// // // // // // //                     <button type="button" onClick={addCourseCat} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700" aria-label="Tambah Kategori Pelatihan">Tambah</button>
// // // // // // //                 </div>
// // // // // // //                 <div className="flex flex-wrap gap-2">
// // // // // // //                     {formData.courseCategories.map((cat, idx) => (
// // // // // // //                         <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-2">
// // // // // // //                             {cat}
// // // // // // //                             <button type="button" onClick={() => removeCourseCat(idx)} className="text-green-900 hover:text-red-600" aria-label="Hapus Kategori Pelatihan">✕</button>
// // // // // // //                         </span>
// // // // // // //                     ))}
// // // // // // //                 </div>
// // // // // // //             </div>

// // // // // // //             {/* 7. KATEGORI PERPUSTAKAAN (TEXT ONLY) */}
// // // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">7. Kategori Perpustakaan (Flyer, Booklet, dll)</h2>
// // // // // // //                 <div className="flex gap-2 mb-4">
// // // // // // //                     <input type="text" className="flex-1 border rounded p-2 text-sm" value={newLibCat} onChange={e => setNewLibCat(e.target.value)} placeholder="Contoh: Video Edukasi" aria-label="Nama Kategori Perpustakaan Baru" />
// // // // // // //                     <button type="button" onClick={addLibCat} className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700" aria-label="Tambah Kategori Perpustakaan">Tambah</button>
// // // // // // //                 </div>
// // // // // // //                 <div className="flex flex-wrap gap-2">
// // // // // // //                     {formData.libraryCategories.map((cat, idx) => (
// // // // // // //                         <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold flex items-center gap-2">
// // // // // // //                             {cat}
// // // // // // //                             <button type="button" onClick={() => removeLibCat(idx)} className="text-purple-900 hover:text-red-600" aria-label="Hapus Kategori Perpustakaan">✕</button>
// // // // // // //                         </span>
// // // // // // //                     ))}
// // // // // // //                 </div>
// // // // // // //             </div>

// // // // // // //         </form>
// // // // // // //       </div>
// // // // // // //     </Protected>
// // // // // // //   );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { useRouter } from 'next/navigation';
// // // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // // import Protected from '@/components/Protected';

// // // // // // // TIPE DATA
// // // // // // interface Feature { title: string; description: string; }
// // // // // // interface ForumCategory { name: string; iconUrl: string; }
// // // // // // interface FormDataState {
// // // // // //   heroTitle: string;
// // // // // //   heroDescription: string;
// // // // // //   heroBgUrl: string;
// // // // // //   slides: string[];
// // // // // //   features: Feature[];
// // // // // //   footer: {
// // // // // //     about: string;
// // // // // //     address: string;
// // // // // //     phone: string;
// // // // // //     email: string;
// // // // // //     website: string;
// // // // // //     copyright: string;
// // // // // //     logoUrl: string; // <--- STATE BARU
// // // // // //     socials: { facebook: string; instagram: string; twitter: string; youtube: string; [key: string]: string; };
// // // // // //   };
// // // // // //   forumCategories: ForumCategory[];
// // // // // //   courseCategories: string[];
// // // // // //   libraryCategories: string[];
// // // // // // }

// // // // // // export default function AdminContentPage() {
// // // // // //   const router = useRouter();
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [saving, setSaving] = useState(false);
  
// // // // // //   // Loading States untuk Upload
// // // // // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // // // // //   const [uploadingBg, setUploadingBg] = useState(false);
// // // // // //   const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false); // <--- LOADING STATE LOGO FOOTER
// // // // // //   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

// // // // // //   // Input Tambahan
// // // // // //   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
// // // // // //   const [newCourseCat, setNewCourseCat] = useState('');
// // // // // //   const [newLibCat, setNewLibCat] = useState('');

// // // // // //   const [formData, setFormData] = useState<FormDataState>({
// // // // // //     heroTitle: '', heroDescription: '', heroBgUrl: '', slides: [],
// // // // // //     features: [ { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } ],
// // // // // //     footer: {
// // // // // //         about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '',
// // // // // //         socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// // // // // //     },
// // // // // //     forumCategories: [], courseCategories: [], libraryCategories: []
// // // // // //   });

// // // // // //   useEffect(() => { loadContent(); }, []);

// // // // // //   const loadContent = async () => {
// // // // // //     try {
// // // // // //       const data = await api('/api/content');
// // // // // //       if (data) {
// // // // // //           setFormData({
// // // // // //             heroTitle: data.heroTitle || '',
// // // // // //             heroDescription: data.heroDescription || '',
// // // // // //             heroBgUrl: data.heroBgUrl || '',
// // // // // //             slides: data.slides || [],
// // // // // //             features: data.features?.length ? data.features : [ { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } ],
// // // // // //             footer: {
// // // // // //                 about: data.footer?.about || '',
// // // // // //                 address: data.footer?.address || '',
// // // // // //                 phone: data.footer?.phone || '',
// // // // // //                 email: data.footer?.email || '',
// // // // // //                 website: data.footer?.website || '',
// // // // // //                 copyright: data.footer?.copyright || '',
// // // // // //                 logoUrl: data.footer?.logoUrl || '', // <--- LOAD LOGO
// // // // // //                 socials: { facebook: '', instagram: '', twitter: '', youtube: '', ...(data.footer?.socials || {}) }
// // // // // //             },
// // // // // //             forumCategories: data.forumCategories || [],
// // // // // //             courseCategories: data.courseCategories || [],
// // // // // //             libraryCategories: data.libraryCategories || []
// // // // // //           });
// // // // // //       }
// // // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // // //   };

// // // // // //   // --- HANDLERS UPLOAD ---
// // // // // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
// // // // // //     if (!e.target.files?.[0]) return;
// // // // // //     loader(true);
// // // // // //     try {
// // // // // //       const fd = new FormData(); fd.append('file', e.target.files[0]);
// // // // // //       const res = await apiUpload('/api/upload', fd);
// // // // // //       const newUrl = res.url || res.file?.url;
// // // // // //       if (newUrl) setter(newUrl);
// // // // // //     } catch (e: any) { alert(e.message); } finally { loader(false); }
// // // // // //   };

// // // // // //   // Wrapper handlers
// // // // // //   const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setFormData(p => ({...p, slides: [...p.slides, url]})), setUploadingSlide);
// // // // // //   const handleUploadBg = (e: React.ChangeEvent<HTMLInputElement>) => handleUpload(e, (url) => setFormData(p => ({...p, heroBgUrl: url})), setUploadingBg);
  
// // // // // //   // HANDLER UPLOAD LOGO FOOTER BARU
// // // // // //   const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // // // //       handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);

// // // // // //   const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // // // //       handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

// // // // // //   // --- HANDLERS TEXT ---
// // // // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // // // //       const newFeatures = [...formData.features];
// // // // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // // // //       setFormData({ ...formData, features: newFeatures });
// // // // // //   };
// // // // // //   const handleFooterChange = (field: string, value: string) => {
// // // // // //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// // // // // //   };
// // // // // //   const handleSocialChange = (platform: string, value: string) => {
// // // // // //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } }));
// // // // // //   };

// // // // // //   // --- HANDLERS KATEGORI (SAMA SEPERTI SEBELUMNYA) ---
// // // // // //   const removeSlide = (idx: number) => { if(confirm("Hapus?")) setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) })); };
// // // // // //   const addForumCat = () => { if (!newForumCat.name) return; setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); setNewForumCat({ name: '', iconUrl: '' }); };
// // // // // //   const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
// // // // // //   const addCourseCat = () => { if (!newCourseCat) return; setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); setNewCourseCat(''); };
// // // // // //   const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
// // // // // //   const addLibCat = () => { if (!newLibCat) return; setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); setNewLibCat(''); };
// // // // // //   const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));

// // // // // //   const handleSave = async (e: React.FormEvent) => {
// // // // // //     e.preventDefault();
// // // // // //     setSaving(true);
// // // // // //     try {
// // // // // //       await api('/api/content', { method: 'PUT', body: formData });
// // // // // //       alert("Pengaturan Berhasil Disimpan!");
// // // // // //     } catch (e: any) { alert("Gagal: " + e.message); } finally { setSaving(false); }
// // // // // //   };

// // // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // // //   return (
// // // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // // //       <div className="max-w-5xl mx-auto p-6 pb-24 font-sans">
// // // // // //         <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border sticky top-4 z-50">
// // // // // //             <h1 className="text-xl font-bold text-gray-800">CMS Pengaturan Konten</h1>
// // // // // //             <button onClick={handleSave} disabled={saving} className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 disabled:opacity-50">{saving ? 'Menyimpan...' : '💾 Simpan'}</button>
// // // // // //         </div>
        
// // // // // //         <form onSubmit={handleSave} className="space-y-8">
            
// // // // // //             {/* HERO SECTION */}
// // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Hero Section</h2>
// // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // //                     <div className="space-y-4">
// // // // // //                         <input className="w-full border rounded p-2" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} placeholder="Judul Utama" aria-label="Judul Hero"/>
// // // // // //                         <textarea rows={3} className="w-full border rounded p-2" value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} placeholder="Deskripsi Singkat" aria-label="Deskripsi Hero"/>
// // // // // //                     </div>
// // // // // //                     <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center">
// // // // // //                         {formData.heroBgUrl ? <img src={getImageUrl(formData.heroBgUrl)} className="h-20 w-auto mb-2 rounded" alt="Bg"/> : <span className="text-xs text-gray-400 mb-2">No Bg</span>}
// // // // // //                         <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">{uploadingBg ? '...' : 'Upload Background'}<input type="file" className="hidden" onChange={handleUploadBg} /></label>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             </div>

// // // // // //             {/* SLIDES */}
// // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Slide Carousel</h2>
// // // // // //                 <div className="flex gap-4 overflow-x-auto pb-2">
// // // // // //                     {formData.slides.map((url, idx) => (
// // // // // //                         <div key={idx} className="relative w-32 h-20 flex-shrink-0"><img src={getImageUrl(url)} className="w-full h-full object-cover rounded border" alt="slide"/><button type="button" onClick={() => removeSlide(idx)} className="absolute top-0 right-0 bg-red-600 text-white px-1.5 text-xs rounded">x</button></div>
// // // // // //                     ))}
// // // // // //                     <label className="w-32 h-20 border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50 rounded flex-shrink-0 text-xs text-gray-500 font-bold">{uploadingSlide ? '...' : '+ Add Slide'}<input type="file" className="hidden" onChange={handleUploadSlide} /></label>
// // // // // //                 </div>
// // // // // //             </div>

// // // // // //             {/* FEATURES */}
// // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Fitur Utama</h2>
// // // // // //                 <div className="grid grid-cols-3 gap-4">
// // // // // //                     {formData.features.map((feat, idx) => (
// // // // // //                         <div key={idx}><input className="w-full border rounded p-2 text-sm mb-2" value={feat.title} onChange={e => handleFeatureChange(idx, 'title', e.target.value)} placeholder={`Judul ${idx+1}`} aria-label={`Judul Fitur ${idx+1}`}/><textarea rows={2} className="w-full border rounded p-2 text-sm" value={feat.description} onChange={e => handleFeatureChange(idx, 'description', e.target.value)} placeholder="Deskripsi" aria-label={`Deskripsi Fitur ${idx+1}`}/></div>
// // // // // //                     ))}
// // // // // //                 </div>
// // // // // //             </div>

// // // // // //             {/* FOOTER SETTINGS (DENGAN UPLOAD LOGO) */}
// // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">4. Pengaturan Footer</h2>
// // // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // // //                     <div className="space-y-4">
// // // // // //                         {/* --- BAGIAN UPLOAD LOGO FOOTER --- */}
// // // // // //                         <div>
// // // // // //                             <label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label>
// // // // // //                             <div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
// // // // // //                                 {formData.footer.logoUrl ? (
// // // // // //                                     <img src={getImageUrl(formData.footer.logoUrl)} className="h-12 w-auto object-contain bg-white border p-1 rounded" alt="Logo Footer" />
// // // // // //                                 ) : (
// // // // // //                                     <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Logo</div>
// // // // // //                                 )}
// // // // // //                                 <div className="flex flex-col gap-2">
// // // // // //                                     <label className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700 text-center">
// // // // // //                                         {uploadingFooterLogo ? 'Mengupload...' : 'Pilih Logo'}
// // // // // //                                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadFooterLogo} disabled={uploadingFooterLogo} />
// // // // // //                                     </label>
// // // // // //                                     {formData.footer.logoUrl && (
// // // // // //                                         <button type="button" onClick={() => handleFooterChange('logoUrl', '')} className="text-red-600 text-xs font-bold hover:underline">Hapus Logo</button>
// // // // // //                                     )}
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                         {/* ---------------------------------- */}

// // // // // //                         <div><label className="block text-xs font-bold mb-1">Deskripsi Singkat (About)</label><textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)} /></div>
// // // // // //                         <div><label className="block text-xs font-bold mb-1">Alamat</label><textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)} /></div>
// // // // // //                     </div>
// // // // // //                     <div className="space-y-4">
// // // // // //                         <div className="grid grid-cols-2 gap-2">
// // // // // //                             <div><label className="block text-xs font-bold mb-1">Telepon</label><input className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)} /></div>
// // // // // //                             <div><label className="block text-xs font-bold mb-1">Email</label><input className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)} /></div>
// // // // // //                         </div>
// // // // // //                         <div><label className="block text-xs font-bold mb-1">Website</label><input className="w-full border rounded p-2 text-sm" value={formData.footer.website} onChange={e => handleFooterChange('website', e.target.value)} /></div>
// // // // // //                         <div><label className="block text-xs font-bold mb-1">Copyright</label><input className="w-full border rounded p-2 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)} /></div>
// // // // // //                         <div className="bg-gray-50 p-3 rounded border">
// // // // // //                             <h3 className="text-xs font-bold mb-2">Social Media</h3>
// // // // // //                             <div className="grid grid-cols-2 gap-2">
// // // // // //                                 {['facebook','instagram','twitter','youtube'].map(soc => (
// // // // // //                                     <input key={soc} className="w-full border rounded p-1.5 text-xs" placeholder={soc} value={formData.footer.socials?.[soc] || ''} onChange={e => handleSocialChange(soc, e.target.value)} aria-label={soc}/>
// // // // // //                                 ))}
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             </div>

// // // // // //             {/* KATEGORI SECTIONS (Disederhanakan untuk singkat, logika sama) */}
// // // // // //             {/* ... (Code untuk kategori forum, course, library tetap sama seperti sebelumnya) ... */}
// // // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">5. Manajemen Kategori</h2>
// // // // // //                 <div className="grid md:grid-cols-3 gap-6">
// // // // // //                     {/* Forum */}
// // // // // //                     <div>
// // // // // //                         <h3 className="text-sm font-bold text-blue-700 mb-2">Forum</h3>
// // // // // //                         <div className="flex gap-2 mb-2"><input className="flex-1 border p-1 text-sm rounded" value={newForumCat.name} onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} placeholder="Nama"/><label className="bg-gray-200 px-2 py-1 rounded cursor-pointer text-xs flex items-center">{uploadingForumIcon ? '..' : 'Icon'}<input type="file" className="hidden" onChange={handleUploadForumIcon}/></label><button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-2 rounded">+</button></div>
// // // // // //                         <div className="flex flex-wrap gap-1">{formData.forumCategories.map((c,i)=><span key={i} className="bg-gray-100 text-xs px-2 py-1 rounded flex items-center gap-1">{c.name}<button onClick={()=>removeForumCat(i)} className="text-red-500 font-bold ml-1">x</button></span>)}</div>
// // // // // //                     </div>
// // // // // //                     {/* Course */}
// // // // // //                     <div>
// // // // // //                         <h3 className="text-sm font-bold text-green-700 mb-2">Pelatihan</h3>
// // // // // //                         <div className="flex gap-2 mb-2"><input className="flex-1 border p-1 text-sm rounded" value={newCourseCat} onChange={e=>setNewCourseCat(e.target.value)} placeholder="Nama"/><button type="button" onClick={addCourseCat} className="bg-green-600 text-white px-2 rounded">+</button></div>
// // // // // //                         <div className="flex flex-wrap gap-1">{formData.courseCategories.map((c,i)=><span key={i} className="bg-green-50 text-xs px-2 py-1 rounded flex items-center gap-1">{c}<button onClick={()=>removeCourseCat(i)} className="text-red-500 font-bold ml-1">x</button></span>)}</div>
// // // // // //                     </div>
// // // // // //                     {/* Library */}
// // // // // //                     <div>
// // // // // //                         <h3 className="text-sm font-bold text-purple-700 mb-2">Perpustakaan</h3>
// // // // // //                         <div className="flex gap-2 mb-2"><input className="flex-1 border p-1 text-sm rounded" value={newLibCat} onChange={e=>setNewLibCat(e.target.value)} placeholder="Nama"/><button type="button" onClick={addLibCat} className="bg-purple-600 text-white px-2 rounded">+</button></div>
// // // // // //                         <div className="flex flex-wrap gap-1">{formData.libraryCategories.map((c,i)=><span key={i} className="bg-purple-50 text-xs px-2 py-1 rounded flex items-center gap-1">{c}<button onClick={()=>removeLibCat(i)} className="text-red-500 font-bold ml-1">x</button></span>)}</div>
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             </div>

// // // // // //         </form>
// // // // // //       </div>
// // // // // //     </Protected>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { useRouter } from 'next/navigation';
// // // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // // import Protected from '@/components/Protected';

// // // // // // --- TIPE DATA ---
// // // // // interface Feature { 
// // // // //     title: string; 
// // // // //     description: string; 
// // // // // }

// // // // // interface ForumCategory { 
// // // // //     name: string; 
// // // // //     iconUrl: string; 
// // // // // }

// // // // // interface FormDataState {
// // // // //   heroTitle: string;
// // // // //   heroDescription: string;
// // // // //   heroBgUrl: string;
// // // // //   slides: string[];
// // // // //   features: Feature[];
// // // // //   footer: {
// // // // //     about: string;
// // // // //     address: string;
// // // // //     phone: string;
// // // // //     email: string;
// // // // //     website: string;
// // // // //     copyright: string;
// // // // //     logoUrl: string; // Field Logo Footer
// // // // //     socials: {
// // // // //       facebook: string;
// // // // //       instagram: string;
// // // // //       twitter: string;
// // // // //       youtube: string;
// // // // //       [key: string]: string;
// // // // //     };
// // // // //   };
// // // // //   forumCategories: ForumCategory[];
// // // // //   courseCategories: string[];
// // // // //   libraryCategories: string[];
// // // // // }

// // // // // export default function AdminContentPage() {
// // // // //   const router = useRouter();
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [saving, setSaving] = useState(false);
  
// // // // //   // Loading States Upload
// // // // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // // // //   const [uploadingBg, setUploadingBg] = useState(false);
// // // // //   const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
// // // // //   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

// // // // //   // Input Tambahan Kategori
// // // // //   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
// // // // //   const [newCourseCat, setNewCourseCat] = useState('');
// // // // //   const [newLibCat, setNewLibCat] = useState('');

// // // // //   // Main State
// // // // //   const [formData, setFormData] = useState<FormDataState>({
// // // // //     heroTitle: '',
// // // // //     heroDescription: '',
// // // // //     heroBgUrl: '',
// // // // //     slides: [],
// // // // //     features: [ 
// // // // //         { title: '', description: '' }, 
// // // // //         { title: '', description: '' }, 
// // // // //         { title: '', description: '' } 
// // // // //     ],
// // // // //     footer: {
// // // // //         about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '',
// // // // //         socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// // // // //     },
// // // // //     forumCategories: [],
// // // // //     courseCategories: [],
// // // // //     libraryCategories: []
// // // // //   });

// // // // //   useEffect(() => {
// // // // //     loadContent();
// // // // //   }, []);

// // // // //   const loadContent = async () => {
// // // // //     try {
// // // // //       const data = await api('/api/content');
// // // // //       if (data) {
// // // // //           setFormData({
// // // // //             heroTitle: data.heroTitle || '',
// // // // //             heroDescription: data.heroDescription || '',
// // // // //             heroBgUrl: data.heroBgUrl || '',
// // // // //             slides: data.slides || [],
// // // // //             features: data.features?.length ? data.features : [ 
// // // // //                 { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } 
// // // // //             ],
// // // // //             footer: {
// // // // //                 about: data.footer?.about || '',
// // // // //                 address: data.footer?.address || '',
// // // // //                 phone: data.footer?.phone || '',
// // // // //                 email: data.footer?.email || '',
// // // // //                 website: data.footer?.website || '',
// // // // //                 copyright: data.footer?.copyright || '',
// // // // //                 logoUrl: data.footer?.logoUrl || '',
// // // // //                 socials: { 
// // // // //                     facebook: '', instagram: '', twitter: '', youtube: '', 
// // // // //                     ...(data.footer?.socials || {}) 
// // // // //                 }
// // // // //             },
// // // // //             forumCategories: data.forumCategories || [],
// // // // //             courseCategories: data.courseCategories || [],
// // // // //             libraryCategories: data.libraryCategories || []
// // // // //           });
// // // // //       }
// // // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // // //   };

// // // // //   // --- HANDLERS UPLOAD ---
// // // // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
// // // // //     if (!e.target.files?.[0]) return;
// // // // //     loader(true);
// // // // //     try {
// // // // //       const fd = new FormData();
// // // // //       fd.append('file', e.target.files[0]);
// // // // //       const res = await apiUpload('/api/upload', fd);
// // // // //       const newUrl = res.url || res.file?.url;
// // // // //       if (newUrl) setter(newUrl);
// // // // //     } catch (e: any) { alert(e.message); } finally { loader(false); }
// // // // //   };

// // // // //   // Wrapper Handlers
// // // // //   const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // // //       handleUpload(e, (url) => setFormData(p => ({...p, slides: [...p.slides, url]})), setUploadingSlide);
  
// // // // //   const handleUploadBg = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // // //       handleUpload(e, (url) => setFormData(p => ({...p, heroBgUrl: url})), setUploadingBg);
  
// // // // //   const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // // //       handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);

// // // // //   const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // // //       handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

// // // // //   // --- HANDLERS TEXT ---
// // // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // // //       const newFeatures = [...formData.features];
// // // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // // //       setFormData({ ...formData, features: newFeatures });
// // // // //   };
// // // // //   const handleFooterChange = (field: string, value: string) => {
// // // // //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// // // // //   };
// // // // //   const handleSocialChange = (platform: string, value: string) => {
// // // // //       setFormData(prev => ({ 
// // // // //           ...prev, 
// // // // //           footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } 
// // // // //       }));
// // // // //   };

// // // // //   // --- HANDLERS KATEGORI ---
// // // // //   const removeSlide = (idx: number) => { 
// // // // //       if(confirm("Hapus slide ini?")) setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) })); 
// // // // //   };
// // // // //   const addForumCat = () => { 
// // // // //       if (!newForumCat.name) return; 
// // // // //       setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); 
// // // // //       setNewForumCat({ name: '', iconUrl: '' }); 
// // // // //   };
// // // // //   const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
  
// // // // //   const addCourseCat = () => { 
// // // // //       if (!newCourseCat) return; 
// // // // //       setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); 
// // // // //       setNewCourseCat(''); 
// // // // //   };
// // // // //   const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
  
// // // // //   const addLibCat = () => { 
// // // // //       if (!newLibCat) return; 
// // // // //       setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); 
// // // // //       setNewLibCat(''); 
// // // // //   };
// // // // //   const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));

// // // // //   // --- SAVE ---
// // // // //   const handleSave = async (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     setSaving(true);
// // // // //     try {
// // // // //       await api('/api/content', { method: 'PUT', body: formData });
// // // // //       alert("Pengaturan Berhasil Disimpan!");
// // // // //     } catch (e: any) { alert("Gagal: " + e.message); } finally { setSaving(false); }
// // // // //   };

// // // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // // //   return (
// // // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // // //       <div className="max-w-5xl mx-auto p-6 pb-24 font-sans">
        
// // // // //         <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border sticky top-4 z-50">
// // // // //             <h1 className="text-xl font-bold text-gray-800">CMS Pengaturan Konten</h1>
// // // // //             <button 
// // // // //                 onClick={handleSave} 
// // // // //                 disabled={saving} 
// // // // //                 className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 disabled:opacity-50"
// // // // //                 aria-label="Simpan Perubahan"
// // // // //             >
// // // // //                 {saving ? 'Menyimpan...' : '💾 Simpan'}
// // // // //             </button>
// // // // //         </div>
        
// // // // //         <form onSubmit={handleSave} className="space-y-8">
            
// // // // //             {/* 1. HERO SECTION */}
// // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Hero Section</h2>
// // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // //                     <div className="space-y-4">
// // // // //                         <div>
// // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // // // //                             <input 
// // // // //                                 className="w-full border rounded p-2" 
// // // // //                                 value={formData.heroTitle} 
// // // // //                                 onChange={e => setFormData({...formData, heroTitle: e.target.value})} 
// // // // //                                 placeholder="Judul Utama" 
// // // // //                                 aria-label="Judul Utama Hero" 
// // // // //                             />
// // // // //                         </div>
// // // // //                         <div>
// // // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // // //                             <textarea 
// // // // //                                 rows={3} 
// // // // //                                 className="w-full border rounded p-2" 
// // // // //                                 value={formData.heroDescription} 
// // // // //                                 onChange={e => setFormData({...formData, heroDescription: e.target.value})} 
// // // // //                                 placeholder="Deskripsi Singkat" 
// // // // //                                 aria-label="Deskripsi Singkat Hero" 
// // // // //                             />
// // // // //                         </div>
// // // // //                     </div>
// // // // //                     <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center">
// // // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Background Image</label>
// // // // //                         {formData.heroBgUrl ? (
// // // // //                             <img src={getImageUrl(formData.heroBgUrl)} className="h-20 w-auto mb-2 rounded object-cover" alt="Hero Background"/>
// // // // //                         ) : (
// // // // //                             <span className="text-xs text-gray-400 mb-2">Belum ada gambar</span>
// // // // //                         )}
// // // // //                         <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700">
// // // // //                             {uploadingBg ? 'Mengupload...' : 'Upload Background'}
// // // // //                             <input 
// // // // //                                 type="file" 
// // // // //                                 className="hidden" 
// // // // //                                 onChange={handleUploadBg} 
// // // // //                                 disabled={uploadingBg}
// // // // //                                 aria-label="Upload Hero Background"
// // // // //                             />
// // // // //                         </label>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>

// // // // //             {/* 2. SLIDES */}
// // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Slide Carousel</h2>
// // // // //                 <div className="flex gap-4 overflow-x-auto pb-2">
// // // // //                     {formData.slides.map((url, idx) => (
// // // // //                         <div key={idx} className="relative w-32 h-20 flex-shrink-0 group">
// // // // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover rounded border" alt={`Slide ${idx + 1}`}/>
// // // // //                             <button 
// // // // //                                 type="button" 
// // // // //                                 onClick={() => removeSlide(idx)} 
// // // // //                                 className="absolute top-0 right-0 bg-red-600 text-white px-1.5 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
// // // // //                                 aria-label={`Hapus Slide ${idx + 1}`}
// // // // //                             >
// // // // //                                 x
// // // // //                             </button>
// // // // //                         </div>
// // // // //                     ))}
// // // // //                     <label className="w-32 h-20 border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50 rounded flex-shrink-0 text-xs text-gray-500 font-bold">
// // // // //                         {uploadingSlide ? '...' : '+ Add Slide'}
// // // // //                         <input 
// // // // //                             type="file" 
// // // // //                             className="hidden" 
// // // // //                             onChange={handleUploadSlide} 
// // // // //                             disabled={uploadingSlide}
// // // // //                             aria-label="Upload Slide Baru"
// // // // //                         />
// // // // //                     </label>
// // // // //                 </div>
// // // // //             </div>

// // // // //             {/* 3. FEATURES */}
// // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Fitur Utama</h2>
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // //                     {formData.features.map((feat, idx) => (
// // // // //                         <div key={idx} className="p-2 border rounded bg-gray-50">
// // // // //                             <label className="block text-xs font-bold text-gray-500 mb-1">Fitur {idx + 1}</label>
// // // // //                             <input 
// // // // //                                 className="w-full border rounded p-2 text-sm mb-2" 
// // // // //                                 value={feat.title} 
// // // // //                                 onChange={e => handleFeatureChange(idx, 'title', e.target.value)} 
// // // // //                                 placeholder={`Judul Fitur ${idx+1}`} 
// // // // //                                 aria-label={`Judul Fitur ${idx+1}`}
// // // // //                             />
// // // // //                             <textarea 
// // // // //                                 rows={2} 
// // // // //                                 className="w-full border rounded p-2 text-sm" 
// // // // //                                 value={feat.description} 
// // // // //                                 onChange={e => handleFeatureChange(idx, 'description', e.target.value)} 
// // // // //                                 placeholder="Deskripsi" 
// // // // //                                 aria-label={`Deskripsi Fitur ${idx+1}`}
// // // // //                             />
// // // // //                         </div>
// // // // //                     ))}
// // // // //                 </div>
// // // // //             </div>

// // // // //             {/* 4. FOOTER SETTINGS */}
// // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">4. Pengaturan Footer</h2>
// // // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // // //                     <div className="space-y-4">
// // // // //                         {/* UPLOAD LOGO FOOTER */}
// // // // //                         <div>
// // // // //                             <label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label>
// // // // //                             <div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
// // // // //                                 {formData.footer.logoUrl ? (
// // // // //                                     <img src={getImageUrl(formData.footer.logoUrl)} className="h-12 w-auto object-contain bg-white border p-1 rounded" alt="Logo Footer" />
// // // // //                                 ) : (
// // // // //                                     <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Logo</div>
// // // // //                                 )}
// // // // //                                 <div className="flex flex-col gap-2">
// // // // //                                     <label className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700 text-center">
// // // // //                                         {uploadingFooterLogo ? 'Mengupload...' : 'Pilih Logo'}
// // // // //                                         <input 
// // // // //                                             type="file" 
// // // // //                                             className="hidden" 
// // // // //                                             accept="image/*" 
// // // // //                                             onChange={handleUploadFooterLogo} 
// // // // //                                             disabled={uploadingFooterLogo} 
// // // // //                                             aria-label="Upload Logo Footer"
// // // // //                                         />
// // // // //                                     </label>
// // // // //                                     {formData.footer.logoUrl && (
// // // // //                                         <button 
// // // // //                                             type="button" 
// // // // //                                             onClick={() => handleFooterChange('logoUrl', '')} 
// // // // //                                             className="text-red-600 text-xs font-bold hover:underline"
// // // // //                                             aria-label="Hapus Logo Footer"
// // // // //                                         >
// // // // //                                             Hapus Logo
// // // // //                                         </button>
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>

// // // // //                         <div>
// // // // //                             <label className="block text-xs font-bold mb-1">Deskripsi Singkat (About)</label>
// // // // //                             <textarea 
// // // // //                                 rows={2} 
// // // // //                                 className="w-full border rounded p-2 text-sm" 
// // // // //                                 value={formData.footer.about} 
// // // // //                                 onChange={e => handleFooterChange('about', e.target.value)} 
// // // // //                                 aria-label="Footer About Text"
// // // // //                             />
// // // // //                         </div>
// // // // //                         <div>
// // // // //                             <label className="block text-xs font-bold mb-1">Alamat</label>
// // // // //                             <textarea 
// // // // //                                 rows={2} 
// // // // //                                 className="w-full border rounded p-2 text-sm" 
// // // // //                                 value={formData.footer.address} 
// // // // //                                 onChange={e => handleFooterChange('address', e.target.value)} 
// // // // //                                 aria-label="Footer Address"
// // // // //                             />
// // // // //                         </div>
// // // // //                     </div>
                    
// // // // //                     <div className="space-y-4">
// // // // //                         <div className="grid grid-cols-2 gap-2">
// // // // //                             <div>
// // // // //                                 <label className="block text-xs font-bold mb-1">Telepon</label>
// // // // //                                 <input 
// // // // //                                     className="w-full border rounded p-2 text-sm" 
// // // // //                                     value={formData.footer.phone} 
// // // // //                                     onChange={e => handleFooterChange('phone', e.target.value)} 
// // // // //                                     aria-label="Footer Phone"
// // // // //                                 />
// // // // //                             </div>
// // // // //                             <div>
// // // // //                                 <label className="block text-xs font-bold mb-1">Email</label>
// // // // //                                 <input 
// // // // //                                     className="w-full border rounded p-2 text-sm" 
// // // // //                                     value={formData.footer.email} 
// // // // //                                     onChange={e => handleFooterChange('email', e.target.value)} 
// // // // //                                     aria-label="Footer Email"
// // // // //                                 />
// // // // //                             </div>
// // // // //                         </div>
// // // // //                         <div>
// // // // //                             <label className="block text-xs font-bold mb-1">Website</label>
// // // // //                             <input 
// // // // //                                 className="w-full border rounded p-2 text-sm" 
// // // // //                                 value={formData.footer.website} 
// // // // //                                 onChange={e => handleFooterChange('website', e.target.value)} 
// // // // //                                 aria-label="Footer Website"
// // // // //                             />
// // // // //                         </div>
// // // // //                         <div>
// // // // //                             <label className="block text-xs font-bold mb-1">Copyright</label>
// // // // //                             <input 
// // // // //                                 className="w-full border rounded p-2 text-sm" 
// // // // //                                 value={formData.footer.copyright} 
// // // // //                                 onChange={e => handleFooterChange('copyright', e.target.value)} 
// // // // //                                 aria-label="Footer Copyright"
// // // // //                             />
// // // // //                         </div>
                        
// // // // //                         <div className="bg-gray-50 p-3 rounded border">
// // // // //                             <h3 className="text-xs font-bold mb-2">Social Media</h3>
// // // // //                             <div className="grid grid-cols-2 gap-2">
// // // // //                                 {['facebook','instagram','twitter','youtube'].map(soc => (
// // // // //                                     <div key={soc}>
// // // // //                                         <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{soc}</label>
// // // // //                                         <input 
// // // // //                                             className="w-full border rounded p-1.5 text-xs" 
// // // // //                                             placeholder={`https://${soc}.com`} 
// // // // //                                             value={formData.footer.socials?.[soc] || ''} 
// // // // //                                             onChange={e => handleSocialChange(soc, e.target.value)} 
// // // // //                                             aria-label={`Footer Social ${soc}`}
// // // // //                                         />
// // // // //                                     </div>
// // // // //                                 ))}
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>

// // // // //             {/* 5. MANAJEMEN KATEGORI */}
// // // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">5. Manajemen Kategori</h2>
// // // // //                 <div className="grid md:grid-cols-3 gap-6">
                    
// // // // //                     {/* Forum Categories */}
// // // // //                     <div>
// // // // //                         <h3 className="text-sm font-bold text-blue-700 mb-2">Forum</h3>
// // // // //                         <div className="flex gap-2 mb-2">
// // // // //                             <input 
// // // // //                                 className="flex-1 border p-1 text-sm rounded" 
// // // // //                                 value={newForumCat.name} 
// // // // //                                 onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} 
// // // // //                                 placeholder="Nama Kategori" 
// // // // //                                 aria-label="Nama Kategori Forum Baru"
// // // // //                             />
// // // // //                             <label className="bg-gray-200 px-2 py-1 rounded cursor-pointer text-xs flex items-center hover:bg-gray-300">
// // // // //                                 {uploadingForumIcon ? '..' : 'Icon'}
// // // // //                                 <input 
// // // // //                                     type="file" 
// // // // //                                     className="hidden" 
// // // // //                                     onChange={handleUploadForumIcon} 
// // // // //                                     aria-label="Upload Icon Kategori Forum"
// // // // //                                 />
// // // // //                             </label>
// // // // //                             <button 
// // // // //                                 type="button" 
// // // // //                                 onClick={addForumCat} 
// // // // //                                 className="bg-blue-600 text-white px-2 rounded hover:bg-blue-700" 
// // // // //                                 aria-label="Tambah Kategori Forum"
// // // // //                             >
// // // // //                                 +
// // // // //                             </button>
// // // // //                         </div>
// // // // //                         <div className="flex flex-wrap gap-1">
// // // // //                             {formData.forumCategories.map((c,i)=>(
// // // // //                                 <span key={i} className="bg-gray-100 text-xs px-2 py-1 rounded flex items-center gap-1">
// // // // //                                     {c.name}
// // // // //                                     <button 
// // // // //                                         onClick={()=>removeForumCat(i)} 
// // // // //                                         className="text-red-500 font-bold ml-1" 
// // // // //                                         aria-label={`Hapus Kategori ${c.name}`}
// // // // //                                     >
// // // // //                                         x
// // // // //                                     </button>
// // // // //                                 </span>
// // // // //                             ))}
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     {/* Course Categories */}
// // // // //                     <div>
// // // // //                         <h3 className="text-sm font-bold text-green-700 mb-2">Pelatihan</h3>
// // // // //                         <div className="flex gap-2 mb-2">
// // // // //                             <input 
// // // // //                                 className="flex-1 border p-1 text-sm rounded" 
// // // // //                                 value={newCourseCat} 
// // // // //                                 onChange={e=>setNewCourseCat(e.target.value)} 
// // // // //                                 placeholder="Nama Kategori" 
// // // // //                                 aria-label="Nama Kategori Pelatihan Baru"
// // // // //                             />
// // // // //                             <button 
// // // // //                                 type="button" 
// // // // //                                 onClick={addCourseCat} 
// // // // //                                 className="bg-green-600 text-white px-2 rounded hover:bg-green-700" 
// // // // //                                 aria-label="Tambah Kategori Pelatihan"
// // // // //                             >
// // // // //                                 +
// // // // //                             </button>
// // // // //                         </div>
// // // // //                         <div className="flex flex-wrap gap-1">
// // // // //                             {formData.courseCategories.map((c,i)=>(
// // // // //                                 <span key={i} className="bg-green-50 text-xs px-2 py-1 rounded flex items-center gap-1">
// // // // //                                     {c}
// // // // //                                     <button 
// // // // //                                         onClick={()=>removeCourseCat(i)} 
// // // // //                                         className="text-red-500 font-bold ml-1" 
// // // // //                                         aria-label={`Hapus Kategori Pelatihan ${c}`}
// // // // //                                     >
// // // // //                                         x
// // // // //                                     </button>
// // // // //                                 </span>
// // // // //                             ))}
// // // // //                         </div>
// // // // //                     </div>

// // // // //                     {/* Library Categories */}
// // // // //                     <div>
// // // // //                         <h3 className="text-sm font-bold text-purple-700 mb-2">Perpustakaan</h3>
// // // // //                         <div className="flex gap-2 mb-2">
// // // // //                             <input 
// // // // //                                 className="flex-1 border p-1 text-sm rounded" 
// // // // //                                 value={newLibCat} 
// // // // //                                 onChange={e=>setNewLibCat(e.target.value)} 
// // // // //                                 placeholder="Nama Kategori" 
// // // // //                                 aria-label="Nama Kategori Library Baru"
// // // // //                             />
// // // // //                             <button 
// // // // //                                 type="button" 
// // // // //                                 onClick={addLibCat} 
// // // // //                                 className="bg-purple-600 text-white px-2 rounded hover:bg-purple-700" 
// // // // //                                 aria-label="Tambah Kategori Library"
// // // // //                             >
// // // // //                                 +
// // // // //                             </button>
// // // // //                         </div>
// // // // //                         <div className="flex flex-wrap gap-1">
// // // // //                             {formData.libraryCategories.map((c,i)=>(
// // // // //                                 <span key={i} className="bg-purple-50 text-xs px-2 py-1 rounded flex items-center gap-1">
// // // // //                                     {c}
// // // // //                                     <button 
// // // // //                                         onClick={()=>removeLibCat(i)} 
// // // // //                                         className="text-red-500 font-bold ml-1" 
// // // // //                                         aria-label={`Hapus Kategori Library ${c}`}
// // // // //                                     >
// // // // //                                         x
// // // // //                                     </button>
// // // // //                                 </span>
// // // // //                             ))}
// // // // //                         </div>
// // // // //                     </div>

// // // // //                 </div>
// // // // //             </div>

// // // // //         </form>
// // // // //       </div>
// // // // //     </Protected>
// // // // //   );
// // // // // }



// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { useRouter } from 'next/navigation';
// // // // import { api, apiUpload, getImageUrl } from '@/lib/api';
// // // // import Protected from '@/components/Protected';
// // // // import { Save, Plus, X, UploadCloud, Layout, List } from 'lucide-react';

// // // // // --- TIPE DATA ---
// // // // interface Feature { 
// // // //     title: string; 
// // // //     description: string; 
// // // // }

// // // // interface ForumCategory { 
// // // //     name: string; 
// // // //     iconUrl: string; 
// // // // }

// // // // interface FormDataState {
// // // //   heroTitle: string;
// // // //   heroDescription: string;
// // // //   heroBgUrl: string;
// // // //   slides: string[];
// // // //   features: Feature[];
// // // //   footer: {
// // // //     about: string;
// // // //     address: string;
// // // //     phone: string;
// // // //     email: string;
// // // //     website: string;
// // // //     copyright: string;
// // // //     logoUrl: string; 
// // // //     socials: {
// // // //       facebook: string;
// // // //       instagram: string;
// // // //       twitter: string;
// // // //       youtube: string;
// // // //       [key: string]: string;
// // // //     };
// // // //   };
// // // //   forumCategories: ForumCategory[];
// // // //   courseCategories: string[];
// // // //   libraryCategories: string[];
// // // // }

// // // // export default function AdminContentPage() {
// // // //   const router = useRouter();
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [saving, setSaving] = useState(false);
  
// // // //   // Loading States Upload
// // // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // // //   const [uploadingBg, setUploadingBg] = useState(false);
// // // //   const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
// // // //   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

// // // //   // Input Tambahan Kategori
// // // //   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
// // // //   const [newCourseCat, setNewCourseCat] = useState('');
// // // //   const [newLibCat, setNewLibCat] = useState('');

// // // //   // Main State
// // // //   const [formData, setFormData] = useState<FormDataState>({
// // // //     heroTitle: '',
// // // //     heroDescription: '',
// // // //     heroBgUrl: '',
// // // //     slides: [],
// // // //     features: [ 
// // // //         { title: '', description: '' }, 
// // // //         { title: '', description: '' }, 
// // // //         { title: '', description: '' } 
// // // //     ],
// // // //     footer: {
// // // //         about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '',
// // // //         socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// // // //     },
// // // //     forumCategories: [],
// // // //     courseCategories: [],
// // // //     libraryCategories: []
// // // //   });

// // // //   useEffect(() => {
// // // //     loadContent();
// // // //   }, []);

// // // //   const loadContent = async () => {
// // // //     try {
// // // //       const data = await api('/api/content');
// // // //       if (data) {
// // // //           setFormData({
// // // //             heroTitle: data.heroTitle || '',
// // // //             heroDescription: data.heroDescription || '',
// // // //             heroBgUrl: data.heroBgUrl || '',
// // // //             slides: data.slides || [],
// // // //             features: data.features?.length ? data.features : [ 
// // // //                 { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } 
// // // //             ],
// // // //             footer: {
// // // //                 about: data.footer?.about || '',
// // // //                 address: data.footer?.address || '',
// // // //                 phone: data.footer?.phone || '',
// // // //                 email: data.footer?.email || '',
// // // //                 website: data.footer?.website || '',
// // // //                 copyright: data.footer?.copyright || '',
// // // //                 logoUrl: data.footer?.logoUrl || '',
// // // //                 socials: { 
// // // //                     facebook: '', instagram: '', twitter: '', youtube: '', 
// // // //                     ...(data.footer?.socials || {}) 
// // // //                 }
// // // //             },
// // // //             forumCategories: data.forumCategories || [],
// // // //             courseCategories: data.courseCategories || [],
// // // //             libraryCategories: data.libraryCategories || []
// // // //           });
// // // //       }
// // // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // // //   };

// // // //   // --- HANDLERS UPLOAD ---
// // // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
// // // //     if (!e.target.files?.[0]) return;
// // // //     loader(true);
// // // //     try {
// // // //       const fd = new FormData();
// // // //       fd.append('file', e.target.files[0]);
// // // //       const res = await apiUpload('/api/upload', fd);
// // // //       const newUrl = res.url || res.file?.url;
// // // //       if (newUrl) setter(newUrl);
// // // //     } catch (e: any) { alert(e.message); } finally { loader(false); }
// // // //   };

// // // //   const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // //       handleUpload(e, (url) => setFormData(p => ({...p, slides: [...p.slides, url]})), setUploadingSlide);
  
// // // //   const handleUploadBg = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // //       handleUpload(e, (url) => setFormData(p => ({...p, heroBgUrl: url})), setUploadingBg);
  
// // // //   const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // //       handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);

// // // //   const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => 
// // // //       handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

// // // //   // --- HANDLERS TEXT ---
// // // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // // //       const newFeatures = [...formData.features];
// // // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // // //       setFormData({ ...formData, features: newFeatures });
// // // //   };
// // // //   const handleFooterChange = (field: string, value: string) => {
// // // //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// // // //   };
// // // //   const handleSocialChange = (platform: string, value: string) => {
// // // //       setFormData(prev => ({ 
// // // //           ...prev, 
// // // //           footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } 
// // // //       }));
// // // //   };

// // // //   // --- HANDLERS KATEGORI ---
// // // //   const removeSlide = (idx: number) => { 
// // // //       if(confirm("Hapus slide ini?")) setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) })); 
// // // //   };
// // // //   const addForumCat = () => { 
// // // //       if (!newForumCat.name) return; 
// // // //       setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); 
// // // //       setNewForumCat({ name: '', iconUrl: '' }); 
// // // //   };
// // // //   const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
  
// // // //   const addCourseCat = () => { 
// // // //       if (!newCourseCat) return; 
// // // //       setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); 
// // // //       setNewCourseCat(''); 
// // // //   };
// // // //   const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
  
// // // //   const addLibCat = () => { 
// // // //       if (!newLibCat) return; 
// // // //       setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); 
// // // //       setNewLibCat(''); 
// // // //   };
// // // //   const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));

// // // //   // --- SAVE ---
// // // //   const handleSave = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     setSaving(true);
// // // //     try {
// // // //       await api('/api/content', { method: 'PUT', body: formData });
// // // //       alert("Pengaturan Berhasil Disimpan!");
// // // //     } catch (e: any) { alert("Gagal: " + e.message); } finally { setSaving(false); }
// // // //   };

// // // //   if (loading) return <div className="p-20 text-center">Memuat Pengaturan...</div>;

// // // //   return (
// // // //     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
// // // //       <div className="max-w-5xl mx-auto p-6 pb-24 font-sans">
        
// // // //         <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border sticky top-4 z-50">
// // // //             <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
// // // //                 <Layout size={20}/> CMS Pengaturan Konten
// // // //             </h1>
// // // //             <button 
// // // //                 onClick={handleSave} 
// // // //                 disabled={saving} 
// // // //                 className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 disabled:opacity-50 flex items-center gap-2"
// // // //                 aria-label="Simpan Perubahan"
// // // //             >
// // // //                 {saving ? 'Menyimpan...' : <><Save size={18}/> Simpan Perubahan</>}
// // // //             </button>
// // // //         </div>
        
// // // //         <form onSubmit={handleSave} className="space-y-8">
// // // //             {/* 1. HERO SECTION */}
// // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Hero Section (Beranda)</h2>
// // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // //                     <div className="space-y-4">
// // // //                         <div>
// // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // // //                             <input className="w-full border rounded p-2" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} aria-label="Judul Utama" />
// // // //                         </div>
// // // //                         <div>
// // // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // // //                             <textarea rows={3} className="w-full border rounded p-2" value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} aria-label="Deskripsi Singkat" />
// // // //                         </div>
// // // //                     </div>
// // // //                     <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center">
// // // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Background Image</label>
// // // //                         {formData.heroBgUrl && <img src={getImageUrl(formData.heroBgUrl)} className="h-20 w-auto mb-2 rounded object-cover" alt="Hero"/>}
// // // //                         <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700">
// // // //                             {uploadingBg ? 'Mengupload...' : 'Upload Background'}
// // // //                             <input type="file" className="hidden" onChange={handleUploadBg} disabled={uploadingBg} title="Upload Hero Background" aria-label="Upload Hero Background" />
// // // //                         </label>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>

// // // //              {/* 2. SLIDES */}
// // // //              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Slide Carousel</h2>
// // // //                 <div className="flex gap-4 overflow-x-auto pb-2">
// // // //                     {formData.slides.map((url, idx) => (
// // // //                         <div key={idx} className="relative w-32 h-20 flex-shrink-0 group">
// // // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover rounded border" alt={`Slide ${idx + 1}`}/>
// // // //                             <button 
// // // //                                 type="button" 
// // // //                                 onClick={() => removeSlide(idx)} 
// // // //                                 className="absolute top-0 right-0 bg-red-600 text-white px-1.5 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
// // // //                                 aria-label={`Hapus Slide ${idx + 1}`}
// // // //                                 title={`Hapus Slide ${idx + 1}`}
// // // //                             >
// // // //                                 x
// // // //                             </button>
// // // //                         </div>
// // // //                     ))}
// // // //                     <label className="w-32 h-20 border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-50 rounded flex-shrink-0 text-xs text-gray-500 font-bold">
// // // //                         {uploadingSlide ? '...' : '+ Add Slide'}
// // // //                         <input 
// // // //                             type="file" 
// // // //                             className="hidden" 
// // // //                             onChange={handleUploadSlide} 
// // // //                             disabled={uploadingSlide}
// // // //                             title="Upload Slide Baru"
// // // //                             aria-label="Upload Slide Baru"
// // // //                         />
// // // //                     </label>
// // // //                 </div>
// // // //             </div>

// // // //             {/* 3. FEATURES */}
// // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Fitur Utama</h2>
// // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //                     {formData.features.map((feat, idx) => (
// // // //                         <div key={idx} className="p-2 border rounded bg-gray-50">
// // // //                             <label className="block text-xs font-bold text-gray-500 mb-1">Fitur {idx + 1}</label>
// // // //                             <input 
// // // //                                 className="w-full border rounded p-2 text-sm mb-2" 
// // // //                                 value={feat.title} 
// // // //                                 onChange={e => handleFeatureChange(idx, 'title', e.target.value)} 
// // // //                                 placeholder={`Judul Fitur ${idx+1}`} 
// // // //                                 aria-label={`Judul Fitur ${idx+1}`}
// // // //                             />
// // // //                             <textarea 
// // // //                                 rows={2} 
// // // //                                 className="w-full border rounded p-2 text-sm" 
// // // //                                 value={feat.description} 
// // // //                                 onChange={e => handleFeatureChange(idx, 'description', e.target.value)} 
// // // //                                 placeholder="Deskripsi" 
// // // //                                 aria-label={`Deskripsi Fitur ${idx+1}`}
// // // //                             />
// // // //                         </div>
// // // //                     ))}
// // // //                 </div>
// // // //             </div>

// // // //             {/* 4. FOOTER SETTINGS */}
// // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">4. Pengaturan Footer</h2>
// // // //                 <div className="grid md:grid-cols-2 gap-6">
// // // //                     <div className="space-y-4">
// // // //                         <div>
// // // //                             <label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label>
// // // //                             <div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
// // // //                                 {formData.footer.logoUrl ? (
// // // //                                     <img src={getImageUrl(formData.footer.logoUrl)} className="h-12 w-auto object-contain bg-white border p-1 rounded" alt="Logo Footer" />
// // // //                                 ) : (
// // // //                                     <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Logo</div>
// // // //                                 )}
// // // //                                 <div className="flex flex-col gap-2">
// // // //                                     <label className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700 text-center">
// // // //                                         {uploadingFooterLogo ? 'Mengupload...' : 'Pilih Logo'}
// // // //                                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadFooterLogo} disabled={uploadingFooterLogo} title="Upload Logo Footer" aria-label="Upload Logo Footer"/>
// // // //                                     </label>
// // // //                                     {formData.footer.logoUrl && (
// // // //                                         <button type="button" onClick={() => handleFooterChange('logoUrl', '')} className="text-red-600 text-xs font-bold hover:underline" aria-label="Hapus Logo Footer">
// // // //                                             Hapus Logo
// // // //                                         </button>
// // // //                                     )}
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>

// // // //                         <div>
// // // //                             <label className="block text-xs font-bold mb-1">Deskripsi Singkat (About)</label>
// // // //                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)} aria-label="Footer About"/>
// // // //                         </div>
// // // //                         <div>
// // // //                             <label className="block text-xs font-bold mb-1">Alamat</label>
// // // //                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)} aria-label="Footer Address"/>
// // // //                         </div>
// // // //                     </div>
                    
// // // //                     <div className="space-y-4">
// // // //                         <div className="grid grid-cols-2 gap-2">
// // // //                             <div>
// // // //                                 <label className="block text-xs font-bold mb-1">Telepon</label>
// // // //                                 <input className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)} aria-label="Footer Phone"/>
// // // //                             </div>
// // // //                             <div>
// // // //                                 <label className="block text-xs font-bold mb-1">Email</label>
// // // //                                 <input className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)} aria-label="Footer Email"/>
// // // //                             </div>
// // // //                         </div>
// // // //                         <div>
// // // //                             <label className="block text-xs font-bold mb-1">Website</label>
// // // //                             <input className="w-full border rounded p-2 text-sm" value={formData.footer.website} onChange={e => handleFooterChange('website', e.target.value)} aria-label="Footer Website"/>
// // // //                         </div>
// // // //                         <div>
// // // //                             <label className="block text-xs font-bold mb-1">Copyright</label>
// // // //                             <input className="w-full border rounded p-2 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)} aria-label="Footer Copyright"/>
// // // //                         </div>
                        
// // // //                         <div className="bg-gray-50 p-3 rounded border">
// // // //                             <h3 className="text-xs font-bold mb-2">Social Media</h3>
// // // //                             <div className="grid grid-cols-2 gap-2">
// // // //                                 {['facebook','instagram','twitter','youtube'].map(soc => (
// // // //                                     <div key={soc}>
// // // //                                         <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{soc}</label>
// // // //                                         <input 
// // // //                                             className="w-full border rounded p-1.5 text-xs" 
// // // //                                             placeholder={`https://${soc}.com`} 
// // // //                                             value={formData.footer.socials?.[soc] || ''} 
// // // //                                             onChange={e => handleSocialChange(soc, e.target.value)} 
// // // //                                             aria-label={`Footer Social ${soc}`}
// // // //                                         />
// // // //                                     </div>
// // // //                                 ))}
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>

// // // //             {/* 5. MANAJEMEN KATEGORI */}
// // // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2"><List size={18}/> 5. Manajemen Kategori</h2>
// // // //                 <div className="grid md:grid-cols-3 gap-6">
                    
// // // //                     {/* Course Categories */}
// // // //                     <div className="bg-green-50 p-4 rounded-xl border border-green-100">
// // // //                         <h3 className="text-sm font-bold text-green-800 mb-2">Kategori Pelatihan</h3>
// // // //                         <p className="text-[10px] text-green-600 mb-3">Contoh: Health, Disaster, General</p>
// // // //                         <div className="flex gap-2 mb-2">
// // // //                             <input className="flex-1 border p-1.5 text-sm rounded" value={newCourseCat} onChange={e=>setNewCourseCat(e.target.value)} placeholder="Nama Kategori Baru" aria-label="Nama Kategori Pelatihan Baru" />
// // // //                             <button type="button" onClick={addCourseCat} className="bg-green-600 text-white px-3 rounded hover:bg-green-700 font-bold" aria-label="Tambah Kategori Pelatihan"><Plus size={16}/></button>
// // // //                         </div>
// // // //                         <div className="flex flex-wrap gap-2">
// // // //                             {formData.courseCategories.map((c,i)=>(
// // // //                                 <span key={i} className="bg-white border border-green-200 text-green-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
// // // //                                     {c}
// // // //                                     <button onClick={()=>removeCourseCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c}`}><X size={12}/></button>
// // // //                                 </span>
// // // //                             ))}
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* Forum Categories */}
// // // //                     <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
// // // //                         <h3 className="text-sm font-bold text-blue-800 mb-2">Kategori Forum</h3>
// // // //                         <div className="flex gap-2 mb-2 items-center">
// // // //                             <input className="flex-1 border p-1.5 text-sm rounded" value={newForumCat.name} onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} placeholder="Nama Forum" aria-label="Nama Kategori Forum Baru"/>
// // // //                             <label className="bg-white border p-1.5 rounded cursor-pointer text-xs hover:bg-gray-50">
// // // //                                 {uploadingForumIcon ? '...' : <UploadCloud size={16} className="text-blue-500"/>}
// // // //                                 <input type="file" className="hidden" onChange={handleUploadForumIcon} title="Upload Icon Forum" aria-label="Upload Icon Forum"/>
// // // //                             </label>
// // // //                             <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 font-bold" aria-label="Tambah Kategori Forum"><Plus size={16}/></button>
// // // //                         </div>
// // // //                         <div className="flex flex-wrap gap-2">
// // // //                             {formData.forumCategories.map((c,i)=>(
// // // //                                 <span key={i} className="bg-white border border-blue-200 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
// // // //                                     {c.name}
// // // //                                     <button onClick={()=>removeForumCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c.name}`}><X size={12}/></button>
// // // //                                 </span>
// // // //                             ))}
// // // //                         </div>
// // // //                     </div>

// // // //                     {/* Library Categories */}
// // // //                     <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
// // // //                         <h3 className="text-sm font-bold text-purple-800 mb-2">Kategori Perpustakaan</h3>
// // // //                         <div className="flex gap-2 mb-2">
// // // //                             <input className="flex-1 border p-1.5 text-sm rounded" value={newLibCat} onChange={e=>setNewLibCat(e.target.value)} placeholder="Kategori Buku" aria-label="Nama Kategori Perpustakaan Baru"/>
// // // //                             <button type="button" onClick={addLibCat} className="bg-purple-600 text-white px-3 rounded hover:bg-purple-700 font-bold" aria-label="Tambah Kategori Perpustakaan"><Plus size={16}/></button>
// // // //                         </div>
// // // //                         <div className="flex flex-wrap gap-2">
// // // //                             {formData.libraryCategories.map((c,i)=>(
// // // //                                 <span key={i} className="bg-white border border-purple-200 text-purple-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
// // // //                                     {c}
// // // //                                     <button onClick={()=>removeLibCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c}`}><X size={12}/></button>
// // // //                                 </span>
// // // //                             ))}
// // // //                         </div>
// // // //                     </div>

// // // //                 </div>
// // // //             </div>

// // // //         </form>
// // // //       </div>
// // // //     </Protected>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import { Save, Plus, X, UploadCloud, Layout, List, Trash, Image as ImageIcon, Loader2 } from 'lucide-react';

// // // // --- TIPE DATA ---
// // // interface Feature { 
// // //     title: string; 
// // //     description: string; 
// // // }

// // // interface ForumCategory { 
// // //     name: string; 
// // //     iconUrl: string; 
// // // }

// // // interface FormDataState {
// // //   heroTitle: string;
// // //   heroDescription: string;
// // //   heroBgUrl: string;
// // //   slides: string[];
// // //   features: Feature[];
// // //   footer: {
// // //     about: string;
// // //     address: string;
// // //     phone: string;
// // //     email: string;
// // //     website: string;
// // //     copyright: string;
// // //     logoUrl: string; 
// // //     socials: {
// // //       facebook: string;
// // //       instagram: string;
// // //       twitter: string;
// // //       youtube: string;
// // //       [key: string]: string;
// // //     };
// // //   };
// // //   forumCategories: ForumCategory[];
// // //   courseCategories: string[];
// // //   libraryCategories: string[];
// // // }

// // // export default function AdminContentPage() {
// // //   const router = useRouter();
// // //   const [loading, setLoading] = useState(true);
// // //   const [saving, setSaving] = useState(false);
  
// // //   // Loading States Upload
// // //   const [uploadingSlide, setUploadingSlide] = useState(false);
// // //   const [uploadingBg, setUploadingBg] = useState(false);
// // //   const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
// // //   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

// // //   // Input Tambahan Kategori
// // //   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
// // //   const [newCourseCat, setNewCourseCat] = useState('');
// // //   const [newLibCat, setNewLibCat] = useState('');

// // //   // Main State
// // //   const [formData, setFormData] = useState<FormDataState>({
// // //     heroTitle: '',
// // //     heroDescription: '',
// // //     heroBgUrl: '',
// // //     slides: [],
// // //     features: [ 
// // //         { title: '', description: '' }, 
// // //         { title: '', description: '' }, 
// // //         { title: '', description: '' } 
// // //     ],
// // //     footer: {
// // //         about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '',
// // //         socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// // //     },
// // //     forumCategories: [],
// // //     courseCategories: [],
// // //     libraryCategories: []
// // //   });

// // //   useEffect(() => {
// // //     loadContent();
// // //   }, []);

// // //   const loadContent = async () => {
// // //     try {
// // //       const data = await api('/api/content');
// // //       if (data) {
// // //           setFormData({
// // //             heroTitle: data.heroTitle || '',
// // //             heroDescription: data.heroDescription || '',
// // //             heroBgUrl: data.heroBgUrl || '',
// // //             slides: data.slides || [],
// // //             features: data.features?.length ? data.features : [ 
// // //                 { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } 
// // //             ],
// // //             footer: {
// // //                 about: data.footer?.about || '',
// // //                 address: data.footer?.address || '',
// // //                 phone: data.footer?.phone || '',
// // //                 email: data.footer?.email || '',
// // //                 website: data.footer?.website || '',
// // //                 copyright: data.footer?.copyright || '',
// // //                 logoUrl: data.footer?.logoUrl || '',
// // //                 socials: { 
// // //                     facebook: '', instagram: '', twitter: '', youtube: '', 
// // //                     ...(data.footer?.socials || {}) 
// // //                 }
// // //             },
// // //             forumCategories: data.forumCategories || [],
// // //             courseCategories: data.courseCategories || [],
// // //             libraryCategories: data.libraryCategories || []
// // //           });
// // //       }
// // //     } catch (e) { console.error(e); } finally { setLoading(false); }
// // //   };

// // //   // --- HANDLERS UPLOAD (FIXED) ---
// // //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
// // //     if (!e.target.files?.[0]) return;
// // //     loader(true);
// // //     try {
// // //       const fd = new FormData();
// // //       fd.append('file', e.target.files[0]);
      
// // //       const res = await api('/api/upload', {
// // //           method: 'POST',
// // //           body: fd,
// // //           headers: {} 
// // //       });

// // //       const newUrl = res.url || res.file?.url;
// // //       if (newUrl) setter(newUrl);
// // //     } catch (e: any) { alert(e.message); } finally { loader(false); }
// // //   };

// // //   const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => 
// // //       handleUpload(e, (url) => setFormData(p => ({...p, slides: [...p.slides, url]})), setUploadingSlide);
  
// // //   const handleUploadBg = (e: React.ChangeEvent<HTMLInputElement>) => 
// // //       handleUpload(e, (url) => setFormData(p => ({...p, heroBgUrl: url})), setUploadingBg);
  
// // //   const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => 
// // //       handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);

// // //   const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => 
// // //       handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

// // //   // --- HANDLERS TEXT ---
// // //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// // //       const newFeatures = [...formData.features];
// // //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// // //       setFormData({ ...formData, features: newFeatures });
// // //   };
// // //   const handleFooterChange = (field: string, value: string) => {
// // //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// // //   };
// // //   const handleSocialChange = (platform: string, value: string) => {
// // //       setFormData(prev => ({ 
// // //           ...prev, 
// // //           footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } 
// // //       }));
// // //   };

// // //   // --- HANDLERS KATEGORI (DIKEMBALIKAN KE LOGIKA ASAL) ---
// // //   const removeSlide = (idx: number) => { 
// // //       if(confirm("Hapus slide ini?")) setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) })); 
// // //   };
// // //   const addForumCat = () => { 
// // //       if (!newForumCat.name) return; 
// // //       setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); 
// // //       setNewForumCat({ name: '', iconUrl: '' }); 
// // //   };
// // //   const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
  
// // //   const addCourseCat = () => { 
// // //       if (!newCourseCat) return; 
// // //       setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); 
// // //       setNewCourseCat(''); 
// // //   };
// // //   const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
  
// // //   const addLibCat = () => { 
// // //       if (!newLibCat) return; 
// // //       setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); 
// // //       setNewLibCat(''); 
// // //   };
// // //   const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));

// // //   // --- SAVE (FIXED METHOD PUT & REFRESH) ---
// // //   const handleSave = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if(!confirm("Simpan perubahan?")) return;

// // //     setSaving(true);
// // //     try {
// // //       // [FIX] Menggunakan method PUT agar sesuai backend (bukan POST)
// // //       await api('/api/content', { 
// // //           method: 'PUT', 
// // //           body: JSON.stringify(formData) 
// // //       });
      
// // //       alert("✅ Pengaturan Berhasil Disimpan!");
// // //       window.location.reload(); // [FIX] Refresh halaman

// // //     } catch (e: any) { 
// // //         alert("Gagal: " + e.message); 
// // //     } finally { 
// // //         setSaving(false); 
// // //     }
// // //   };

// // //   if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;

// // //   return (
// // //       <div className="min-h-screen bg-gray-50 pb-24 font-sans">
// // //         {/* HEADER */}
// // //         <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 shadow-sm border-b sticky top-0 z-50">
// // //             <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
// // //                 <Layout size={20}/> CMS Pengaturan Konten
// // //             </h1>
// // //             <button 
// // //                 onClick={handleSave} 
// // //                 disabled={saving} 
// // //                 className="bg-[#990000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#7f0000] disabled:opacity-50 flex items-center gap-2 transition-all"
// // //                 aria-label="Simpan Perubahan"
// // //             >
// // //                 {saving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>}
// // //                 {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
// // //             </button>
// // //         </div>
        
// // //         <form onSubmit={handleSave} className="max-w-5xl mx-auto px-6 space-y-8 mt-8">
            
// // //             {/* 1. HERO SECTION */}
// // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Hero Section (Beranda)</h2>
// // //                 <div className="grid md:grid-cols-2 gap-6">
// // //                     <div className="space-y-4">
// // //                         <div>
// // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// // //                             <input className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} aria-label="Judul Utama" />
// // //                         </div>
// // //                         <div>
// // //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// // //                             <textarea rows={3} className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} aria-label="Deskripsi Singkat" />
// // //                         </div>
// // //                     </div>
// // //                     <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center relative group">
// // //                         <label className="block text-sm font-bold text-gray-700 mb-2">Background Image</label>
// // //                         {formData.heroBgUrl ? (
// // //                             <img src={getImageUrl(formData.heroBgUrl)} className="h-32 w-auto mb-2 rounded object-cover shadow-sm" alt="Hero"/>
// // //                         ) : (
// // //                             <div className="text-gray-400 mb-2"><ImageIcon size={32}/></div>
// // //                         )}
// // //                         <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700 shadow-md">
// // //                             {uploadingBg ? 'Mengupload...' : 'Upload Background'}
// // //                             <input type="file" className="hidden" onChange={handleUploadBg} disabled={uploadingBg} title="Upload Hero Background" aria-label="Upload Hero Background" />
// // //                         </label>
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //              {/* 2. SLIDES */}
// // //              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Slide Carousel</h2>
// // //                 <div className="flex gap-4 overflow-x-auto pb-4">
// // //                     {formData.slides.map((url, idx) => (
// // //                         <div key={idx} className="relative w-40 h-24 flex-shrink-0 group rounded-lg overflow-hidden border">
// // //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt={`Slide ${idx + 1}`}/>
// // //                             <button 
// // //                                 type="button" 
// // //                                 onClick={() => removeSlide(idx)} 
// // //                                 className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700"
// // //                                 aria-label={`Hapus Slide ${idx + 1}`}
// // //                                 title={`Hapus Slide ${idx + 1}`}
// // //                             >
// // //                                 <Trash size={12}/>
// // //                             </button>
// // //                         </div>
// // //                     ))}
// // //                     <label className="w-40 h-24 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg flex-shrink-0 text-xs text-gray-500 font-bold transition-colors hover:border-red-300">
// // //                         <Plus size={20} className="mb-1 text-gray-400"/>
// // //                         {uploadingSlide ? 'Uploading...' : 'Tambah Slide'}
// // //                         <input 
// // //                             type="file" 
// // //                             className="hidden" 
// // //                             onChange={handleUploadSlide} 
// // //                             disabled={uploadingSlide}
// // //                             title="Upload Slide Baru"
// // //                             aria-label="Upload Slide Baru"
// // //                         />
// // //                     </label>
// // //                 </div>
// // //             </div>

// // //             {/* 3. FEATURES */}
// // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Fitur Utama (Info Cards)</h2>
// // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //                     {formData.features.map((feat, idx) => (
// // //                         <div key={idx} className="p-3 border rounded-lg bg-gray-50">
// // //                             <label className="block text-xs font-bold text-gray-500 mb-1">Kartu #{idx + 1}</label>
// // //                             <input 
// // //                                 className="w-full border rounded p-2 text-sm mb-2 focus:ring-1 focus:ring-blue-500 outline-none" 
// // //                                 value={feat.title} 
// // //                                 onChange={e => handleFeatureChange(idx, 'title', e.target.value)} 
// // //                                 placeholder={`Judul Fitur ${idx+1}`} 
// // //                                 aria-label={`Judul Fitur ${idx+1}`}
// // //                             />
// // //                             <textarea 
// // //                                 rows={2} 
// // //                                 className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
// // //                                 value={feat.description} 
// // //                                 onChange={e => handleFeatureChange(idx, 'description', e.target.value)} 
// // //                                 placeholder="Deskripsi Singkat" 
// // //                                 aria-label={`Deskripsi Fitur ${idx+1}`}
// // //                             />
// // //                         </div>
// // //                     ))}
// // //                 </div>
// // //             </div>

// // //             {/* 4. FOOTER SETTINGS */}
// // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">4. Pengaturan Footer</h2>
// // //                 <div className="grid md:grid-cols-2 gap-6">
// // //                     <div className="space-y-4">
// // //                         <div>
// // //                             <label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label>
// // //                             <div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
// // //                                 {formData.footer.logoUrl ? (
// // //                                     <img src={getImageUrl(formData.footer.logoUrl)} className="h-12 w-auto object-contain bg-white border p-1 rounded" alt="Logo Footer" />
// // //                                 ) : (
// // //                                     <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500"><ImageIcon/></div>
// // //                                 )}
// // //                                 <div className="flex flex-col gap-2">
// // //                                     <label className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700 text-center shadow-sm">
// // //                                         {uploadingFooterLogo ? 'Mengupload...' : 'Pilih Logo'}
// // //                                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadFooterLogo} disabled={uploadingFooterLogo} title="Upload Logo Footer" aria-label="Upload Logo Footer"/>
// // //                                     </label>
// // //                                     {formData.footer.logoUrl && (
// // //                                         <button type="button" onClick={() => handleFooterChange('logoUrl', '')} className="text-red-600 text-xs font-bold hover:underline" aria-label="Hapus Logo Footer">
// // //                                             Hapus Logo
// // //                                         </button>
// // //                                     )}
// // //                                 </div>
// // //                             </div>
// // //                         </div>

// // //                         <div>
// // //                             <label className="block text-xs font-bold mb-1">Deskripsi Singkat (About)</label>
// // //                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)} aria-label="Footer About"/>
// // //                         </div>
// // //                         <div>
// // //                             <label className="block text-xs font-bold mb-1">Alamat</label>
// // //                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)} aria-label="Footer Address"/>
// // //                         </div>
// // //                     </div>
                    
// // //                     <div className="space-y-4">
// // //                         <div className="grid grid-cols-2 gap-2">
// // //                             <div>
// // //                                 <label className="block text-xs font-bold mb-1">Telepon</label>
// // //                                 <input className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)} aria-label="Footer Phone"/>
// // //                             </div>
// // //                             <div>
// // //                                 <label className="block text-xs font-bold mb-1">Email</label>
// // //                                 <input className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)} aria-label="Footer Email"/>
// // //                             </div>
// // //                         </div>
// // //                         <div>
// // //                             <label className="block text-xs font-bold mb-1">Website</label>
// // //                             <input className="w-full border rounded p-2 text-sm" value={formData.footer.website} onChange={e => handleFooterChange('website', e.target.value)} aria-label="Footer Website"/>
// // //                         </div>
// // //                         <div>
// // //                             <label className="block text-xs font-bold mb-1">Copyright</label>
// // //                             <input className="w-full border rounded p-2 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)} aria-label="Footer Copyright"/>
// // //                         </div>
                        
// // //                         <div className="bg-gray-50 p-3 rounded border">
// // //                             <h3 className="text-xs font-bold mb-2">Social Media Links</h3>
// // //                             <div className="grid grid-cols-2 gap-2">
// // //                                 {['facebook','instagram','twitter','youtube'].map(soc => (
// // //                                     <div key={soc}>
// // //                                         <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{soc}</label>
// // //                                         <input 
// // //                                             className="w-full border rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-300 outline-none" 
// // //                                             placeholder={`https://${soc}.com/...`} 
// // //                                             value={formData.footer.socials?.[soc] || ''} 
// // //                                             onChange={e => handleSocialChange(soc, e.target.value)} 
// // //                                             aria-label={`Footer Social ${soc}`}
// // //                                         />
// // //                                     </div>
// // //                                 ))}
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //             {/* 5. MANAJEMEN KATEGORI (RESTORED 3 COLUMNS) */}
// // //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// // //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2"><List size={18}/> 5. Manajemen Kategori</h2>
// // //                 <div className="grid md:grid-cols-3 gap-6">
                    
// // //                     {/* Course Categories */}
// // //                     <div className="bg-green-50 p-4 rounded-xl border border-green-100">
// // //                         <h3 className="text-sm font-bold text-green-800 mb-2">Kategori Pelatihan</h3>
// // //                         <p className="text-[10px] text-green-600 mb-3">Contoh: Health, Disaster, General</p>
// // //                         <div className="flex gap-2 mb-2">
// // //                             <input className="flex-1 border p-1.5 text-sm rounded outline-none focus:ring-1 focus:ring-green-500" value={newCourseCat} onChange={e=>setNewCourseCat(e.target.value)} placeholder="Nama Kategori Baru" aria-label="Nama Kategori Pelatihan Baru" />
// // //                             <button type="button" onClick={addCourseCat} className="bg-green-600 text-white px-3 rounded hover:bg-green-700 font-bold" aria-label="Tambah Kategori Pelatihan"><Plus size={16}/></button>
// // //                         </div>
// // //                         <div className="flex flex-wrap gap-2">
// // //                             {formData.courseCategories.map((c,i)=>(
// // //                                 <span key={i} className="bg-white border border-green-200 text-green-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
// // //                                     {c}
// // //                                     <button onClick={()=>removeCourseCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c}`}><X size={12}/></button>
// // //                                 </span>
// // //                             ))}
// // //                         </div>
// // //                     </div>

// // //                     {/* Forum Categories */}
// // //                     <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
// // //                         <h3 className="text-sm font-bold text-blue-800 mb-2">Kategori Forum</h3>
// // //                         <div className="flex gap-2 mb-2 items-center">
// // //                             <input className="flex-1 border p-1.5 text-sm rounded outline-none focus:ring-1 focus:ring-blue-500" value={newForumCat.name} onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} placeholder="Nama Forum" aria-label="Nama Kategori Forum Baru"/>
// // //                             <label className="bg-white border p-1.5 rounded cursor-pointer text-xs hover:bg-gray-50">
// // //                                 {uploadingForumIcon ? <Loader2 size={16} className="animate-spin text-blue-500"/> : <UploadCloud size={16} className="text-blue-500"/>}
// // //                                 <input type="file" className="hidden" onChange={handleUploadForumIcon} title="Upload Icon Forum" aria-label="Upload Icon Forum"/>
// // //                             </label>
// // //                             <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 font-bold" aria-label="Tambah Kategori Forum"><Plus size={16}/></button>
// // //                         </div>
// // //                         <div className="flex flex-wrap gap-2">
// // //                             {formData.forumCategories.map((c,i)=>(
// // //                                 <span key={i} className="bg-white border border-blue-200 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
// // //                                     {c.name}
// // //                                     <button onClick={()=>removeForumCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c.name}`}><X size={12}/></button>
// // //                                 </span>
// // //                             ))}
// // //                         </div>
// // //                     </div>

// // //                     {/* Library Categories */}
// // //                     <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
// // //                         <h3 className="text-sm font-bold text-purple-800 mb-2">Kategori Perpustakaan</h3>
// // //                         <div className="flex gap-2 mb-2">
// // //                             <input className="flex-1 border p-1.5 text-sm rounded outline-none focus:ring-1 focus:ring-purple-500" value={newLibCat} onChange={e=>setNewLibCat(e.target.value)} placeholder="Kategori Buku" aria-label="Nama Kategori Perpustakaan Baru"/>
// // //                             <button type="button" onClick={addLibCat} className="bg-purple-600 text-white px-3 rounded hover:bg-purple-700 font-bold" aria-label="Tambah Kategori Perpustakaan"><Plus size={16}/></button>
// // //                         </div>
// // //                         <div className="flex flex-wrap gap-2">
// // //                             {formData.libraryCategories.map((c,i)=>(
// // //                                 <span key={i} className="bg-white border border-purple-200 text-purple-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
// // //                                     {c}
// // //                                     <button onClick={()=>removeLibCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c}`}><X size={12}/></button>
// // //                                 </span>
// // //                             ))}
// // //                         </div>
// // //                     </div>

// // //                 </div>
// // //             </div>

// // //         </form>
// // //       </div>
// // //   );
// // // }

// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { api, getImageUrl } from '@/lib/api';
// // import { Save, Plus, X, UploadCloud, Layout, List, Trash, Image as ImageIcon, Loader2 } from 'lucide-react';

// // // --- TIPE DATA ---
// // interface Feature { 
// //     title: string; 
// //     description: string; 
// // }

// // interface ForumCategory { 
// //     name: string; 
// //     iconUrl: string; 
// // }

// // interface FormDataState {
// //   heroTitle: string;
// //   heroDescription: string;
// //   heroBgUrl: string; // Masih dibiarkan di state agar tidak error jika backend mengirimnya
// //   faviconUrl: string; // [NEW] Tambahan untuk Favicon
// //   slides: string[];
// //   features: Feature[];
// //   footer: {
// //     about: string;
// //     address: string;
// //     phone: string;
// //     email: string;
// //     website: string;
// //     copyright: string;
// //     logoUrl: string; 
// //     socials: {
// //       facebook: string;
// //       instagram: string;
// //       twitter: string;
// //       youtube: string;
// //       [key: string]: string;
// //     };
// //   };
// //   forumCategories: ForumCategory[];
// //   courseCategories: string[];
// //   libraryCategories: string[];
// // }

// // export default function AdminContentPage() {
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
  
// //   // Loading States Upload
// //   const [uploadingSlide, setUploadingSlide] = useState(false);
// //   const [uploadingFavicon, setUploadingFavicon] = useState(false); // [NEW]
// //   const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
// //   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

// //   // Input Tambahan Kategori
// //   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
// //   const [newCourseCat, setNewCourseCat] = useState('');
// //   const [newLibCat, setNewLibCat] = useState('');

// //   // Main State
// //   const [formData, setFormData] = useState<FormDataState>({
// //     heroTitle: '',
// //     heroDescription: '',
// //     heroBgUrl: '',
// //     faviconUrl: '', // [NEW] Default empty
// //     slides: [],
// //     features: [ 
// //         { title: '', description: '' }, 
// //         { title: '', description: '' }, 
// //         { title: '', description: '' } 
// //     ],
// //     footer: {
// //         about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '',
// //         socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
// //     },
// //     forumCategories: [],
// //     courseCategories: [],
// //     libraryCategories: []
// //   });

// //   useEffect(() => {
// //     loadContent();
// //   }, []);

// //   const loadContent = async () => {
// //     try {
// //       const data = await api('/api/content');
// //       if (data) {
// //           setFormData({
// //             heroTitle: data.heroTitle || '',
// //             heroDescription: data.heroDescription || '',
// //             heroBgUrl: data.heroBgUrl || '',
// //             faviconUrl: data.faviconUrl || '', // [NEW] Load favicon
// //             slides: data.slides || [],
// //             features: data.features?.length ? data.features : [ 
// //                 { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } 
// //             ],
// //             footer: {
// //                 about: data.footer?.about || '',
// //                 address: data.footer?.address || '',
// //                 phone: data.footer?.phone || '',
// //                 email: data.footer?.email || '',
// //                 website: data.footer?.website || '',
// //                 copyright: data.footer?.copyright || '',
// //                 logoUrl: data.footer?.logoUrl || '',
// //                 socials: { 
// //                     facebook: '', instagram: '', twitter: '', youtube: '', 
// //                     ...(data.footer?.socials || {}) 
// //                 }
// //             },
// //             forumCategories: data.forumCategories || [],
// //             courseCategories: data.courseCategories || [],
// //             libraryCategories: data.libraryCategories || []
// //           });
// //       }
// //     } catch (e) { console.error(e); } finally { setLoading(false); }
// //   };

// //   // --- HANDLERS UPLOAD ---
// //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
// //     if (!e.target.files?.[0]) return;
// //     loader(true);
// //     try {
// //       const fd = new FormData();
// //       fd.append('file', e.target.files[0]);
      
// //       const res = await api('/api/upload', {
// //           method: 'POST',
// //           body: fd,
// //           headers: {} 
// //       });

// //       const newUrl = res.url || res.file?.url;
// //       if (newUrl) setter(newUrl);
// //     } catch (e: any) { alert(e.message); } finally { loader(false); }
// //   };

// //   const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => 
// //       handleUpload(e, (url) => setFormData(p => ({...p, slides: [...p.slides, url]})), setUploadingSlide);
  
// //   // [NEW] Handler untuk Favicon (menggantikan Background Image)
// //   const handleUploadFavicon = (e: React.ChangeEvent<HTMLInputElement>) => 
// //       handleUpload(e, (url) => setFormData(p => ({...p, faviconUrl: url})), setUploadingFavicon);
  
// //   const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => 
// //       handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);

// //   const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => 
// //       handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

// //   // --- HANDLERS TEXT ---
// //   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
// //       const newFeatures = [...formData.features];
// //       newFeatures[index] = { ...newFeatures[index], [field]: value };
// //       setFormData({ ...formData, features: newFeatures });
// //   };
// //   const handleFooterChange = (field: string, value: string) => {
// //       setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
// //   };
// //   const handleSocialChange = (platform: string, value: string) => {
// //       setFormData(prev => ({ 
// //           ...prev, 
// //           footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } 
// //       }));
// //   };

// //   // --- HANDLERS KATEGORI ---
// //   const removeSlide = (idx: number) => { 
// //       if(confirm("Hapus slide ini?")) setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) })); 
// //   };
// //   const addForumCat = () => { 
// //       if (!newForumCat.name) return; 
// //       setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); 
// //       setNewForumCat({ name: '', iconUrl: '' }); 
// //   };
// //   const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
  
// //   const addCourseCat = () => { 
// //       if (!newCourseCat) return; 
// //       setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); 
// //       setNewCourseCat(''); 
// //   };
// //   const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
  
// //   const addLibCat = () => { 
// //       if (!newLibCat) return; 
// //       setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); 
// //       setNewLibCat(''); 
// //   };
// //   const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));

// //   // --- SAVE ---
// //   const handleSave = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if(!confirm("Simpan perubahan?")) return;

// //     setSaving(true);
// //     try {
// //       await api('/api/content', { 
// //           method: 'PUT', 
// //           body: JSON.stringify(formData) 
// //       });
      
// //       alert("✅ Pengaturan Berhasil Disimpan!");
// //       window.location.reload(); 

// //     } catch (e: any) { 
// //         alert("Gagal: " + e.message); 
// //     } finally { 
// //         setSaving(false); 
// //     }
// //   };

// //   if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;

// //   return (
// //       <div className="min-h-screen bg-gray-50 pb-24 font-sans">
// //         {/* HEADER */}
// //         <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 shadow-sm border-b sticky top-0 z-50">
// //             <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
// //                 <Layout size={20}/> CMS Pengaturan Konten
// //             </h1>
// //             <button 
// //                 onClick={handleSave} 
// //                 disabled={saving} 
// //                 className="bg-[#990000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#7f0000] disabled:opacity-50 flex items-center gap-2 transition-all"
// //                 aria-label="Simpan Perubahan"
// //             >
// //                 {saving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>}
// //                 {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
// //             </button>
// //         </div>
        
// //         <form onSubmit={handleSave} className="max-w-5xl mx-auto px-6 space-y-8 mt-8">
            
// //             {/* 1. HERO SECTION (UPDATED: FAVICON) */}
// //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Hero Section (Beranda)</h2>
// //                 <div className="grid md:grid-cols-2 gap-6">
// //                     <div className="space-y-4">
// //                         <div>
// //                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
// //                             <input className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} aria-label="Judul Utama" />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
// //                             <textarea rows={3} className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} aria-label="Deskripsi Singkat" />
// //                         </div>
// //                     </div>
                    
// //                     {/* [UPDATE] Background Image diganti Favicon Upload */}
// //                     <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center relative group">
// //                         <label className="block text-sm font-bold text-gray-700 mb-2">Favicon Website</label>
// //                         {formData.faviconUrl ? (
// //                             <img src={getImageUrl(formData.faviconUrl)} className="h-16 w-16 mb-2 object-contain shadow-sm bg-white p-1 rounded" alt="Favicon"/>
// //                         ) : (
// //                             <div className="text-gray-400 mb-2 bg-white p-2 rounded"><ImageIcon size={32}/></div>
// //                         )}
// //                         <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700 shadow-md mt-2">
// //                             {uploadingFavicon ? 'Mengupload...' : 'Upload Favicon'}
// //                             <input type="file" className="hidden" onChange={handleUploadFavicon} disabled={uploadingFavicon} title="Upload Favicon" aria-label="Upload Favicon" />
// //                         </label>
// //                         <p className="text-[10px] text-gray-400 mt-2">Format: PNG/ICO (Disarankan 32x32 atau 64x64)</p>
// //                     </div>
// //                 </div>
// //             </div>

// //              {/* 2. SLIDES */}
// //              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Slide Carousel</h2>
// //                 <div className="flex gap-4 overflow-x-auto pb-4">
// //                     {formData.slides.map((url, idx) => (
// //                         <div key={idx} className="relative w-40 h-24 flex-shrink-0 group rounded-lg overflow-hidden border">
// //                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt={`Slide ${idx + 1}`}/>
// //                             <button 
// //                                 type="button" 
// //                                 onClick={() => removeSlide(idx)} 
// //                                 className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700"
// //                                 aria-label={`Hapus Slide ${idx + 1}`}
// //                                 title={`Hapus Slide ${idx + 1}`}
// //                             >
// //                                 <Trash size={12}/>
// //                             </button>
// //                         </div>
// //                     ))}
// //                     <label className="w-40 h-24 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg flex-shrink-0 text-xs text-gray-500 font-bold transition-colors hover:border-red-300">
// //                         <Plus size={20} className="mb-1 text-gray-400"/>
// //                         {uploadingSlide ? 'Uploading...' : 'Tambah Slide'}
// //                         <input 
// //                             type="file" 
// //                             className="hidden" 
// //                             onChange={handleUploadSlide} 
// //                             disabled={uploadingSlide}
// //                             title="Upload Slide Baru"
// //                             aria-label="Upload Slide Baru"
// //                         />
// //                     </label>
// //                 </div>
// //             </div>

// //             {/* 3. FEATURES */}
// //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Fitur Utama (Info Cards)</h2>
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                     {formData.features.map((feat, idx) => (
// //                         <div key={idx} className="p-3 border rounded-lg bg-gray-50">
// //                             <label className="block text-xs font-bold text-gray-500 mb-1">Kartu #{idx + 1}</label>
// //                             <input 
// //                                 className="w-full border rounded p-2 text-sm mb-2 focus:ring-1 focus:ring-blue-500 outline-none" 
// //                                 value={feat.title} 
// //                                 onChange={e => handleFeatureChange(idx, 'title', e.target.value)} 
// //                                 placeholder={`Judul Fitur ${idx+1}`} 
// //                                 aria-label={`Judul Fitur ${idx+1}`}
// //                             />
// //                             <textarea 
// //                                 rows={2} 
// //                                 className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
// //                                 value={feat.description} 
// //                                 onChange={e => handleFeatureChange(idx, 'description', e.target.value)} 
// //                                 placeholder="Deskripsi Singkat" 
// //                                 aria-label={`Deskripsi Fitur ${idx+1}`}
// //                             />
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>

// //             {/* 4. FOOTER SETTINGS */}
// //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">4. Pengaturan Footer</h2>
// //                 <div className="grid md:grid-cols-2 gap-6">
// //                     <div className="space-y-4">
// //                         <div>
// //                             <label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label>
// //                             <div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
// //                                 {formData.footer.logoUrl ? (
// //                                     <img src={getImageUrl(formData.footer.logoUrl)} className="h-12 w-auto object-contain bg-white border p-1 rounded" alt="Logo Footer" />
// //                                 ) : (
// //                                     <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500"><ImageIcon/></div>
// //                                 )}
// //                                 <div className="flex flex-col gap-2">
// //                                     <label className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700 text-center shadow-sm">
// //                                         {uploadingFooterLogo ? 'Mengupload...' : 'Pilih Logo'}
// //                                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadFooterLogo} disabled={uploadingFooterLogo} title="Upload Logo Footer" aria-label="Upload Logo Footer"/>
// //                                     </label>
// //                                     {formData.footer.logoUrl && (
// //                                         <button type="button" onClick={() => handleFooterChange('logoUrl', '')} className="text-red-600 text-xs font-bold hover:underline" aria-label="Hapus Logo Footer">
// //                                             Hapus Logo
// //                                         </button>
// //                                     )}
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         <div>
// //                             <label className="block text-xs font-bold mb-1">Deskripsi Singkat (About)</label>
// //                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)} aria-label="Footer About"/>
// //                         </div>
// //                         <div>
// //                             <label className="block text-xs font-bold mb-1">Alamat</label>
// //                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)} aria-label="Footer Address"/>
// //                         </div>
// //                     </div>
                    
// //                     <div className="space-y-4">
// //                         <div className="grid grid-cols-2 gap-2">
// //                             <div>
// //                                 <label className="block text-xs font-bold mb-1">Telepon</label>
// //                                 <input className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)} aria-label="Footer Phone"/>
// //                             </div>
// //                             <div>
// //                                 <label className="block text-xs font-bold mb-1">Email</label>
// //                                 <input className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)} aria-label="Footer Email"/>
// //                             </div>
// //                         </div>
// //                         <div>
// //                             <label className="block text-xs font-bold mb-1">Website</label>
// //                             <input className="w-full border rounded p-2 text-sm" value={formData.footer.website} onChange={e => handleFooterChange('website', e.target.value)} aria-label="Footer Website"/>
// //                         </div>
// //                         <div>
// //                             <label className="block text-xs font-bold mb-1">Copyright</label>
// //                             <input className="w-full border rounded p-2 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)} aria-label="Footer Copyright"/>
// //                         </div>
                        
// //                         <div className="bg-gray-50 p-3 rounded border">
// //                             <h3 className="text-xs font-bold mb-2">Social Media Links</h3>
// //                             <div className="grid grid-cols-2 gap-2">
// //                                 {['facebook','instagram','twitter','youtube'].map(soc => (
// //                                     <div key={soc}>
// //                                         <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{soc}</label>
// //                                         <input 
// //                                             className="w-full border rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-300 outline-none" 
// //                                             placeholder={`https://${soc}.com/...`} 
// //                                             value={formData.footer.socials?.[soc] || ''} 
// //                                             onChange={e => handleSocialChange(soc, e.target.value)} 
// //                                             aria-label={`Footer Social ${soc}`}
// //                                         />
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* 5. MANAJEMEN KATEGORI (3 KOLOM LENGKAP) */}
// //             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
// //                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2"><List size={18}/> 5. Manajemen Kategori</h2>
// //                 <div className="grid md:grid-cols-3 gap-6">
                    
// //                     {/* Course Categories */}
// //                     <div className="bg-green-50 p-4 rounded-xl border border-green-100">
// //                         <h3 className="text-sm font-bold text-green-800 mb-2">Kategori Pelatihan</h3>
// //                         <p className="text-[10px] text-green-600 mb-3">Contoh: Health, Disaster, General</p>
// //                         <div className="flex gap-2 mb-2">
// //                             <input className="flex-1 border p-1.5 text-sm rounded outline-none focus:ring-1 focus:ring-green-500" value={newCourseCat} onChange={e=>setNewCourseCat(e.target.value)} placeholder="Nama Kategori Baru" aria-label="Nama Kategori Pelatihan Baru" />
// //                             <button type="button" onClick={addCourseCat} className="bg-green-600 text-white px-3 rounded hover:bg-green-700 font-bold" aria-label="Tambah Kategori Pelatihan"><Plus size={16}/></button>
// //                         </div>
// //                         <div className="flex flex-wrap gap-2">
// //                             {formData.courseCategories.map((c,i)=>(
// //                                 <span key={i} className="bg-white border border-green-200 text-green-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
// //                                     {c}
// //                                     <button onClick={()=>removeCourseCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c}`}><X size={12}/></button>
// //                                 </span>
// //                             ))}
// //                         </div>
// //                     </div>

// //                     {/* Forum Categories */}
// //                     <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
// //                         <h3 className="text-sm font-bold text-blue-800 mb-2">Kategori Forum</h3>
// //                         <div className="flex gap-2 mb-2 items-center">
// //                             <input className="flex-1 border p-1.5 text-sm rounded outline-none focus:ring-1 focus:ring-blue-500" value={newForumCat.name} onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} placeholder="Nama Forum" aria-label="Nama Kategori Forum Baru"/>
// //                             <label className="bg-white border p-1.5 rounded cursor-pointer text-xs hover:bg-gray-50">
// //                                 {uploadingForumIcon ? <Loader2 size={16} className="animate-spin text-blue-500"/> : <UploadCloud size={16} className="text-blue-500"/>}
// //                                 <input type="file" className="hidden" onChange={handleUploadForumIcon} title="Upload Icon Forum" aria-label="Upload Icon Forum"/>
// //                             </label>
// //                             <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 font-bold" aria-label="Tambah Kategori Forum"><Plus size={16}/></button>
// //                         </div>
// //                         <div className="flex flex-wrap gap-2">
// //                             {formData.forumCategories.map((c,i)=>(
// //                                 <span key={i} className="bg-white border border-blue-200 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
// //                                     {c.name}
// //                                     <button onClick={()=>removeForumCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c.name}`}><X size={12}/></button>
// //                                 </span>
// //                             ))}
// //                         </div>
// //                     </div>

// //                     {/* Library Categories */}
// //                     <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
// //                         <h3 className="text-sm font-bold text-purple-800 mb-2">Kategori Perpustakaan</h3>
// //                         <div className="flex gap-2 mb-2">
// //                             <input className="flex-1 border p-1.5 text-sm rounded outline-none focus:ring-1 focus:ring-purple-500" value={newLibCat} onChange={e=>setNewLibCat(e.target.value)} placeholder="Kategori Buku" aria-label="Nama Kategori Perpustakaan Baru"/>
// //                             <button type="button" onClick={addLibCat} className="bg-purple-600 text-white px-3 rounded hover:bg-purple-700 font-bold" aria-label="Tambah Kategori Perpustakaan"><Plus size={16}/></button>
// //                         </div>
// //                         <div className="flex flex-wrap gap-2">
// //                             {formData.libraryCategories.map((c,i)=>(
// //                                 <span key={i} className="bg-white border border-purple-200 text-purple-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
// //                                     {c}
// //                                     <button onClick={()=>removeLibCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c}`}><X size={12}/></button>
// //                                 </span>
// //                             ))}
// //                         </div>
// //                     </div>

// //                 </div>
// //             </div>

// //         </form>
// //       </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { api, getImageUrl } from '@/lib/api';
// // [PENTING] Mengembalikan komponen Protected untuk keamanan
// import Protected from '@/components/Protected'; 
// import { Save, Plus, X, UploadCloud, Layout, List, Trash, Image as ImageIcon, Loader2 } from 'lucide-react';

// // --- TIPE DATA ---
// interface Feature { 
//     title: string; 
//     description: string; 
// }

// interface ForumCategory { 
//     name: string; 
//     iconUrl: string; 
// }

// interface FormDataState {
//   heroTitle: string;
//   heroDescription: string;
//   heroBgUrl: string;
//   faviconUrl: string; 
//   slides: string[];
//   features: Feature[];
//   footer: {
//     about: string;
//     address: string;
//     phone: string;
//     email: string;
//     website: string;
//     copyright: string;
//     logoUrl: string; 
//     socials: {
//       facebook: string;
//       instagram: string;
//       twitter: string;
//       youtube: string;
//       [key: string]: string;
//     };
//   };
//   forumCategories: ForumCategory[];
//   courseCategories: string[];
//   libraryCategories: string[];
// }

// export default function AdminContentPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
  
//   // Loading States Upload
//   const [uploadingSlide, setUploadingSlide] = useState(false);
//   const [uploadingBg, setUploadingBg] = useState(false); // Sisa legacy state (aman dibiarkan)
//   const [uploadingFavicon, setUploadingFavicon] = useState(false);
//   const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
//   const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

//   // Input Tambahan Kategori
//   const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
//   const [newCourseCat, setNewCourseCat] = useState('');
//   const [newLibCat, setNewLibCat] = useState('');

//   // Main State
//   const [formData, setFormData] = useState<FormDataState>({
//     heroTitle: '',
//     heroDescription: '',
//     heroBgUrl: '',
//     faviconUrl: '',
//     slides: [],
//     features: [ 
//         { title: '', description: '' }, 
//         { title: '', description: '' }, 
//         { title: '', description: '' } 
//     ],
//     footer: {
//         about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '',
//         socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
//     },
//     forumCategories: [],
//     courseCategories: [],
//     libraryCategories: []
//   });

//   useEffect(() => {
//     loadContent();
//   }, []);

//   const loadContent = async () => {
//     try {
//       const data = await api('/api/content');
//       if (data) {
//           setFormData({
//             heroTitle: data.heroTitle || '',
//             heroDescription: data.heroDescription || '',
//             heroBgUrl: data.heroBgUrl || '',
//             faviconUrl: data.faviconUrl || '',
//             slides: data.slides || [],
//             features: data.features?.length ? data.features : [ 
//                 { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } 
//             ],
//             footer: {
//                 about: data.footer?.about || '',
//                 address: data.footer?.address || '',
//                 phone: data.footer?.phone || '',
//                 email: data.footer?.email || '',
//                 website: data.footer?.website || '',
//                 copyright: data.footer?.copyright || '',
//                 logoUrl: data.footer?.logoUrl || '',
//                 socials: { 
//                     facebook: '', instagram: '', twitter: '', youtube: '', 
//                     ...(data.footer?.socials || {}) 
//                 }
//             },
//             forumCategories: data.forumCategories || [],
//             courseCategories: data.courseCategories || [],
//             libraryCategories: data.libraryCategories || []
//           });
//       }
//     } catch (e) { console.error(e); } finally { setLoading(false); }
//   };

//   // --- HANDLERS UPLOAD ---
//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
//     if (!e.target.files?.[0]) return;
//     loader(true);
//     try {
//       const fd = new FormData();
//       fd.append('file', e.target.files[0]);
      
//       const res = await api('/api/upload', {
//           method: 'POST',
//           body: fd,
//           headers: {} 
//       });

//       const newUrl = res.url || res.file?.url;
//       if (newUrl) setter(newUrl);
//     } catch (e: any) { alert(e.message); } finally { loader(false); }
//   };

//   const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => 
//       handleUpload(e, (url) => setFormData(p => ({...p, slides: [...p.slides, url]})), setUploadingSlide);
  
//   const handleUploadFavicon = (e: React.ChangeEvent<HTMLInputElement>) => 
//       handleUpload(e, (url) => setFormData(p => ({...p, faviconUrl: url})), setUploadingFavicon);
  
//   const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => 
//       handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);

//   const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => 
//       handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

//   // --- HANDLERS TEXT ---
//   const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
//       const newFeatures = [...formData.features];
//       newFeatures[index] = { ...newFeatures[index], [field]: value };
//       setFormData({ ...formData, features: newFeatures });
//   };
//   const handleFooterChange = (field: string, value: string) => {
//       setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
//   };
//   const handleSocialChange = (platform: string, value: string) => {
//       setFormData(prev => ({ 
//           ...prev, 
//           footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } 
//       }));
//   };

//   // --- HANDLERS KATEGORI ---
//   const removeSlide = (idx: number) => { 
//       if(confirm("Hapus slide ini?")) setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) })); 
//   };
//   const addForumCat = () => { 
//       if (!newForumCat.name) return; 
//       setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); 
//       setNewForumCat({ name: '', iconUrl: '' }); 
//   };
//   const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
  
//   const addCourseCat = () => { 
//       if (!newCourseCat) return; 
//       setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); 
//       setNewCourseCat(''); 
//   };
//   const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
  
//   const addLibCat = () => { 
//       if (!newLibCat) return; 
//       setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); 
//       setNewLibCat(''); 
//   };
//   const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));

//   // --- SAVE ---
//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if(!confirm("Simpan perubahan?")) return;

//     setSaving(true);
//     try {
//       await api('/api/content', { 
//           method: 'PUT', 
//           body: JSON.stringify(formData) 
//       });
      
//       alert("✅ Pengaturan Berhasil Disimpan!");
//       window.location.reload(); 

//     } catch (e: any) { 
//         alert("Gagal: " + e.message); 
//     } finally { 
//         setSaving(false); 
//     }
//   };

//   if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;

//   return (
//     // [PENTING] Wrapper Protected dikembalikan
//     <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
//       <div className="min-h-screen bg-gray-50 pb-24 font-sans">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 shadow-sm border-b sticky top-0 z-50">
//             <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                 <Layout size={20}/> CMS Pengaturan Konten
//             </h1>
//             <button 
//                 onClick={handleSave} 
//                 disabled={saving} 
//                 className="bg-[#990000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#7f0000] disabled:opacity-50 flex items-center gap-2 transition-all"
//                 aria-label="Simpan Perubahan"
//             >
//                 {saving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>}
//                 {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
//             </button>
//         </div>
        
//         <form onSubmit={handleSave} className="max-w-5xl mx-auto px-6 space-y-8 mt-8">
            
//             {/* 1. HERO SECTION */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Hero Section (Beranda)</h2>
//                 <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
//                             <input className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} aria-label="Judul Utama" />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
//                             <textarea rows={3} className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} aria-label="Deskripsi Singkat" />
//                         </div>
//                     </div>
                    
//                     {/* Upload Favicon (Pengganti Background Image) */}
//                     <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center relative group">
//                         <label className="block text-sm font-bold text-gray-700 mb-2">Favicon Website</label>
//                         {formData.faviconUrl ? (
//                             <img src={getImageUrl(formData.faviconUrl)} className="h-16 w-16 mb-2 object-contain shadow-sm bg-white p-1 rounded" alt="Favicon"/>
//                         ) : (
//                             <div className="text-gray-400 mb-2 bg-white p-2 rounded"><ImageIcon size={32}/></div>
//                         )}
//                         <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700 shadow-md mt-2">
//                             {uploadingFavicon ? 'Mengupload...' : 'Upload Favicon'}
//                             <input type="file" className="hidden" onChange={handleUploadFavicon} disabled={uploadingFavicon} title="Upload Favicon" aria-label="Upload Favicon" />
//                         </label>
//                         <p className="text-[10px] text-gray-400 mt-2">Format: PNG/ICO (Disarankan 32x32)</p>
//                     </div>
//                 </div>
//             </div>

//              {/* 2. SLIDES */}
//              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Slide Carousel</h2>
//                 <div className="flex gap-4 overflow-x-auto pb-4">
//                     {formData.slides.map((url, idx) => (
//                         <div key={idx} className="relative w-40 h-24 flex-shrink-0 group rounded-lg overflow-hidden border">
//                             <img src={getImageUrl(url)} className="w-full h-full object-cover" alt={`Slide ${idx + 1}`}/>
//                             <button 
//                                 type="button" 
//                                 onClick={() => removeSlide(idx)} 
//                                 className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700"
//                                 aria-label={`Hapus Slide ${idx + 1}`}
//                                 title={`Hapus Slide ${idx + 1}`}
//                             >
//                                 <Trash size={12}/>
//                             </button>
//                         </div>
//                     ))}
//                     <label className="w-40 h-24 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg flex-shrink-0 text-xs text-gray-500 font-bold transition-colors hover:border-red-300">
//                         <Plus size={20} className="mb-1 text-gray-400"/>
//                         {uploadingSlide ? 'Uploading...' : 'Tambah Slide'}
//                         <input 
//                             type="file" 
//                             className="hidden" 
//                             onChange={handleUploadSlide} 
//                             disabled={uploadingSlide}
//                             title="Upload Slide Baru"
//                             aria-label="Upload Slide Baru"
//                         />
//                     </label>
//                 </div>
//             </div>

//             {/* 3. FEATURES */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Fitur Utama (Info Cards)</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {formData.features.map((feat, idx) => (
//                         <div key={idx} className="p-3 border rounded-lg bg-gray-50">
//                             <label className="block text-xs font-bold text-gray-500 mb-1">Kartu #{idx + 1}</label>
//                             <input 
//                                 className="w-full border rounded p-2 text-sm mb-2 focus:ring-1 focus:ring-blue-500 outline-none" 
//                                 value={feat.title} 
//                                 onChange={e => handleFeatureChange(idx, 'title', e.target.value)} 
//                                 placeholder={`Judul Fitur ${idx+1}`} 
//                                 aria-label={`Judul Fitur ${idx+1}`}
//                             />
//                             <textarea 
//                                 rows={2} 
//                                 className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
//                                 value={feat.description} 
//                                 onChange={e => handleFeatureChange(idx, 'description', e.target.value)} 
//                                 placeholder="Deskripsi Singkat" 
//                                 aria-label={`Deskripsi Fitur ${idx+1}`}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* 4. FOOTER SETTINGS */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">4. Pengaturan Footer</h2>
//                 <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label>
//                             <div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
//                                 {formData.footer.logoUrl ? (
//                                     <img src={getImageUrl(formData.footer.logoUrl)} className="h-12 w-auto object-contain bg-white border p-1 rounded" alt="Logo Footer" />
//                                 ) : (
//                                     <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500"><ImageIcon/></div>
//                                 )}
//                                 <div className="flex flex-col gap-2">
//                                     <label className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700 text-center shadow-sm">
//                                         {uploadingFooterLogo ? 'Mengupload...' : 'Pilih Logo'}
//                                         <input type="file" className="hidden" accept="image/*" onChange={handleUploadFooterLogo} disabled={uploadingFooterLogo} title="Upload Logo Footer" aria-label="Upload Logo Footer"/>
//                                     </label>
//                                     {formData.footer.logoUrl && (
//                                         <button type="button" onClick={() => handleFooterChange('logoUrl', '')} className="text-red-600 text-xs font-bold hover:underline" aria-label="Hapus Logo Footer">
//                                             Hapus Logo
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block text-xs font-bold mb-1">Deskripsi Singkat (About)</label>
//                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)} aria-label="Footer About"/>
//                         </div>
//                         <div>
//                             <label className="block text-xs font-bold mb-1">Alamat</label>
//                             <textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)} aria-label="Footer Address"/>
//                         </div>
//                     </div>
                    
//                     <div className="space-y-4">
//                         <div className="grid grid-cols-2 gap-2">
//                             <div>
//                                 <label className="block text-xs font-bold mb-1">Telepon</label>
//                                 <input className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)} aria-label="Footer Phone"/>
//                             </div>
//                             <div>
//                                 <label className="block text-xs font-bold mb-1">Email</label>
//                                 <input className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)} aria-label="Footer Email"/>
//                             </div>
//                         </div>
//                         <div>
//                             <label className="block text-xs font-bold mb-1">Website</label>
//                             <input className="w-full border rounded p-2 text-sm" value={formData.footer.website} onChange={e => handleFooterChange('website', e.target.value)} aria-label="Footer Website"/>
//                         </div>
//                         <div>
//                             <label className="block text-xs font-bold mb-1">Copyright</label>
//                             <input className="w-full border rounded p-2 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)} aria-label="Footer Copyright"/>
//                         </div>
                        
//                         <div className="bg-gray-50 p-3 rounded border">
//                             <h3 className="text-xs font-bold mb-2">Social Media Links</h3>
//                             <div className="grid grid-cols-2 gap-2">
//                                 {['facebook','instagram','twitter','youtube'].map(soc => (
//                                     <div key={soc}>
//                                         <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{soc}</label>
//                                         <input 
//                                             className="w-full border rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-300 outline-none" 
//                                             placeholder={`https://${soc}.com/...`} 
//                                             value={formData.footer.socials?.[soc] || ''} 
//                                             onChange={e => handleSocialChange(soc, e.target.value)} 
//                                             aria-label={`Footer Social ${soc}`}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* 5. MANAJEMEN KATEGORI (3 KOLOM LENGKAP) */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                 <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2"><List size={18}/> 5. Manajemen Kategori</h2>
//                 <div className="grid md:grid-cols-3 gap-6">
                    
//                     {/* Course Categories */}
//                     <div className="bg-green-50 p-4 rounded-xl border border-green-100">
//                         <h3 className="text-sm font-bold text-green-800 mb-2">Kategori Pelatihan</h3>
//                         <p className="text-[10px] text-green-600 mb-3">Contoh: Health, Disaster, General</p>
//                         <div className="flex gap-2 mb-2">
//                             <input className="flex-1 border p-1.5 text-sm rounded outline-none focus:ring-1 focus:ring-green-500" value={newCourseCat} onChange={e=>setNewCourseCat(e.target.value)} placeholder="Nama Kategori Baru" aria-label="Nama Kategori Pelatihan Baru" />
//                             <button type="button" onClick={addCourseCat} className="bg-green-600 text-white px-3 rounded hover:bg-green-700 font-bold" aria-label="Tambah Kategori Pelatihan"><Plus size={16}/></button>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                             {formData.courseCategories.map((c,i)=>(
//                                 <span key={i} className="bg-white border border-green-200 text-green-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
//                                     {c}
//                                     <button onClick={()=>removeCourseCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c}`}><X size={12}/></button>
//                                 </span>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Forum Categories */}
//                     <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
//                         <h3 className="text-sm font-bold text-blue-800 mb-2">Kategori Forum</h3>
//                         <div className="flex gap-2 mb-2 items-center">
//                             <input className="flex-1 border p-1.5 text-sm rounded outline-none focus:ring-1 focus:ring-blue-500" value={newForumCat.name} onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} placeholder="Nama Forum" aria-label="Nama Kategori Forum Baru"/>
//                             <label className="bg-white border p-1.5 rounded cursor-pointer text-xs hover:bg-gray-50">
//                                 {uploadingForumIcon ? <Loader2 size={16} className="animate-spin text-blue-500"/> : <UploadCloud size={16} className="text-blue-500"/>}
//                                 <input type="file" className="hidden" onChange={handleUploadForumIcon} title="Upload Icon Forum" aria-label="Upload Icon Forum"/>
//                             </label>
//                             <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 font-bold" aria-label="Tambah Kategori Forum"><Plus size={16}/></button>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                             {formData.forumCategories.map((c,i)=>(
//                                 <span key={i} className="bg-white border border-blue-200 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
//                                     {c.name}
//                                     <button onClick={()=>removeForumCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c.name}`}><X size={12}/></button>
//                                 </span>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Library Categories */}
//                     <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
//                         <h3 className="text-sm font-bold text-purple-800 mb-2">Kategori Perpustakaan</h3>
//                         <div className="flex gap-2 mb-2">
//                             <input className="flex-1 border p-1.5 text-sm rounded outline-none focus:ring-1 focus:ring-purple-500" value={newLibCat} onChange={e=>setNewLibCat(e.target.value)} placeholder="Kategori Buku" aria-label="Nama Kategori Perpustakaan Baru"/>
//                             <button type="button" onClick={addLibCat} className="bg-purple-600 text-white px-3 rounded hover:bg-purple-700 font-bold" aria-label="Tambah Kategori Perpustakaan"><Plus size={16}/></button>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                             {formData.libraryCategories.map((c,i)=>(
//                                 <span key={i} className="bg-white border border-purple-200 text-purple-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
//                                     {c}
//                                     <button onClick={()=>removeLibCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c}`}><X size={12}/></button>
//                                 </span>
//                             ))}
//                         </div>
//                     </div>

//                 </div>
//             </div>

//         </form>
//       </div>
//     </Protected>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected'; 
import { Save, Plus, X, UploadCloud, Layout, List, Trash, Image as ImageIcon, Loader2 } from 'lucide-react';

// --- TIPE DATA ---
interface Feature { 
    title: string; 
    description: string; 
}

interface ForumCategory { 
    name: string; 
    iconUrl: string; 
}

interface FormDataState {
  heroTitle: string;
  heroDescription: string;
  heroBgUrl: string;
  faviconUrl: string;
  slides: string[];
  features: Feature[];
  footer: {
    about: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    copyright: string;
    logoUrl: string; 
    socials: {
      facebook: string;
      instagram: string;
      twitter: string;
      youtube: string;
      [key: string]: string;
    };
  };
  forumCategories: ForumCategory[];
  courseCategories: string[];
  libraryCategories: string[];
}

export default function AdminContentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Loading States Upload
  const [uploadingSlide, setUploadingSlide] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingFooterLogo, setUploadingFooterLogo] = useState(false);
  const [uploadingForumIcon, setUploadingForumIcon] = useState(false);

  // Input Tambahan Kategori
  const [newForumCat, setNewForumCat] = useState({ name: '', iconUrl: '' });
  const [newCourseCat, setNewCourseCat] = useState('');
  const [newLibCat, setNewLibCat] = useState('');

  // Main State
  const [formData, setFormData] = useState<FormDataState>({
    heroTitle: '',
    heroDescription: '',
    heroBgUrl: '',
    faviconUrl: '',
    slides: [],
    features: [ 
        { title: '', description: '' }, 
        { title: '', description: '' }, 
        { title: '', description: '' } 
    ],
    footer: {
        about: '', address: '', phone: '', email: '', website: '', copyright: '', logoUrl: '',
        socials: { facebook: '', instagram: '', twitter: '', youtube: '' }
    },
    forumCategories: [],
    courseCategories: [],
    libraryCategories: []
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await api('/api/content');
      if (data) {
          setFormData({
            heroTitle: data.heroTitle || '',
            heroDescription: data.heroDescription || '',
            heroBgUrl: data.heroBgUrl || '',
            faviconUrl: data.faviconUrl || '',
            slides: data.slides || [],
            features: data.features?.length ? data.features : [ 
                { title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' } 
            ],
            footer: {
                about: data.footer?.about || '',
                address: data.footer?.address || '',
                phone: data.footer?.phone || '',
                email: data.footer?.email || '',
                website: data.footer?.website || '',
                copyright: data.footer?.copyright || '',
                logoUrl: data.footer?.logoUrl || '',
                socials: { 
                    facebook: '', instagram: '', twitter: '', youtube: '', 
                    ...(data.footer?.socials || {}) 
                }
            },
            forumCategories: data.forumCategories || [],
            courseCategories: data.courseCategories || [],
            libraryCategories: data.libraryCategories || []
          });
      }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  // --- HANDLERS UPLOAD ---
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void, loader: (v: boolean) => void) => {
    if (!e.target.files?.[0]) return;
    loader(true);
    try {
      const fd = new FormData();
      fd.append('file', e.target.files[0]);
      
      const res = await api('/api/upload', {
          method: 'POST',
          body: fd,
          headers: {} 
      });

      const newUrl = res.url || res.file?.url;
      if (newUrl) setter(newUrl);
    } catch (e: any) { alert(e.message); } finally { loader(false); }
  };

  const handleUploadSlide = (e: React.ChangeEvent<HTMLInputElement>) => 
      handleUpload(e, (url) => setFormData(p => ({...p, slides: [...p.slides, url]})), setUploadingSlide);
  
  const handleUploadBg = (e: React.ChangeEvent<HTMLInputElement>) => 
      handleUpload(e, (url) => setFormData(p => ({...p, heroBgUrl: url})), setUploadingBg);

  const handleUploadFavicon = (e: React.ChangeEvent<HTMLInputElement>) => 
      handleUpload(e, (url) => setFormData(p => ({...p, faviconUrl: url})), setUploadingFavicon);
  
  const handleUploadFooterLogo = (e: React.ChangeEvent<HTMLInputElement>) => 
      handleUpload(e, (url) => setFormData(p => ({...p, footer: {...p.footer, logoUrl: url}})), setUploadingFooterLogo);

  const handleUploadForumIcon = (e: React.ChangeEvent<HTMLInputElement>) => 
      handleUpload(e, (url) => setNewForumCat(p => ({...p, iconUrl: url})), setUploadingForumIcon);

  // --- HANDLERS TEXT ---
  const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
      const newFeatures = [...formData.features];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      setFormData({ ...formData, features: newFeatures });
  };
  const handleFooterChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
  };
  const handleSocialChange = (platform: string, value: string) => {
      setFormData(prev => ({ 
          ...prev, 
          footer: { ...prev.footer, socials: { ...prev.footer.socials, [platform]: value } } 
      }));
  };

  // --- HANDLERS KATEGORI ---
  const removeSlide = (idx: number) => { 
      if(confirm("Hapus slide ini?")) setFormData(p => ({ ...p, slides: p.slides.filter((_, i) => i !== idx) })); 
  };
  const addForumCat = () => { 
      if (!newForumCat.name) return; 
      setFormData(p => ({ ...p, forumCategories: [...p.forumCategories, newForumCat] })); 
      setNewForumCat({ name: '', iconUrl: '' }); 
  };
  const removeForumCat = (idx: number) => setFormData(p => ({ ...p, forumCategories: p.forumCategories.filter((_, i) => i !== idx) }));
  
  const addCourseCat = () => { 
      if (!newCourseCat) return; 
      setFormData(p => ({ ...p, courseCategories: [...p.courseCategories, newCourseCat] })); 
      setNewCourseCat(''); 
  };
  const removeCourseCat = (idx: number) => setFormData(p => ({ ...p, courseCategories: p.courseCategories.filter((_, i) => i !== idx) }));
  
  const addLibCat = () => { 
      if (!newLibCat) return; 
      setFormData(p => ({ ...p, libraryCategories: [...p.libraryCategories, newLibCat] })); 
      setNewLibCat(''); 
  };
  const removeLibCat = (idx: number) => setFormData(p => ({ ...p, libraryCategories: p.libraryCategories.filter((_, i) => i !== idx) }));

  // --- SAVE ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!confirm("Simpan perubahan?")) return;

    setSaving(true);
    try {
      await api('/api/content', { 
          method: 'PUT', 
          body: JSON.stringify(formData) 
      });
      
      alert("✅ Pengaturan Berhasil Disimpan!");
      window.location.reload(); 

    } catch (e: any) { 
        alert("Gagal: " + e.message); 
    } finally { 
        setSaving(false); 
    }
  };

  if (loading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin text-red-700"/></div>;

  return (
    // [FIX] Role 'ADMIN' dihapus karena tidak ada di type definition
    <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
      <div className="min-h-screen bg-gray-50 pb-24 font-sans">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 shadow-sm border-b sticky top-0 z-50">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Layout size={20}/> CMS Pengaturan Konten
            </h1>
            <button 
                onClick={handleSave} 
                disabled={saving} 
                className="bg-[#990000] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#7f0000] disabled:opacity-50 flex items-center gap-2 transition-all"
                aria-label="Simpan Perubahan"
            >
                {saving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>}
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
        </div>
        
        <form onSubmit={handleSave} className="max-w-5xl mx-auto px-6 space-y-8 mt-8">
            
            {/* 1. HERO SECTION */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Hero Section (Beranda)</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Judul Utama</label>
                            <input className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} aria-label="Judul Utama" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
                            <textarea rows={3} className="w-full border rounded p-2 focus:ring-2 focus:ring-red-500 outline-none" value={formData.heroDescription} onChange={e => setFormData({...formData, heroDescription: e.target.value})} aria-label="Deskripsi Singkat" />
                        </div>
                    </div>
                    
                    {/* Upload Favicon */}
                    <div className="border-2 border-dashed p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[100px] rounded text-center relative group">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Favicon Website</label>
                        {formData.faviconUrl ? (
                            <img src={getImageUrl(formData.faviconUrl)} className="h-16 w-16 mb-2 object-contain shadow-sm bg-white p-1 rounded" alt="Favicon"/>
                        ) : (
                            <div className="text-gray-400 mb-2 bg-white p-2 rounded"><ImageIcon size={32}/></div>
                        )}
                        <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700 shadow-md mt-2">
                            {uploadingFavicon ? 'Mengupload...' : 'Upload Favicon'}
                            <input type="file" className="hidden" onChange={handleUploadFavicon} disabled={uploadingFavicon} title="Upload Favicon" aria-label="Upload Favicon" />
                        </label>
                        <p className="text-[10px] text-gray-400 mt-2">Format: PNG/ICO (Disarankan 32x32)</p>
                    </div>
                </div>
            </div>

             {/* 2. SLIDES */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Slide Carousel</h2>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {formData.slides.map((url, idx) => (
                        <div key={idx} className="relative w-40 h-24 flex-shrink-0 group rounded-lg overflow-hidden border">
                            <img src={getImageUrl(url)} className="w-full h-full object-cover" alt={`Slide ${idx + 1}`}/>
                            <button 
                                type="button" 
                                onClick={() => removeSlide(idx)} 
                                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700"
                                aria-label={`Hapus Slide ${idx + 1}`}
                                title={`Hapus Slide ${idx + 1}`}
                            >
                                <Trash size={12}/>
                            </button>
                        </div>
                    ))}
                    <label className="w-40 h-24 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-lg flex-shrink-0 text-xs text-gray-500 font-bold transition-colors hover:border-red-300">
                        <Plus size={20} className="mb-1 text-gray-400"/>
                        {uploadingSlide ? 'Uploading...' : 'Tambah Slide'}
                        <input 
                            type="file" 
                            className="hidden" 
                            onChange={handleUploadSlide} 
                            disabled={uploadingSlide}
                            title="Upload Slide Baru"
                            aria-label="Upload Slide Baru"
                        />
                    </label>
                </div>
            </div>

            {/* 3. FEATURES */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">3. Fitur Utama (Info Cards)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {formData.features.map((feat, idx) => (
                        <div key={idx} className="p-3 border rounded-lg bg-gray-50">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Kartu #{idx + 1}</label>
                            <input 
                                className="w-full border rounded p-2 text-sm mb-2 focus:ring-1 focus:ring-blue-500 outline-none" 
                                value={feat.title} 
                                onChange={e => handleFeatureChange(idx, 'title', e.target.value)} 
                                placeholder={`Judul Fitur ${idx+1}`} 
                                aria-label={`Judul Fitur ${idx+1}`}
                            />
                            <textarea 
                                rows={2} 
                                className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                                value={feat.description} 
                                onChange={e => handleFeatureChange(idx, 'description', e.target.value)} 
                                placeholder="Deskripsi Singkat" 
                                aria-label={`Deskripsi Fitur ${idx+1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. FOOTER SETTINGS */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">4. Pengaturan Footer</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Logo Footer</label>
                            <div className="flex items-center gap-4 border p-3 rounded-lg bg-gray-50">
                                {formData.footer.logoUrl ? (
                                    <img src={getImageUrl(formData.footer.logoUrl)} className="h-12 w-auto object-contain bg-white border p-1 rounded" alt="Logo Footer" />
                                ) : (
                                    <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500"><ImageIcon/></div>
                                )}
                                <div className="flex flex-col gap-2">
                                    <label className="cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700 text-center shadow-sm">
                                        {uploadingFooterLogo ? 'Mengupload...' : 'Pilih Logo'}
                                        <input type="file" className="hidden" accept="image/*" onChange={handleUploadFooterLogo} disabled={uploadingFooterLogo} title="Upload Logo Footer" aria-label="Upload Logo Footer"/>
                                    </label>
                                    {formData.footer.logoUrl && (
                                        <button type="button" onClick={() => handleFooterChange('logoUrl', '')} className="text-red-600 text-xs font-bold hover:underline" aria-label="Hapus Logo Footer">
                                            Hapus Logo
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold mb-1">Deskripsi Singkat (About)</label>
                            <textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.about} onChange={e => handleFooterChange('about', e.target.value)} aria-label="Footer About"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1">Alamat</label>
                            <textarea rows={2} className="w-full border rounded p-2 text-sm" value={formData.footer.address} onChange={e => handleFooterChange('address', e.target.value)} aria-label="Footer Address"/>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-bold mb-1">Telepon</label>
                                <input className="w-full border rounded p-2 text-sm" value={formData.footer.phone} onChange={e => handleFooterChange('phone', e.target.value)} aria-label="Footer Phone"/>
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1">Email</label>
                                <input className="w-full border rounded p-2 text-sm" value={formData.footer.email} onChange={e => handleFooterChange('email', e.target.value)} aria-label="Footer Email"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1">Website</label>
                            <input className="w-full border rounded p-2 text-sm" value={formData.footer.website} onChange={e => handleFooterChange('website', e.target.value)} aria-label="Footer Website"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold mb-1">Copyright</label>
                            <input className="w-full border rounded p-2 text-sm" value={formData.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)} aria-label="Footer Copyright"/>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded border">
                            <h3 className="text-xs font-bold mb-2">Social Media Links</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {['facebook','instagram','twitter','youtube'].map(soc => (
                                    <div key={soc}>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{soc}</label>
                                        <input 
                                            className="w-full border rounded p-1.5 text-xs focus:ring-1 focus:ring-blue-300 outline-none" 
                                            placeholder={`https://${soc}.com/...`} 
                                            value={formData.footer.socials?.[soc] || ''} 
                                            onChange={e => handleSocialChange(soc, e.target.value)} 
                                            aria-label={`Footer Social ${soc}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. MANAJEMEN KATEGORI */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2"><List size={18}/> 5. Manajemen Kategori</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    
                    {/* Course Categories */}
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <h3 className="text-sm font-bold text-green-800 mb-2">Kategori Pelatihan</h3>
                        <p className="text-[10px] text-green-600 mb-3">Contoh: Health, Disaster, General</p>
                        <div className="flex gap-2 mb-2">
                            <input className="flex-1 border p-1.5 text-sm rounded outline-none focus:ring-1 focus:ring-green-500" value={newCourseCat} onChange={e=>setNewCourseCat(e.target.value)} placeholder="Nama Kategori Baru" aria-label="Nama Kategori Pelatihan Baru" />
                            <button type="button" onClick={addCourseCat} className="bg-green-600 text-white px-3 rounded hover:bg-green-700 font-bold" aria-label="Tambah Kategori Pelatihan"><Plus size={16}/></button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.courseCategories.map((c,i)=>(
                                <span key={i} className="bg-white border border-green-200 text-green-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                                    {c}
                                    <button onClick={()=>removeCourseCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c}`}><X size={12}/></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Forum Categories */}
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h3 className="text-sm font-bold text-blue-800 mb-2">Kategori Forum</h3>
                        <div className="flex gap-2 mb-2 items-center">
                            <input className="flex-1 border p-1.5 text-sm rounded outline-none focus:ring-1 focus:ring-blue-500" value={newForumCat.name} onChange={e=>setNewForumCat({...newForumCat, name:e.target.value})} placeholder="Nama Forum" aria-label="Nama Kategori Forum Baru"/>
                            <label className="bg-white border p-1.5 rounded cursor-pointer text-xs hover:bg-gray-50">
                                {uploadingForumIcon ? <Loader2 size={16} className="animate-spin text-blue-500"/> : <UploadCloud size={16} className="text-blue-500"/>}
                                <input type="file" className="hidden" onChange={handleUploadForumIcon} title="Upload Icon Forum" aria-label="Upload Icon Forum"/>
                            </label>
                            <button type="button" onClick={addForumCat} className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 font-bold" aria-label="Tambah Kategori Forum"><Plus size={16}/></button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.forumCategories.map((c,i)=>(
                                <span key={i} className="bg-white border border-blue-200 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                                    {c.name}
                                    <button onClick={()=>removeForumCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c.name}`}><X size={12}/></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Library Categories */}
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                        <h3 className="text-sm font-bold text-purple-800 mb-2">Kategori Perpustakaan</h3>
                        <div className="flex gap-2 mb-2">
                            <input className="flex-1 border p-1.5 text-sm rounded outline-none focus:ring-1 focus:ring-purple-500" value={newLibCat} onChange={e=>setNewLibCat(e.target.value)} placeholder="Kategori Buku" aria-label="Nama Kategori Perpustakaan Baru"/>
                            <button type="button" onClick={addLibCat} className="bg-purple-600 text-white px-3 rounded hover:bg-purple-700 font-bold" aria-label="Tambah Kategori Perpustakaan"><Plus size={16}/></button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.libraryCategories.map((c,i)=>(
                                <span key={i} className="bg-white border border-purple-200 text-purple-800 text-xs px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                                    {c}
                                    <button onClick={()=>removeLibCat(i)} className="text-red-400 hover:text-red-600 ml-1" aria-label={`Hapus Kategori ${c}`}><X size={12}/></button>
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </form>
      </div>
    </Protected>
  );
}
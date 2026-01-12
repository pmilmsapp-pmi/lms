// // // // 
// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import Link from 'next/link';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import { 
// // //     MapPin, Phone, Mail, Globe, 
// // //     Facebook, Instagram, Twitter, Youtube, Link as LinkIcon 
// // // } from 'lucide-react';

// // // export default function Footer() {
// // //   const [footerData, setFooterData] = useState<any>(null);
  
// // //   // State Statistik
// // //   const [stats, setStats] = useState({
// // //     visitors: 0,
// // //     users: 0,
// // //     courses: 0,
// // //     startYear: 2025
// // //   });

// // //   useEffect(() => {
// // //     const initData = async () => {
// // //         try {
// // //             // 1. Load Data CMS
// // //             const content = await api('/api/content');
// // //             if (content && content.footer) {
// // //                 setFooterData(content.footer);
// // //             }

// // //             // 2. Load Statistik Realtime
// // //             // Backend mengirim: { users: 10, courses: 5, visitors: 100 }
// // //             const statsRes = await api('/api/stats');
// // //             console.log("DATA STATISTIK DITERIMA FRONTEND:", statsRes); // Cek Console Browser (F12)

// // //             if (statsRes) {
// // //                 setStats({
// // //                     visitors: statsRes.visitors || 0,
// // //                     users: statsRes.users || 0,
// // //                     courses: statsRes.courses || 0,
// // //                     startYear: statsRes.startYear || 2025
// // //                 });
// // //             }

// // //             // 3. Hitung Visitor
// // //             // Untuk testing, kita matikan cek sessionStorage agar visitor nambah terus saat refresh
// // //             // Jika sudah production, uncomment kode sessionStorage
            
// // //             // const hasVisited = sessionStorage.getItem('visited');
// // //             // if (!hasVisited) {
// // //                 await api('/api/stats/visit', { method: 'POST' });
// // //                 // sessionStorage.setItem('visited', 'true');
                
// // //                 // Update UI lokal (+1) biar terlihat realtime
// // //                 setStats(prev => ({ ...prev, visitors: prev.visitors + 1 }));
// // //             // }

// // //         } catch (e) {
// // //             console.error("Gagal load data footer:", e);
// // //         }
// // //     };

// // //     initData();
// // //   }, []);

// // //   const data = footerData || {
// // //     about: "Platform Learning Management System.",
// // //     address: "Jl. Gatot Subroto Kav. 96, Jakarta Selatan",
// // //     phone: "(021) 799 2325",
// // //     email: "pmi@pmi.or.id",
// // //     website: "www.pmi.or.id",
// // //     copyright: "© 2025 Palang Merah Indonesia",
// // //     socials: { facebook: '', instagram: '', twitter: '', youtube: '' },
// // //     logoUrl: '' 
// // //   };

// // //   return (
// // //     <footer className="flex flex-col font-sans mt-auto">
      
// // //       {/* 1. STATISTIK BAR */}
// // //       <div className="bg-[#7f1d1d] text-white py-4 border-b border-red-900 shadow-sm relative z-10">
// // //         <div className="max-w-7xl mx-auto px-6">
// // //             <div className="grid grid-cols-4 gap-4 text-center divide-x divide-red-600/40">
// // //                 <div className="flex flex-col justify-center">
// // //                     <p className="text-2xl font-bold leading-none mb-1">{(stats.visitors).toLocaleString('id-ID')}</p>
// // //                     <p className="text-[10px] uppercase tracking-widest opacity-80 font-medium">Visitor</p>
// // //                 </div>
// // //                 <div className="flex flex-col justify-center">
// // //                     <p className="text-2xl font-bold leading-none mb-1">{(stats.users).toLocaleString('id-ID')}</p>
// // //                     <p className="text-[10px] uppercase tracking-widest opacity-80 font-medium">Pengguna</p>
// // //                 </div>
// // //                 <div className="flex flex-col justify-center">
// // //                     <p className="text-2xl font-bold leading-none mb-1">{(stats.courses).toLocaleString('id-ID')}</p>
// // //                     <p className="text-[10px] uppercase tracking-widest opacity-80 font-medium">Kursus</p>
// // //                 </div>
// // //                 <div className="flex flex-col justify-center">
// // //                     <p className="text-2xl font-bold leading-none mb-1">{stats.startYear}</p>
// // //                     <p className="text-[10px] uppercase tracking-widest opacity-80 font-medium">Mulai</p>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //       </div>

// // //       {/* 2. BAGIAN UTAMA FOOTER */}
// // //       <div className="bg-[#1e293b] text-white border-t border-gray-800 text-sm">
// // //         <div className="max-w-7xl mx-auto px-6 py-10">
// // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
// // //             {/* LOGO & ABOUT */}
// // //             <div className="space-y-6">
// // //               <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl w-fit shadow-md">
// // //                   {data.logoUrl ? (
// // //                       <img src={getImageUrl(data.logoUrl)} alt="Logo Footer" className="h-10 w-auto object-contain" />
// // //                   ) : (
// // //                       <div className="flex items-center gap-2">
// // //                         <img src="/pmi-logo.png" alt="PMI" className="h-9 w-auto object-contain" />
// // //                         <div className="h-8 w-px bg-gray-300"></div>
// // //                         <img src="/humanis.png" alt="Humanis" className="h-7 w-auto object-contain" />
// // //                       </div>
// // //                   )}
// // //               </div>
// // //               <p className="leading-relaxed text-gray-400 text-xs max-w-xs">{data.about}</p>
              
// // //               {/* SOSMED */}
// // //               <div>
// // //                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Ikuti Kami</h4>
// // //                  <div className="flex gap-2">
// // //                     {['facebook', 'instagram', 'twitter', 'youtube'].map((soc) => {
// // //                         const link = data.socials?.[soc];
// // //                         if (!link) return null; 
// // //                         return (
// // //                             <a key={soc} href={link} target="_blank" rel="noreferrer" aria-label={soc} className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-red-700 text-white transition-all border border-gray-700 hover:border-red-600 shadow-sm">
// // //                                 {soc === 'facebook' && <Facebook size={16} />}
// // //                                 {soc === 'instagram' && <Instagram size={16} />}
// // //                                 {soc === 'twitter' && <Twitter size={16} />}
// // //                                 {soc === 'youtube' && <Youtube size={16} />}
// // //                             </a>
// // //                         );
// // //                     })}
// // //                  </div>
// // //               </div>
// // //             </div>

// // //             {/* LINKS */}
// // //             <div>
// // //               <h3 className="font-bold text-white mb-5 uppercase text-xs tracking-wider border-b border-gray-700 pb-2 w-fit">Akses Cepat</h3>
// // //               <ul className="space-y-3 text-gray-400 text-xs">
// // //                 <li><Link href="/courses" className="hover:text-red-400 transition flex items-center gap-2"><span>›</span> Katalog Kelas</Link></li>
// // //                 <li><Link href="/forum" className="hover:text-red-400 transition flex items-center gap-2"><span>›</span> Forum Diskusi</Link></li>
// // //                 <li><Link href="/library" className="hover:text-red-400 transition flex items-center gap-2"><span>›</span> Perpustakaan</Link></li>
// // //                 <li><Link href="/login" className="hover:text-red-400 transition flex items-center gap-2"><span>›</span> Login User</Link></li>
// // //               </ul>
// // //             </div>

// // //             {/* CONTACT */}
// // //             <div className="col-span-1 md:col-span-2">
// // //               <h3 className="font-bold text-white mb-5 uppercase text-xs tracking-wider border-b border-gray-700 pb-2 w-fit">Hubungi Kami</h3>
// // //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-400 text-xs">
// // //                   <div className="flex items-start gap-3 bg-gray-800/40 p-3 rounded-lg border border-gray-700/50 hover:border-gray-600 transition"><MapPin size={16} className="text-red-500 flex-shrink-0 mt-0.5" /><span>{data.address}</span></div>
// // //                   <div className="flex items-center gap-3 bg-gray-800/40 p-3 rounded-lg border border-gray-700/50 hover:border-gray-600 transition"><Phone size={16} className="text-red-500 flex-shrink-0" /><span>{data.phone}</span></div>
// // //                   <div className="flex items-center gap-3 bg-gray-800/40 p-3 rounded-lg border border-gray-700/50 hover:border-gray-600 transition"><Mail size={16} className="text-red-500 flex-shrink-0" /><span>{data.email}</span></div>
// // //                   <div className="flex items-center gap-3 bg-gray-800/40 p-3 rounded-lg border border-gray-700/50 hover:border-gray-600 transition"><Globe size={16} className="text-red-500 flex-shrink-0" /><a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-white">{data.website}</a></div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500">
// // //             <p>{data.copyright || `© ${new Date().getFullYear()} Palang Merah Indonesia`}</p>
// // //             <div className="flex gap-6 mt-3 md:mt-0">
// // //               <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
// // //               <Link href="#" className="hover:text-white transition">Terms of Service</Link>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </footer>
// // //   );
// // // }
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import Link from 'next/link';
// // import { api, getImageUrl } from '@/lib/api';
// // import { 
// //     MapPin, Phone, Mail, Globe, 
// //     Facebook, Instagram, Twitter, Youtube, Link as LinkIcon 
// // } from 'lucide-react';

// // export default function Footer() {
// //   const [footerData, setFooterData] = useState<any>(null);
// //   const [stats, setStats] = useState({ visitors: 0, users: 0, courses: 0, startYear: 2025 });

// //   useEffect(() => {
// //     const initData = async () => {
// //         try {
// //             const content = await api('/api/content');
// //             if (content?.footer) setFooterData(content.footer);

// //             const statsRes = await api('/api/stats');
// //             if (statsRes) {
// //                 setStats({
// //                     visitors: statsRes.visitors || 0,
// //                     users: statsRes.users || 0,
// //                     courses: statsRes.courses || 0,
// //                     startYear: statsRes.startYear || 2025
// //                 });
// //             }

// //             if (typeof window !== 'undefined' && !sessionStorage.getItem('visited')) {
// //                 await api('/api/stats/visit', { method: 'POST' });
// //                 sessionStorage.setItem('visited', 'true');
// //                 setStats(p => ({ ...p, visitors: p.visitors + 1 }));
// //             }
// //         } catch (e) { /* silent */ }
// //     };
// //     initData();
// //   }, []);

// //   const data = footerData || {
// //     about: "Platform Learning Management System.",
// //     address: "Jl. Gatot Subroto Kav. 96, Jakarta Selatan",
// //     phone: "(021) 799 2325",
// //     email: "pmi@pmi.or.id",
// //     website: "www.pmi.or.id",
// //     copyright: "© 2025 Palang Merah Indonesia",
// //     socials: { facebook: '', instagram: '', twitter: '', youtube: '' },
// //     logoUrl: '' 
// //   };

// //   return (
// //     <footer className="flex flex-col font-sans mt-auto">
      
// //       {/* 1. STATISTIK BAR (SUPER SLIM) */}
// //       <div className="bg-[#7f1d1d] text-white py-2 border-b border-red-900 shadow-sm relative z-10 text-xs">
// //         <div className="max-w-7xl mx-auto px-6">
// //             <div className="grid grid-cols-4 gap-2 text-center divide-x divide-red-600/40">
// //                 <div><span className="font-bold mr-1">{(stats.visitors).toLocaleString('id-ID')}</span> <span className="opacity-70 text-[10px] uppercase">Visitor</span></div>
// //                 <div><span className="font-bold mr-1">{(stats.users).toLocaleString('id-ID')}</span> <span className="opacity-70 text-[10px] uppercase">Pengguna</span></div>
// //                 <div><span className="font-bold mr-1">{(stats.courses).toLocaleString('id-ID')}</span> <span className="opacity-70 text-[10px] uppercase">Kursus</span></div>
// //                 <div><span className="font-bold mr-1">{stats.startYear}</span> <span className="opacity-70 text-[10px] uppercase">Mulai</span></div>
// //             </div>
// //         </div>
// //       </div>

// //       {/* 2. BAGIAN UTAMA FOOTER (COMPACT) */}
// //       <div className="bg-[#1e293b] text-white border-t border-gray-800 text-xs">
// //         {/* Padding dikurangi drastis: py-10 -> py-5 */}
// //         <div className="max-w-7xl mx-auto px-6 py-5">
          
// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
// //             {/* KOLOM 1: LOGO & ABOUT */}
// //             <div className="space-y-3">
// //               <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg w-fit shadow-sm">
// //                   {data.logoUrl ? (
// //                       <img src={getImageUrl(data.logoUrl)} alt="Logo" className="h-7 w-auto object-contain" />
// //                   ) : (
// //                       <div className="flex items-center gap-2">
// //                         <img src="/pmi-logo.png" alt="PMI" className="h-6 w-auto object-contain" />
// //                         <div className="h-5 w-px bg-gray-300"></div>
// //                         <img src="/humanis.png" alt="Humanis" className="h-5 w-auto object-contain" />
// //                       </div>
// //                   )}
// //               </div>
              
// //               <p className="leading-snug text-gray-400 text-[11px] max-w-xs">{data.about}</p>
              
// //               {/* SOSMED (Kecil) */}
// //               <div className="flex gap-2 pt-1">
// //                 {['facebook', 'instagram', 'twitter', 'youtube'].map((soc) => {
// //                     const link = data.socials?.[soc];
// //                     if (!link) return null; 
// //                     return (
// //                         <a key={soc} href={link} target="_blank" rel="noreferrer" aria-label={soc} className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center hover:bg-red-700 transition border border-gray-700 hover:border-red-600">
// //                             {soc === 'facebook' && <Facebook size={12} />}
// //                             {soc === 'instagram' && <Instagram size={12} />}
// //                             {soc === 'twitter' && <Twitter size={12} />}
// //                             {soc === 'youtube' && <Youtube size={12} />}
// //                         </a>
// //                     );
// //                 })}
// //               </div>
// //             </div>

// //             {/* KOLOM 2: LINK CEPAT */}
// //             <div>
// //               <h3 className="font-bold text-white mb-2 uppercase text-[10px] tracking-wider border-b border-gray-700 pb-1 w-fit">Akses Cepat</h3>
// //               <ul className="space-y-1.5 text-gray-400">
// //                 <li><Link href="/courses" className="hover:text-red-400 transition flex items-center gap-1.5"><span>›</span> Katalog Kelas</Link></li>
// //                 <li><Link href="/forum" className="hover:text-red-400 transition flex items-center gap-1.5"><span>›</span> Forum Diskusi</Link></li>
// //                 <li><Link href="/library" className="hover:text-red-400 transition flex items-center gap-1.5"><span>›</span> Perpustakaan</Link></li>
// //                 <li><Link href="/login" className="hover:text-red-400 transition flex items-center gap-1.5"><span>›</span> Login User</Link></li>
// //               </ul>
// //             </div>

// //             {/* KOLOM 3: KONTAK (Grid Compact) */}
// //             <div className="col-span-1 md:col-span-2">
// //               <h3 className="font-bold text-white mb-2 uppercase text-[10px] tracking-wider border-b border-gray-700 pb-1 w-fit">Hubungi Kami</h3>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-400">
// //                   <div className="flex items-center gap-2 bg-gray-800/40 p-2 rounded border border-gray-700/50">
// //                       <MapPin size={14} className="text-red-500 flex-shrink-0" /><span className="truncate">{data.address}</span>
// //                   </div>
// //                   <div className="flex items-center gap-2 bg-gray-800/40 p-2 rounded border border-gray-700/50">
// //                       <Phone size={14} className="text-red-500 flex-shrink-0" /><span>{data.phone}</span>
// //                   </div>
// //                   <div className="flex items-center gap-2 bg-gray-800/40 p-2 rounded border border-gray-700/50">
// //                       <Mail size={14} className="text-red-500 flex-shrink-0" /><span>{data.email}</span>
// //                   </div>
// //                   <div className="flex items-center gap-2 bg-gray-800/40 p-2 rounded border border-gray-700/50">
// //                       <Globe size={14} className="text-red-500 flex-shrink-0" />
// //                       <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} target="_blank" rel="noreferrer" className="hover:text-white truncate">{data.website}</a>
// //                   </div>
// //               </div>
// //             </div>

// //           </div>

// //           {/* COPYRIGHT (Margin dikurangi) */}
// //           <div className="border-t border-gray-700 mt-4 pt-3 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500">
// //             <p>{data.copyright || `© ${new Date().getFullYear()} Palang Merah Indonesia`}</p>
// //             <div className="flex gap-4 mt-2 md:mt-0">
// //               <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
// //               <Link href="#" className="hover:text-white transition">Terms of Service</Link>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { api, getImageUrl } from '@/lib/api';
// import { 
//     MapPin, Phone, Mail, Globe, 
//     Facebook, Instagram, Twitter, Youtube, Link as LinkIcon 
// } from 'lucide-react';

// export default function Footer() {
//   const [footerData, setFooterData] = useState<any>(null);
  
//   // State Statistik
//   const [stats, setStats] = useState({
//     visitors: 0,
//     users: 0,
//     courses: 0,
//     startYear: 2025
//   });

//   useEffect(() => {
//     const initData = async () => {
//         try {
//             // 1. Load Data CMS
//             const content = await api('/api/content');
//             if (content && content.footer) {
//                 setFooterData(content.footer);
//             }

//             // 2. Load Statistik Realtime
//             const statsRes = await api('/api/stats');
//             if (statsRes) {
//                 setStats({
//                     visitors: statsRes.visitors || 0,
//                     users: statsRes.users || 0,
//                     courses: statsRes.courses || 0,
//                     startYear: statsRes.startYear || 2025
//                 });
//             }

//             // 3. Hitung Visitor
//             if (typeof window !== 'undefined') {
//                 const hasVisited = sessionStorage.getItem('visited');
//                 if (!hasVisited) {
//                     await api('/api/stats/visit', { method: 'POST' });
//                     sessionStorage.setItem('visited', 'true');
//                     setStats(prev => ({ ...prev, visitors: prev.visitors + 1 }));
//                 }
//             }

//         } catch (e) {
//             console.error("Gagal load data:", e);
//         }
//     };

//     initData();
//   }, []);

//   const data = footerData || {
//     about: "Platform Learning Management System.",
//     address: "Jl. Gatot Subroto Kav. 96, Jakarta Selatan",
//     phone: "(021) 799 2325",
//     email: "pmi@pmi.or.id",
//     website: "www.pmi.or.id",
//     copyright: "© 2025 Palang Merah Indonesia",
//     socials: { facebook: '', instagram: '', twitter: '', youtube: '' },
//     logoUrl: '' 
//   };

//   return (
//     <footer className="flex flex-col font-sans mt-auto">
      
//       {/* 1. STATISTIK BAR (SLIM) */}
//       <div className="bg-[#7f1d1d] text-white py-2 border-b border-red-900 shadow-sm relative z-10 text-xs">
//         <div className="max-w-7xl mx-auto px-6">
//             <div className="grid grid-cols-4 gap-2 text-center divide-x divide-red-600/40">
//                 <div>
//                     <span className="font-bold mr-1">{(stats.visitors).toLocaleString('id-ID')}</span> 
//                     <span className="opacity-70 text-[10px] uppercase">Visitor</span>
//                 </div>
//                 <div>
//                     <span className="font-bold mr-1">{(stats.users).toLocaleString('id-ID')}</span> 
//                     <span className="opacity-70 text-[10px] uppercase">Pengguna</span>
//                 </div>
//                 <div>
//                     <span className="font-bold mr-1">{(stats.courses).toLocaleString('id-ID')}</span> 
//                     <span className="opacity-70 text-[10px] uppercase">Kursus</span>
//                 </div>
//                 <div>
//                     <span className="font-bold mr-1">{stats.startYear}</span> 
//                     <span className="opacity-70 text-[10px] uppercase">Mulai</span>
//                 </div>
//             </div>
//         </div>
//       </div>

//       {/* 2. BAGIAN UTAMA FOOTER (COMPACT) */}
//       <div className="bg-[#1e293b] text-white border-t border-gray-800 text-xs">
//         <div className="max-w-7xl mx-auto px-6 py-5">
          
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
//             {/* KOLOM 1: LOGO & ABOUT */}
//             <div className="space-y-3">
//               <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg w-fit shadow-sm">
//                   {data.logoUrl ? (
//                       <img src={getImageUrl(data.logoUrl)} alt="Logo" className="h-7 w-auto object-contain" />
//                   ) : (
//                       <div className="flex items-center gap-2">
//                         <img src="/pmi-logo.png" alt="PMI" className="h-6 w-auto object-contain" />
//                         <div className="h-5 w-px bg-gray-300"></div>
//                         <img src="/humanis.png" alt="Humanis" className="h-5 w-auto object-contain" />
//                       </div>
//                   )}
//               </div>
              
//               <p className="leading-snug text-gray-400 text-[11px] max-w-xs">{data.about}</p>
              
//               {/* SOSMED */}
//               <div className="flex gap-2 pt-1">
//                 {['facebook', 'instagram', 'twitter', 'youtube'].map((soc) => {
//                     const link = data.socials?.[soc];
//                     if (!link) return null; 
//                     return (
//                         <a key={soc} href={link} target="_blank" rel="noreferrer" aria-label={soc} className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center hover:bg-red-700 transition border border-gray-700 hover:border-red-600">
//                             {soc === 'facebook' && <Facebook size={12} />}
//                             {soc === 'instagram' && <Instagram size={12} />}
//                             {soc === 'twitter' && <Twitter size={12} />}
//                             {soc === 'youtube' && <Youtube size={12} />}
//                         </a>
//                     );
//                 })}
//               </div>
//             </div>

//             {/* KOLOM 2: LINK CEPAT */}
//             <div>
//               <h3 className="font-bold text-white mb-2 uppercase text-[10px] tracking-wider border-b border-gray-700 pb-1 w-fit">Akses Cepat</h3>
//               <ul className="space-y-1.5 text-gray-400">
//                 <li><Link href="/courses" className="hover:text-red-400 transition flex items-center gap-1.5"><span>›</span> Katalog Kelas</Link></li>
//                 <li><Link href="/forum" className="hover:text-red-400 transition flex items-center gap-1.5"><span>›</span> Forum Diskusi</Link></li>
//                 <li><Link href="/library" className="hover:text-red-400 transition flex items-center gap-1.5"><span>›</span> Perpustakaan</Link></li>
//                 <li><Link href="/login" className="hover:text-red-400 transition flex items-center gap-1.5"><span>›</span> Login User</Link></li>
//               </ul>
//             </div>

//             {/* KOLOM 3: KONTAK (FIXED WRAPPING) */}
//             <div className="col-span-1 md:col-span-2">
//               <h3 className="font-bold text-white mb-2 uppercase text-[10px] tracking-wider border-b border-gray-700 pb-1 w-fit">Hubungi Kami</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-400">
                  
//                   {/* --- FIX ADDRESS: items-start, leading-snug, hapus truncate --- */}
//                   <div className="flex items-start gap-2 bg-gray-800/40 p-2 rounded border border-gray-700/50">
//                       <MapPin size={14} className="text-red-500 flex-shrink-0 mt-[2px]" />
//                       <span className="leading-snug">{data.address}</span>
//                   </div>
//                   {/* ----------------------------------------------------------- */}

//                   <div className="flex items-center gap-2 bg-gray-800/40 p-2 rounded border border-gray-700/50">
//                       <Phone size={14} className="text-red-500 flex-shrink-0" />
//                       <span className="truncate">{data.phone}</span>
//                   </div>
//                   <div className="flex items-center gap-2 bg-gray-800/40 p-2 rounded border border-gray-700/50">
//                       <Mail size={14} className="text-red-500 flex-shrink-0" />
//                       <span className="truncate">{data.email}</span>
//                   </div>
//                   <div className="flex items-center gap-2 bg-gray-800/40 p-2 rounded border border-gray-700/50">
//                       <Globe size={14} className="text-red-500 flex-shrink-0" />
//                       <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} target="_blank" rel="noreferrer" className="hover:text-white truncate block">{data.website}</a>
//                   </div>
//               </div>
//             </div>

//           </div>

//           <div className="border-t border-gray-700 mt-4 pt-3 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500">
//             <p>{data.copyright || `© ${new Date().getFullYear()} Palang Merah Indonesia`}</p>
//             <div className="flex gap-4 mt-2 md:mt-0">
//               <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
//               <Link href="#" className="hover:text-white transition">Terms of Service</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, getImageUrl } from '@/lib/api';
import { 
    MapPin, Phone, Mail, Globe, 
    Facebook, Instagram, Twitter, Youtube 
} from 'lucide-react';

export default function Footer() {
  const [footerData, setFooterData] = useState<any>(null);
  
  // State Statistik (Updated with Blog & Forum)
  const [stats, setStats] = useState({
    visitors: 0,
    users: 0,
    courses: 0,
    blogs: 0,   // [NEW]
    forums: 0,  // [NEW]
    startYear: 2025
  });

  useEffect(() => {
    const initData = async () => {
        try {
            // 1. Load Data CMS
            const content = await api('/api/content').catch(() => null);
            if (content && content.footer) {
                setFooterData(content.footer);
            }

            // 2. Load Statistik Realtime
            api('/api/stats/public')
                .then((res: any) => {
                    if (res) {
                        setStats({
                            visitors: res.visitors || 0,
                            users: res.users || 0,
                            courses: res.courses || 0,
                            blogs: res.blogs || 0,   // [NEW]
                            forums: res.forums || 0, // [NEW]
                            startYear: res.startYear || 2025
                        });
                    }
                })
                .catch((err) => console.error("Gagal load stats:", err));

            // 3. Hitung Visitor
            if (typeof window !== 'undefined') {
                const hasVisited = sessionStorage.getItem('visited');
                if (!hasVisited) {
                    await api('/api/stats/visit', { method: 'POST' }).catch(() => {});
                    sessionStorage.setItem('visited', 'true');
                    setStats(prev => ({ ...prev, visitors: prev.visitors + 1 }));
                }
            }

        } catch (e) {
            console.error("Gagal inisialisasi footer:", e);
        }
    };

    initData();
  }, []);

  const data = footerData || {
    about: "Platform Learning Management System.",
    address: "Jl. Gatot Subroto Kav. 96, Jakarta Selatan",
    phone: "(021) 799 2325",
    email: "pmi@pmi.or.id",
    website: "www.pmi.or.id",
    copyright: "© 2025 Palang Merah Indonesia",
    socials: { facebook: '', instagram: '', twitter: '', youtube: '' },
    logoUrl: '' 
  };

  return (
    <footer className="flex flex-col font-sans mt-auto">
      
      {/* 1. STATISTIK BAR (EXPANDED TO 6 COLUMNS) */}
      <div className="bg-[#7f1d1d] text-white py-2 border-b border-red-900 shadow-sm relative z-10 text-xs">
        <div className="max-w-7xl mx-auto px-6">
            {/* Grid 3 kolom di mobile, 6 kolom di desktop */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center divide-x divide-red-600/40">
                <div>
                    <span className="font-bold mr-1">{(stats.visitors).toLocaleString('id-ID')}</span> 
                    <span className="opacity-70 text-[10px] uppercase">Visitor</span>
                </div>
                <div>
                    <span className="font-bold mr-1">{(stats.users).toLocaleString('id-ID')}</span> 
                    <span className="opacity-70 text-[10px] uppercase">Pengguna</span>
                </div>
                <div>
                    <span className="font-bold mr-1">{(stats.courses).toLocaleString('id-ID')}</span> 
                    <span className="opacity-70 text-[10px] uppercase">Kursus</span>
                </div>
                {/* [NEW] Kolom Blog */}
                <div>
                    <span className="font-bold mr-1">{(stats.blogs).toLocaleString('id-ID')}</span> 
                    <span className="opacity-70 text-[10px] uppercase">Blog</span>
                </div>
                {/* [NEW] Kolom Forum */}
                <div>
                    <span className="font-bold mr-1">{(stats.forums).toLocaleString('id-ID')}</span> 
                    <span className="opacity-70 text-[10px] uppercase">Diskusi</span>
                </div>
                <div>
                    <span className="font-bold mr-1">{stats.startYear}</span> 
                    <span className="opacity-70 text-[10px] uppercase">Mulai</span>
                </div>
            </div>
        </div>
      </div>

      {/* 2. BAGIAN UTAMA FOOTER */}
      <div className="bg-[#1e293b] text-white border-t border-gray-800 text-xs">
        <div className="max-w-7xl mx-auto px-6 py-5">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* KOLOM 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg w-fit shadow-sm">
                  {data.logoUrl ? (
                      <img src={getImageUrl(data.logoUrl)} alt="Logo" className="h-7 w-auto object-contain" />
                  ) : (
                      <div className="flex items-center gap-2">
                        <img src="/pmi-logo.png" alt="PMI" className="h-6 w-auto object-contain" />
                        <div className="h-5 w-px bg-gray-300"></div>
                        <img src="/humanis.png" alt="Humanis" className="h-5 w-auto object-contain" />
                      </div>
                  )}
              </div>
              <p className="leading-snug text-gray-400 text-[11px] max-w-xs">{data.about}</p>
              <div className="flex gap-2 pt-1">
                {['facebook', 'instagram', 'twitter', 'youtube'].map((soc) => {
                    const link = data.socials?.[soc];
                    if (!link) return null; 
                    return (
                        <a key={soc} href={link} target="_blank" rel="noreferrer" aria-label={soc} className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center hover:bg-red-700 transition border border-gray-700 hover:border-red-600">
                            {soc === 'facebook' && <Facebook size={12} />}
                            {soc === 'instagram' && <Instagram size={12} />}
                            {soc === 'twitter' && <Twitter size={12} />}
                            {soc === 'youtube' && <Youtube size={12} />}
                        </a>
                    );
                })}
              </div>
            </div>

            {/* KOLOM 2 */}
            <div>
              <h3 className="font-bold text-white mb-2 uppercase text-[10px] tracking-wider border-b border-gray-700 pb-1 w-fit">Akses Cepat</h3>
              <ul className="space-y-1.5 text-gray-400">
                <li><Link href="/courses" className="hover:text-red-400 transition flex items-center gap-1.5"><span>›</span> Katalog Kelas</Link></li>
                <li><Link href="/forum" className="hover:text-red-400 transition flex items-center gap-1.5"><span>›</span> Forum Diskusi</Link></li>
                <li><Link href="/library" className="hover:text-red-400 transition flex items-center gap-1.5"><span>›</span> Perpustakaan</Link></li>
                <li><Link href="/login" className="hover:text-red-400 transition flex items-center gap-1.5"><span>›</span> Login User</Link></li>
              </ul>
            </div>

            {/* KOLOM 3 */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-bold text-white mb-2 uppercase text-[10px] tracking-wider border-b border-gray-700 pb-1 w-fit">Hubungi Kami</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-400">
                  <div className="flex items-start gap-2 bg-gray-800/40 p-2 rounded border border-gray-700/50">
                      <MapPin size={14} className="text-red-500 flex-shrink-0 mt-[2px]" />
                      <span className="leading-snug">{data.address}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800/40 p-2 rounded border border-gray-700/50">
                      <Phone size={14} className="text-red-500 flex-shrink-0" />
                      <span className="truncate">{data.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800/40 p-2 rounded border border-gray-700/50">
                      <Mail size={14} className="text-red-500 flex-shrink-0" />
                      <span className="truncate">{data.email}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800/40 p-2 rounded border border-gray-700/50">
                      <Globe size={14} className="text-red-500 flex-shrink-0" />
                      <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} target="_blank" rel="noreferrer" className="hover:text-white truncate block">{data.website}</a>
                  </div>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-700 mt-4 pt-3 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500">
            <p>{data.copyright || `© ${new Date().getFullYear()} Palang Merah Indonesia`}</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import { useParams, useRouter } from 'next/navigation';
// // // // // import { api, getImageUrl } from '@/lib/api';
// // // // // import { useAuth } from '@/lib/AuthProvider';
// // // // // import { 
// // // // //     Clock, BookOpen, User, CheckCircle, Award, 
// // // // //     MessageSquare, PlayCircle, Lock, Calendar, ArrowLeft, 
// // // // //     FileText, Share2, Loader2, AlertTriangle 
// // // // // } from 'lucide-react';
// // // // // import Link from 'next/link';
// // // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// // // // // export default function CourseDetailPage() {
// // // // //     const params = useParams();
// // // // //     const router = useRouter();
// // // // //     const { user } = useAuth();
// // // // //     const rawId = params?.id || params?.courseId;
// // // // //     const courseId = Array.isArray(rawId) ? rawId[0] : (rawId as string);

// // // // //     const [course, setCourse] = useState<any>(null);
// // // // //     const [loading, setLoading] = useState(true);
// // // // //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // // //     const [isEnrolled, setIsEnrolled] = useState(false);
// // // // //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>('');

// // // // //     // State untuk status pendaftaran (Buka/Tutup)
// // // // //     const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

// // // // //     useEffect(() => {
// // // // //         if (!courseId) return;

// // // // //         const fetchData = async () => {
// // // // //             try {
// // // // //                 setLoading(true);
// // // // //                 const res = await api(`/api/courses/${courseId}`);
// // // // //                 const courseData = res.course || res;
// // // // //                 setCourse(courseData);

// // // // //                 // LOGIKA CEK TANGGAL PENDAFTARAN
// // // // //                 if (courseData.registrationPeriod) {
// // // // //                     const { isForever, startDate, endDate } = courseData.registrationPeriod;
// // // // //                     if (!isForever) {
// // // // //                         const now = new Date();
// // // // //                         const start = startDate ? new Date(startDate) : null;
// // // // //                         const end = endDate ? new Date(endDate) : null;
                        
// // // // //                         // Set jam end date ke 23:59:59 agar inclusive
// // // // //                         if (end) end.setHours(23, 59, 59, 999);

// // // // //                         let isOpen = true;
// // // // //                         if (start && now < start) isOpen = false;
// // // // //                         if (end && now > end) isOpen = false;
// // // // //                         setIsRegistrationOpen(isOpen);
// // // // //                     } else {
// // // // //                         setIsRegistrationOpen(true);
// // // // //                     }
// // // // //                 }

// // // // //                 if (user) {
// // // // //                     try {
// // // // //                         const statusRes = await api(`/api/enrollments/check/${courseId}?t=${Date.now()}`);
// // // // //                         setIsEnrolled(statusRes.isEnrolled);
// // // // //                         setEnrollmentStatus(statusRes.status); 
// // // // //                     } catch (e) { setIsEnrolled(false); }
// // // // //                 }
// // // // //             } catch (err: any) {
// // // // //                 console.error("Error loading course:", err);
// // // // //             } finally {
// // // // //                 setLoading(false);
// // // // //             }
// // // // //         };

// // // // //         fetchData();
// // // // //     }, [courseId, user]);

// // // // //     const handleRegisterClick = () => {
// // // // //         if (!isRegistrationOpen) return; // Prevent click
// // // // //         if (!user) {
// // // // //             router.push(`/login?redirect=/courses/${courseId}`);
// // // // //             return;
// // // // //         }
// // // // //         setShowRegisterModal(true); 
// // // // //     };

// // // // //     const getTotalJP = () => {
// // // // //         if (!course?.modules) return 0;
// // // // //         let total = 0;
// // // // //         course.modules.forEach((m: any) => {
// // // // //             if (m.isActive) m.lessons?.forEach((l: any) => { if (l.isActive) total += (l.jp || 0); });
// // // // //         });
// // // // //         return total;
// // // // //     };

// // // // //     const getTotalLessons = () => {
// // // // //         if (!course?.modules) return 0;
// // // // //         return course.modules.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0);
// // // // //     };

// // // // //     if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 size={40} className="animate-spin text-red-600" /></div>;
// // // // //     if (!course) return <div className="text-center py-20">Kursus tidak ditemukan.</div>;

// // // // //     return (
// // // // //         <div className="min-h-screen bg-gray-50 pb-20 font-sans relative">
            
// // // // //             {showRegisterModal && user && (
// // // // //                 <CourseRegistrationModal 
// // // // //                     courseId={courseId} 
// // // // //                     courseTitle={course.title} 
// // // // //                     courseData={course} 
// // // // //                     user={user} 
// // // // //                     onClose={() => setShowRegisterModal(false)} 
// // // // //                     onSuccess={() => { 
// // // // //                         setShowRegisterModal(false); 
// // // // //                         alert("Pendaftaran Berhasil Dikirim! Menunggu Verifikasi."); 
// // // // //                         window.location.reload(); 
// // // // //                     }} 
// // // // //                 />
// // // // //             )}
            
// // // // //             {/* --- 1. HERO HEADER (HEIGHT REDUCED 70%) --- */}
// // // // //             <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white overflow-hidden">
// // // // //                 <div className="absolute inset-0 mix-blend-overlay opacity-20">
// // // // //                     {/* [FIX AXE] Menambahkan alt="" karena ini gambar dekoratif background */}
// // // // //                     <img 
// // // // //                         src={getImageUrl(course.thumbnailUrl)} 
// // // // //                         className="w-full h-full object-cover filter blur-sm scale-105" 
// // // // //                         alt="" 
// // // // //                     />
// // // // //                 </div>
// // // // //                 <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent"></div>

// // // // //                 {/* Padding dikurangi (py-10 lg:py-12) dari sebelumnya py-16 lg:py-24 */}
// // // // //                 <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-12">
// // // // //                     <div className="max-w-4xl">
// // // // //                         <Link href="/courses" className="inline-flex items-center gap-2 text-red-100/80 hover:text-white mb-6 transition-colors text-xs font-bold tracking-wide group">
// // // // //                             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> KEMBALI KE KATALOG
// // // // //                         </Link>
                        
// // // // //                         <div className="flex items-center gap-3 mb-4">
// // // // //                             <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm ${course.programType === 'training' ? 'bg-white text-red-700' : 'bg-red-800 text-red-100 border border-red-400'}`}>
// // // // //                                 {course.programType === 'training' ? 'DIKLAT RESMI' : 'KURSUS MANDIRI'}
// // // // //                             </span>
// // // // //                              <span className="flex items-center gap-1 text-[10px] font-bold bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-400/30">
// // // // //                                 <Award size={14} className="text-yellow-400"/> Sertifikat Tersedia
// // // // //                             </span>
// // // // //                         </div>

// // // // //                         <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight drop-shadow-sm">{course.title}</h1>
                        
// // // // //                         <p className="text-red-100 text-sm md:text-base mb-8 leading-relaxed max-w-3xl opacity-90 font-medium">
// // // // //                             {course.description ? course.description.replace(/<[^>]+>/g, '').substring(0, 180) + '...' : 'Pelajari materi ini untuk meningkatkan kompetensi dan keahlian Anda.'}
// // // // //                         </p>

// // // // //                         <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-white p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 inline-flex shadow-lg">
// // // // //                             <div className="flex items-center gap-2 pr-4 border-r border-white/20">
// // // // //                                 <Clock size={16}/> <span>Durasi: {course.duration || 60} Menit</span>
// // // // //                             </div>
// // // // //                             <div className="flex items-center gap-2 pr-4 border-r border-white/20">
// // // // //                                 <BookOpen size={16}/> <span>{getTotalJP()} Jam Pelajaran (JPE)</span>
// // // // //                             </div>
// // // // //                              <div className="flex items-center gap-2">
// // // // //                                 <User size={16}/> <span>{course.facilitatorIds?.length || 0} Pengajar</span>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>
// // // // //             </div>

// // // // //             {/* --- 2. CONTENT GRID --- */}
// // // // //             <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
// // // // //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
// // // // //                     {/* LEFT: DETAIL */}
// // // // //                     <div className="lg:col-span-2 space-y-8">
// // // // //                         {/* Deskripsi */}
// // // // //                         <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
// // // // //                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
// // // // //                                 <FileText className="text-red-600" size={20}/> Tentang Program
// // // // //                             </h3>
// // // // //                             <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: course.description }} />
// // // // //                         </section>

// // // // //                         {/* Kurikulum */}
// // // // //                         <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
// // // // //                             <div className="flex items-center justify-between mb-6 pb-2 border-b">
// // // // //                                 <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
// // // // //                                     <BookOpen className="text-red-600" size={20}/> Kurikulum
// // // // //                                 </h3>
// // // // //                                 <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border">
// // // // //                                     {course.modules?.length || 0} Modul
// // // // //                                 </span>
// // // // //                             </div>
                            
// // // // //                             <div className="space-y-4">
// // // // //                                 {course.modules?.map((mod: any, idx: number) => (
// // // // //                                     <div key={mod._id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm group">
// // // // //                                         <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
// // // // //                                             <h4 className="font-bold text-gray-800 text-sm">Modul {idx + 1}: {mod.title}</h4>
// // // // //                                         </div>
// // // // //                                         <div className="divide-y divide-gray-100 bg-white">
// // // // //                                             {mod.lessons?.map((les: any) => (
// // // // //                                                 <div key={les._id} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
// // // // //                                                     <div className="bg-gray-100 p-1.5 rounded-full shrink-0"><Lock size={14} className="text-gray-400"/></div>
// // // // //                                                     <div className="flex-1"><p className="text-sm font-medium text-gray-600">{les.title}</p></div>
                                                    
// // // // //                                                     {/* Ubah Menit jadi JP */}
// // // // //                                                     <span className="text-[10px] text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded">
// // // // //                                                         {les.jp ? `${les.jp} JP` : '0 JP'}
// // // // //                                                     </span>
// // // // //                                                 </div>
// // // // //                                             ))}
// // // // //                                         </div>
// // // // //                                     </div>
// // // // //                                 ))}
// // // // //                             </div>
// // // // //                         </section>

// // // // //                         {/* Fasilitator */}
// // // // //                         <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
// // // // //                             <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2">
// // // // //                                 <User className="text-red-600" size={20}/> Tim Fasilitator
// // // // //                             </h3>
// // // // //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                                 {course.facilitatorIds?.map((fac: any) => (
// // // // //                                     <div key={fac._id} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-red-200 transition-all">
// // // // //                                         {fac.avatarUrl ? (
// // // // //                                             <img src={getImageUrl(fac.avatarUrl)} className="w-12 h-12 rounded-full object-cover border-2 border-red-50" alt={fac.name}/>
// // // // //                                         ) : (
// // // // //                                             <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl border-2 border-white shadow-sm">
// // // // //                                                 {fac.name?.charAt(0)}
// // // // //                                             </div>
// // // // //                                         )}
// // // // //                                         <div>
// // // // //                                             <h5 className="font-bold text-gray-900 text-sm">{fac.name}</h5>
// // // // //                                             <p className="text-xs text-red-600 font-medium">Fasilitator PMI</p>
// // // // //                                         </div>
// // // // //                                     </div>
// // // // //                                 ))}
// // // // //                             </div>
// // // // //                         </section>
// // // // //                     </div>

// // // // //                     {/* RIGHT: SIDEBAR */}
// // // // //                     <div className="lg:col-span-1">
// // // // //                         <div className="bg-white rounded-2xl shadow-xl shadow-red-900/5 border border-gray-200 p-6 sticky top-24">
// // // // //                             <div className="aspect-video rounded-xl bg-gray-900 overflow-hidden mb-6 relative shadow-lg">
// // // // //                                 {/* [FIX AXE] Ditambahkan alt yang deskriptif */}
// // // // //                                 <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover opacity-80" alt={`Preview Pelatihan ${course.title}`}/>
// // // // //                                 <div className="absolute inset-0 flex items-center justify-center">
// // // // //                                     <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/50">
// // // // //                                         <PlayCircle size={28} className="text-white fill-current"/>
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                             </div>

// // // // //                             <div className="mb-6 text-center bg-gray-50 p-4 rounded-xl border border-gray-200">
// // // // //                                 <p className="text-gray-500 text-[10px] font-extrabold uppercase tracking-widest mb-1">Investasi Program</p>
// // // // //                                 <h2 className="text-3xl font-black text-gray-900">
// // // // //                                     {course.price === 0 ? 'GRATIS' : `Rp ${course.price.toLocaleString('id-ID')}`}
// // // // //                                 </h2>
// // // // //                             </div>

// // // // //                             {/* LOGIKA TOMBOL DAFTAR (FIX BATAS WAKTU) */}
// // // // //                             <div className="mb-6 space-y-3">
// // // // //                                 {isEnrolled ? (
// // // // //                                     enrollmentStatus === 'active' ? (
// // // // //                                         <Link href={`/courses/${courseId}/play`} className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
// // // // //                                             <PlayCircle size={20}/> Lanjutkan Belajar
// // // // //                                         </Link>
// // // // //                                     ) : (
// // // // //                                         <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl border-2 border-yellow-200 text-center">
// // // // //                                             <Clock size={24} className="mx-auto mb-2 text-yellow-600"/>
// // // // //                                             <h3 className="font-bold text-sm">Menunggu Verifikasi</h3>
// // // // //                                             <p className="text-xs opacity-90">Pendaftaran sedang diperiksa.</p>
// // // // //                                         </div>
// // // // //                                     )
// // // // //                                 ) : (
// // // // //                                     isRegistrationOpen ? (
// // // // //                                         <button onClick={handleRegisterClick} className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-red-200">
// // // // //                                             <FileText size={20}/> Daftar Sekarang
// // // // //                                         </button>
// // // // //                                     ) : (
// // // // //                                         <button disabled className="w-full bg-gray-300 text-gray-500 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200">
// // // // //                                             <AlertTriangle size={20}/> Pendaftaran Ditutup
// // // // //                                         </button>
// // // // //                                     )
// // // // //                                 )}
                                
// // // // //                                 {!isRegistrationOpen && !isEnrolled && (
// // // // //                                     <p className="text-xs text-center text-red-500 font-medium bg-red-50 p-2 rounded">
// // // // //                                         Batas waktu pendaftaran telah berakhir.
// // // // //                                     </p>
// // // // //                                 )}
// // // // //                             </div>

// // // // //                             <div className="space-y-4 pt-6 border-t-2 border-gray-100">
// // // // //                                 <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider mb-2">Fasilitas:</h4>
// // // // //                                 <ul className="space-y-3 text-xs text-gray-700 font-medium">
// // // // //                                     <li className="flex gap-2"><CheckCircle className="text-red-500 shrink-0" size={16}/> Total {getTotalJP()} Jam Pelajaran (JPE)</li>
// // // // //                                     <li className="flex gap-2"><CheckCircle className="text-red-500 shrink-0" size={16}/> Sertifikat Resmi PMI</li>
// // // // //                                     <li className="flex gap-2"><CheckCircle className="text-red-500 shrink-0" size={16}/> Konsultasi Fasilitator</li>
// // // // //                                 </ul>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>

// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import { useParams, useRouter } from 'next/navigation';
// // // // import { api, getImageUrl } from '@/lib/api';
// // // // import { useAuth } from '@/lib/AuthProvider';
// // // // import { 
// // // //     Clock, BookOpen, User, Award, 
// // // //     PlayCircle, ArrowLeft, FileText, Loader2, AlertTriangle, 
// // // //     Lock // [FIX TS: Pastikan Lock diimport disini]
// // // // } from 'lucide-react';
// // // // import Link from 'next/link';
// // // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// // // // export default function CourseDetailPage() {
// // // //     const params = useParams();
// // // //     const router = useRouter();
// // // //     const { user } = useAuth();
// // // //     const rawId = params?.id || params?.courseId;
// // // //     const courseId = Array.isArray(rawId) ? rawId[0] : (rawId as string);

// // // //     const [course, setCourse] = useState<any>(null);
// // // //     const [loading, setLoading] = useState(true);
// // // //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// // // //     const [isEnrolled, setIsEnrolled] = useState(false);
// // // //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>('');
// // // //     const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

// // // //     useEffect(() => {
// // // //         if (!courseId) return;
// // // //         const fetchData = async () => {
// // // //             try {
// // // //                 setLoading(true);
// // // //                 const res = await api(`/api/courses/${courseId}`);
// // // //                 const courseData = res.course || res;
// // // //                 setCourse(courseData);

// // // //                 if (courseData.registrationPeriod) {
// // // //                     const { isForever, startDate, endDate } = courseData.registrationPeriod;
// // // //                     if (!isForever) {
// // // //                         const now = new Date();
// // // //                         const end = endDate ? new Date(endDate) : null;
// // // //                         if (end) end.setHours(23, 59, 59, 999);
// // // //                         if ((startDate && now < new Date(startDate)) || (end && now > end)) {
// // // //                             setIsRegistrationOpen(false);
// // // //                         }
// // // //                     }
// // // //                 }

// // // //                 if (user) {
// // // //                     const statusRes = await api(`/api/enrollments/check/${courseId}?t=${Date.now()}`);
// // // //                     setIsEnrolled(statusRes.isEnrolled);
// // // //                     setEnrollmentStatus(statusRes.status); 
// // // //                 }
// // // //             } catch (err: any) { console.error(err); } finally { setLoading(false); }
// // // //         };
// // // //         fetchData();
// // // //     }, [courseId, user]);

// // // //     const handleRegisterClick = () => {
// // // //         if (!isRegistrationOpen) return;
// // // //         if (!user) { router.push(`/login?redirect=/courses/${courseId}`); return; }
// // // //         setShowRegisterModal(true); 
// // // //     };

// // // //     const getTotalJP = () => {
// // // //         if (!course?.modules) return 0;
// // // //         return course.modules.reduce((acc: number, m: any) => {
// // // //             return acc + (m.isActive ? m.lessons?.reduce((lAcc: number, l: any) => lAcc + (l.isActive ? (l.jp || 0) : 0), 0) : 0);
// // // //         }, 0);
// // // //     };

// // // //     if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 size={40} className="animate-spin text-red-600" /></div>;
// // // //     if (!course) return <div className="text-center py-20">Kursus tidak ditemukan.</div>;

// // // //     return (
// // // //         <div className="min-h-screen bg-gray-50 pb-20 font-sans relative">
// // // //             {showRegisterModal && user && (
// // // //                 <CourseRegistrationModal courseId={courseId} courseTitle={course.title} courseData={course} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => window.location.reload()} />
// // // //             )}
            
// // // //             {/* HERO HEADER */}
// // // //             <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white overflow-hidden">
// // // //                 <div className="absolute inset-0 mix-blend-overlay opacity-20"><img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover filter blur-sm scale-105" alt="" /></div>
// // // //                 <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent"></div>
// // // //                 <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-12">
// // // //                     <div className="max-w-4xl">
// // // //                         <Link href="/courses" className="inline-flex items-center gap-2 text-red-100/80 hover:text-white mb-6 transition-colors text-xs font-bold tracking-wide group"><ArrowLeft size={16}/> KEMBALI KE KATALOG</Link>
// // // //                         <div className="flex items-center gap-3 mb-4">
// // // //                             <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm ${course.programType === 'training' ? 'bg-white text-red-700' : 'bg-red-800 text-red-100 border border-red-400'}`}>{course.programType === 'training' ? 'DIKLAT RESMI' : 'KURSUS MANDIRI'}</span>
// // // //                              <span className="flex items-center gap-1 text-[10px] font-bold bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-400/30"><Award size={14}/> Sertifikat Tersedia</span>
// // // //                         </div>
// // // //                         <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight drop-shadow-sm uppercase tracking-tight">{course.title}</h1>
// // // //                         <p className="text-red-100 text-sm md:text-base mb-8 leading-relaxed max-w-3xl opacity-90 font-medium">{course.description ? course.description.replace(/<[^>]+>/g, '').substring(0, 180) + '...' : 'Pelajari materi ini untuk kompetensi Anda.'}</p>
// // // //                         <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-white p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 inline-flex shadow-lg uppercase">
// // // //                             <div className="flex items-center gap-2 pr-4 border-r border-white/20"><Clock size={16}/> Durasi: {course.duration || 60}m</div>
// // // //                             <div className="flex items-center gap-2 pr-4 border-r border-white/20"><BookOpen size={16}/> {getTotalJP()} JP</div>
// // // //                              <div className="flex items-center gap-2"><User size={16}/> {course.facilitatorIds?.length || 0} Pengajar</div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>

// // // //             {/* CONTENT GRID */}
// // // //             <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
// // // //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
// // // //                     <div className="lg:col-span-2 space-y-8">
// // // //                         <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
// // // //                             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2 uppercase tracking-tight"><FileText className="text-red-600" size={20}/> Tentang Program</h3>
// // // //                             <div className="prose prose-sm max-w-none text-gray-600 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: course.description }} />
// // // //                         </section>
// // // //                         <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
// // // //                             <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-2 uppercase tracking-tight"><BookOpen className="text-red-600" size={20}/> Kurikulum</h3>
// // // //                             <div className="space-y-4">
// // // //                                 {course.modules?.map((mod: any, idx: number) => (
// // // //                                     <div key={mod._id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm"><div className="bg-gray-50 px-5 py-3 border-b font-bold text-gray-800 text-sm uppercase tracking-wider">Modul {idx + 1}: {mod.title}</div><div className="divide-y bg-white">
// // // //                                     {mod.lessons?.map((les: any) => (<div key={les._id} className="px-5 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors"><div className="bg-gray-100 p-1.5 rounded-full"><Lock size={14} className="text-gray-400"/></div><p className="text-sm font-medium text-gray-600 flex-1">{les.title}</p><span className="text-[10px] text-red-600 font-black bg-red-50 px-2 py-0.5 rounded uppercase">{les.jp || 0} JP</span></div>))}</div></div>
// // // //                                 ))}
// // // //                             </div>
// // // //                         </section>
// // // //                     </div>
// // // //                     <div className="lg:col-span-1">
// // // //                         <div className="bg-white rounded-[40px] shadow-2xl shadow-red-900/5 border-2 border-red-50 p-8 sticky top-24 text-center">
// // // //                             <div className="mb-6 text-center bg-gray-50 p-6 rounded-3xl border border-gray-100">
// // // //                                 <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Investasi Program</p>
// // // //                                 <h2 className="text-4xl font-black text-red-600">{course.price === 0 ? 'GRATIS' : `Rp ${course.price.toLocaleString('id-ID')}`}</h2>
// // // //                             </div>
// // // //                             {isEnrolled ? (
// // // //                                 enrollmentStatus === 'active' ? (
// // // //                                     <Link href={`/courses/${courseId}/play`} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-200 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-red-700 hover:scale-[1.02]"><PlayCircle size={20}/> Lanjutkan Belajar</Link>
// // // //                                 ) : ( <div className="bg-yellow-50 text-yellow-700 p-5 rounded-3xl border-2 border-yellow-200 font-black text-xs uppercase tracking-widest">MENUNGGU VERIFIKASI</div> )
// // // //                             ) : (
// // // //                                 isRegistrationOpen ? ( <button onClick={handleRegisterClick} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"><FileText size={20}/> Daftar Sekarang</button>
// // // //                                 ) : ( <div className="bg-gray-100 text-gray-400 py-4 rounded-3xl font-black text-xs border-2 uppercase tracking-widest">PENDAFTARAN DITUTUP</div> )
// // // //                             )}
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }
// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import { useParams, useRouter } from 'next/navigation';
// // // import { api, getImageUrl } from '@/lib/api';
// // // import { useAuth } from '@/lib/AuthProvider';
// // // import Protected from '@/components/Protected';
// // // import { 
// // //     Clock, BookOpen, User, CheckCircle, Award, 
// // //     MessageSquare, PlayCircle, Lock, ArrowLeft, 
// // //     FileText, Loader2, Send, HelpCircle, Download,
// // //     ChevronRight, X, HeadphonesIcon, Monitor, ExternalLink, Menu,
// // //     Image as ImageIcon, BarChart2, Paperclip, AlertTriangle, 
// // //     Users, Mail, MessageCircle, Calendar, Mic, FileCheck, 
// // //     ChevronDown, ChevronUp, Video 
// // // } from 'lucide-react';
// // // import Link from 'next/link';
// // // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// // // export default function CourseDetailPage() {
// // //     const params = useParams();
// // //     const router = useRouter();
// // //     const { user } = useAuth();
// // //     const rawId = params?.id || params?.courseId;
// // //     const courseId = Array.isArray(rawId) ? rawId[0] : (rawId as string);

// // //     // --- STATE UTAMA ---
// // //     const [course, setCourse] = useState<any>(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [isEnrolled, setIsEnrolled] = useState(false);
// // //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>('');
// // //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// // //     const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

// // //     // --- STATE PLAYER ---
// // //     const [activeLesson, setActiveLesson] = useState<any>(null);
// // //     const [progressData, setProgressData] = useState<any>(null);
// // //     const [messages, setMessages] = useState<any[]>([]);
// // //     const [chatMessage, setChatMessage] = useState('');
// // //     const [showChat, setShowChat] = useState(false);
// // //     const [showMobileMenu, setShowMobileMenu] = useState(false);
    
// // //     // State UI Landing Page
// // //     const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
// // //     const [participants, setParticipants] = useState<any[]>([]);

// // //     // --- REFS ---
// // //     const progressBarRef = useRef<HTMLDivElement>(null);
// // //     const messagesEndRef = useRef<HTMLDivElement>(null);

// // //     // 1. INITIAL LOAD
// // //     useEffect(() => {
// // //         if (!courseId) return;
// // //         loadFullData();
// // //     }, [courseId, user]);

// // //     // 2. FIX ARIA
// // //     useEffect(() => {
// // //         if (progressBarRef.current) {
// // //             const percent = Math.round(progressData?.percent || 0);
// // //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// // //             progressBarRef.current.style.width = `${percent}%`;
// // //         }
// // //     }, [progressData]);

// // //     // 3. AUTO SCROLL CHAT
// // //     useEffect(() => {
// // //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //     }, [messages, showChat]);

// // //     const loadFullData = async () => {
// // //         try {
// // //             setLoading(true);
// // //             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// // //             const cData = res.course || res;
// // //             setCourse(cData);

// // //             // Dummy Peserta
// // //             setParticipants([
// // //                 { id: 1, name: 'Budi Santoso', status: 'Lulus' },
// // //                 { id: 2, name: 'Siti Aminah', status: 'Berjalan' },
// // //                 { id: 3, name: 'Joko Anwar', status: 'Berjalan' },
// // //             ]);

// // //             if (cData.registrationPeriod && !cData.registrationPeriod.isForever) {
// // //                 const now = new Date();
// // //                 const end = cData.registrationPeriod.endDate ? new Date(cData.registrationPeriod.endDate) : null;
// // //                 if (end) {
// // //                     end.setHours(23, 59, 59, 999);
// // //                     if (now > end) setIsRegistrationOpen(false);
// // //                 }
// // //             }

// // //             if (user) {
// // //                 const statusRes = await api(`/api/enrollments/check/${courseId}?t=${Date.now()}`);
// // //                 setIsEnrolled(statusRes.isEnrolled);
// // //                 setEnrollmentStatus(statusRes.status); 

// // //                 if (statusRes.isEnrolled && statusRes.status === 'active') {
// // //                     const [prog, msg] = await Promise.all([
// // //                         api(`/api/progress/${courseId}`),
// // //                         api(`/api/courses/${courseId}/messages`)
// // //                     ]);
// // //                     setProgressData(prog);
// // //                     setMessages(msg || []);

// // //                     const firstMod = cData.modules?.find((m: any) => m.isActive);
// // //                     const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// // //                     if (firstLes) setActiveLesson(firstLes);
// // //                 }
// // //             }
// // //         } catch (e) { console.error(e); } finally { setLoading(false); }
// // //     };

// // //     const handleRegisterClick = () => {
// // //         if (!isRegistrationOpen) return;
// // //         if (!user) { router.push(`/login?redirect=/courses/${courseId}`); return; }
// // //         setShowRegisterModal(true); 
// // //     };

// // //     const handleMarkComplete = async (lessonId: string) => {
// // //         try {
// // //             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// // //             const updated = await api(`/api/progress/${courseId}`);
// // //             setProgressData(updated);
// // //         } catch (e) { alert("Gagal update progres"); }
// // //     };

// // //     const handleSendChat = async (e: React.FormEvent) => {
// // //         e.preventDefault();
// // //         if (!chatMessage.trim()) return;
// // //         try {
// // //             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
// // //             setMessages([...messages, res]);
// // //             setChatMessage('');
// // //         } catch (e) { alert("Gagal kirim pesan"); }
// // //     };

// // //     const handleChatFasilitator = (fasilitatorId: string) => {
// // //         if (!user) { alert("Silakan login untuk chat"); return; }
// // //         alert("Fitur chat privat dengan fasilitator akan segera hadir.");
// // //     };

// // //     const toggleLesson = (id: string) => setExpandedLesson(expandedLesson === id ? null : id);

// // //     const getTotalJP = () => {
// // //         if (!course?.modules) return 0;
// // //         return course.modules.reduce((acc: number, m: any) => {
// // //             return acc + (m.isActive ? m.lessons?.reduce((lAcc: number, l: any) => lAcc + (l.isActive ? (l.jp || 0) : 0), 0) : 0);
// // //         }, 0);
// // //     };

// // //     const getFirstScheduleDate = () => {
// // //         if (!course?.modules) return null;
// // //         for (const mod of course.modules) {
// // //             if (mod.isActive && mod.lessons) {
// // //                 for (const les of mod.lessons) {
// // //                     if (les.isActive && les.schedule) return new Date(les.schedule);
// // //                 }
// // //             }
// // //         }
// // //         return null;
// // //     };

// // //     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

// // //     const getLessonIcon = (type: string) => {
// // //         switch(type) {
// // //             case 'video_url': return <Video size={16}/>;
// // //             case 'poll': return <HelpCircle size={16}/>;
// // //             case 'quiz': return <FileCheck size={16}/>;
// // //             case 'virtual_class': return <Monitor size={16}/>;
// // //             default: return <FileText size={16}/>;
// // //         }
// // //     };

// // //     const renderContent = () => {
// // //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
// // //         switch (activeLesson.type) {
// // //             case 'video_url': return <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// // //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide"/></div>;
// // //             case 'pdf': return <div className="aspect-[3/4] md:aspect-video bg-gray-50 rounded-3xl overflow-hidden border shadow-lg"><iframe src={`${getImageUrl(activeLesson.fileUrl)}#toolbar=0`} className="w-full h-full" title="PDF"/></div>;
// // //             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold mb-4">{activeLesson.pollQuestion}</h2>{activeLesson.pollOptions?.map((o:string, i:number)=><div key={i} className="p-3 mb-2 bg-gray-50 border rounded-xl">{o}</div>)}</div>;
// // //             case 'essay': case 'quiz': return (<div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm"><div className="flex items-center gap-4 mb-6"><div className="p-3 bg-red-100 text-red-600 rounded-full"><FileText size={32}/></div><div><h2 className="text-xl font-bold text-gray-900">{activeLesson.title}</h2><p className="text-red-600 text-xs font-bold uppercase tracking-widest">Tugas</p></div></div><div className="prose prose-red max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6"><button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-gray-500 hover:border-red-400 hover:text-red-600 transition-colors"><Paperclip className="mb-1"/> <span className="text-xs font-bold uppercase">Upload Jawaban</span></button></div></div>);
// // //             default: return <div className="bg-white p-8 rounded-3xl border border-gray-100"><h2 className="text-2xl font-bold">{activeLesson.title}</h2></div>;
// // //         }
// // //     };

// // //     if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// // //     if (!course) return <div className="text-center py-20 font-bold text-gray-400">Kursus tidak ditemukan.</div>;

// // //     const programLabel = course.programType === 'training' ? 'Pelatihan' : 'Kursus';
// // //     const firstScheduleDate = getFirstScheduleDate();

// // //     // =========================================================================================
// // //     // VIEW 1: MODE PLAYER (JIKA AKTIF)
// // //     // =========================================================================================
// // //     if (isEnrolled && enrollmentStatus === 'active') {
// // //         const percent = Math.round(progressData?.percent || 0);
// // //         return (
// // //             <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// // //                 <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
// // //                     <header className="bg-gray-900 text-white p-3 md:p-4 flex items-center justify-between shrink-0 shadow-md z-40">
// // //                         <div className="flex items-center gap-4">
// // //                             <Link href="/courses" className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali"><ArrowLeft size={20}/></Link>
// // //                             <div>
// // //                                 <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course.title}</h1>
// // //                                 <div className="flex items-center gap-2 mt-0.5">
// // //                                     <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden"><div ref={progressBarRef} className="h-full bg-green-500 rounded-full" role="progressbar" aria-label="Progres Belajar"></div></div>
// // //                                     <span className="text-[10px] font-bold text-green-400">{percent}% SELESAI</span>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                         <div className="flex items-center gap-2">
// // //                              <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-bold text-xs uppercase shadow-lg border border-white/20">{course?.organizer?.charAt(0)}</div>
// // //                              <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu"><Menu size={18}/></button>
// // //                         </div>
// // //                     </header>
// // //                     <div className="flex flex-1 overflow-hidden relative">
// // //                         <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none`}>
// // //                             <div className="p-5 border-b bg-gray-50/50"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3></div>
// // //                             <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// // //                                 {course.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// // //                                     <div key={mod._id}>
// // //                                         <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
// // //                                         <div className="space-y-1">
// // //                                             {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// // //                                                 <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`}>
// // //                                                     {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
// // //                                                     <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')} • {les.jp || 0} JP</p></div>
// // //                                                 </button>
// // //                                             ))}
// // //                                         </div>
// // //                                     </div>
// // //                                 ))}
// // //                             </div>
// // //                             <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// // //                         </aside>
// // //                         <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar relative">
// // //                             <div className="max-w-4xl mx-auto pb-32">
// // //                                 <div className="mb-8 transition-all duration-500 ease-in-out">{renderContent()}</div>
// // //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && (
// // //                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm" dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} />
// // //                                 )}
// // //                             </div>
// // //                             <div className="fixed bottom-0 left-0 lg:left-80 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
// // //                                 <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// // //                                 {!isDone(activeLesson?._id) ? (
// // //                                     <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl uppercase flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
// // //                                 ) : (
// // //                                     <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase"><CheckCircle size={18}/> Materi Lulus</div>
// // //                                 )}
// // //                             </div>
// // //                         </main>
// // //                         <button onClick={() => setShowChat(!showChat)} className="absolute bottom-24 right-6 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Diskusi">
// // //                             <MessageSquare size={24}/>
// // //                             {messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}
// // //                         </button>
// // //                         {showChat && (
// // //                             <div className="absolute bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// // //                                 <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0">
// // //                                     <div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div>
// // //                                     <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup"><X size={18}/></button>
// // //                                 </div>
// // //                                 <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">
// // //                                     {messages.map((m, i) => (
// // //                                         <div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id) ? 'items-end' : 'items-start'}`}>
// // //                                             <span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span>
// // //                                             <div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm ${(m.sender?._id === (user as any)?._id) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div>
// // //                                         </div>
// // //                                     ))}
// // //                                     <div ref={messagesEndRef} />
// // //                                 </div>
// // //                                 <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0">
// // //                                     <input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
// // //                                     <button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md" title="Kirim"><Send size={16}/></button>
// // //                                 </form>
// // //                             </div>
// // //                         )}
// // //                     </div>
// // //                 </div>
// // //             </Protected>
// // //         );
// // //     }

// // //     // =========================================================================================
// // //     // VIEW 2: LANDING PAGE (FINAL REVISI UI)
// // //     // =========================================================================================
// // //     return (
// // //         <div className="min-h-screen bg-gray-50 pb-20 font-sans relative overflow-x-hidden">
// // //             {showRegisterModal && user && (
// // //                 <CourseRegistrationModal courseId={courseId} courseTitle={course.title} courseData={course} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => loadFullData()} />
// // //             )}
            
// // //             {/* HERO HEADER - Red, Photo BG, Height pb-80 untuk Overlap Besar */}
// // //             <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white overflow-hidden pb-80">
// // //                 <div className="absolute inset-0 mix-blend-multiply opacity-30">
// // //                     <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover filter blur-sm scale-105" alt="Background" />
// // //                 </div>
// // //                 <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 via-transparent to-black/10"></div>

// // //                 <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
// // //                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
// // //                         {/* KIRI: Judul & Navigasi */}
// // //                         <div>
// // //                             <Link href="/courses" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-xs font-bold tracking-widest group uppercase">
// // //                                 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Kembali ke Katalog
// // //                             </Link>
// // //                             <div className="flex flex-wrap items-center gap-3 mb-4">
// // //                                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${course.programType === 'training' ? 'bg-white text-red-700' : 'bg-red-900 text-red-100 border border-red-400'}`}>
// // //                                     {programLabel} Resmi
// // //                                 </span>
// // //                                 <span className="flex items-center gap-1.5 text-[10px] font-bold bg-yellow-400/20 text-yellow-200 px-4 py-1.5 rounded-full border border-yellow-400/30 backdrop-blur-md">
// // //                                     <Award size={14} className="text-yellow-400"/> Sertifikat Tersedia
// // //                                 </span>
// // //                             </div>
// // //                             {/* [FIX REQ 2: Judul Lebih Kecil] */}
// // //                             <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-lg tracking-tight mb-4">
// // //                                 {course.title}
// // //                             </h1>
// // //                         </div>

// // //                         {/* KANAN: Label Info (Jadwal & Stats) - POJOK KANAN ATAS */}
// // //                         <div className="flex justify-start lg:justify-end">
// // //                             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl text-white min-w-[280px]">
// // //                                 <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
// // //                                     <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-900/50">
// // //                                         <Calendar size={20}/>
// // //                                     </div>
// // //                                     <div>
// // //                                         <p className="text-[10px] font-bold uppercase opacity-70 tracking-wider mb-0.5">Pelaksanaan Awal</p>
// // //                                         <p className="font-bold text-sm">
// // //                                             {firstScheduleDate 
// // //                                                 ? new Date(firstScheduleDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) 
// // //                                                 : 'Jadwal Menyusul'}
// // //                                         </p>
// // //                                     </div>
// // //                                 </div>
// // //                                 <div className="flex items-center justify-between text-xs font-bold">
// // //                                     <div className="flex items-center gap-2"><BookOpen size={16} className="text-white/70"/> {getTotalJP()} JP</div>
// // //                                     <div className="flex items-center gap-2"><User size={16} className="text-white/70"/> {course.facilitatorIds?.length || 0} Pengajar</div>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //             {/* CONTENT GRID - OVERLAP EKSTREM (-mt-64) */}
// // //             <div className="max-w-7xl mx-auto px-6 relative z-10 -mt-64 pb-20">
// // //                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
// // //                     {/* --- KOLOM KIRI (7/12) --- */}
// // //                     <div className="lg:col-span-7 space-y-8">
                        
// // //                         {/* 1. TENTANG PELATIHAN (Sejajar dengan Cover) - Overlap Hero */}
// // //                         <section className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 h-full min-h-[350px] flex flex-col justify-center">
// // //                             <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-3 uppercase tracking-wide">
// // //                                 <FileText className="text-red-600" size={24}/> Tentang {programLabel}
// // //                             </h3>
// // //                             <div className="prose prose-red max-w-none text-gray-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: course.description }} />
// // //                         </section>

// // //                         {/* Kurikulum */}
// // //                         <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
// // //                             <div className="flex items-center justify-between mb-8 pb-4 border-b">
// // //                                 <h3 className="text-lg font-black text-gray-800 flex items-center gap-3 uppercase tracking-wide"><BookOpen className="text-red-600" size={24}/> Kurikulum</h3>
// // //                                 <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border uppercase tracking-wider">{course.modules?.length || 0} Modul</span>
// // //                             </div>
// // //                             <div className="space-y-5">
// // //                                 {course.modules?.filter((m:any) => m.isActive).map((mod: any, idx: number) => (
// // //                                     <div key={mod._id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
// // //                                         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200"><h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Modul {idx + 1}: {mod.title}</h4></div>
// // //                                         <div className="divide-y divide-gray-100 bg-white">
// // //                                             {mod.lessons?.filter((l:any) => l.isActive).map((les: any) => (
// // //                                                 <div key={les._id}>
// // //                                                     <button onClick={() => toggleLesson(les._id)} className="w-full px-6 py-4 flex items-center gap-4 hover:bg-red-50/50 transition-colors text-left group">
// // //                                                         <div className="text-red-500 bg-red-50 p-2 rounded-lg">{getLessonIcon(les.type)}</div>
// // //                                                         <div className="flex-1"><p className="text-sm font-bold text-gray-700">{les.title}</p><p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
// // //                                                         {expandedLesson === les._id ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
// // //                                                     </button>
// // //                                                     {expandedLesson === les._id && (
// // //                                                         <div className="px-6 pb-6 pt-2 bg-gray-50/50 text-xs text-gray-600 border-t border-gray-100">
// // //                                                             <div className="grid grid-cols-2 gap-4">
// // //                                                                 <div><p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider mb-1">Fasilitator</p><p className="font-bold text-gray-800 flex gap-2 items-center"><User size={12}/> {course.facilitatorIds?.[0]?.name || 'Tim Pengajar'}</p></div>
// // //                                                                 <div><p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider mb-1">Metode</p><p className="font-bold text-gray-800 flex gap-2 items-center"><Mic size={12}/> {les.type?.toUpperCase()}</p></div>
// // //                                                             </div>
// // //                                                         </div>
// // //                                                     )}
// // //                                                 </div>
// // //                                             ))}
// // //                                         </div>
// // //                                     </div>
// // //                                 ))}
// // //                             </div>
// // //                         </section>

// // //                         {/* Fasilitator */}
// // //                         <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
// // //                             <h3 className="text-lg font-black text-gray-800 mb-8 flex items-center gap-3 border-b pb-4 uppercase tracking-wide"><User className="text-red-600" size={24}/> Tim Fasilitator</h3>
// // //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                                 {course.facilitatorIds?.map((fac: any) => (
// // //                                     <button key={fac._id} onClick={() => handleChatFasilitator(fac._id)} className="flex items-center gap-5 p-5 rounded-2xl border border-gray-200 bg-white hover:border-red-200 hover:shadow-lg transition-all group text-left w-full" title="Chat Fasilitator">
// // //                                         <div className="relative">
// // //                                             <img src={getImageUrl(fac.avatarUrl)} className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 group-hover:border-red-500 transition-colors shadow-sm" alt={fac.name}/>
// // //                                             <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full border-2 border-white"><MessageCircle size={10} strokeWidth={3}/></div>
// // //                                         </div>
// // //                                         <div><h5 className="font-bold text-gray-900 text-sm uppercase tracking-tight group-hover:text-red-600">{fac.name}</h5><p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Fasilitator PMI</p></div>
// // //                                     </button>
// // //                                 ))}
// // //                             </div>
// // //                         </section>
// // //                     </div>

// // //                     {/* --- KOLOM KANAN (5/12) --- */}
// // //                     <div className="lg:col-span-5 space-y-6">
                        
// // //                         {/* 1. COVER / VIDEO (CMS LOGIC) - Overlap Hero */}
// // //                         <div className="aspect-video rounded-[32px] bg-gray-900 overflow-hidden shadow-2xl shadow-red-900/20 relative z-30 group cursor-pointer border-4 border-white">
// // //                             {course.promoVideoUrl ? (
// // //                                 <iframe src={course.promoVideoUrl.replace('watch?v=', 'embed/')} className="w-full h-full pointer-events-none" title="Preview" tabIndex={-1}/>
// // //                             ) : (
// // //                                 <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover opacity-90" alt="Preview"/>
// // //                             )}
// // //                             {course.promoVideoUrl && <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors"><div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center shadow-xl border-2 border-white/50 backdrop-blur-sm"><PlayCircle size={36} className="text-white fill-current ml-1"/></div></div>}
// // //                         </div>

// // //                         {/* 2. Pendaftaran */}
// // //                         <div className="bg-white rounded-[32px] shadow-xl border border-gray-200 p-8">
// // //                             <div className="mb-8 text-center bg-gray-50 p-6 rounded-3xl border border-gray-100">
// // //                                 <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Investasi Program</p>
// // //                                 <h2 className="text-4xl font-black text-gray-900">{course.price === 0 ? <span className="text-green-600">GRATIS</span> : `Rp ${course.price.toLocaleString('id-ID')}`}</h2>
// // //                             </div>
// // //                             <div className="mb-8 space-y-3">
// // //                                 {isEnrolled ? (
// // //                                     enrollmentStatus === 'active' ? (
// // //                                         <Link href={`/courses/${courseId}/play`} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"><PlayCircle size={20}/> Masuk Kelas</Link>
// // //                                     ) : ( <div className="bg-yellow-50 text-yellow-700 p-4 rounded-2xl border-2 border-yellow-200 text-center font-bold text-xs uppercase">Menunggu Verifikasi</div> )
// // //                                 ) : (
// // //                                     isRegistrationOpen ? ( <button onClick={handleRegisterClick} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-red-700 transition-all uppercase tracking-widest text-xs"><FileText size={20} className="inline mr-2"/> Daftar Sekarang</button>
// // //                                     ) : ( <button disabled className="w-full bg-gray-100 text-gray-400 font-bold py-4 rounded-2xl cursor-not-allowed border-2 border-gray-200 uppercase tracking-widest text-xs">Pendaftaran Ditutup</button> )
// // //                                 )}
// // //                             </div>
// // //                             <div className="space-y-5 pt-6 border-t-2 border-dashed border-gray-100">
// // //                                 <h4 className="font-black text-gray-900 text-xs uppercase tracking-[0.2em] mb-2">Fasilitas Pelatihan:</h4>
// // //                                 <ul className="space-y-3 text-xs text-gray-600 font-bold uppercase tracking-tight">
// // //                                     {course.facilities?.length > 0 ? course.facilities.map((f:string,i:number)=>(<li key={i} className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> {f}</li>)) : (
// // //                                         <>
// // //                                             <li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Akses {getTotalJP()} JP Materi</li>
// // //                                             <li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Sertifikat Digital</li>
// // //                                             <li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Diskusi & Konsultasi</li>
// // //                                         </>
// // //                                     )}
// // //                                 </ul>
// // //                             </div>
// // //                         </div>

// // //                         {/* List Peserta */}
// // //                         <div className="bg-white rounded-[32px] border border-gray-200 p-6 shadow-lg">
// // //                             <h4 className="font-black text-gray-900 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><Users size={16} className="text-red-600"/> Peserta Terbaru</h4>
// // //                             <div className="space-y-3">
// // //                                 {participants.map((p, i) => (
// // //                                     <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
// // //                                         <div className="flex items-center gap-3">
// // //                                             <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden"><img src={`https://ui-avatars.com/api/?name=${p.name}&background=random`} alt={p.name}/></div>
// // //                                             <span className="text-xs font-bold text-gray-700">{p.name}</span>
// // //                                         </div>
// // //                                         <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${p.status === 'Lulus' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
// // //                                     </div>
// // //                                 ))}
// // //                             </div>
// // //                         </div>

// // //                         {/* Bantuan */}
// // //                         <div className="bg-gray-900 rounded-[32px] p-6 text-white text-center shadow-lg">
// // //                             <h4 className="font-black text-sm uppercase tracking-widest mb-2">Butuh Bantuan?</h4>
// // //                             <div className="grid grid-cols-2 gap-3 mt-4">
// // //                                 <button className="bg-green-600 p-3 rounded-xl flex flex-col items-center"><MessageCircle size={20}/><span className="text-[10px] font-bold mt-1">WhatsApp</span></button>
// // //                                 <button className="bg-white/10 p-3 rounded-xl flex flex-col items-center"><Mail size={20}/><span className="text-[10px] font-bold mt-1">Email</span></button>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useParams, useRouter } from 'next/navigation';
// // import { api, getImageUrl } from '@/lib/api';
// // import { useAuth } from '@/lib/AuthProvider';
// // import Protected from '@/components/Protected';
// // import { 
// //     Clock, BookOpen, User, CheckCircle, Award, 
// //     MessageSquare, PlayCircle, Lock, ArrowLeft, 
// //     FileText, Loader2, Send, HelpCircle, Download,
// //     ChevronRight, X, HeadphonesIcon, Monitor, ExternalLink, Menu,
// //     Image as ImageIcon, BarChart2, Paperclip, AlertTriangle, 
// //     Users, Mail, MessageCircle, Calendar, Mic, FileCheck, 
// //     ChevronDown, ChevronUp, Video 
// // } from 'lucide-react';
// // import Link from 'next/link';
// // import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// // export default function CourseDetailPage() {
// //     const params = useParams();
// //     const router = useRouter();
// //     const { user } = useAuth();
// //     const rawId = params?.id || params?.courseId;
// //     const courseId = Array.isArray(rawId) ? rawId[0] : (rawId as string);

// //     // --- STATE UTAMA ---
// //     const [course, setCourse] = useState<any>(null);
// //     const [loading, setLoading] = useState(true);
// //     const [isEnrolled, setIsEnrolled] = useState(false);
// //     const [enrollmentStatus, setEnrollmentStatus] = useState<string>('');
// //     const [showRegisterModal, setShowRegisterModal] = useState(false);
// //     const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

// //     // --- STATE PLAYER ---
// //     const [activeLesson, setActiveLesson] = useState<any>(null);
// //     const [progressData, setProgressData] = useState<any>(null);
// //     const [messages, setMessages] = useState<any[]>([]);
// //     const [chatMessage, setChatMessage] = useState('');
// //     const [showChat, setShowChat] = useState(false);
// //     const [showMobileMenu, setShowMobileMenu] = useState(false);
    
// //     // State UI Landing Page
// //     const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
// //     const [participants, setParticipants] = useState<any[]>([]);

// //     // --- REFS ---
// //     const progressBarRef = useRef<HTMLDivElement>(null);
// //     const messagesEndRef = useRef<HTMLDivElement>(null);

// //     // 1. INITIAL LOAD
// //     useEffect(() => {
// //         if (!courseId) return;
// //         loadFullData();
// //     }, [courseId, user]);

// //     // 2. FIX ARIA
// //     useEffect(() => {
// //         if (progressBarRef.current) {
// //             const percent = Math.round(progressData?.percent || 0);
// //             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
// //             progressBarRef.current.style.width = `${percent}%`;
// //         }
// //     }, [progressData]);

// //     // 3. AUTO SCROLL CHAT
// //     useEffect(() => {
// //         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //     }, [messages, showChat]);

// //     const loadFullData = async () => {
// //         try {
// //             setLoading(true);
// //             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
// //             const cData = res.course || res;
// //             setCourse(cData);

// //             // Dummy Peserta
// //             setParticipants([
// //                 { id: 1, name: 'Budi Santoso', status: 'Lulus' },
// //                 { id: 2, name: 'Siti Aminah', status: 'Berjalan' },
// //                 { id: 3, name: 'Joko Anwar', status: 'Berjalan' },
// //             ]);

// //             if (cData.registrationPeriod && !cData.registrationPeriod.isForever) {
// //                 const now = new Date();
// //                 const end = cData.registrationPeriod.endDate ? new Date(cData.registrationPeriod.endDate) : null;
// //                 if (end) {
// //                     end.setHours(23, 59, 59, 999);
// //                     if (now > end) setIsRegistrationOpen(false);
// //                 }
// //             }

// //             if (user) {
// //                 const statusRes = await api(`/api/enrollments/check/${courseId}?t=${Date.now()}`);
// //                 setIsEnrolled(statusRes.isEnrolled);
// //                 setEnrollmentStatus(statusRes.status); 

// //                 if (statusRes.isEnrolled && statusRes.status === 'active') {
// //                     const [prog, msg] = await Promise.all([
// //                         api(`/api/progress/${courseId}`),
// //                         api(`/api/courses/${courseId}/messages`)
// //                     ]);
// //                     setProgressData(prog);
// //                     setMessages(msg || []);

// //                     const firstMod = cData.modules?.find((m: any) => m.isActive);
// //                     const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
// //                     if (firstLes) setActiveLesson(firstLes);
// //                 }
// //             }
// //         } catch (e) { console.error(e); } finally { setLoading(false); }
// //     };

// //     const handleRegisterClick = () => {
// //         if (!isRegistrationOpen) return;
// //         if (!user) { router.push(`/login?redirect=/courses/${courseId}`); return; }
// //         setShowRegisterModal(true); 
// //     };

// //     const handleMarkComplete = async (lessonId: string) => {
// //         try {
// //             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
// //             const updated = await api(`/api/progress/${courseId}`);
// //             setProgressData(updated);
// //         } catch (e) { alert("Gagal update progres"); }
// //     };

// //     const handleSendChat = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!chatMessage.trim()) return;
// //         try {
// //             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
// //             setMessages([...messages, res]);
// //             setChatMessage('');
// //         } catch (e) { alert("Gagal kirim pesan"); }
// //     };

// //     const handleChatFasilitator = (fasilitatorId: string) => {
// //         if (!user) { alert("Silakan login untuk chat"); return; }
// //         alert("Fitur chat privat dengan fasilitator akan segera hadir.");
// //     };

// //     const toggleLesson = (id: string) => setExpandedLesson(expandedLesson === id ? null : id);

// //     const getTotalJP = () => {
// //         if (!course?.modules) return 0;
// //         return course.modules.reduce((acc: number, m: any) => {
// //             return acc + (m.isActive ? m.lessons?.reduce((lAcc: number, l: any) => lAcc + (l.isActive ? (l.jp || 0) : 0), 0) : 0);
// //         }, 0);
// //     };

// //     const getFirstScheduleDate = () => {
// //         if (!course?.modules) return null;
// //         for (const mod of course.modules) {
// //             if (mod.isActive && mod.lessons) {
// //                 for (const les of mod.lessons) {
// //                     if (les.isActive && les.schedule) return new Date(les.schedule);
// //                 }
// //             }
// //         }
// //         return null;
// //     };

// //     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

// //     const getLessonIcon = (type: string) => {
// //         switch(type) {
// //             case 'video_url': return <Video size={16}/>;
// //             case 'poll': return <HelpCircle size={16}/>;
// //             case 'quiz': return <FileCheck size={16}/>;
// //             case 'virtual_class': return <Monitor size={16}/>;
// //             default: return <FileText size={16}/>;
// //         }
// //     };

// //     const renderContent = () => {
// //         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
// //         switch (activeLesson.type) {
// //             case 'video_url': return <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
// //             case 'slide': return <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide"/></div>;
// //             case 'pdf': return <div className="aspect-[3/4] md:aspect-video bg-gray-50 rounded-3xl overflow-hidden border shadow-lg"><iframe src={`${getImageUrl(activeLesson.fileUrl)}#toolbar=0`} className="w-full h-full" title="PDF"/></div>;
// //             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold mb-4">{activeLesson.pollQuestion}</h2>{activeLesson.pollOptions?.map((o:string, i:number)=><div key={i} className="p-3 mb-2 bg-gray-50 border rounded-xl">{o}</div>)}</div>;
// //             case 'essay': case 'quiz': return (<div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm"><div className="flex items-center gap-4 mb-6"><div className="p-3 bg-red-100 text-red-600 rounded-full"><FileText size={32}/></div><div><h2 className="text-xl font-bold text-gray-900">{activeLesson.title}</h2><p className="text-red-600 text-xs font-bold uppercase tracking-widest">Tugas</p></div></div><div className="prose prose-red max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6"><button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-gray-500 hover:border-red-400 hover:text-red-600 transition-colors"><Paperclip className="mb-1"/> <span className="text-xs font-bold uppercase">Upload Jawaban</span></button></div></div>);
// //             default: return <div className="bg-white p-8 rounded-3xl border border-gray-100"><h2 className="text-2xl font-bold">{activeLesson.title}</h2></div>;
// //         }
// //     };

// //     if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
// //     if (!course) return <div className="text-center py-20 font-bold text-gray-400">Kursus tidak ditemukan.</div>;

// //     const programLabel = course.programType === 'training' ? 'Pelatihan' : 'Kursus';
// //     const firstScheduleDate = getFirstScheduleDate();

// //     // =========================================================================================
// //     // VIEW 1: MODE PLAYER (JIKA AKTIF)
// //     // =========================================================================================
// //     if (isEnrolled && enrollmentStatus === 'active') {
// //         const percent = Math.round(progressData?.percent || 0);
// //         return (
// //             <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
// //                 <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
// //                     <header className="bg-gray-900 text-white p-3 md:p-4 flex items-center justify-between shrink-0 shadow-md z-40">
// //                         <div className="flex items-center gap-4">
// //                             <Link href="/courses" className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali"><ArrowLeft size={20}/></Link>
// //                             <div>
// //                                 <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course.title}</h1>
// //                                 <div className="flex items-center gap-2 mt-0.5">
// //                                     <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden"><div ref={progressBarRef} className="h-full bg-green-500 rounded-full" role="progressbar" aria-label="Progres Belajar"></div></div>
// //                                     <span className="text-[10px] font-bold text-green-400">{percent}% SELESAI</span>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                         <div className="flex items-center gap-2">
// //                              <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-bold text-xs uppercase shadow-lg border border-white/20">{course?.organizer?.charAt(0)}</div>
// //                              <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu"><Menu size={18}/></button>
// //                         </div>
// //                     </header>
// //                     <div className="flex flex-1 overflow-hidden relative">
// //                         <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none`}>
// //                             <div className="p-5 border-b bg-gray-50/50"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3></div>
// //                             <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
// //                                 {course.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
// //                                     <div key={mod._id}>
// //                                         <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
// //                                         <div className="space-y-1">
// //                                             {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
// //                                                 <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`}>
// //                                                     {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
// //                                                     <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')} • {les.jp || 0} JP</p></div>
// //                                                 </button>
// //                                             ))}
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                             <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
// //                         </aside>
// //                         <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar relative">
// //                             <div className="max-w-4xl mx-auto pb-32">
// //                                 <div className="mb-8 transition-all duration-500 ease-in-out">{renderContent()}</div>
// //                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && (
// //                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm" dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} />
// //                                 )}
// //                             </div>
// //                             <div className="fixed bottom-0 left-0 lg:left-80 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
// //                                 <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
// //                                 {!isDone(activeLesson?._id) ? (
// //                                     <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl uppercase flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
// //                                 ) : (
// //                                     <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase"><CheckCircle size={18}/> Materi Lulus</div>
// //                                 )}
// //                             </div>
// //                         </main>
// //                         <button onClick={() => setShowChat(!showChat)} className="absolute bottom-24 right-6 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Diskusi">
// //                             <MessageSquare size={24}/>
// //                             {messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}
// //                         </button>
// //                         {showChat && (
// //                             <div className="absolute bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
// //                                 <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0">
// //                                     <div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div>
// //                                     <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup"><X size={18}/></button>
// //                                 </div>
// //                                 <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">
// //                                     {messages.map((m, i) => (
// //                                         <div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id) ? 'items-end' : 'items-start'}`}>
// //                                             <span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span>
// //                                             <div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm ${(m.sender?._id === (user as any)?._id) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div>
// //                                         </div>
// //                                     ))}
// //                                     <div ref={messagesEndRef} />
// //                                 </div>
// //                                 <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0">
// //                                     <input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
// //                                     <button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md" title="Kirim"><Send size={16}/></button>
// //                                 </form>
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>
// //             </Protected>
// //         );
// //     }

// //     // =========================================================================================
// //     // VIEW 2: LANDING PAGE (FINAL REVISI UI)
// //     // =========================================================================================
// //     return (
// //         <div className="min-h-screen bg-gray-50 pb-20 font-sans relative overflow-x-hidden">
// //             {showRegisterModal && user && (
// //                 <CourseRegistrationModal courseId={courseId} courseTitle={course.title} courseData={course} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => loadFullData()} />
// //             )}
            
// //             {/* HERO HEADER - Red, Photo BG, Height pb-80 untuk Overlap Besar */}
// //             <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white overflow-hidden pb-80">
// //                 <div className="absolute inset-0 mix-blend-multiply opacity-30">
// //                     <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover filter blur-sm scale-105" alt="Background" />
// //                 </div>
// //                 <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 via-transparent to-black/10"></div>

// //                 <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
// //                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
// //                         {/* KIRI: Judul & Navigasi */}
// //                         <div>
// //                             <Link href="/courses" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-xs font-bold tracking-widest group uppercase">
// //                                 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Kembali ke Katalog
// //                             </Link>
// //                             <div className="flex flex-wrap items-center gap-3 mb-4">
// //                                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${course.programType === 'training' ? 'bg-white text-red-700' : 'bg-red-900 text-red-100 border border-red-400'}`}>
// //                                     {programLabel} Resmi
// //                                 </span>
// //                                 <span className="flex items-center gap-1.5 text-[10px] font-bold bg-yellow-400/20 text-yellow-200 px-4 py-1.5 rounded-full border border-yellow-400/30 backdrop-blur-md">
// //                                     <Award size={14} className="text-yellow-400"/> Sertifikat Tersedia
// //                                 </span>
// //                             </div>
// //                             {/* [FIX REQ 2: Judul Lebih Kecil] */}
// //                             <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-lg tracking-tight mb-4">
// //                                 {course.title}
// //                             </h1>
// //                         </div>

// //                         {/* KANAN: Label Info (Jadwal & Stats) - POJOK KANAN ATAS */}
// //                         <div className="flex justify-start lg:justify-end">
// //                             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl text-white min-w-[280px]">
// //                                 <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
// //                                     <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-900/50">
// //                                         <Calendar size={20}/>
// //                                     </div>
// //                                     <div>
// //                                         <p className="text-[10px] font-bold uppercase opacity-70 tracking-wider mb-0.5">Pelaksanaan Awal</p>
// //                                         <p className="font-bold text-sm">
// //                                             {firstScheduleDate 
// //                                                 ? new Date(firstScheduleDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) 
// //                                                 : 'Jadwal Menyusul'}
// //                                         </p>
// //                                     </div>
// //                                 </div>
// //                                 <div className="flex items-center justify-between text-xs font-bold">
// //                                     <div className="flex items-center gap-2"><BookOpen size={16} className="text-white/70"/> {getTotalJP()} JP</div>
// //                                     <div className="flex items-center gap-2"><User size={16} className="text-white/70"/> {course.facilitatorIds?.length || 0} Pengajar</div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* CONTENT GRID - OVERLAP EKSTREM (-mt-64) */}
// //             <div className="max-w-7xl mx-auto px-6 relative z-10 -mt-64 pb-20">
// //                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
// //                     {/* --- KOLOM KIRI (7/12) --- */}
// //                     <div className="lg:col-span-7 space-y-8">
                        
// //                         {/* 1. TENTANG PELATIHAN (Sejajar dengan Cover) - Overlap Hero */}
// //                         <section className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 h-full min-h-[275px] flex flex-col justify-center">
// //                             <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-3 uppercase tracking-wide">
// //                                 <FileText className="text-red-600" size={24}/> Tentang {programLabel}
// //                             </h3>
// //                             <div className="prose prose-red max-w-none text-gray-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: course.description }} />
// //                         </section>

// //                         {/* Kurikulum */}
// //                         <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
// //                             <div className="flex items-center justify-between mb-8 pb-4 border-b">
// //                                 <h3 className="text-lg font-black text-gray-800 flex items-center gap-3 uppercase tracking-wide"><BookOpen className="text-red-600" size={24}/> Kurikulum</h3>
// //                                 <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border uppercase tracking-wider">{course.modules?.length || 0} Modul</span>
// //                             </div>
// //                             <div className="space-y-5">
// //                                 {course.modules?.filter((m:any) => m.isActive).map((mod: any, idx: number) => (
// //                                     <div key={mod._id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
// //                                         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200"><h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Modul {idx + 1}: {mod.title}</h4></div>
// //                                         <div className="divide-y divide-gray-100 bg-white">
// //                                             {mod.lessons?.filter((l:any) => l.isActive).map((les: any) => (
// //                                                 <div key={les._id}>
// //                                                     <button onClick={() => toggleLesson(les._id)} className="w-full px-6 py-4 flex items-center gap-4 hover:bg-red-50/50 transition-colors text-left group">
// //                                                         <div className="text-red-500 bg-red-50 p-2 rounded-lg">{getLessonIcon(les.type)}</div>
// //                                                         <div className="flex-1"><p className="text-sm font-bold text-gray-700">{les.title}</p><p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
// //                                                         {expandedLesson === les._id ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
// //                                                     </button>
// //                                                     {expandedLesson === les._id && (
// //                                                         <div className="px-6 pb-6 pt-2 bg-gray-50/50 text-xs text-gray-600 border-t border-gray-100">
// //                                                             <div className="grid grid-cols-2 gap-4">
// //                                                                 <div><p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider mb-1">Fasilitator</p><p className="font-bold text-gray-800 flex gap-2 items-center"><User size={12}/> {course.facilitatorIds?.[0]?.name || 'Tim Pengajar'}</p></div>
// //                                                                 <div><p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider mb-1">Metode</p><p className="font-bold text-gray-800 flex gap-2 items-center"><Mic size={12}/> {les.type?.toUpperCase()}</p></div>
// //                                                             </div>
// //                                                         </div>
// //                                                     )}
// //                                                 </div>
// //                                             ))}
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </section>

// //                         {/* Fasilitator */}
// //                         <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
// //                             <h3 className="text-lg font-black text-gray-800 mb-8 flex items-center gap-3 border-b pb-4 uppercase tracking-wide"><User className="text-red-600" size={24}/> Tim Fasilitator</h3>
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                                 {course.facilitatorIds?.map((fac: any) => (
// //                                     <button key={fac._id} onClick={() => handleChatFasilitator(fac._id)} className="flex items-center gap-5 p-5 rounded-2xl border border-gray-200 bg-white hover:border-red-200 hover:shadow-lg transition-all group text-left w-full" title="Chat Fasilitator">
// //                                         <div className="relative">
// //                                             <img src={getImageUrl(fac.avatarUrl)} className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 group-hover:border-red-500 transition-colors shadow-sm" alt={fac.name}/>
// //                                             <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full border-2 border-white"><MessageCircle size={10} strokeWidth={3}/></div>
// //                                         </div>
// //                                         <div><h5 className="font-bold text-gray-900 text-sm uppercase tracking-tight group-hover:text-red-600">{fac.name}</h5><p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Fasilitator PMI</p></div>
// //                                     </button>
// //                                 ))}
// //                             </div>
// //                         </section>
// //                     </div>

// //                     {/* --- KOLOM KANAN (5/12) --- */}
// //                     <div className="lg:col-span-5 space-y-6">
                        
// //                         {/* 1. COVER / VIDEO (CMS LOGIC) - Overlap Hero */}
// //                         <div className="aspect-video rounded-[32px] bg-gray-900 overflow-hidden shadow-2xl shadow-red-900/20 relative z-30 group cursor-pointer border-4 border-white">
// //                             {course.promoVideoUrl ? (
// //                                 <iframe src={course.promoVideoUrl.replace('watch?v=', 'embed/')} className="w-full h-full pointer-events-none" title="Preview" tabIndex={-1}/>
// //                             ) : (
// //                                 <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover opacity-90" alt="Preview"/>
// //                             )}
// //                             {course.promoVideoUrl && <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors"><div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center shadow-xl border-2 border-white/50 backdrop-blur-sm"><PlayCircle size={36} className="text-white fill-current ml-1"/></div></div>}
// //                         </div>

// //                         {/* 2. Pendaftaran */}
// //                         <div className="bg-white rounded-[32px] shadow-xl border border-gray-200 p-8">
// //                             <div className="mb-8 text-center bg-gray-50 p-6 rounded-3xl border border-gray-100">
// //                                 <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Investasi Program</p>
// //                                 <h2 className="text-4xl font-black text-gray-900">{course.price === 0 ? <span className="text-green-600">GRATIS</span> : `Rp ${course.price.toLocaleString('id-ID')}`}</h2>
// //                             </div>
// //                             <div className="mb-8 space-y-3">
// //                                 {isEnrolled ? (
// //                                     enrollmentStatus === 'active' ? (
// //                                         <Link href={`/courses/${courseId}/play`} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"><PlayCircle size={20}/> Masuk Kelas</Link>
// //                                     ) : ( <div className="bg-yellow-50 text-yellow-700 p-4 rounded-2xl border-2 border-yellow-200 text-center font-bold text-xs uppercase">Menunggu Verifikasi</div> )
// //                                 ) : (
// //                                     isRegistrationOpen ? ( <button onClick={handleRegisterClick} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-red-700 transition-all uppercase tracking-widest text-xs"><FileText size={20} className="inline mr-2"/> Daftar Sekarang</button>
// //                                     ) : ( <button disabled className="w-full bg-gray-100 text-gray-400 font-bold py-4 rounded-2xl cursor-not-allowed border-2 border-gray-200 uppercase tracking-widest text-xs">Pendaftaran Ditutup</button> )
// //                                 )}
// //                             </div>
// //                             <div className="space-y-5 pt-6 border-t-2 border-dashed border-gray-100">
// //                                 <h4 className="font-black text-gray-900 text-xs uppercase tracking-[0.2em] mb-2">Fasilitas Pelatihan:</h4>
// //                                 <ul className="space-y-3 text-xs text-gray-600 font-bold uppercase tracking-tight">
// //                                     {course.facilities?.length > 0 ? course.facilities.map((f:string,i:number)=>(<li key={i} className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> {f}</li>)) : (
// //                                         <>
// //                                             <li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Akses {getTotalJP()} JP Materi</li>
// //                                             <li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Sertifikat Digital</li>
// //                                             <li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Diskusi & Konsultasi</li>
// //                                         </>
// //                                     )}
// //                                 </ul>
// //                             </div>
// //                         </div>

// //                         {/* List Peserta */}
// //                         <div className="bg-white rounded-[32px] border border-gray-200 p-6 shadow-lg">
// //                             <h4 className="font-black text-gray-900 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><Users size={16} className="text-red-600"/> Peserta Terbaru</h4>
// //                             <div className="space-y-3">
// //                                 {participants.map((p, i) => (
// //                                     <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
// //                                         <div className="flex items-center gap-3">
// //                                             <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden"><img src={`https://ui-avatars.com/api/?name=${p.name}&background=random`} alt={p.name}/></div>
// //                                             <span className="text-xs font-bold text-gray-700">{p.name}</span>
// //                                         </div>
// //                                         <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${p.status === 'Lulus' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>

// //                         {/* Bantuan */}
// //                         <div className="bg-gray-900 rounded-[32px] p-6 text-white text-center shadow-lg">
// //                             <h4 className="font-black text-sm uppercase tracking-widest mb-2">Butuh Bantuan?</h4>
// //                             <div className="grid grid-cols-2 gap-3 mt-4">
// //                                 <button className="bg-green-600 p-3 rounded-xl flex flex-col items-center"><MessageCircle size={20}/><span className="text-[10px] font-bold mt-1">WhatsApp</span></button>
// //                                 <button className="bg-white/10 p-3 rounded-xl flex flex-col items-center"><Mail size={20}/><span className="text-[10px] font-bold mt-1">Email</span></button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { api, getImageUrl } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import Protected from '@/components/Protected';
// import { 
//     Clock, BookOpen, User, CheckCircle, Award, 
//     MessageSquare, PlayCircle, Lock, ArrowLeft, 
//     FileText, Loader2, Send, HelpCircle, Download,
//     ChevronRight, X, HeadphonesIcon, Monitor, ExternalLink, Menu,
//     Image as ImageIcon, BarChart2, Paperclip, AlertTriangle, 
//     Users, Mail, MessageCircle, Calendar, Mic, FileCheck, 
//     ChevronDown, ChevronUp, Video, UserPlus 
// } from 'lucide-react';
// import Link from 'next/link';
// import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// export default function CourseDetailPage() {
//     const params = useParams();
//     const router = useRouter();
//     const { user } = useAuth();
//     const rawId = params?.id || params?.courseId;
//     const courseId = Array.isArray(rawId) ? rawId[0] : (rawId as string);

//     // --- STATE UTAMA ---
//     const [course, setCourse] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [isEnrolled, setIsEnrolled] = useState(false);
//     const [enrollmentStatus, setEnrollmentStatus] = useState<string>('');
//     const [showRegisterModal, setShowRegisterModal] = useState(false);
//     const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

//     // --- STATE PLAYER & DATA ---
//     const [activeLesson, setActiveLesson] = useState<any>(null);
//     const [progressData, setProgressData] = useState<any>(null);
//     const [messages, setMessages] = useState<any[]>([]);
//     const [chatMessage, setChatMessage] = useState('');
//     const [showChat, setShowChat] = useState(false);
//     const [showMobileMenu, setShowMobileMenu] = useState(false);
//     const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
    
//     // --- STATE PESERTA (SINKRONISASI DATA - DIKUNCI) ---
//     const [activeParticipants, setActiveParticipants] = useState<any[]>([]); 
//     const [pendingParticipants, setPendingParticipants] = useState<any[]>([]); 
//     const [totalActive, setTotalActive] = useState(0);

//     // --- REFS ---
//     const progressBarRef = useRef<HTMLDivElement>(null);
//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     // 1. INITIAL LOAD
//     useEffect(() => {
//         if (!courseId) return;
//         loadFullData();
//     }, [courseId, user]);

//     // 2. FIX ARIA
//     useEffect(() => {
//         if (progressBarRef.current) {
//             const percent = Math.round(progressData?.percent || 0);
//             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
//             progressBarRef.current.style.width = `${percent}%`;
//         }
//     }, [progressData]);

//     // 3. AUTO SCROLL CHAT
//     useEffect(() => {
//         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages, showChat]);

//     const loadFullData = async () => {
//         try {
//             setLoading(true);
            
//             // 1. Ambil Data Course
//             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
//             const cData = res.course || res;
//             setCourse(cData);

//             // 2. AMBIL DATA PESERTA (DIKUNCI - LOGIKA SAMA DENGAN DASHBOARD)
//             try {
//                 const partsRes = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
//                 const allData = partsRes.participants || [];

//                 // Helper Nama
//                 const getParticipantName = (p: any) => {
//                     if (p.user && p.user.name) return p.user.name;
//                     if (p.name) return p.name;
//                     if (p.studentName) return p.studentName;
//                     return "Peserta Terdaftar"; 
//                 };

//                 const getParticipantAvatar = (p: any) => {
//                     return p.user?.avatarUrl || p.avatarUrl || null;
//                 };

//                 // Filter: Active & Approved 
//                 const activeList = allData.filter((p: any) => p.status === 'active' || p.status === 'approved').map((p: any) => {
//                     const rawProgress = Number(p.progress);
//                     const progressValue = Number.isFinite(rawProgress) ? Math.max(0, Math.min(100, Math.round(rawProgress))) : 0;
//                     const isLulus = progressValue >= 100 || p.isCompleted === true;

//                     return {
//                         ...p,
//                         displayName: getParticipantName(p),
//                         displayAvatar: getParticipantAvatar(p),
//                         isLulus: isLulus,
//                         displayStatus: isLulus ? 'LULUS' : 'BERJALAN'
//                     };
//                 });
                
//                 // Filter: Pending & Waiting 
//                 const pendingList = allData.filter((p: any) => !p.status || p.status === 'pending' || p.status === 'waiting').map((p: any) => ({
//                     ...p,
//                     displayName: getParticipantName(p),
//                     displayAvatar: getParticipantAvatar(p)
//                 }));

//                 setActiveParticipants(activeList);
//                 setPendingParticipants(pendingList);
//                 setTotalActive(activeList.length);

//             } catch (err) {
//                 console.error("Gagal load peserta:", err);
//             }

//             // 3. Cek Periode
//             if (cData.registrationPeriod && !cData.registrationPeriod.isForever) {
//                 const now = new Date();
//                 const end = cData.registrationPeriod.endDate ? new Date(cData.registrationPeriod.endDate) : null;
//                 if (end) {
//                     end.setHours(23, 59, 59, 999);
//                     if (now > end) setIsRegistrationOpen(false);
//                 }
//             }

//             // 4. Cek Enrollment User Login
//             if (user) {
//                 const statusRes = await api(`/api/enrollments/check/${courseId}?t=${Date.now()}`);
//                 setIsEnrolled(statusRes.isEnrolled);
//                 setEnrollmentStatus(statusRes.status); 

//                 if (statusRes.isEnrolled && statusRes.status === 'active') {
//                     const [prog, msg] = await Promise.all([
//                         api(`/api/progress/${courseId}`),
//                         api(`/api/courses/${courseId}/messages`)
//                     ]);
//                     setProgressData(prog);
//                     setMessages(msg || []);

//                     const firstMod = cData.modules?.find((m: any) => m.isActive);
//                     const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
//                     if (firstLes) setActiveLesson(firstLes);
//                 }
//             }
//         } catch (e) { console.error(e); } finally { setLoading(false); }
//     };

//     const handleRegisterClick = () => {
//         if (!isRegistrationOpen) return;
//         if (!user) { router.push(`/login?redirect=/courses/${courseId}`); return; }
//         setShowRegisterModal(true); 
//     };

//     const handleMarkComplete = async (lessonId: string) => {
//         try {
//             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
//             const updated = await api(`/api/progress/${courseId}`);
//             setProgressData(updated);
//         } catch (e) { alert("Gagal update progres"); }
//     };

//     const handleSendChat = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!chatMessage.trim()) return;
//         try {
//             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
//             setMessages([...messages, res]);
//             setChatMessage('');
//         } catch (e) { alert("Gagal kirim pesan"); }
//     };

//     const handleWhatsApp = () => {
//         window.open('https://wa.me/6281234567890', '_blank'); 
//     };

//     const toggleLesson = (id: string) => setExpandedLesson(expandedLesson === id ? null : id);

//     const getTotalJP = () => {
//         if (!course?.modules) return 0;
//         return course.modules.reduce((acc: number, m: any) => {
//             return acc + (m.isActive ? m.lessons?.reduce((lAcc: number, l: any) => lAcc + (l.isActive ? (l.jp || 0) : 0), 0) : 0);
//         }, 0);
//     };

//     const getFirstScheduleDate = () => {
//         if (!course?.modules) return null;
//         for (const mod of course.modules) {
//             if (mod.isActive && mod.lessons) {
//                 for (const les of mod.lessons) {
//                     if (les.isActive && les.schedule) return new Date(les.schedule);
//                 }
//             }
//         }
//         return null;
//     };

//     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

//     const getLessonIcon = (type: string) => {
//         switch(type) {
//             case 'video_url': return <Video size={16}/>;
//             case 'poll': return <HelpCircle size={16}/>;
//             case 'quiz': return <FileCheck size={16}/>;
//             case 'virtual_class': return <Monitor size={16}/>;
//             default: return <FileText size={16}/>;
//         }
//     };

//     const renderContent = () => {
//         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
//         switch (activeLesson.type) {
//             case 'video_url': return <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
//             case 'slide': return <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide"/></div>;
//             case 'pdf': return <div className="aspect-[3/4] md:aspect-video bg-gray-50 rounded-3xl overflow-hidden border shadow-lg"><iframe src={`${getImageUrl(activeLesson.fileUrl)}#toolbar=0`} className="w-full h-full" title="PDF"/></div>;
//             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold mb-4">{activeLesson.pollQuestion}</h2>{activeLesson.pollOptions?.map((o:string, i:number)=><div key={i} className="p-3 mb-2 bg-gray-50 border rounded-xl">{o}</div>)}</div>;
//             case 'essay': case 'quiz': return (<div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm"><div className="flex items-center gap-4 mb-6"><div className="p-3 bg-red-100 text-red-600 rounded-full"><FileText size={32}/></div><div><h2 className="text-xl font-bold text-gray-900">{activeLesson.title}</h2><p className="text-red-600 text-xs font-bold uppercase tracking-widest">Tugas</p></div></div><div className="prose prose-red max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6"><button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-gray-500 hover:border-red-400 hover:text-red-600 transition-colors"><Paperclip className="mb-1"/> <span className="text-xs font-bold uppercase">Upload Jawaban</span></button></div></div>);
//             default: return <div className="bg-white p-8 rounded-3xl border border-gray-100"><h2 className="text-2xl font-bold">{activeLesson.title}</h2></div>;
//         }
//     };

//     if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
//     if (!course) return <div className="text-center py-20 font-bold text-gray-400">Kursus tidak ditemukan.</div>;

//     const programLabel = course.programType === 'training' ? 'Pelatihan' : 'Kursus';
//     const firstScheduleDate = getFirstScheduleDate();

//     // =========================================================================================
//     // VIEW 1: MODE PLAYER (JIKA AKTIF)
//     // =========================================================================================
//     if (isEnrolled && enrollmentStatus === 'active') {
//         const percent = Math.round(progressData?.percent || 0);
//         return (
//             <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
//                 <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
//                     <header className="bg-gray-900 text-white p-3 md:p-4 flex items-center justify-between shrink-0 shadow-md z-40">
//                         <div className="flex items-center gap-4">
//                             <Link href="/courses" className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali"><ArrowLeft size={20}/></Link>
//                             <div>
//                                 <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course.title}</h1>
//                                 <div className="flex items-center gap-2 mt-0.5">
//                                     <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden"><div ref={progressBarRef} className="h-full bg-green-500 rounded-full" role="progressbar" aria-label="Progres Belajar"></div></div>
//                                     <span className="text-[10px] font-bold text-green-400">{percent}% SELESAI</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                              <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-bold text-xs uppercase shadow-lg border border-white/20">{course?.organizer?.charAt(0)}</div>
//                              <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu"><Menu size={18}/></button>
//                         </div>
//                     </header>

//                     <div className="flex flex-1 overflow-hidden relative">
//                         {/* Sidebar Kiri */}
//                         <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none`}>
//                             <div className="p-5 border-b bg-gray-50/50"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3></div>
//                             <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
//                                 {course.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
//                                     <div key={mod._id}>
//                                         <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
//                                         <div className="space-y-1">
//                                             {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
//                                                 <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`}>
//                                                     {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
//                                                     <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')} • {les.jp || 0} JP</p></div>
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
//                         </aside>

//                         {/* Konten Utama Player */}
//                         <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar relative">
//                             <div className="max-w-4xl mx-auto pb-32">
//                                 <div className="mb-8 transition-all duration-500 ease-in-out">{renderContent()}</div>
//                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && (
//                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm" dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} />
//                                 )}
//                             </div>
//                             <div className="fixed bottom-0 left-0 lg:left-80 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
//                                 <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
//                                 {!isDone(activeLesson?._id) ? (
//                                     <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl uppercase flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
//                                 ) : (
//                                     <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase"><CheckCircle size={18}/> Materi Lulus</div>
//                                 )}
//                             </div>
//                         </main>

//                         {/* Chat Overlay */}
//                         <button onClick={() => setShowChat(!showChat)} className="absolute bottom-24 right-6 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Diskusi">
//                             <MessageSquare size={24}/>
//                             {messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}
//                         </button>
//                         {showChat && (
//                             <div className="absolute bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
//                                 <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0">
//                                     <div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div>
//                                     <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup"><X size={18}/></button>
//                                 </div>
//                                 <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">
//                                     {messages.map((m, i) => (
//                                         <div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id) ? 'items-end' : 'items-start'}`}>
//                                             <span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span>
//                                             <div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm ${(m.sender?._id === (user as any)?._id) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div>
//                                         </div>
//                                     ))}
//                                     <div ref={messagesEndRef} />
//                                 </div>
//                                 <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0">
//                                     <input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
//                                     <button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md" title="Kirim"><Send size={16}/></button>
//                                 </form>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </Protected>
//         );
//     }

//     // =========================================================================================
//     // VIEW 2: LANDING PAGE (FINAL LOCKED LAYOUT & REAL DATA)
//     // =========================================================================================
//     return (
//         <div className="min-h-screen bg-gray-50 pb-20 font-sans relative overflow-x-hidden">
//             {showRegisterModal && user && (
//                 <CourseRegistrationModal courseId={courseId} courseTitle={course.title} courseData={course} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => loadFullData()} />
//             )}
            
//             {/* HERO HEADER - Layout Dikunci (pb-80) */}
//             <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white overflow-hidden pb-80">
//                 <div className="absolute inset-0 mix-blend-multiply opacity-30">
//                     <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover filter blur-sm scale-105" alt="Background" />
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 via-transparent to-black/10"></div>

//                 <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
//                         {/* KIRI: Judul & Navigasi */}
//                         <div>
//                             <Link href="/courses" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-xs font-bold tracking-widest group uppercase">
//                                 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Kembali ke Katalog
//                             </Link>
//                             <div className="flex flex-wrap items-center gap-3 mb-4">
//                                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${course.programType === 'training' ? 'bg-white text-red-700' : 'bg-red-900 text-red-100 border border-red-400'}`}>
//                                     {programLabel} Resmi
//                                 </span>
//                                 <span className="flex items-center gap-1.5 text-[10px] font-bold bg-yellow-400/20 text-yellow-200 px-4 py-1.5 rounded-full border border-yellow-400/30 backdrop-blur-md">
//                                     <Award size={14} className="text-yellow-400"/> Sertifikat Tersedia
//                                 </span>
//                             </div>
//                             <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-lg tracking-tight mb-4">
//                                 {course.title}
//                             </h1>
//                         </div>

//                         {/* KANAN: Label Info (Jadwal & Stats) */}
//                         <div className="flex justify-start lg:justify-end">
//                             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl text-white min-w-[280px]">
//                                 <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
//                                     <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-900/50">
//                                         <Calendar size={20}/>
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] font-bold uppercase opacity-70 tracking-wider mb-0.5">Pelaksanaan Awal</p>
//                                         <p className="font-bold text-sm">
//                                             {firstScheduleDate 
//                                                 ? new Date(firstScheduleDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) 
//                                                 : 'Jadwal Menyusul'}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center justify-between text-xs font-bold">
//                                     <div className="flex items-center gap-2"><BookOpen size={16} className="text-white/70"/> {getTotalJP()} JP</div>
//                                     <div className="flex items-center gap-2"><User size={16} className="text-white/70"/> {course.facilitatorIds?.length || 0} Pengajar</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* CONTENT GRID - Layout Dikunci (-mt-64) */}
//             <div className="max-w-7xl mx-auto px-6 relative z-10 -mt-64 pb-20">
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
//                     {/* --- KOLOM KIRI (7/12) --- */}
//                     <div className="lg:col-span-7 space-y-8">
                        
//                         {/* 1. TENTANG PELATIHAN (Posisi & Ukuran Dikunci: min-h-[275px]) */}
//                         <section className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 h-full min-h-[275px] flex flex-col justify-center relative z-30">
//                             <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-3 uppercase tracking-wide">
//                                 <FileText className="text-red-600" size={24}/> Tentang {programLabel}
//                             </h3>
//                             <div className="prose prose-red max-w-none text-gray-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: course.description }} />
//                         </section>

//                         {/* Kurikulum */}
//                         <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
//                             <div className="flex items-center justify-between mb-8 pb-4 border-b">
//                                 <h3 className="text-lg font-black text-gray-800 flex items-center gap-3 uppercase tracking-wide"><BookOpen className="text-red-600" size={24}/> Kurikulum</h3>
//                                 <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border uppercase tracking-wider">{course.modules?.length || 0} Modul</span>
//                             </div>
//                             <div className="space-y-5">
//                                 {course.modules?.filter((m:any) => m.isActive).map((mod: any, idx: number) => (
//                                     <div key={mod._id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
//                                         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200"><h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Modul {idx + 1}: {mod.title}</h4></div>
//                                         <div className="divide-y divide-gray-100 bg-white">
//                                             {mod.lessons?.filter((l:any) => l.isActive).map((les: any) => (
//                                                 <div key={les._id}>
//                                                     <button onClick={() => toggleLesson(les._id)} className="w-full px-6 py-4 flex items-center gap-4 hover:bg-red-50/50 transition-colors text-left group">
//                                                         <div className="text-red-500 bg-red-50 p-2 rounded-lg">{getLessonIcon(les.type)}</div>
//                                                         <div className="flex-1"><p className="text-sm font-bold text-gray-700">{les.title}</p><p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
//                                                         {expandedLesson === les._id ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
//                                                     </button>
//                                                     {expandedLesson === les._id && (
//                                                         <div className="px-6 pb-6 pt-2 bg-gray-50/50 text-xs text-gray-600 border-t border-gray-100 animate-in slide-in-from-top-2">
//                                                             <div className="grid grid-cols-2 gap-4">
//                                                                 <div><p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider mb-1">Fasilitator</p><p className="font-bold text-gray-800 flex gap-2 items-center"><User size={12}/> {course.facilitatorIds?.[0]?.name || 'Tim Pengajar'}</p></div>
//                                                                 <div><p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider mb-1">Metode</p><p className="font-bold text-gray-800 flex gap-2 items-center"><Mic size={12}/> {les.type?.toUpperCase()}</p></div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>

//                         {/* Fasilitator (TANPA CHAT - CUMA DISPLAY) */}
//                         <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
//                             <h3 className="text-lg font-black text-gray-800 mb-8 flex items-center gap-3 border-b pb-4 uppercase tracking-wide"><User className="text-red-600" size={24}/> Tim Fasilitator</h3>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {course.facilitatorIds?.length > 0 ? (
//                                     course.facilitatorIds.map((fac: any) => (
//                                         // GANTI BUTTON JADI DIV BIAR GAK KLIK (CHAT DITIADAKAN)
//                                         <div key={fac._id || fac} className="flex items-center gap-5 p-5 rounded-2xl border border-gray-200 bg-white hover:border-red-200 hover:shadow-lg transition-all text-left w-full cursor-default">
//                                             <div className="relative shrink-0">
//                                                 <img src={getImageUrl(fac.avatarUrl)} className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 shadow-sm" alt={fac.name}/>
//                                                 {/* HILANGKAN ICON CHAT WA */}
//                                             </div>
//                                             <div>
//                                                 <h5 className="font-bold text-gray-900 text-sm uppercase tracking-tight">{fac.name}</h5>
//                                                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Fasilitator PMI</p>
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="text-gray-400 text-xs italic col-span-2 text-center">Belum ada fasilitator yang ditugaskan.</div>
//                                 )}
//                             </div>
//                         </section>
//                     </div>

//                     {/* --- KOLOM KANAN (5/12) --- */}
//                     <div className="lg:col-span-5 space-y-6">
                        
//                         {/* 1. COVER / VIDEO (Posisi & Ukuran Dikunci: aspect-video + styles) */}
//                         <div className="aspect-video rounded-[32px] bg-gray-900 overflow-hidden shadow-2xl shadow-red-900/20 relative z-30 group cursor-pointer border-4 border-white">
//                             {course.promoVideoUrl ? (
//                                 <iframe src={course.promoVideoUrl.replace('watch?v=', 'embed/')} className="w-full h-full pointer-events-none" title="Preview" tabIndex={-1}/>
//                             ) : (
//                                 <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover opacity-90" alt="Preview"/>
//                             )}
//                             {course.promoVideoUrl && <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors"><div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center shadow-xl border-2 border-white/50 backdrop-blur-sm"><PlayCircle size={36} className="text-white fill-current ml-1"/></div></div>}
//                         </div>

//                         {/* 2. Pendaftaran & Fasilitas */}
//                         <div className="bg-white rounded-[32px] shadow-xl border border-gray-200 p-8">
//                             <div className="mb-8 text-center bg-gray-50 p-6 rounded-3xl border border-gray-100">
//                                 <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Investasi Program</p>
//                                 <h2 className="text-4xl font-black text-gray-900">{course.price === 0 ? <span className="text-green-600">GRATIS</span> : `Rp ${course.price.toLocaleString('id-ID')}`}</h2>
//                             </div>
//                             <div className="mb-8 space-y-3">
//                                 {isEnrolled ? (
//                                     enrollmentStatus === 'active' ? (
//                                         <Link href={`/courses/${courseId}/play`} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"><PlayCircle size={20}/> Masuk Kelas</Link>
//                                     ) : ( <div className="bg-yellow-50 text-yellow-700 p-4 rounded-2xl border-2 border-yellow-200 text-center font-bold text-xs uppercase">Menunggu Verifikasi</div> )
//                                 ) : (
//                                     isRegistrationOpen ? ( <button onClick={handleRegisterClick} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-red-700 transition-all uppercase tracking-widest text-xs"><FileText size={20} className="inline mr-2"/> Daftar Sekarang</button>
//                                     ) : ( <button disabled className="w-full bg-gray-100 text-gray-400 font-bold py-4 rounded-2xl cursor-not-allowed border-2 border-gray-200 uppercase tracking-widest text-xs">Pendaftaran Ditutup</button> )
//                                 )}
//                             </div>
//                             <div className="space-y-5 pt-6 border-t-2 border-dashed border-gray-100">
//                                 <h4 className="font-black text-gray-900 text-xs uppercase tracking-[0.2em] mb-2">Fasilitas Pelatihan:</h4>
//                                 <ul className="space-y-3 text-xs text-gray-600 font-bold uppercase tracking-tight">
//                                     {course.facilities?.length > 0 ? course.facilities.map((f:string,i:number)=>(<li key={i} className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> {f}</li>)) : (
//                                         <>
//                                             <li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Akses {getTotalJP()} JP Materi</li>
//                                             <li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Sertifikat Digital</li>
//                                             <li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Diskusi & Konsultasi</li>
//                                         </>
//                                     )}
//                                 </ul>
//                             </div>
//                         </div>

//                         {/* List Peserta REAL (Integration) */}
//                         <div className="bg-white rounded-[32px] border border-gray-200 p-6 shadow-lg">
//                             <h4 className="font-black text-gray-900 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2 justify-between">
//                                 <span className="flex items-center gap-2"><Users size={16} className="text-red-600"/> Daftar Peserta & Progres</span>
//                                 {totalActive > 0 && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">Total: {totalActive}</span>}
//                             </h4>
//                             <div className="space-y-3">
//                                 {activeParticipants.length > 0 ? activeParticipants.slice(0, 5).map((p, i) => (
//                                     <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-50 transition-colors">
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
//                                                 {p.displayAvatar ? <img src={getImageUrl(p.displayAvatar)} alt={p.displayName} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-500 text-xs">{p.displayName?.charAt(0)}</div>}
//                                             </div>
//                                             <span className="text-xs font-bold text-gray-700">{p.displayName}</span>
//                                         </div>
//                                         <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${p.isLulus ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.displayStatus}</span>
//                                     </div>
//                                 )) : (
//                                     <p className="text-center text-gray-400 text-xs italic py-4">Belum ada peserta aktif.</p>
//                                 )}
//                             </div>
//                         </div>

//                          {/* List Calon Peserta (Pending) - BARU SESUAI PERMINTAAN */}
//                          {pendingParticipants.length > 0 && (
//                             <div className="bg-yellow-50 rounded-[32px] border border-yellow-200 p-6 shadow-lg">
//                                 <h4 className="font-black text-yellow-800 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
//                                     <UserPlus size={16} className="text-yellow-600"/> Pendaftar Menunggu Verifikasi
//                                 </h4>
//                                 <div className="space-y-3">
//                                     {pendingParticipants.slice(0, 5).map((p, i) => (
//                                         <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-yellow-100 hover:bg-yellow-100/50 transition-colors">
//                                             <div className="flex items-center gap-3">
//                                                 <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
//                                                     {p.displayAvatar ? <img src={getImageUrl(p.displayAvatar)} alt={p.displayName} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-600 text-xs">{p.displayName?.charAt(0)}</div>}
//                                                 </div>
//                                                 <span className="text-xs font-bold text-gray-700">{p.displayName}</span>
//                                             </div>
//                                             <span className="text-[9px] font-black px-2 py-1 rounded-md uppercase bg-gray-200 text-gray-600">Menunggu</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Bantuan (Penanggung Jawab) */}
//                         <div className="bg-gray-900 rounded-[32px] p-6 text-white text-center shadow-lg">
//                             <h4 className="font-black text-sm uppercase tracking-widest mb-2">Butuh Bantuan?</h4>
//                             <p className="text-[10px] text-gray-400 mb-4 px-4 leading-relaxed">Hubungi Penanggung Jawab jika Anda mengalami kendala pendaftaran atau teknis.</p>
//                             <div className="grid grid-cols-2 gap-3">
//                                 <button onClick={handleWhatsApp} className="bg-green-600 p-3 rounded-xl flex flex-col items-center hover:bg-green-500 transition-colors group">
//                                     <MessageCircle size={20} className="group-hover:scale-110 transition-transform"/>
//                                     <span className="text-[10px] font-bold mt-1">WhatsApp</span>
//                                 </button>
//                                 <a href="mailto:admin@humanis.or.id" className="bg-white/10 p-3 rounded-xl flex flex-col items-center hover:bg-white/20 transition-colors group">
//                                     <Mail size={20} className="group-hover:scale-110 transition-transform"/>
//                                     <span className="text-[10px] font-bold mt-1">Email</span>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { api, getImageUrl } from '@/lib/api';
// import { useAuth } from '@/lib/AuthProvider';
// import Protected from '@/components/Protected';
// import { 
//     Clock, BookOpen, User, CheckCircle, Award, 
//     MessageSquare, PlayCircle, Lock, ArrowLeft, 
//     FileText, Loader2, Send, HelpCircle, Download,
//     ChevronRight, X, HeadphonesIcon, Monitor, ExternalLink, Menu,
//     Image as ImageIcon, BarChart2, Paperclip, AlertTriangle, 
//     Users, Mail, MessageCircle, Calendar, Mic, FileCheck, 
//     ChevronDown, ChevronUp, Video, UserPlus 
// } from 'lucide-react';
// import Link from 'next/link';
// import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// // Helper Youtube Embed (FIXED + AUTOPLAY)
// const getYoutubeEmbed = (url: string) => {
//     try {
//         if (!url) return null;
//         let videoId = '';
//         if (url.includes('youtu.be')) {
//             videoId = url.split('/').pop() || '';
//         } else if (url.includes('youtube.com')) {
//             const params = new URLSearchParams(new URL(url).search);
//             videoId = params.get('v') || '';
//         }
        
//         if (!videoId) return null;
//         // Tambahkan parameter autoplay=1&mute=1 agar browser mengizinkan autoplay
//         return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
//     } catch { return null; }
// };

// export default function CourseDetailPage() {
//     const params = useParams();
//     const router = useRouter();
//     const { user } = useAuth();
//     const rawId = params?.id || params?.courseId;
//     const courseId = Array.isArray(rawId) ? rawId[0] : (rawId as string);

//     // --- STATE UTAMA ---
//     const [course, setCourse] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [isEnrolled, setIsEnrolled] = useState(false);
//     const [enrollmentStatus, setEnrollmentStatus] = useState<string>('');
//     const [showRegisterModal, setShowRegisterModal] = useState(false);
//     const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

//     // --- STATE PLAYER & DATA ---
//     const [activeLesson, setActiveLesson] = useState<any>(null);
//     const [progressData, setProgressData] = useState<any>(null);
//     const [messages, setMessages] = useState<any[]>([]);
//     const [chatMessage, setChatMessage] = useState('');
//     const [showChat, setShowChat] = useState(false);
//     const [showMobileMenu, setShowMobileMenu] = useState(false);
//     const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
    
//     // --- STATE PESERTA ---
//     const [activeParticipants, setActiveParticipants] = useState<any[]>([]); 
//     const [pendingParticipants, setPendingParticipants] = useState<any[]>([]); 
//     const [totalActive, setTotalActive] = useState(0);

//     // --- REFS ---
//     const progressBarRef = useRef<HTMLDivElement>(null);
//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     // 1. INITIAL LOAD
//     useEffect(() => {
//         if (!courseId) return;
//         loadFullData();
//     }, [courseId, user]);

//     // 2. FIX ARIA
//     useEffect(() => {
//         if (progressBarRef.current) {
//             const percent = Math.round(progressData?.percent || 0);
//             progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
//             progressBarRef.current.style.width = `${percent}%`;
//         }
//     }, [progressData]);

//     // 3. AUTO SCROLL CHAT
//     useEffect(() => {
//         if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages, showChat]);

//     const loadFullData = async () => {
//         try {
//             setLoading(true);
            
//             // 1. Ambil Data Course
//             const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
//             const cData = res.course || res;
//             setCourse(cData);

//             // 2. AMBIL DATA PESERTA
//             try {
//                 const partsRes = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
//                 const allData = partsRes.participants || [];

//                 const getParticipantName = (p: any) => p.user?.name || p.name || p.studentName || "Peserta Terdaftar";
//                 const getParticipantAvatar = (p: any) => p.user?.avatarUrl || p.avatarUrl || null;

//                 const activeList = allData.filter((p: any) => p.status === 'active' || p.status === 'approved').map((p: any) => {
//                     const rawProgress = Number(p.progress);
//                     const progressValue = Number.isFinite(rawProgress) ? Math.max(0, Math.min(100, Math.round(rawProgress))) : 0;
//                     const isLulus = progressValue >= 100 || p.isCompleted === true;

//                     return {
//                         ...p,
//                         displayName: getParticipantName(p),
//                         displayAvatar: getParticipantAvatar(p),
//                         isLulus: isLulus,
//                         displayStatus: isLulus ? 'LULUS' : 'BERJALAN'
//                     };
//                 });
                
//                 const pendingList = allData.filter((p: any) => !p.status || p.status === 'pending' || p.status === 'waiting').map((p: any) => ({
//                     ...p,
//                     displayName: getParticipantName(p),
//                     displayAvatar: getParticipantAvatar(p)
//                 }));

//                 setActiveParticipants(activeList);
//                 setPendingParticipants(pendingList);
//                 setTotalActive(activeList.length);

//             } catch (err) { console.error("Gagal load peserta:", err); }

//             // 3. Cek Periode
//             if (cData.registrationPeriod && !cData.registrationPeriod.isForever) {
//                 const now = new Date();
//                 const end = cData.registrationPeriod.endDate ? new Date(cData.registrationPeriod.endDate) : null;
//                 if (end) {
//                     end.setHours(23, 59, 59, 999);
//                     if (now > end) setIsRegistrationOpen(false);
//                 }
//             }

//             // 4. Cek Enrollment User Login
//             if (user) {
//                 const statusRes = await api(`/api/enrollments/check/${courseId}?t=${Date.now()}`);
//                 setIsEnrolled(statusRes.isEnrolled);
//                 setEnrollmentStatus(statusRes.status); 

//                 if (statusRes.isEnrolled && statusRes.status === 'active') {
//                     const [prog, msg] = await Promise.all([
//                         api(`/api/progress/${courseId}`),
//                         api(`/api/courses/${courseId}/messages`)
//                     ]);
//                     setProgressData(prog);
//                     setMessages(msg || []);

//                     const firstMod = cData.modules?.find((m: any) => m.isActive);
//                     const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
//                     if (firstLes) setActiveLesson(firstLes);
//                 }
//             }
//         } catch (e) { console.error(e); } finally { setLoading(false); }
//     };

//     const handleRegisterClick = () => {
//         if (!isRegistrationOpen) return;
//         if (!user) { router.push(`/login?redirect=/courses/${courseId}`); return; }
//         setShowRegisterModal(true); 
//     };

//     const handleMarkComplete = async (lessonId: string) => {
//         try {
//             await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } });
//             const updated = await api(`/api/progress/${courseId}`);
//             setProgressData(updated);
//         } catch (e) { alert("Gagal update progres"); }
//     };

//     const handleSendChat = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!chatMessage.trim()) return;
//         try {
//             const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } });
//             setMessages([...messages, res]);
//             setChatMessage('');
//         } catch (e) { alert("Gagal kirim pesan"); }
//     };

//     const handleWhatsApp = () => { window.open('https://wa.me/6281234567890', '_blank'); };
//     const toggleLesson = (id: string) => setExpandedLesson(expandedLesson === id ? null : id);

//     const getTotalJP = () => {
//         if (!course?.modules) return 0;
//         return course.modules.reduce((acc: number, m: any) => {
//             return acc + (m.isActive ? m.lessons?.reduce((lAcc: number, l: any) => lAcc + (l.isActive ? (l.jp || 0) : 0), 0) : 0);
//         }, 0);
//     };

//     const getFirstScheduleDate = () => {
//         if (!course?.modules) return null;
//         for (const mod of course.modules) {
//             if (mod.isActive && mod.lessons) {
//                 for (const les of mod.lessons) {
//                     if (les.isActive && les.schedule) return new Date(les.schedule);
//                 }
//             }
//         }
//         return null;
//     };

//     const isDone = (id: string) => progressData?.completedLessons?.includes(id);

//     const getLessonIcon = (type: string) => {
//         switch(type) {
//             case 'video_url': return <Video size={16}/>;
//             case 'poll': return <HelpCircle size={16}/>;
//             case 'quiz': return <FileCheck size={16}/>;
//             case 'virtual_class': return <Monitor size={16}/>;
//             default: return <FileText size={16}/>;
//         }
//     };

//     const renderContent = () => {
//         if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi untuk memulai.</div>;
//         switch (activeLesson.type) {
//             case 'video_url': return <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"><iframe src={activeLesson.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
//             case 'slide': return <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide"/></div>;
//             case 'pdf': return <div className="aspect-[3/4] md:aspect-video bg-gray-50 rounded-3xl overflow-hidden border shadow-lg"><iframe src={`${getImageUrl(activeLesson.fileUrl)}#toolbar=0`} className="w-full h-full" title="PDF"/></div>;
//             case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold mb-4">{activeLesson.pollQuestion}</h2>{activeLesson.pollOptions?.map((o:string, i:number)=><div key={i} className="p-3 mb-2 bg-gray-50 border rounded-xl">{o}</div>)}</div>;
//             case 'essay': case 'quiz': return (<div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm"><div className="flex items-center gap-4 mb-6"><div className="p-3 bg-red-100 text-red-600 rounded-full"><FileText size={32}/></div><div><h2 className="text-xl font-bold text-gray-900">{activeLesson.title}</h2><p className="text-red-600 text-xs font-bold uppercase tracking-widest">Tugas</p></div></div><div className="prose prose-red max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6"><button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-gray-500 hover:border-red-400 hover:text-red-600 transition-colors"><Paperclip className="mb-1"/> <span className="text-xs font-bold uppercase">Upload Jawaban</span></button></div></div>);
//             default: return <div className="bg-white p-8 rounded-3xl border border-gray-100"><h2 className="text-2xl font-bold">{activeLesson.title}</h2></div>;
//         }
//     };

//     if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
//     if (!course) return <div className="text-center py-20 font-bold text-gray-400">Kursus tidak ditemukan.</div>;

//     const programLabel = course.programType === 'training' ? 'Pelatihan' : 'Kursus';
//     const firstScheduleDate = getFirstScheduleDate();
    
//     // [FIX] Ambil URL Video Youtube dan Format Autoplay
//     const promoVideoUrl = getYoutubeEmbed(course.promoVideoUrl);

//     // =========================================================================================
//     // VIEW 1: MODE PLAYER (JIKA AKTIF)
//     // =========================================================================================
//     if (isEnrolled && enrollmentStatus === 'active') {
//         const percent = Math.round(progressData?.percent || 0);
//         return (
//             <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
//                 <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
//                     <header className="bg-gray-900 text-white p-3 md:p-4 flex items-center justify-between shrink-0 shadow-md z-40">
//                         <div className="flex items-center gap-4">
//                             <Link href="/courses" className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali"><ArrowLeft size={20}/></Link>
//                             <div>
//                                 <h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course.title}</h1>
//                                 <div className="flex items-center gap-2 mt-0.5">
//                                     <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden"><div ref={progressBarRef} className="h-full bg-green-500 rounded-full" role="progressbar" aria-label="Progres Belajar"></div></div>
//                                     <span className="text-[10px] font-bold text-green-400">{percent}% SELESAI</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                              <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-bold text-xs uppercase shadow-lg border border-white/20">{course?.organizer?.charAt(0)}</div>
//                              <button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu"><Menu size={18}/></button>
//                         </div>
//                     </header>

//                     <div className="flex flex-1 overflow-hidden relative">
//                         {/* Sidebar Kiri */}
//                         <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none`}>
//                             <div className="p-5 border-b bg-gray-50/50"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3></div>
//                             <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
//                                 {course.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
//                                     <div key={mod._id}>
//                                         <div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div>
//                                         <div className="space-y-1">
//                                             {mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (
//                                                 <button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`}>
//                                                     {isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}
//                                                     <div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p><p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')} • {les.jp || 0} JP</p></div>
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="p-4 border-t bg-gray-50"><button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-wider shadow-lg"><HeadphonesIcon size={16}/> Konsultasi Pengajar</button></div>
//                         </aside>

//                         {/* Konten Utama Player */}
//                         <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar relative">
//                             <div className="max-w-4xl mx-auto pb-32">
//                                 <div className="mb-8 transition-all duration-500 ease-in-out">{renderContent()}</div>
//                                 {activeLesson?.type !== 'essay' && activeLesson?.type !== 'quiz' && (
//                                     <div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm" dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} />
//                                 )}
//                             </div>
//                             <div className="fixed bottom-0 left-0 lg:left-80 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
//                                 <div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>
//                                 {!isDone(activeLesson?._id) ? (
//                                     <button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl uppercase flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>
//                                 ) : (
//                                     <div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase"><CheckCircle size={18}/> Materi Lulus</div>
//                                 )}
//                             </div>
//                         </main>

//                         {/* Chat Overlay */}
//                         <button onClick={() => setShowChat(!showChat)} className="absolute bottom-24 right-6 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all active:scale-90 flex items-center justify-center" title="Buka Diskusi">
//                             <MessageSquare size={24}/>
//                             {messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}
//                         </button>
//                         {showChat && (
//                             <div className="absolute bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
//                                 <div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center shrink-0">
//                                     <div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div>
//                                     <button onClick={() => setShowChat(false)} className="hover:bg-white/20 p-1 rounded-full" title="Tutup"><X size={18}/></button>
//                                 </div>
//                                 <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scrollbar">
//                                     {messages.map((m, i) => (
//                                         <div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id) ? 'items-end' : 'items-start'}`}>
//                                             <span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span>
//                                             <div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm ${(m.sender?._id === (user as any)?._id) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div>
//                                         </div>
//                                     ))}
//                                     <div ref={messagesEndRef} />
//                                 </div>
//                                 <form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2 shrink-0">
//                                     <input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
//                                     <button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md" title="Kirim"><Send size={16}/></button>
//                                 </form>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </Protected>
//         );
//     }

//     // =========================================================================================
//     // VIEW 2: LANDING PAGE (FINAL LOCKED LAYOUT & REAL DATA)
//     // =========================================================================================
//     return (
//         <div className="min-h-screen bg-gray-50 pb-20 font-sans relative overflow-x-hidden">
//             {showRegisterModal && user && (
//                 <CourseRegistrationModal courseId={courseId} courseTitle={course.title} courseData={course} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => loadFullData()} />
//             )}
            
//             {/* HERO HEADER */}
//             <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white overflow-hidden pb-80">
//                 <div className="absolute inset-0 mix-blend-multiply opacity-30">
//                     <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover filter blur-sm scale-105" alt="Background" />
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 via-transparent to-black/10"></div>

//                 <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
//                         {/* KIRI: Judul & Navigasi */}
//                         <div>
//                             <Link href="/courses" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-xs font-bold tracking-widest group uppercase">
//                                 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Kembali ke Katalog
//                             </Link>
//                             <div className="flex flex-wrap items-center gap-3 mb-4">
//                                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${course.programType === 'training' ? 'bg-white text-red-700' : 'bg-red-900 text-red-100 border border-red-400'}`}>
//                                     {programLabel} Resmi
//                                 </span>
//                                 <span className="flex items-center gap-1.5 text-[10px] font-bold bg-yellow-400/20 text-yellow-200 px-4 py-1.5 rounded-full border border-yellow-400/30 backdrop-blur-md">
//                                     <Award size={14} className="text-yellow-400"/> Sertifikat Tersedia
//                                 </span>
//                             </div>
//                             <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-lg tracking-tight mb-4">
//                                 {course.title}
//                             </h1>
//                         </div>

//                         {/* KANAN: Label Info (Jadwal & Stats) */}
//                         <div className="flex justify-start lg:justify-end">
//                             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl text-white min-w-[280px]">
//                                 <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
//                                     <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-900/50">
//                                         <Calendar size={20}/>
//                                     </div>
//                                     <div>
//                                         <p className="text-[10px] font-bold uppercase opacity-70 tracking-wider mb-0.5">Pelaksanaan Awal</p>
//                                         <p className="font-bold text-sm">
//                                             {firstScheduleDate 
//                                                 ? new Date(firstScheduleDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) 
//                                                 : 'Jadwal Menyusul'}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center justify-between text-xs font-bold">
//                                     <div className="flex items-center gap-2"><BookOpen size={16} className="text-white/70"/> {getTotalJP()} JP</div>
//                                     <div className="flex items-center gap-2"><User size={16} className="text-white/70"/> {course.facilitatorIds?.length || 0} Pengajar</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* CONTENT GRID */}
//             <div className="max-w-7xl mx-auto px-6 relative z-10 -mt-64 pb-20">
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
//                     {/* --- KOLOM KIRI (7/12) --- */}
//                     <div className="lg:col-span-7 space-y-8">
                        
//                         {/* 1. TENTANG PELATIHAN */}
//                         <section className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 h-full min-h-[275px] flex flex-col justify-center relative z-30">
//                             <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-3 uppercase tracking-wide">
//                                 <FileText className="text-red-600" size={24}/> Tentang {programLabel}
//                             </h3>
//                             <div className="prose prose-red max-w-none text-gray-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: course.description }} />
//                         </section>

//                         {/* Kurikulum */}
//                         <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
//                             <div className="flex items-center justify-between mb-8 pb-4 border-b">
//                                 <h3 className="text-lg font-black text-gray-800 flex items-center gap-3 uppercase tracking-wide"><BookOpen className="text-red-600" size={24}/> Kurikulum</h3>
//                                 <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border uppercase tracking-wider">{course.modules?.length || 0} Modul</span>
//                             </div>
//                             <div className="space-y-5">
//                                 {course.modules?.filter((m:any) => m.isActive).map((mod: any, idx: number) => (
//                                     <div key={mod._id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
//                                         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200"><h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Modul {idx + 1}: {mod.title}</h4></div>
//                                         <div className="divide-y divide-gray-100 bg-white">
//                                             {mod.lessons?.filter((l:any) => l.isActive).map((les: any) => (
//                                                 <div key={les._id}>
//                                                     <button onClick={() => toggleLesson(les._id)} className="w-full px-6 py-4 flex items-center gap-4 hover:bg-red-50/50 transition-colors text-left group">
//                                                         <div className="text-red-500 bg-red-50 p-2 rounded-lg">{getLessonIcon(les.type)}</div>
//                                                         <div className="flex-1"><p className="text-sm font-bold text-gray-700">{les.title}</p><p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')}</p></div>
//                                                         {expandedLesson === les._id ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
//                                                     </button>
//                                                     {expandedLesson === les._id && (
//                                                         <div className="px-6 pb-6 pt-2 bg-gray-50/50 text-xs text-gray-600 border-t border-gray-100 animate-in slide-in-from-top-2">
//                                                             <div className="grid grid-cols-2 gap-4">
//                                                                 <div><p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider mb-1">Fasilitator</p><p className="font-bold text-gray-800 flex gap-2 items-center"><User size={12}/> {course.facilitatorIds?.[0]?.name || 'Tim Pengajar'}</p></div>
//                                                                 <div><p className="font-bold text-gray-400 uppercase text-[9px] tracking-wider mb-1">Metode</p><p className="font-bold text-gray-800 flex gap-2 items-center"><Mic size={12}/> {les.type?.toUpperCase()}</p></div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>

//                         {/* Fasilitator */}
//                         <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
//                             <h3 className="text-lg font-black text-gray-800 mb-8 flex items-center gap-3 border-b pb-4 uppercase tracking-wide"><User className="text-red-600" size={24}/> Tim Fasilitator</h3>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {course.facilitatorIds?.length > 0 ? (
//                                     course.facilitatorIds.map((fac: any) => (
//                                         <div key={fac._id || fac} className="flex items-center gap-5 p-5 rounded-2xl border border-gray-200 bg-white hover:border-red-200 hover:shadow-lg transition-all text-left w-full cursor-default">
//                                             <div className="relative shrink-0">
//                                                 <img src={getImageUrl(fac.avatarUrl)} className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 shadow-sm" alt={fac.name}/>
//                                             </div>
//                                             <div>
//                                                 <h5 className="font-bold text-gray-900 text-sm uppercase tracking-tight">{fac.name}</h5>
//                                                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Fasilitator PMI</p>
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="text-gray-400 text-xs italic col-span-2 text-center">Belum ada fasilitator yang ditugaskan.</div>
//                                 )}
//                             </div>
//                         </section>
//                     </div>

//                     {/* --- KOLOM KANAN (5/12) --- */}
//                     <div className="lg:col-span-5 space-y-6">
                        
//                         {/* 1. COVER / VIDEO (FIXED YOUTUBE) */}
//                         <div className="aspect-video rounded-[32px] bg-gray-900 overflow-hidden shadow-2xl shadow-red-900/20 relative z-30 group cursor-pointer border-4 border-white">
//                             {promoVideoUrl ? (
//                                 <iframe 
//                                     src={promoVideoUrl} 
//                                     className="w-full h-full" 
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//                                     allowFullScreen 
//                                     title="Course Video"
//                                 />
//                             ) : (
//                                 <div className="relative w-full h-full">
//                                     <img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover opacity-90" alt="Preview"/>
//                                     <div className="absolute inset-0 flex items-center justify-center bg-black/10">
//                                         <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                                             <ImageIcon className="text-white opacity-80" size={32}/>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* 2. Pendaftaran & Fasilitas */}
//                         <div className="bg-white rounded-[32px] shadow-xl border border-gray-200 p-8">
//                             <div className="mb-8 text-center bg-gray-50 p-6 rounded-3xl border border-gray-100">
//                                 <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Investasi Program</p>
//                                 <h2 className="text-4xl font-black text-gray-900">{course.price === 0 ? <span className="text-green-600">GRATIS</span> : `Rp ${course.price.toLocaleString('id-ID')}`}</h2>
//                             </div>
//                             <div className="mb-8 space-y-3">
//                                 {isEnrolled ? (
//                                     enrollmentStatus === 'active' ? (
//                                         <button onClick={() => window.location.reload()} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"><PlayCircle size={20}/> Masuk Kelas</button>
//                                     ) : ( <div className="bg-yellow-50 text-yellow-700 p-4 rounded-2xl border-2 border-yellow-200 text-center font-bold text-xs uppercase">Menunggu Verifikasi</div> )
//                                 ) : (
//                                     isRegistrationOpen ? ( <button onClick={handleRegisterClick} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-red-700 transition-all uppercase tracking-widest text-xs"><FileText size={20} className="inline mr-2"/> Daftar Sekarang</button>
//                                     ) : ( <button disabled className="w-full bg-gray-100 text-gray-400 font-bold py-4 rounded-2xl cursor-not-allowed border-2 border-gray-200 uppercase tracking-widest text-xs">Pendaftaran Ditutup</button> )
//                                 )}
//                             </div>
//                             <div className="space-y-5 pt-6 border-t-2 border-dashed border-gray-100">
//                                 <h4 className="font-black text-gray-900 text-xs uppercase tracking-[0.2em] mb-2">Fasilitas Pelatihan:</h4>
//                                 <ul className="space-y-3 text-xs text-gray-600 font-bold uppercase tracking-tight">
//                                     {course.facilities?.length > 0 ? course.facilities.map((f:string,i:number)=>(<li key={i} className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> {f}</li>)) : (
//                                         <>
//                                             <li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Akses {getTotalJP()} JP Materi</li>
//                                             <li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Sertifikat Digital</li>
//                                             <li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Diskusi & Konsultasi</li>
//                                         </>
//                                     )}
//                                 </ul>
//                             </div>
//                         </div>

//                         {/* List Peserta REAL */}
//                         <div className="bg-white rounded-[32px] border border-gray-200 p-6 shadow-lg">
//                             <h4 className="font-black text-gray-900 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2 justify-between">
//                                 <span className="flex items-center gap-2"><Users size={16} className="text-red-600"/> Daftar Peserta & Progres</span>
//                                 {totalActive > 0 && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">Total: {totalActive}</span>}
//                             </h4>
//                             <div className="space-y-3">
//                                 {activeParticipants.length > 0 ? activeParticipants.slice(0, 5).map((p, i) => (
//                                     <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-50 transition-colors">
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
//                                                 {p.displayAvatar ? <img src={getImageUrl(p.displayAvatar)} alt={p.displayName} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-500 text-xs">{p.displayName?.charAt(0)}</div>}
//                                             </div>
//                                             <span className="text-xs font-bold text-gray-700">{p.displayName}</span>
//                                         </div>
//                                         <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${p.isLulus ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.displayStatus}</span>
//                                     </div>
//                                 )) : (
//                                     <p className="text-center text-gray-400 text-xs italic py-4">Belum ada peserta aktif.</p>
//                                 )}
//                             </div>
//                         </div>

//                          {/* List Calon Peserta (Pending) */}
//                          {pendingParticipants.length > 0 && (
//                             <div className="bg-yellow-50 rounded-[32px] border border-yellow-200 p-6 shadow-lg">
//                                 <h4 className="font-black text-yellow-800 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
//                                     <UserPlus size={16} className="text-yellow-600"/> Pendaftar Menunggu Verifikasi
//                                 </h4>
//                                 <div className="space-y-3">
//                                     {pendingParticipants.slice(0, 5).map((p, i) => (
//                                         <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-yellow-100 hover:bg-yellow-100/50 transition-colors">
//                                             <div className="flex items-center gap-3">
//                                                 <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
//                                                     {p.displayAvatar ? <img src={getImageUrl(p.displayAvatar)} alt={p.displayName} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-600 text-xs">{p.displayName?.charAt(0)}</div>}
//                                                 </div>
//                                                 <span className="text-xs font-bold text-gray-700">{p.displayName}</span>
//                                             </div>
//                                             <span className="text-[9px] font-black px-2 py-1 rounded-md uppercase bg-gray-200 text-gray-600">Menunggu</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Bantuan */}
//                         <div className="bg-gray-900 rounded-[32px] p-6 text-white text-center shadow-lg">
//                             <h4 className="font-black text-sm uppercase tracking-widest mb-2">Butuh Bantuan?</h4>
//                             <p className="text-[10px] text-gray-400 mb-4 px-4 leading-relaxed">Hubungi Penanggung Jawab jika Anda mengalami kendala pendaftaran atau teknis.</p>
//                             <div className="grid grid-cols-2 gap-3">
//                                 <button onClick={handleWhatsApp} className="bg-green-600 p-3 rounded-xl flex flex-col items-center hover:bg-green-500 transition-colors group">
//                                     <MessageCircle size={20} className="group-hover:scale-110 transition-transform"/>
//                                     <span className="text-[10px] font-bold mt-1">WhatsApp</span>
//                                 </button>
//                                 <a href="mailto:admin@humanis.or.id" className="bg-white/10 p-3 rounded-xl flex flex-col items-center hover:bg-white/20 transition-colors group">
//                                     <Mail size={20} className="group-hover:scale-110 transition-transform"/>
//                                     <span className="text-[10px] font-bold mt-1">Email</span>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, getImageUrl } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider';
import Protected from '@/components/Protected';
import { 
    Clock, BookOpen, User, CheckCircle, Award, 
    MessageSquare, PlayCircle, Lock, ArrowLeft, 
    FileText, Loader2, Send, HelpCircle, Download,
    ChevronRight, X, HeadphonesIcon, Monitor, ExternalLink, Menu,
    Image as ImageIcon, BarChart2, Paperclip, AlertTriangle, 
    Users, Mail, MessageCircle, Calendar, Mic, FileCheck, 
    ChevronDown, ChevronUp, Video, UserPlus, Phone 
} from 'lucide-react';
import Link from 'next/link';
import CourseRegistrationModal from '@/components/student/CourseRegistrationModal';

// --- HELPER YOUTUBE EMBED ---
const getYoutubeEmbed = (url: string) => {
    try {
        if (!url) return null;
        let videoId = '';
        if (url.includes('youtu.be')) {
            videoId = url.split('/').pop()?.split('?')[0] || '';
        } else if (url.includes('youtube.com')) {
            const params = new URLSearchParams(new URL(url).search);
            videoId = params.get('v') || '';
        } else if (url.includes('embed')) {
            videoId = url.split('embed/')[1]?.split('?')[0] || '';
        }
        
        if (!videoId) return null;
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`;
    } catch { return null; }
};

// --- HELPER FORMAT TANGGAL ---
const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
};

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const rawId = params?.id || params?.courseId;
    const courseId = Array.isArray(rawId) ? rawId[0] : (rawId as string);

    // --- STATE ---
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [enrollmentStatus, setEnrollmentStatus] = useState<string>('');
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

    // --- STATE UI ---
    const [activeLesson, setActiveLesson] = useState<any>(null);
    const [progressData, setProgressData] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [chatMessage, setChatMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    
    const [expandedModule, setExpandedModule] = useState<string | null>(null); 
    const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
    
    // --- STATE PESERTA ---
    const [activeParticipants, setActiveParticipants] = useState<any[]>([]); 
    const [pendingParticipants, setPendingParticipants] = useState<any[]>([]); 
    const [totalActive, setTotalActive] = useState(0);

    // --- REFS ---
    const progressBarRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 1. INITIAL LOAD
    useEffect(() => {
        if (!courseId) return;
        loadFullData();
    }, [courseId, user]);

    // 2. FIX ARIA PROGRES
    useEffect(() => {
        if (progressBarRef.current) {
            const percent = Math.round(progressData?.percent || 0);
            progressBarRef.current.setAttribute('aria-valuenow', percent.toString());
            progressBarRef.current.style.width = `${percent}%`;
        }
    }, [progressData]);

    // 3. AUTO SCROLL CHAT
    useEffect(() => {
        if (showChat) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, showChat]);

    const loadFullData = async () => {
        try {
            setLoading(true);
            const res = await api(`/api/courses/${courseId}?t=${Date.now()}`);
            const cData = res.course || res;
            setCourse(cData);

            if (cData.modules && cData.modules.length > 0) {
                setExpandedModule(cData.modules[0]._id);
            }

            try {
                const partsRes = await api(`/api/courses/${courseId}/participants?t=${Date.now()}`);
                const allData = partsRes.participants || [];
                const getParticipantName = (p: any) => p.user?.name || p.name || p.studentName || "Peserta";
                const getParticipantAvatar = (p: any) => p.user?.avatarUrl || p.avatarUrl || null;

                const activeList = allData.filter((p: any) => p.status === 'active' || p.status === 'approved').map((p: any) => {
                    const rawProgress = Number(p.progress);
                    const progressValue = Number.isFinite(rawProgress) ? Math.max(0, Math.min(100, Math.round(rawProgress))) : 0;
                    const isLulus = progressValue >= 100 || p.isCompleted === true;
                    return { ...p, displayName: getParticipantName(p), displayAvatar: getParticipantAvatar(p), isLulus: isLulus, displayStatus: isLulus ? 'LULUS' : 'BERJALAN' };
                });
                const pendingList = allData.filter((p: any) => !p.status || p.status === 'pending' || p.status === 'waiting').map((p: any) => ({
                    ...p, displayName: getParticipantName(p), displayAvatar: getParticipantAvatar(p)
                }));
                setActiveParticipants(activeList); setPendingParticipants(pendingList); setTotalActive(activeList.length);
            } catch (err) { console.error("Gagal load peserta:", err); }

            if (cData.registrationPeriod && !cData.registrationPeriod.isForever) {
                const now = new Date();
                const end = cData.registrationPeriod.endDate ? new Date(cData.registrationPeriod.endDate) : null;
                if (end) { end.setHours(23, 59, 59, 999); if (now > end) setIsRegistrationOpen(false); }
            }

            if (user) {
                const statusRes = await api(`/api/enrollments/check/${courseId}?t=${Date.now()}`);
                setIsEnrolled(statusRes.isEnrolled); setEnrollmentStatus(statusRes.status); 
                if (statusRes.isEnrolled && statusRes.status === 'active') {
                    const [prog, msg] = await Promise.all([api(`/api/progress/${courseId}`), api(`/api/courses/${courseId}/messages`)]);
                    setProgressData(prog); setMessages(msg || []);
                    const firstMod = cData.modules?.find((m: any) => m.isActive);
                    const firstLes = firstMod?.lessons?.find((l: any) => l.isActive);
                    if (firstLes) setActiveLesson(firstLes);
                }
            }
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleRegisterClick = () => { if (!isRegistrationOpen) return; if (!user) { router.push(`/login?redirect=/courses/${courseId}`); return; } setShowRegisterModal(true); };
    const handleMarkComplete = async (lessonId: string) => { try { await api(`/api/progress/complete`, { method: 'POST', body: { courseId, lessonId } }); const updated = await api(`/api/progress/${courseId}`); setProgressData(updated); } catch (e) { alert("Gagal update"); } };
    const handleSendChat = async (e: React.FormEvent) => { e.preventDefault(); if (!chatMessage.trim()) return; try { const res = await api(`/api/courses/${courseId}/messages`, { method: 'POST', body: { text: chatMessage } }); setMessages([...messages, res]); setChatMessage(''); } catch (e) { alert("Gagal kirim"); } };
    const handleWhatsApp = () => { window.open('https://wa.me/6281234567890', '_blank'); };
    const toggleLesson = (id: string) => setExpandedLesson(expandedLesson === id ? null : id);
    const toggleModule = (id: string) => setExpandedModule(expandedModule === id ? null : id);

    const getTotalJP = () => {
        if (course?.totalJp > 0) return course.totalJp;
        if (!course?.modules) return 0;
        return course.modules.reduce((acc: number, m: any) => {
            return acc + (m.isActive ? m.lessons?.reduce((lAcc: number, l: any) => lAcc + (l.isActive ? (l.jp || 0) : 0), 0) : 0);
        }, 0);
    };

    const isDone = (id: string) => progressData?.completedLessons?.includes(id);

    const getLessonIcon = (type: string) => {
        switch(type) {
            case 'video_url': return <Video size={16}/>;
            case 'poll': return <HelpCircle size={16}/>;
            case 'quiz': return <FileCheck size={16}/>;
            case 'virtual_class': return <Monitor size={16}/>;
            default: return <FileText size={16}/>;
        }
    };

    const renderContent = () => {
        if (!activeLesson) return <div className="p-10 text-center text-gray-400">Pilih materi.</div>;
        switch (activeLesson.type) {
            case 'video_url': return <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"><iframe src={getYoutubeEmbed(activeLesson.videoUrl) || ''} className="w-full h-full" allowFullScreen title={activeLesson.title}/></div>;
            case 'slide': return <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden border shadow-lg"><iframe src={activeLesson.videoUrl} className="w-full h-full" title="Slide"/></div>;
            case 'pdf': return <div className="aspect-[3/4] md:aspect-video bg-gray-50 rounded-3xl overflow-hidden border shadow-lg"><iframe src={`${getImageUrl(activeLesson.fileUrl)}#toolbar=0`} className="w-full h-full" title="PDF"/></div>;
            case 'poll': return <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm"><h2 className="text-xl font-bold mb-4">{activeLesson.pollQuestion}</h2>{activeLesson.pollOptions?.map((o:string, i:number)=><div key={i} className="p-3 mb-2 bg-gray-50 border rounded-xl">{o}</div>)}</div>;
            case 'essay': case 'quiz': return (<div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm"><div className="flex items-center gap-4 mb-6"><div className="p-3 bg-red-100 text-red-600 rounded-full"><FileText size={32}/></div><div><h2 className="text-xl font-bold text-gray-900">{activeLesson.title}</h2><p className="text-red-600 text-xs font-bold uppercase tracking-widest">Tugas</p></div></div><div className="prose prose-red max-w-none bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6"><div dangerouslySetInnerHTML={{ __html: activeLesson.content }} /></div><div className="border-t pt-6"><button className="flex items-center justify-center w-full gap-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-gray-500 hover:border-red-400 hover:text-red-600 transition-colors"><Paperclip className="mb-1"/> <span className="text-xs font-bold uppercase">Upload Jawaban</span></button></div></div>);
            default: return <div className="bg-white p-8 rounded-3xl border border-gray-100"><h2 className="text-2xl font-bold">{activeLesson.title}</h2></div>;
        }
    };

    // [FIX] Chat Handler (Placeholder Logic)
    const handleChatWithUser = (targetUser: any) => {
        if (!user) {
            alert("Silakan login untuk memulai chat.");
            router.push('/login');
            return;
        }
        setShowChat(true);
        if (targetUser && targetUser.name) {
            setChatMessage(`Halo ${targetUser.name}, saya ingin bertanya...`);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-red-600" size={40}/></div>;
    if (!course) return <div className="text-center py-20 font-bold text-gray-400">Kursus tidak ditemukan.</div>;

    const programLabel = course.programType === 'training' ? 'Pelatihan' : 'Kursus';
    const promoVideoUrl = getYoutubeEmbed(course.promoVideoUrl);

    // --- VIEW 1: PLAYER (LOGIN & ACTIVE) ---
    if (isEnrolled && enrollmentStatus === 'active') {
        const percent = Math.round(progressData?.percent || 0);
        return (
            <Protected roles={['STUDENT', 'FACILITATOR', 'SUPER_ADMIN']}>
                <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
                    <header className="bg-gray-900 text-white p-3 md:p-4 flex items-center justify-between shrink-0 shadow-md z-40">
                        <div className="flex items-center gap-4">
                            <Link href="/courses" className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Kembali" aria-label="Kembali"><ArrowLeft size={20}/></Link>
                            <div><h1 className="font-bold text-sm truncate max-w-[150px] md:max-w-md uppercase tracking-tight">{course.title}</h1><div className="flex items-center gap-2 mt-0.5"><div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden"><div ref={progressBarRef} className="h-full bg-green-500 rounded-full"></div></div><span className="text-[10px] font-bold text-green-400">{percent}% SELESAI</span></div></div>
                        </div>
                        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-bold text-xs uppercase border border-white/20">{course?.organizer?.charAt(0)}</div><button className="lg:hidden p-2 bg-white/10 rounded-xl" onClick={() => setShowMobileMenu(!showMobileMenu)} title="Menu" aria-label="Menu"><Menu size={18}/></button></div>
                    </header>
                    <div className="flex flex-1 overflow-hidden relative">
                        <aside className={`absolute lg:relative inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 z-30 flex flex-col shadow-xl lg:shadow-none`}>
                            <div className="p-5 border-b bg-gray-50/50"><h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Kurikulum</h3></div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                                {course.modules?.filter((m:any) => m.isActive).map((mod:any, i:number) => (
                                    <div key={mod._id}><div className="flex items-center gap-2 mb-3 px-2"><span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span><h4 className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">Modul {i+1}: {mod.title}</h4></div><div className="space-y-1">{mod.lessons?.filter((l:any) => l.isActive).map((les:any) => (<button key={les._id} onClick={() => { setActiveLesson(les); setShowMobileMenu(false); }} className={`w-full text-left p-3.5 rounded-2xl flex items-center gap-3 transition-all border ${activeLesson?._id === les._id ? 'bg-red-50 border-red-100 shadow-md relative z-10' : 'border-transparent hover:bg-gray-50'}`}>{isDone(les._id) ? <CheckCircle className="text-green-500 shrink-0" size={18}/> : <PlayCircle className="text-gray-300 shrink-0" size={18}/>}<div className="overflow-hidden"><p className={`text-xs font-bold truncate ${activeLesson?._id === les._id ? 'text-red-700' : 'text-gray-600'}`}>{les.title}</p></div></button>))}</div></div>
                                ))}
                            </div>
                        </aside>
                        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/30 custom-scrollbar relative">
                            <div className="max-w-4xl mx-auto pb-32"><div className="mb-8">{renderContent()}</div><div className="prose prose-red max-w-none text-gray-600 leading-relaxed bg-white p-8 rounded-3xl border border-gray-100 shadow-sm" dangerouslySetInnerHTML={{ __html: activeLesson?.content || '' }} /></div>
                            <div className="fixed bottom-0 left-0 lg:left-80 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 flex justify-between items-center z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"><div className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status Materi</div>{!isDone(activeLesson?._id) ? (<button onClick={() => handleMarkComplete(activeLesson?._id)} className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-black text-xs shadow-xl uppercase flex items-center justify-center gap-2"><CheckCircle size={18}/> Tandai Selesai</button>) : (<div className="w-full md:w-auto bg-green-50 text-green-700 border border-green-200 px-8 py-3.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 uppercase"><CheckCircle size={18}/> Materi Lulus</div>)}</div>
                        </main>
                        <button onClick={() => setShowChat(!showChat)} className="absolute bottom-24 right-6 z-40 bg-red-700 text-white p-4 rounded-full shadow-2xl hover:bg-red-800 transition-all flex items-center justify-center" title="Diskusi" aria-label="Diskusi"><MessageSquare size={24}/>{messages.length > 0 && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}</button>
                        {showChat && (
                            <div className="absolute bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden"><div className="p-4 bg-[#8B1E28] text-white flex justify-between items-center"><div className="flex items-center gap-2"><MessageSquare size={18}/><h4 className="text-sm font-bold">Ruang Diskusi</h4></div><button onClick={() => setShowChat(false)} title="Tutup" aria-label="Tutup"><X size={18}/></button></div><div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">{messages.map((m, i) => (<div key={i} className={`flex flex-col ${(m.sender?._id === (user as any)?._id) ? 'items-end' : 'items-start'}`}><span className="text-[10px] font-bold text-gray-500 mb-1 px-1">{m.sender?.name}</span><div className={`py-2 px-3 rounded-2xl text-xs max-w-[85%] shadow-sm ${(m.sender?._id === (user as any)?._id) ? 'bg-[#8B1E28] text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'}`}>{m.message}</div></div>))}<div ref={messagesEndRef} /></div><form onSubmit={handleSendChat} className="p-3 bg-white border-t flex gap-2"><input className="flex-1 text-xs outline-none bg-gray-100 px-4 py-3 rounded-xl" placeholder="Ketik pesan..." value={chatMessage} onChange={e => setChatMessage(e.target.value)} /><button type="submit" className="bg-[#8B1E28] text-white p-3 rounded-xl shadow-md" title="Kirim" aria-label="Kirim"><Send size={16}/></button></form></div>
                        )}
                    </div>
                </div>
            </Protected>
        );
    }

    // --- VIEW 2: LANDING PAGE ---
    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans relative overflow-x-hidden">
            {showRegisterModal && user && (
                <CourseRegistrationModal courseId={courseId} courseTitle={course.title} courseData={course} user={user} onClose={() => setShowRegisterModal(false)} onSuccess={() => loadFullData()} />
            )}
            
            {/* HERO */}
            <div className="relative bg-gradient-to-br from-red-800 via-red-700 to-red-900 text-white overflow-hidden pb-80">
                <div className="absolute inset-0 mix-blend-multiply opacity-30"><img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover filter blur-sm scale-105" alt="Background" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 via-transparent to-black/10"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <div>
                            <Link href="/courses" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-xs font-bold tracking-widest group uppercase" title="Kembali" aria-label="Kembali"><ArrowLeft size={16}/> Kembali ke Katalog</Link>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${course.programType === 'training' ? 'bg-white text-red-700' : 'bg-red-900 text-red-100 border border-red-400'}`}>{programLabel} Resmi</span>
                                {course.hasCertificate && <span className="flex items-center gap-1.5 text-[10px] font-bold bg-yellow-400/20 text-yellow-200 px-4 py-1.5 rounded-full border border-yellow-400/30 backdrop-blur-md"><Award size={14} className="text-yellow-400"/> Sertifikat Tersedia</span>}
                            </div>
                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-lg tracking-tight mb-4">{course.title}</h1>
                        </div>
                        <div className="flex justify-start lg:justify-end">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl text-white min-w-[280px]">
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                                    <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-900/50"><Calendar size={20}/></div>
                                    <div><p className="text-[10px] font-bold uppercase opacity-70 tracking-wider mb-0.5">Pelaksanaan Dimulai</p><p className="font-bold text-sm">{course.executionPeriod?.isForever ? 'Fleksibel' : (course.executionPeriod?.startDate ? formatDate(course.executionPeriod.startDate) : 'Jadwal Menyusul')}</p></div>
                                </div>
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <div className="flex items-center gap-2"><BookOpen size={16} className="text-white/70"/> {course.totalJp || 0} JP</div>
                                    <div className="flex items-center gap-2"><User size={16} className="text-white/70"/> {course.facilitatorIds?.length || 0} Pengajar</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-6 relative z-10 -mt-64 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* KOLOM KIRI (7/12) */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Tentang */}
                        <section className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 h-full min-h-[275px] flex flex-col justify-center relative z-30">
                            <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-3 uppercase tracking-wide"><FileText className="text-red-600" size={24}/> Tentang {programLabel}</h3>
                            <div className="prose prose-red max-w-none text-gray-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: course.description }} />
                        </section>

                        {/* Kurikulum */}
                        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b">
                                <h3 className="text-lg font-black text-gray-800 flex items-center gap-3 uppercase tracking-wide"><BookOpen className="text-red-600" size={24}/> Kurikulum</h3>
                                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border uppercase tracking-wider">{course.modules?.length || 0} Modul</span>
                            </div>
                            <div className="space-y-4">
                                {course.modules?.filter((m:any) => m.isActive).map((mod: any, idx: number) => (
                                    <div key={mod._id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <button onClick={() => toggleModule(mod._id)} className="w-full bg-gray-50 px-6 py-5 flex justify-between items-center text-left hover:bg-gray-100 transition-colors">
                                            <div><h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Modul {idx + 1}: {mod.title}</h4><p className="text-[10px] text-gray-500 font-medium mt-1">{mod.lessons?.length || 0} Materi Pembelajaran</p></div>
                                            {expandedModule === mod._id ? <ChevronUp size={20} className="text-gray-400"/> : <ChevronDown size={20} className="text-gray-400"/>}
                                        </button>
                                        {expandedModule === mod._id && (
                                            <div className="bg-white divide-y divide-gray-50 animate-in slide-in-from-top-2 border-t border-gray-100">
                                                {mod.lessons?.filter((l:any) => l.isActive).map((les: any) => (
                                                    <div key={les._id} className="px-6 py-4 flex items-center gap-4 hover:bg-red-50/30 transition-colors">
                                                        <div className="p-2 rounded-lg bg-red-50 text-red-500">{getLessonIcon(les.type)}</div>
                                                        <div className="flex-1"><p className="text-sm font-bold text-gray-700">{les.title}</p><p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{les.type?.replace('_', ' ')} • {les.jp || 0} JP</p></div>
                                                        {les.isMandatory && <span className="text-[9px] bg-red-100 text-red-600 px-2 py-0.5 rounded border border-red-200 uppercase font-bold">Wajib</span>}
                                                    </div>
                                                ))}
                                                {(!mod.lessons || mod.lessons.length === 0) && <div className="p-4 text-center text-xs text-gray-400 italic">Belum ada materi.</div>}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Tim Fasilitator */}
                        {course.facilitatorIds?.length > 0 && (
                            <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
                                <h3 className="text-lg font-black text-gray-800 mb-8 flex items-center gap-3 border-b pb-4 uppercase tracking-wide"><User className="text-red-600" size={24}/> Tim Fasilitator</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.facilitatorIds.map((fac: any) => (
                                        <div key={fac._id || fac} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 bg-white hover:border-red-200 hover:shadow-md transition-all">
                                            <img src={getImageUrl(fac.avatarUrl)} className="w-12 h-12 rounded-full object-cover border border-gray-100" alt={fac.name}/>
                                            <div><h5 className="font-bold text-gray-900 text-sm">{fac.name}</h5><p className="text-[10px] text-gray-500 uppercase font-bold mt-0.5">Fasilitator PMI</p></div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* KOLOM KANAN (5/12) */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Video */}
                        <div className="aspect-video rounded-[32px] bg-gray-900 overflow-hidden shadow-2xl shadow-red-900/20 relative z-30 group cursor-pointer border-4 border-white">
                            {promoVideoUrl ? (
                                <iframe src={promoVideoUrl} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Course Video" />
                            ) : (
                                <div className="relative w-full h-full"><img src={getImageUrl(course.thumbnailUrl)} className="w-full h-full object-cover opacity-90" alt="Preview"/><div className="absolute inset-0 flex items-center justify-center bg-black/10"><ImageIcon className="text-white opacity-80" size={32}/></div></div>
                            )}
                        </div>

                        {/* Daftar & Fasilitas */}
                        <div className="bg-white rounded-[32px] shadow-xl border border-gray-200 p-8">
                            <div className="mb-6 text-center bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Investasi Program</p>
                                <h2 className="text-4xl font-black text-gray-900">{course.price === 0 ? <span className="text-green-600">GRATIS</span> : `Rp ${course.price.toLocaleString('id-ID')}`}</h2>
                            </div>
                            <div className="mb-6 bg-blue-50 p-4 rounded-2xl border border-blue-100 text-sm space-y-3">
                                <div className="flex justify-between items-center"><span className="flex items-center gap-2 text-blue-800 font-bold"><Calendar size={16}/> Pendaftaran</span><span className="text-xs font-bold text-gray-600 bg-white px-2 py-1 rounded border">{course.registrationPeriod?.isForever ? 'Selamanya' : `${formatDate(course.registrationPeriod?.startDate)} - ${formatDate(course.registrationPeriod?.endDate)}`}</span></div>
                                <div className="flex justify-between items-center"><span className="flex items-center gap-2 text-blue-800 font-bold"><Clock size={16}/> Pelaksanaan</span><span className="text-xs font-bold text-gray-600 bg-white px-2 py-1 rounded border">{course.executionPeriod?.isForever ? 'Fleksibel' : `${formatDate(course.executionPeriod?.startDate)} - ${formatDate(course.executionPeriod?.endDate)}`}</span></div>
                            </div>
                            <div className="mb-8 space-y-3">
                                {isEnrolled ? (
                                    enrollmentStatus === 'active' ? (<button onClick={() => window.location.reload()} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs" title="Masuk Kelas" aria-label="Masuk Kelas"><PlayCircle size={20}/> Masuk Kelas</button>) : ( <div className="bg-yellow-50 text-yellow-700 p-4 rounded-2xl border-2 border-yellow-200 text-center font-bold text-xs uppercase">Menunggu Verifikasi</div> )
                                ) : (
                                    isRegistrationOpen ? ( <button onClick={handleRegisterClick} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-red-700 transition-all uppercase tracking-widest text-xs" title="Daftar Sekarang" aria-label="Daftar Sekarang"><FileText size={20} className="inline mr-2"/> Daftar Sekarang</button>) : ( <button disabled className="w-full bg-gray-100 text-gray-400 font-bold py-4 rounded-2xl cursor-not-allowed border-2 border-gray-200 uppercase tracking-widest text-xs">Pendaftaran Ditutup</button> )
                                )}
                            </div>
                            <div className="space-y-5 pt-6 border-t-2 border-dashed border-gray-100">
                                <h4 className="font-black text-gray-900 text-xs uppercase tracking-[0.2em] mb-2">Fasilitas Pelatihan:</h4>
                                <ul className="space-y-3 text-xs text-gray-600 font-bold uppercase tracking-tight">
                                    {course.facilities?.length > 0 ? course.facilities.map((f:string,i:number)=>(<li key={i} className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> {f}</li>)) : (
                                        <><li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Akses {getTotalJP()} JP Materi</li><li className="flex gap-3"><CheckCircle size={14} className="text-green-600"/> Sertifikat Digital</li></>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* [MOVED] Penanggung Jawab & Kontak */}
                        <div className="bg-white rounded-[32px] border border-gray-200 p-6 shadow-lg">
                            <h4 className="font-black text-gray-900 text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <UserPlus size={16} className="text-red-600"/> Penanggung Jawab
                            </h4>
                            
                            {/* Admin Utama */}
                            <div className="flex gap-4 items-start relative group mb-6 pb-6 border-b border-dashed border-gray-200 last:border-0 last:pb-0 last:mb-0">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">{course.creatorInfo?.name?.charAt(0) || 'A'}</div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Penanggung Jawab Utama</p>
                                    <p className="font-bold text-gray-800 text-sm truncate">{course.creatorInfo?.name || 'Admin Pusat'}</p>
                                    <div className="mt-1 space-y-0.5">
                                        <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={10}/> {course.creatorInfo?.email || '-'}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1"><Phone size={10}/> {course.creatorInfo?.contact || '-'}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleChatWithUser(course.creatorInfo)} 
                                    className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors shadow-sm" 
                                    title="Chat Admin"
                                    aria-label="Chat Admin"
                                >
                                    <MessageCircle size={16}/>
                                </button>
                            </div>

                            {/* PIC Tambahan List */}
                            {course.pics?.map((pic: any, idx: number) => (
                                <div key={idx} className="flex gap-4 items-start relative group mb-4 pb-4 border-b border-dashed border-gray-200 last:border-0 last:pb-0 last:mb-0">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center font-bold text-sm shrink-0">{pic.name?.charAt(0)}</div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">PIC Tambahan</p>
                                        <p className="font-bold text-gray-800 text-sm truncate">{pic.name}</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5 mb-0.5">{pic.pmiStatus}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={10}/> {pic.email}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleChatWithUser(pic)} 
                                        className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors shadow-sm" 
                                        title="Chat PIC"
                                        aria-label="Chat PIC"
                                    >
                                        <MessageCircle size={16}/>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* List Peserta */}
                        <div className="bg-white rounded-[32px] border border-gray-200 p-6 shadow-lg">
                            <h4 className="font-black text-gray-900 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2 justify-between">
                                <span className="flex items-center gap-2"><Users size={16} className="text-red-600"/> Peserta & Progres</span>
                                {totalActive > 0 && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">{totalActive}</span>}
                            </h4>
                            <div className="space-y-3">
                                {activeParticipants.length > 0 ? activeParticipants.slice(0, 5).map((p, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">{p.displayAvatar ? <img src={getImageUrl(p.displayAvatar)} alt={p.displayName} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-500 text-xs">{p.displayName?.charAt(0)}</div>}</div>
                                            <span className="text-xs font-bold text-gray-700">{p.displayName}</span>
                                        </div>
                                        <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${p.isLulus ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.displayStatus}</span>
                                    </div>
                                )) : ( <p className="text-center text-gray-400 text-xs italic py-4">Belum ada peserta aktif.</p> )}
                            </div>
                        </div>
                        
                        {/* Pending Participants */}
                        {pendingParticipants.length > 0 && (
                            <div className="bg-yellow-50 rounded-[32px] border border-yellow-200 p-6 shadow-lg">
                                <h4 className="font-black text-yellow-800 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><UserPlus size={16} className="text-yellow-600"/> Menunggu Verifikasi</h4>
                                <div className="space-y-3">{pendingParticipants.slice(0, 5).map((p, i) => (<div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-yellow-100 hover:bg-yellow-100/50 transition-colors"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">{p.displayAvatar ? <img src={getImageUrl(p.displayAvatar)} alt={p.displayName} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-yellow-200 flex items-center justify-center font-bold text-yellow-600 text-xs">{p.displayName?.charAt(0)}</div>}</div><span className="text-xs font-bold text-gray-700">{p.displayName}</span></div><span className="text-[9px] font-black px-2 py-1 rounded-md uppercase bg-gray-200 text-gray-600">Menunggu</span></div>))}</div>
                            </div>
                        )}
                        {/* BAGIAN "BUTUH BANTUAN" DIHILANGKAN SESUAI PERMINTAAN */}
                    </div>
                </div>
            </div>
        </div>
    );
}
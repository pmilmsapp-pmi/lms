'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/AuthProvider'; // [BARU] Perlu user info untuk modal
import Protected from '@/components/Protected';
import { LayoutDashboard, BookOpen, Pencil, Settings } from 'lucide-react'; // [BARU] Icon Pencil

// Import Komponen Pecahan
import CourseContentEditor from '@/components/admin/courses/CourseContentEditor';
import CourseOperatorDashboard from '@/components/admin/courses/CourseOperatorDashboard';
import CourseFormModal from '@/components/admin/courses/CourseFormModal'; // [BARU] Import Modal

export default function AdminCourseDetailPage() {
    const params = useParams();
    const courseId = params?.id as string;
    const { user } = useAuth(); // [BARU] Ambil user login
    
    const [activeTab, setActiveTab] = useState<'content' | 'operator'>('content');
    const [course, setCourse] = useState<any>(null);
    const [facilitators, setFacilitators] = useState<any[]>([]); 
    const [loading, setLoading] = useState(true);

    // [BARU] State untuk Modal Edit
    const [showEditModal, setShowEditModal] = useState(false);

    const loadCourseData = async () => {
        try {
            const data = await api(`/api/courses/${courseId}?t=${Date.now()}`);
            setCourse(data.course || data);
        } catch (e) {
            console.error("Gagal load course", e);
        }
    };

    const loadFacilitators = async () => {
        try {
            const res = await api('/api/admin/users');
            if (res.users) {
                const facs = res.users.filter((u: any) => u.role === 'FACILITATOR' || u.role === 'SUPER_ADMIN');
                setFacilitators(facs);
            }
        } catch (e) {
            console.error("Gagal load fasilitator", e);
        }
    };

    useEffect(() => {
        if (courseId) {
            setLoading(true);
            Promise.all([loadCourseData(), loadFacilitators()])
                .finally(() => setLoading(false));
        }
    }, [courseId]);

    if (loading) return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

    return (
        <Protected roles={["FACILITATOR", "SUPER_ADMIN"]}>
            <div className="max-w-7xl mx-auto p-4 md:p-8 pb-32">
                
                {/* --- HEADER HALAMAN --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 mb-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-gray-900">{course?.title}</h1>
                            {/* [BARU] Tombol Edit Info Utama */}
                            <button 
                                onClick={() => setShowEditModal(true)} 
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                title="Edit Informasi Pelatihan (Judul, Harga, Cover, dll)"
                            >
                                <Pencil size={20} />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${course?.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {course?.isPublished ? 'PUBLISHED' : 'DRAFT'}
                            </span>
                            <span className="text-sm text-gray-500">• {course?.programType === 'training' ? 'Diklat Resmi' : 'Kursus Mandiri'}</span>
                        </div>
                    </div>
                    
                    {/* Navigasi Tab */}
                    <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                        <button 
                            onClick={() => setActiveTab('content')} 
                            className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'content' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <BookOpen size={18}/> Editor Materi
                        </button>
                        <button 
                            onClick={() => setActiveTab('operator')} 
                            className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${activeTab === 'operator' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <LayoutDashboard size={18}/> Dashboard Operator
                        </button>
                    </div>
                </div>

                {/* --- RENDER KONTEN TAB --- */}
                {activeTab === 'content' ? (
                    <CourseContentEditor 
                        course={course} 
                        courseId={courseId}
                        refreshData={loadCourseData} 
                        facilitators={facilitators}  
                    />
                ) : (
                    <CourseOperatorDashboard 
                        courseId={courseId} 
                        course={course}
                    />
                )}

                {/* --- [BARU] MODAL EDIT INFO PELATIHAN --- */}
                {showEditModal && (
                    <CourseFormModal 
                        course={course}
                        facilitators={facilitators}
                        currentUser={user}
                        onClose={() => setShowEditModal(false)}
                        onSuccess={() => {
                            setShowEditModal(false);
                            loadCourseData(); // Refresh data setelah edit
                        }}
                    />
                )}

            </div>
        </Protected>
    );
}



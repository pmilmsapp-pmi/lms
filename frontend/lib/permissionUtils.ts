// // Helper: Cek string permission di array user
// const hasPermission = (user: any, permissionKey: string) => {
//     if (!user || !user.permissions || !Array.isArray(user.permissions)) return false;
//     return user.permissions.includes(permissionKey);
// };

// // =========================================================
// // 1. CEK WILAYAH (CORE LOGIC) - DIPERKETAT
// // =========================================================
// export const checkRegionAccess = (user: any, course: any) => {
//     if (!user || !course) return false;
    
//     // Normalisasi string
//     const userRole = (user.role || '').toUpperCase();
//     const userScope = (user.regionScope || 'national').toLowerCase();
//     const courseRegion = (course.regionCode || 'national').toLowerCase();
//     const organizer = (course.organizer || '').toLowerCase();
    
//     const myId = String(user._id || user.id || '');
//     const creatorId = String(course.instructor?._id || course.creatorInfo?.id || '');

//     // 1. Pemilik selalu punya akses penuh
//     if (creatorId === myId) return true; 
    
//     // 2. Super Admin & Admin Nasional (God Mode)
//     if (userRole === 'SUPER_ADMIN') return true;
//     if (userRole === 'ADMIN' && userScope === 'national') return true; 

//     // 3. Admin Wilayah (Provinsi/Kabupaten)
//     if (userRole === 'ADMIN') {
        
//         // [BLOCKER 1] Data Pusat/Nasional -> Admin Wilayah TIDAK BOLEH Sentuh/Lihat Detail
//         // Kecuali jika kebijakan Anda membolehkan 'Read Only' untuk data pusat,
//         // tapi untuk amannya kita blokir akses kelola.
//         if (organizer.includes('pusat') || organizer.includes('nasional') || courseRegion === 'national') {
//             return false;
//         }

//         // [BLOCKER 2] Data Provinsi Lain -> BLOKIR TOTAL
//         if (userScope === 'province') {
//             const myProvinces = (user.managedProvinces || []).map((p:string) => p.toLowerCase());
            
//             // Cek apakah regionCode ATAU Organizer mengandung nama provinsi user?
//             const regionMatch = myProvinces.some((p:string) => courseRegion.includes(p));
//             const organizerMatch = myProvinces.some((p:string) => organizer.includes(p));

//             // JIKA TIDAK COCOK SAMA SEKALI -> FALSE (Mata Mati)
//             return regionMatch || organizerMatch;
//         }
        
//         // [BLOCKER 3] Data Kabupaten Lain
//         if (userScope === 'regency') {
//             const myRegencies = (user.managedRegencies || []).map((r:string) => r.toLowerCase());
            
//             const regionMatch = myRegencies.some((r:string) => courseRegion.includes(r));
//             const organizerMatch = myRegencies.some((r:string) => organizer.includes(r));

//             return regionMatch || organizerMatch;
//         }
//     }

//     // Default: Tidak punya akses wilayah
//     return false;
// };

// // =========================================================
// // 2. EXPORTED FUNCTIONS
// // =========================================================

// // A. IZIN MELIHAT DETAIL (MATA)
// // Admin Jabar melihat data Jatim -> Harus return FALSE
// export const canViewCourse = (user: any, course: any) => {
//     return checkRegionAccess(user, course);
// };

// // B. IZIN EDIT KONTEN (Toggle: "Kelola Pelatihan")
// export const canEditCourseContent = (user: any, course: any) => {
//     if (!checkRegionAccess(user, course)) return false; // Cek Wilayah Dulu
//     if (user.role === 'SUPER_ADMIN') return true;
    
//     // Owner
//     const isOwner = String(course.creatorInfo?.id || course.instructor?._id) === String(user.id || user._id);
//     if (isOwner) return true;

//     return hasPermission(user, 'manage_courses');
// };

// // C. IZIN VERIFIKASI (Toggle: "Verifikasi Pengajuan")
// export const canVerifyCourse = (user: any, course: any) => {
//     if (!checkRegionAccess(user, course)) return false; // Cek Wilayah Dulu
//     if (user.role === 'SUPER_ADMIN') return true;

//     const p1 = hasPermission(user, 'verify_course_submission'); 
//     const p2 = hasPermission(user, 'verify_enrollments');
//     const p3 = hasPermission(user, 'verify_approval'); 

//     return p1 || p2 || p3;
// };

// // D. ALIAS (Wajib ada biar gak error import)
// export const canAccessCourse = canViewCourse;
// export const canManageCourse = canVerifyCourse; 
// export const canAccessReviewButton = canVerifyCourse;


// frontend/lib/permissionUtils.ts

// Helper: Cek string permission di array user
const hasPermission = (user: any, permissionKey: string) => {
    if (!user || !user.permissions || !Array.isArray(user.permissions)) return false;
    return user.permissions.includes(permissionKey);
};

// =========================================================
// 1. CEK WILAYAH (CORE LOGIC) - DIPERKETAT & HIERARKIS
// =========================================================
export const checkRegionAccess = (user: any, course: any) => {
    if (!user || !course) return false;
    
    // Normalisasi string
    const userRole = (user.role || '').toUpperCase();
    const userScope = (user.regionScope || 'national').toLowerCase();
    const courseRegion = String(course.regionCode || 'national'); 
    const organizer = (course.organizer || '').toLowerCase();
    
    const myId = String(user._id || user.id || '');
    const creatorId = String(course.instructor?._id || course.creatorInfo?.id || '');

    // 1. Pemilik selalu punya akses penuh
    if (creatorId === myId) return true; 
    
    // 2. Super Admin & Admin Nasional (God Mode)
    if (userRole === 'SUPER_ADMIN') return true;
    if (userRole === 'ADMIN' && userScope === 'national') return true; 

    // 3. Admin Wilayah (Provinsi/Kabupaten)
    if (userRole === 'ADMIN') {
        
        // [BLOCKER 1] Data Pusat/Nasional -> Admin Wilayah TIDAK BOLEH Sentuh
        if (organizer.includes('pusat') || organizer.includes('nasional') || courseRegion === 'national') {
            return false;
        }

        // [BLOCKER 2] Logic Provinsi (Hierarki: Provinsi BISA akses Kabupaten di bawahnya)
        // Admin Provinsi "32" (Jabar) boleh akses course "32" (Jabar) DAN "32.73" (Bandung)
        if (userScope === 'province') {
            const myProvinces = (user.managedProvinces || []); 
            // Cek apakah region course DIAWALI dengan kode provinsi admin?
            // Contoh: "32.73" startsWith "32" -> TRUE
            return myProvinces.some((p: string) => courseRegion.startsWith(p));
        }
        
        // [BLOCKER 3] Logic Kabupaten (Strict Match)
        // Admin Kota "32.73" HANYA boleh akses "32.73"
        if (userScope === 'regency') {
            const myRegencies = (user.managedRegencies || []);
            return myRegencies.includes(courseRegion);
        }
    }

    // Default: Tidak punya akses
    return false;
};

// =========================================================
// 2. EXPORTED FUNCTIONS
// =========================================================

// A. IZIN MELIHAT DETAIL (MATA)
export const canViewCourse = (user: any, course: any) => {
    return checkRegionAccess(user, course);
};

// B. IZIN EDIT KONTEN (Toggle: "Kelola Pelatihan")
export const canEditCourseContent = (user: any, course: any) => {
    if (!checkRegionAccess(user, course)) return false; // Cek Wilayah Dulu
    if (user.role === 'SUPER_ADMIN') return true;
    
    // Owner
    const isOwner = String(course.creatorInfo?.id || course.instructor?._id) === String(user.id || user._id);
    if (isOwner) return true;

    return hasPermission(user, 'manage_courses');
};

// C. IZIN VERIFIKASI (Review Button)
export const canVerifyCourse = (user: any, course: any) => {
    if (!checkRegionAccess(user, course)) return false; // Cek Wilayah Dulu
    if (user.role === 'SUPER_ADMIN') return true;

    const p1 = hasPermission(user, 'verify_course_submission'); 
    const p2 = hasPermission(user, 'verify_enrollments');
    const p3 = hasPermission(user, 'verify_approval'); 

    return p1 || p2 || p3;
};

// D. ALIAS (Wajib ada)
export const canAccessCourse = canViewCourse;
export const canManageCourse = canVerifyCourse; 
export const canAccessReviewButton = canVerifyCourse;
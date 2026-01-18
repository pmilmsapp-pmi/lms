// // // // // Daftar Izin Standar untuk STUDENT sesuai Tabel Gambar 5
// // // // export const STUDENT_DEFAULT_PERMISSIONS = [
// // // //     // 1. PELATIHAN
// // // //     'course.register',      // Mendaftar pelatihan
// // // //     'course.access',        // Mengakses materi (jika terdaftar)
// // // //     'certificate.download', // Download sertifikat sendiri

// // // //     // 2. BLOG
// // // //     'blog.view',            // Melihat dan membaca Blog
// // // //     'blog.create',          // Membuat Blog (diajukan ke Admin)
// // // //     'blog.comment',         // Mengirim komentar/reply

// // // //     // 3. FORUM
// // // //     'forum.view_list',      // Melihat judul Topik (umum)
// // // //     'forum.view_content',   // Melihat isi Forum lengkap
// // // //     'forum.create_topic',   // Mengajukan Topik Forum
// // // //     'forum.reply',          // Mengirim komentar/reply

// // // //     // 4. PROFILE
// // // //     'profile.edit'          // Edit profil sendiri
// // // // ];

// // // // humanis/backend/src/config/permissions.ts

// // // export const STUDENT_DEFAULT_PERMISSIONS = [
// // //     // --- 1. PELATIHAN ---
// // //     'course.register',       // Mendaftar pelatihan
// // //     'course.access',         // Mengakses materi (jika terdaftar)
// // //     'certificate.download',  // Download sertifikat sendiri

// // //     // --- 2. BLOG ---
// // //     'blog.view',             // Melihat dan membaca Blog
// // //     'blog.create',           // Membuat Blog (diajukan ke Admin)
// // //     'blog.comment',          // Mengirim komentar/reply

// // //     // --- 3. FORUM ---
// // //     'forum.view_list',       // Melihat judul Topik
// // //     'forum.view_content',    // Melihat isi Forum lengkap
// // //     'forum.create_topic',    // Mengajukan Topik Forum
// // //     'forum.reply',           // Mengirim komentar/reply

// // //     // --- 4. PROFILE ---
// // //     'profile.edit'           // Edit profil sendiri
// // // ];


// // // humanis/backend/src/config/permissions.ts

// // // 1. Permission Standar untuk STUDENT
// // export const STUDENT_DEFAULT_PERMISSIONS = [
// //     // Pelatihan
// //     'course.register',       // Daftar pelatihan
// //     'course.access',         // Akses materi (jika terdaftar)
// //     'certificate.download',  // Download sertifikat sendiri

// //     // Blog (Hanya Create, tidak bisa Publish)
// //     'blog.view',             // Baca blog
// //     'blog.create',           // Buat Draft Blog (Status: Pending)
// //     'blog.comment',          // Komentar

// //     // Forum
// //     'forum.view_list',
// //     'forum.view_content',
// //     'forum.create_topic',    // Buat topik (jika diizinkan)
// //     'forum.reply',

// //     // Profile
// //     'profile.edit'
// // ];

// // // 2. Permission Standar untuk FACILITATOR
// // export const FACILITATOR_DEFAULT_PERMISSIONS = [
// //     // --- Mewarisi Hak Akses Student (Bisa jadi peserta juga) ---
// //     'course.register', 
// //     'course.access', 
// //     'certificate.download',
// //     'blog.view', 
// //     'blog.create', // Buat Draft Blog (Status: Pending)
// //     'blog.comment',
// //     'forum.view_list', 
// //     'forum.view_content', 
// //     'forum.create_topic', 
// //     'forum.reply',
// //     'profile.edit',

// //     // --- Hak Akses KHUSUS PENGAJAR (Scope Restricted) ---
// //     // Hanya berlaku untuk kursus milik sendiri (Dicek via middleware requireCourseOwnership)
// //     'course.create',         // Mengajukan kursus baru
// //     'course.update_own',     // Edit kursus sendiri
// //     'course.manage_content', // Tambah modul/materi di kursus sendiri
// //     'certificate.manage_own' // Kelola sertifikat di kursus sendiri
// // ];

// // humanis/backend/src/config/permissions.ts

// // 1. Permission Standar untuk STUDENT
// export const STUDENT_DEFAULT_PERMISSIONS = [
//     'course.register',       // Daftar pelatihan
//     'course.access',         // Akses materi
//     'certificate.download',  // Download sertifikat
//     'blog.view',             // Baca blog
//     'blog.create',           // Buat Draft Blog
//     'blog.comment',          // Komentar Blog
//     'forum.view_list',
//     'forum.view_content',
//     'forum.create_topic',    
//     'forum.reply',
//     'profile.edit'
// ];

// // 2. Permission Standar untuk FACILITATOR
// export const FACILITATOR_DEFAULT_PERMISSIONS = [
//     // Mewarisi Student
//     ...STUDENT_DEFAULT_PERMISSIONS,

//     // Khusus Pengajar (Hanya untuk kursus miliknya)
//     'course.create',         
//     'course.update_own',     
//     'course.manage_content', 
//     'certificate.manage_own' 
// ];

// // 3. Permission Tersedia untuk ADMIN (Checkbox List)
// // Ini tidak otomatis diberikan, tapi dipilih manual oleh Superadmin
// export const ADMIN_AVAILABLE_PERMISSIONS = [
//     // --- GRUP A: OPERASIONAL PELATIHAN ---
//     { id: 'manage_courses', label: 'Kelola Pelatihan (Create/Edit/Delete)', group: 'Operasional' },
//     { id: 'verify_enrollments', label: 'Verifikasi Pendaftaran Peserta', group: 'Operasional' },
//     { id: 'manage_certificates', label: 'Kelola Template Sertifikat', group: 'Operasional' },
    
//     // --- GRUP B: MANAJEMEN USER ---
//     { id: 'manage_users', label: 'Kelola User (Edit/Banned)', group: 'User Management' },
    
//     // --- GRUP C: KONTEN PUBLIK ---
//     { id: 'manage_blog', label: 'Moderasi Blog & Berita (Publish)', group: 'Konten' },
//     { id: 'manage_forum', label: 'Moderasi Forum Diskusi', group: 'Konten' },
//     { id: 'manage_library', label: 'Kelola Pustaka Digital', group: 'Konten' },

//     // --- GRUP D: CMS & TAMPILAN WEB (Admin Nasional/Provinsi) ---
//     { id: 'manage_cms_design', label: '🎨 Kelola Desain (Banner/Slider/Tema)', group: 'CMS Web' },
//     { id: 'manage_cms_info', label: 'ℹ️ Kelola Informasi (Profil/Kontak)', group: 'CMS Web' },

//     // --- GRUP E: SYSTEM CORE (Hanya Admin Pusat/IT) ---
//     { id: 'view_reports', label: '📊 Lihat Laporan & Statistik', group: 'Sistem' },
//     { id: 'manage_system_core', label: '⛔ Pengaturan Inti (Server/API/Payment)', group: 'Sistem', danger: true }
// ];


// backend/src/config/permissions.ts

// 1. Daftar Permission String (Untuk disimpan di Database User)
export const PERMISSIONS = {
    COURSE: {
        MANAGE: 'manage_courses',       // Admin: CRUD semua kursus di wilayahnya
        CREATE: 'course.create',        // Fasilitator: Buat kursus
        UPDATE_OWN: 'course.update_own' // Fasilitator: Edit punya sendiri
    },
    USER: {
        MANAGE: 'manage_users',         // Kelola user
        VERIFY: 'verify_enrollments'    // Verifikasi pendaftaran
    },
    CONTENT: {
        BLOG: 'manage_blog',
        FORUM: 'manage_forum',
        LIBRARY: 'manage_library',
        CMS_DESIGN: 'manage_cms_design',
        CMS_INFO: 'manage_cms_info'
    },
    SYSTEM: {
        VIEW_REPORTS: 'view_reports',
        CORE: 'manage_system_core'
    }
};

// 2. Default Roles (Saat user register/diassign role)
export const DEFAULT_ROLE_PERMISSIONS = {
    STUDENT: [
        'course.register', 
        'course.access', 
        'certificate.download',
        'blog.view',
        'forum.reply'
    ],
    FACILITATOR: [
        'course.register', 'course.access', // Mewarisi student
        'course.create', 
        'course.update_own',
        'course.manage_content',
        'certificate.manage_own'
    ],
    // Admin permissions kosong by default karena dipilih manual (checkbox)
    ADMIN: [], 
    SUPER_ADMIN: ['*'] // Wildcard (logic di auth middleware)
};

// 3. List untuk Frontend (Checkbox di Admin Panel)
export const ADMIN_AVAILABLE_PERMISSIONS = [
    { id: PERMISSIONS.COURSE.MANAGE, label: 'Kelola Pelatihan (Create/Edit/Delete)', group: 'Operasional' },
    { id: PERMISSIONS.USER.VERIFY, label: 'Verifikasi Pendaftaran Peserta', group: 'Operasional' },
    { id: PERMISSIONS.USER.MANAGE, label: 'Kelola User (Edit/Banned)', group: 'User Management' },
    { id: PERMISSIONS.CONTENT.BLOG, label: 'Moderasi Blog', group: 'Konten' },
    { id: PERMISSIONS.CONTENT.FORUM, label: 'Moderasi Forum', group: 'Konten' },
    { id: PERMISSIONS.CONTENT.CMS_DESIGN, label: 'Kelola Desain Web', group: 'CMS' },
];
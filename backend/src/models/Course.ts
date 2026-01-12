// // // // // // // // // // import mongoose from 'mongoose';

// // // // // // // // // // // --- SCHEMA MATERI (LESSON) ---
// // // // // // // // // // const lessonSchema = new mongoose.Schema({
// // // // // // // // // //   title: { type: String, required: true },
// // // // // // // // // //   type: { 
// // // // // // // // // //     type: String, 
// // // // // // // // // //     enum: ['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class'], 
// // // // // // // // // //     default: 'lesson' 
// // // // // // // // // //   },
  
// // // // // // // // // //   // Konten Text / URL
// // // // // // // // // //   videoUrl: String,
// // // // // // // // // //   content: String, 
// // // // // // // // // //   fileUrl: String,
  
// // // // // // // // // //   // Metadata
// // // // // // // // // //   jp: { type: Number, default: 0 },
// // // // // // // // // //   scheduleDate: Date,
// // // // // // // // // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  
// // // // // // // // // //   // Fitur Kuis & Esai & Polling
// // // // // // // // // //   quizDuration: Number,
// // // // // // // // // //   questions: [{
// // // // // // // // // //     question: String,
// // // // // // // // // //     options: [String], // Kosong jika Esai
// // // // // // // // // //     correctIndex: Number
// // // // // // // // // //   }],
// // // // // // // // // //   pollQuestion: String,
// // // // // // // // // //   pollOptions: [String],
  
// // // // // // // // // //   // Integrasi Google Classroom
// // // // // // // // // //   classroomData: {
// // // // // // // // // //     id: String,
// // // // // // // // // //     name: String,
// // // // // // // // // //     enrollmentCode: String,
// // // // // // // // // //     alternateLink: String
// // // // // // // // // //   },

// // // // // // // // // //   // Status
// // // // // // // // // //   isActive: { type: Boolean, default: true },
// // // // // // // // // //   isMandatory: { type: Boolean, default: false }
// // // // // // // // // // });

// // // // // // // // // // // --- SCHEMA MODUL ---
// // // // // // // // // // const moduleSchema = new mongoose.Schema({
// // // // // // // // // //   title: { type: String, required: true },
// // // // // // // // // //   lessons: [lessonSchema],
// // // // // // // // // //   isActive: { type: Boolean, default: true },
// // // // // // // // // //   isMandatory: { type: Boolean, default: false },
// // // // // // // // // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// // // // // // // // // //   jp: Number,
// // // // // // // // // //   scheduleDate: Date
// // // // // // // // // // });

// // // // // // // // // // // --- SCHEMA KURSUS UTAMA ---
// // // // // // // // // // const courseSchema = new mongoose.Schema({
// // // // // // // // // //   title: { type: String, required: true },
// // // // // // // // // //   slug: { type: String, unique: true, sparse: true }, // Slug URL
// // // // // // // // // //   description: String,
// // // // // // // // // //   price: { type: Number, default: 0 },
// // // // // // // // // //   thumbnailUrl: String,
  
// // // // // // // // // //   // Kategori & Level
// // // // // // // // // //   category: String,
// // // // // // // // // //   level: String,
// // // // // // // // // //   programType: { type: String, default: 'training' }, // 'training' atau 'course'
// // // // // // // // // //   organizer: { type: String, default: 'PMI Pusat' },
  
// // // // // // // // // //   // Status Publikasi
// // // // // // // // // //   isPublished: { type: Boolean, default: false },
  
// // // // // // // // // //   // Tim Fasilitator (Array ID User)
// // // // // // // // // //   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
// // // // // // // // // //   // Struktur Modul
// // // // // // // // // //   modules: [moduleSchema],
  
// // // // // // // // // //   // Kompetensi & Sertifikat
// // // // // // // // // //   competencies: [String],
// // // // // // // // // //   includeCompetenciesInCertificate: { type: Boolean, default: false },

// // // // // // // // // //   // [PENTING] Field ini yang sebelumnya hilang, sekarang sudah ditambahkan
// // // // // // // // // //   certificateConfig: {
// // // // // // // // // //     certificateNumber: { type: String, default: '' }, // Format Nomor: 00{NO}/...
// // // // // // // // // //     executionDate: Date,
// // // // // // // // // //     city: String,
// // // // // // // // // //     signatoryName: String,
// // // // // // // // // //     signatoryPosition: String
// // // // // // // // // //   }

// // // // // // // // // // }, { 
// // // // // // // // // //   timestamps: true 
// // // // // // // // // // });

// // // // // // // // // // // Mencegah error jika model sudah ter-compile sebelumnya
// // // // // // // // // // export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
// // // // // // // // // import mongoose from 'mongoose';
// // // // // // // // // import PDFDocument from 'pdfkit';

// // // // // // // // // // --- SCHEMA MATERI (LESSON) ---
// // // // // // // // // const lessonSchema = new mongoose.Schema({
// // // // // // // // //   title: { type: String, required: true },
// // // // // // // // //   type: { 
// // // // // // // // //     type: String, 
// // // // // // // // //     enum: ['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class'], 
// // // // // // // // //     default: 'lesson' 
// // // // // // // // //   },
  
// // // // // // // // //   // Konten
// // // // // // // // //   videoUrl: String,
// // // // // // // // //   content: String, 
// // // // // // // // //   fileUrl: String,
  
// // // // // // // // //   // Metadata
// // // // // // // // //   jp: { type: Number, default: 0 },
// // // // // // // // //   scheduleDate: Date,
// // // // // // // // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  
// // // // // // // // //   // Fitur Interaktif
// // // // // // // // //   quizDuration: Number,
// // // // // // // // //   questions: [{
// // // // // // // // //     question: String,
// // // // // // // // //     options: [String],
// // // // // // // // //     correctIndex: Number
// // // // // // // // //   }],
// // // // // // // // //   pollQuestion: String,
// // // // // // // // //   pollOptions: [String],
  
// // // // // // // // //   // Google Classroom
// // // // // // // // //   classroomData: {
// // // // // // // // //     id: String,
// // // // // // // // //     name: String,
// // // // // // // // //     enrollmentCode: String,
// // // // // // // // //     alternateLink: String
// // // // // // // // //   },

// // // // // // // // //   // Status
// // // // // // // // //   isActive: { type: Boolean, default: true },
// // // // // // // // //   isMandatory: { type: Boolean, default: false }
// // // // // // // // // });

// // // // // // // // // // --- SCHEMA MODUL ---
// // // // // // // // // const moduleSchema = new mongoose.Schema({
// // // // // // // // //   title: { type: String, required: true },
// // // // // // // // //   lessons: [lessonSchema],
// // // // // // // // //   isActive: { type: Boolean, default: true },
// // // // // // // // //   isMandatory: { type: Boolean, default: false },
// // // // // // // // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// // // // // // // // //   jp: Number,
// // // // // // // // //   scheduleDate: Date
// // // // // // // // // });

// // // // // // // // // // --- SCHEMA KURSUS UTAMA ---
// // // // // // // // // const courseSchema = new mongoose.Schema({
// // // // // // // // //   title: { type: String, required: true },
// // // // // // // // //   slug: { type: String, unique: true, sparse: true },
// // // // // // // // //   description: String,
// // // // // // // // //   price: { type: Number, default: 0 },
// // // // // // // // //   thumbnailUrl: String,
  
// // // // // // // // //   category: String,
// // // // // // // // //   level: String,
// // // // // // // // //   programType: { type: String, default: 'training' },
// // // // // // // // //   organizer: { type: String, default: 'PMI Pusat' },
  
// // // // // // // // //   isPublished: { type: Boolean, default: false },
  
// // // // // // // // //   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
// // // // // // // // //   modules: [moduleSchema],
  
// // // // // // // // //   competencies: [String],
// // // // // // // // //   includeCompetenciesInCertificate: { type: Boolean, default: false },

// // // // // // // // //   // [PENTING] Konfigurasi Sertifikat
// // // // // // // // //   certificateConfig: {
// // // // // // // // //     certificateNumber: { type: String, default: '' }, // Format: 00{NO}/...
// // // // // // // // //     startNumber: { type: Number, default: 1 },        // Default mulai dari 1
// // // // // // // // //     executionDate: Date,
// // // // // // // // //     city: String,
// // // // // // // // //     signatoryName: String,
// // // // // // // // //     signatoryPosition: String
// // // // // // // // //   }

// // // // // // // // // }, { 
// // // // // // // // //   timestamps: true 
// // // // // // // // // });

// // // // // // // // // export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

// // // // // // // import mongoose from 'mongoose';

// // // // // // // const lessonSchema = new mongoose.Schema({
// // // // // // //   title: { type: String, required: true },
// // // // // // //   type: { 
// // // // // // //     type: String, 
// // // // // // //     enum: ['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class'], 
// // // // // // //     default: 'lesson' 
// // // // // // //   },
// // // // // // //   videoUrl: String,
// // // // // // //   content: String, 
// // // // // // //   fileUrl: String,
// // // // // // //   jp: { type: Number, default: 0 },
// // // // // // //   scheduleDate: Date,
// // // // // // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// // // // // // //   quizDuration: Number,
// // // // // // //   questions: [{
// // // // // // //     question: String,
// // // // // // //     options: [String],
// // // // // // //     correctIndex: Number
// // // // // // //   }],
// // // // // // //   pollQuestion: String,
// // // // // // //   pollOptions: [String],
// // // // // // //   classroomData: {
// // // // // // //     id: String,
// // // // // // //     name: String,
// // // // // // //     enrollmentCode: String,
// // // // // // //     alternateLink: String
// // // // // // //   },
// // // // // // //   isActive: { type: Boolean, default: true },
// // // // // // //   isMandatory: { type: Boolean, default: false }
// // // // // // // });

// // // // // // // const moduleSchema = new mongoose.Schema({
// // // // // // //   title: { type: String, required: true },
// // // // // // //   lessons: [lessonSchema],
// // // // // // //   isActive: { type: Boolean, default: true },
// // // // // // //   isMandatory: { type: Boolean, default: false },
// // // // // // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// // // // // // //   jp: Number,
// // // // // // //   scheduleDate: Date
// // // // // // // });

// // // // // // // const courseSchema = new mongoose.Schema({
// // // // // // //   title: { type: String, required: true },
// // // // // // //   slug: { type: String, unique: true, sparse: true },
// // // // // // //   description: String,
// // // // // // //   price: { type: Number, default: 0 },
// // // // // // //   thumbnailUrl: String,
// // // // // // //   category: String,
// // // // // // //   level: String,
// // // // // // //   programType: { type: String, default: 'training' },
// // // // // // //   organizer: { type: String, default: 'PMI Pusat' },
// // // // // // //   isPublished: { type: Boolean, default: false },
// // // // // // //   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// // // // // // //   modules: [moduleSchema],
  
// // // // // // //   // [FIX] UBAH TIPE DATA KOMPETENSI JADI OBJECT
// // // // // // //   competencies: [{
// // // // // // //     code: String,
// // // // // // //     title: String
// // // // // // //   }],
  
// // // // // // //   includeCompetenciesInCertificate: { type: Boolean, default: false },

// // // // // // //   certificateConfig: {
// // // // // // //     certificateNumber: { type: String, default: '' },
// // // // // // //     startNumber: { type: Number, default: 1 },
// // // // // // //     executionDate: Date,
// // // // // // //     city: String,
// // // // // // //     signatoryName: String,
// // // // // // //     signatoryPosition: String
// // // // // // //   }

// // // // // // // }, { 
// // // // // // //   timestamps: true 
// // // // // // // });

// // // // // // // export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
// // // // // // import mongoose from 'mongoose';

// // // // // // const lessonSchema = new mongoose.Schema({
// // // // // //   title: { type: String, required: true },
// // // // // //   type: { 
// // // // // //     type: String, 
// // // // // //     enum: ['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class'], 
// // // // // //     default: 'lesson' 
// // // // // //   },
// // // // // //   videoUrl: String,
// // // // // //   content: String, 
// // // // // //   fileUrl: String,
// // // // // //   jp: { type: Number, default: 0 },
// // // // // //   scheduleDate: Date,
// // // // // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// // // // // //   quizDuration: Number,
// // // // // //   questions: [{
// // // // // //     question: String,
// // // // // //     options: [String],
// // // // // //     correctIndex: Number
// // // // // //   }],
// // // // // //   pollQuestion: String,
// // // // // //   pollOptions: [String],
// // // // // //   classroomData: {
// // // // // //     id: String,
// // // // // //     name: String,
// // // // // //     enrollmentCode: String,
// // // // // //     alternateLink: String
// // // // // //   },
// // // // // //   isActive: { type: Boolean, default: true },
// // // // // //   isMandatory: { type: Boolean, default: false }
// // // // // // });

// // // // // // const moduleSchema = new mongoose.Schema({
// // // // // //   title: { type: String, required: true },
// // // // // //   lessons: [lessonSchema],
// // // // // //   isActive: { type: Boolean, default: true },
// // // // // //   isMandatory: { type: Boolean, default: false },
// // // // // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// // // // // //   jp: Number,
// // // // // //   scheduleDate: Date
// // // // // // });

// // // // // // const courseSchema = new mongoose.Schema({
// // // // // //   title: { type: String, required: true },
// // // // // //   slug: { type: String, unique: true, sparse: true },
// // // // // //   description: String,
// // // // // //   price: { type: Number, default: 0 },
// // // // // //   thumbnailUrl: String,
// // // // // //   category: String,
// // // // // //   level: String,
// // // // // //   programType: { type: String, default: 'training' },
// // // // // //   organizer: { type: String, default: 'PMI Pusat' },
// // // // // //   isPublished: { type: Boolean, default: false },
// // // // // //   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// // // // // //   modules: [moduleSchema],
  
// // // // // //   // Kompetensi sebagai Array of Object
// // // // // //   competencies: [{
// // // // // //     code: String,
// // // // // //     title: String
// // // // // //   }],
  
// // // // // //   includeCompetenciesInCertificate: { type: Boolean, default: false },

// // // // // //   certificateConfig: {
// // // // // //     certificateNumber: { type: String, default: '' },
// // // // // //     startNumber: { type: Number, default: 1 },
// // // // // //     executionDate: Date,
// // // // // //     city: String,
// // // // // //     signatoryName: String,
// // // // // //     signatoryPosition: String
// // // // // //   }

// // // // // // }, { 
// // // // // //   timestamps: true 
// // // // // // });

// // // // // // // Gunakan Named Export
// // // // // // export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
// // // // // // // Tambahkan Default Export untuk kompatibilitas
// // // // // // export default Course;
// // // // // import mongoose from 'mongoose';

// // // // // const lessonSchema = new mongoose.Schema({
// // // // //   title: { type: String, required: true },
// // // // //   type: { 
// // // // //     type: String, 
// // // // //     enum: ['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class'], 
// // // // //     default: 'lesson' 
// // // // //   },
// // // // //   videoUrl: String,
// // // // //   content: String, 
// // // // //   fileUrl: String,
// // // // //   jp: { type: Number, default: 0 },
// // // // //   scheduleDate: Date,
// // // // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// // // // //   quizDuration: Number,
// // // // //   questions: [{
// // // // //     question: String,
// // // // //     options: [String],
// // // // //     correctIndex: Number
// // // // //   }],
// // // // //   pollQuestion: String,
// // // // //   pollOptions: [String],
// // // // //   classroomData: {
// // // // //     id: String,
// // // // //     name: String,
// // // // //     enrollmentCode: String,
// // // // //     alternateLink: String
// // // // //   },
// // // // //   isActive: { type: Boolean, default: true },
// // // // //   isMandatory: { type: Boolean, default: false }
// // // // // });

// // // // // const moduleSchema = new mongoose.Schema({
// // // // //   title: { type: String, required: true },
// // // // //   lessons: [lessonSchema],
// // // // //   isActive: { type: Boolean, default: true },
// // // // //   isMandatory: { type: Boolean, default: false },
// // // // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// // // // //   jp: Number,
// // // // //   scheduleDate: Date
// // // // // });

// // // // // const courseSchema = new mongoose.Schema({
// // // // //   title: { type: String, required: true },
// // // // //   slug: { type: String, unique: true, sparse: true },
// // // // //   description: String,
// // // // //   price: { type: Number, default: 0 },
// // // // //   thumbnailUrl: String,
// // // // //   category: String,
// // // // //   level: String,
// // // // //   programType: { type: String, default: 'training' },
// // // // //   organizer: { type: String, default: 'PMI Pusat' },
// // // // //   isPublished: { type: Boolean, default: false },
// // // // //   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// // // // //   modules: [moduleSchema],
  
// // // // //   competencies: [{
// // // // //     code: String,
// // // // //     title: String
// // // // //   }],
  
// // // // //   includeCompetenciesInCertificate: { type: Boolean, default: false },

// // // // //   // --- UPDATED CONFIG ---
// // // // //   certificateConfig: {
// // // // //     certificateNumber: { type: String, default: '' },
// // // // //     startNumber: { type: Number, default: 1 },
// // // // //     executionDate: Date,
// // // // //     city: { type: String, default: '' },
    
// // // // //     // Field Baru (Wajib ada agar data tersimpan)
// // // // //     signatoryName: { type: String, default: '' },
// // // // //     signatoryPosition: { type: String, default: '' },      // Jabatan Indo
// // // // //     signatoryPositionEng: { type: String, default: '' },   // Jabatan Inggris
// // // // //     executorIndo: { type: String, default: '' },           // Pejabat Indo
// // // // //     executorEng: { type: String, default: '' },            // Pejabat Inggris
// // // // //     courseNameIndo: { type: String, default: '' },         // Override Judul Indo
// // // // //     courseNameEng: { type: String, default: '' },          // Judul Inggris
// // // // //     useSignatureImage: { type: Boolean, default: false },  // Checkbox TTD
// // // // //     signatureImageUrl: { type: String, default: '' }       // URL Gambar TTD
// // // // //   }

// // // // // }, { 
// // // // //   timestamps: true 
// // // // // });

// // // // // export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
// // // // // export default Course;
// // // // import mongoose from 'mongoose';

// // // // const lessonSchema = new mongoose.Schema({
// // // //   title: { type: String, required: true },
// // // //   type: { 
// // // //     type: String, 
// // // //     enum: ['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class'], 
// // // //     default: 'lesson' 
// // // //   },
// // // //   videoUrl: String,
// // // //   content: String, 
// // // //   fileUrl: String,
// // // //   jp: { type: Number, default: 0 },
// // // //   scheduleDate: Date,
// // // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// // // //   quizDuration: Number,
// // // //   questions: [{
// // // //     question: String,
// // // //     options: [String],
// // // //     correctIndex: Number
// // // //   }],
// // // //   pollQuestion: String,
// // // //   pollOptions: [String],
// // // //   classroomData: {
// // // //     id: String,
// // // //     name: String,
// // // //     enrollmentCode: String,
// // // //     alternateLink: String
// // // //   },
// // // //   isActive: { type: Boolean, default: true },
// // // //   isMandatory: { type: Boolean, default: false }
// // // // });

// // // // const moduleSchema = new mongoose.Schema({
// // // //   title: { type: String, required: true },
// // // //   lessons: [lessonSchema],
// // // //   isActive: { type: Boolean, default: true },
// // // //   isMandatory: { type: Boolean, default: false },
// // // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// // // //   jp: Number,
// // // //   scheduleDate: Date
// // // // });

// // // // const courseSchema = new mongoose.Schema({
// // // //   title: { type: String, required: true },
// // // //   slug: { type: String, unique: true, sparse: true },
// // // //   description: String,
// // // //   price: { type: Number, default: 0 },
// // // //   thumbnailUrl: String,
// // // //   category: String,
// // // //   level: String,
// // // //   programType: { type: String, default: 'training' },
// // // //   organizer: { type: String, default: 'PMI Pusat' },
// // // //   isPublished: { type: Boolean, default: false },
// // // //   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// // // //   modules: [moduleSchema],
  
// // // //   // --- UPDATED: KOMPETENSI 2 BAHASA ---
// // // //   competencies: [{
// // // //     code: String,
// // // //     title: String,      // Judul Unit (Bahasa Indonesia)
// // // //     titleEng: String    // Unit Title (Bahasa Inggris) - Field Baru
// // // //   }],
  
// // // //   includeCompetenciesInCertificate: { type: Boolean, default: false },

// // // //   // --- CONFIG SERTIFIKAT LENGKAP ---
// // // //   certificateConfig: {
// // // //     certificateNumber: { type: String, default: '' },
// // // //     startNumber: { type: Number, default: 1 },
// // // //     executionDate: Date,
// // // //     city: { type: String, default: '' },
    
// // // //     // Field Penanda Tangan & Judul
// // // //     signatoryName: { type: String, default: '' },
// // // //     signatoryPosition: { type: String, default: '' },      // Jabatan Indo
// // // //     signatoryPositionEng: { type: String, default: '' },   // Jabatan Inggris
// // // //     executorIndo: { type: String, default: '' },           // Pejabat Indo
// // // //     executorEng: { type: String, default: '' },            // Pejabat Inggris
// // // //     courseNameIndo: { type: String, default: '' },         // Override Judul Indo
// // // //     courseNameEng: { type: String, default: '' },          // Judul Inggris
// // // //     useSignatureImage: { type: Boolean, default: false },  // Checkbox TTD
// // // //     signatureImageUrl: { type: String, default: '' }       // URL Gambar TTD
// // // //   }

// // // // }, { 
// // // //   timestamps: true 
// // // // });

// // // // export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
// // // // export default Course;
// // // import mongoose from 'mongoose';

// // // const lessonSchema = new mongoose.Schema({
// // //   title: { type: String, required: true },
// // //   type: { 
// // //     type: String, 
// // //     enum: ['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class'], 
// // //     default: 'lesson' 
// // //   },
// // //   videoUrl: String,
// // //   content: String, 
// // //   fileUrl: String,
// // //   jp: { type: Number, default: 0 },
// // //   scheduleDate: Date,
// // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// // //   quizDuration: Number,
// // //   questions: [{
// // //     question: String,
// // //     options: [String],
// // //     correctIndex: Number
// // //   }],
// // //   pollQuestion: String,
// // //   pollOptions: [String],
// // //   classroomData: {
// // //     id: String,
// // //     name: String,
// // //     enrollmentCode: String,
// // //     alternateLink: String
// // //   },
  
// // //   // [NEW] Field untuk link virtual meeting
// // //   meetingLink: String, 
  
// // //   isActive: { type: Boolean, default: true },
// // //   isMandatory: { type: Boolean, default: false }
// // // });

// // // const moduleSchema = new mongoose.Schema({
// // //   title: { type: String, required: true },
// // //   lessons: [lessonSchema],
// // //   isActive: { type: Boolean, default: true },
// // //   isMandatory: { type: Boolean, default: false },
// // //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// // //   jp: Number,
// // //   scheduleDate: Date
// // // });

// // // const courseSchema = new mongoose.Schema({
// // //   title: { type: String, required: true },
// // //   slug: { type: String, unique: true, sparse: true },
// // //   description: String,
// // //   price: { type: Number, default: 0 },
// // //   thumbnailUrl: String,
// // //   category: String,
// // //   level: String,
// // //   programType: { type: String, default: 'training' },
// // //   organizer: { type: String, default: 'PMI Pusat' },
// // //   isPublished: { type: Boolean, default: false },
// // //   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// // //   modules: [moduleSchema],
  
// // //   // --- UPDATED: KOMPETENSI 2 BAHASA ---
// // //   competencies: [{
// // //     code: String,
// // //     title: String,      // Judul Unit (Bahasa Indonesia)
// // //     titleEng: String    // Unit Title (Bahasa Inggris) - Field Baru
// // //   }],
  
// // //   includeCompetenciesInCertificate: { type: Boolean, default: false },

// // //   // --- CONFIG SERTIFIKAT LENGKAP ---
// // //   certificateConfig: {
// // //     certificateNumber: { type: String, default: '' },
// // //     startNumber: { type: Number, default: 1 },
// // //     executionDate: Date,
// // //     city: { type: String, default: '' },
    
// // //     // Field Penanda Tangan & Judul
// // //     signatoryName: { type: String, default: '' },
// // //     signatoryPosition: { type: String, default: '' },      // Jabatan Indo
// // //     signatoryPositionEng: { type: String, default: '' },   // Jabatan Inggris
// // //     executorIndo: { type: String, default: '' },           // Pejabat Indo
// // //     executorEng: { type: String, default: '' },            // Pejabat Inggris
// // //     courseNameIndo: { type: String, default: '' },         // Override Judul Indo
// // //     courseNameEng: { type: String, default: '' },          // Judul Inggris
// // //     useSignatureImage: { type: Boolean, default: false },  // Checkbox TTD
// // //     signatureImageUrl: { type: String, default: '' }       // URL Gambar TTD
// // //   }

// // // }, { 
// // //   timestamps: true 
// // // });

// // // export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
// // // export default Course;

// // import mongoose from 'mongoose';

// // const lessonSchema = new mongoose.Schema({
// //   title: { type: String, required: true },
// //   type: { 
// //     type: String, 
// //     enum: ['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class'], 
// //     default: 'lesson' 
// //   },
// //   videoUrl: String,
// //   content: String, 
// //   fileUrl: String,
// //   jp: { type: Number, default: 0 },
// //   scheduleDate: Date,
// //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// //   quizDuration: Number,
// //   questions: [{
// //     question: String,
// //     options: [String],
// //     correctIndex: Number
// //   }],
// //   pollQuestion: String,
// //   pollOptions: [String],
// //   classroomData: {
// //     id: String,
// //     name: String,
// //     enrollmentCode: String,
// //     alternateLink: String
// //   },
  
// //   // [NEW] Field untuk link virtual meeting (dari request sebelumnya)
// //   meetingLink: String, 
  
// //   // [NEW] Tambahkan field poin untuk Skema Penilaian
// //   points: { type: Number, default: 0 },

// //   isActive: { type: Boolean, default: true },
// //   isMandatory: { type: Boolean, default: false }
// // });

// // const moduleSchema = new mongoose.Schema({
// //   title: { type: String, required: true },
// //   lessons: [lessonSchema],
// //   isActive: { type: Boolean, default: true },
// //   isMandatory: { type: Boolean, default: false },
// //   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
// //   jp: Number,
// //   scheduleDate: Date
// // });

// // const courseSchema = new mongoose.Schema({
// //   title: { type: String, required: true },
// //   slug: { type: String, unique: true, sparse: true },
// //   description: String,
// //   price: { type: Number, default: 0 },
// //   thumbnailUrl: String,
// //   category: String,
// //   level: String,
// //   programType: { type: String, default: 'training' },
// //   organizer: { type: String, default: 'PMI Pusat' },
// //   isPublished: { type: Boolean, default: false },
// //   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// //   modules: [moduleSchema],
  
// //   // --- KOMPETENSI 2 BAHASA ---
// //   competencies: [{
// //     code: String,
// //     title: String,      // Judul Unit (Bahasa Indonesia)
// //     titleEng: String    // Unit Title (Bahasa Inggris) - Field Baru
// //   }],
  
// //   includeCompetenciesInCertificate: { type: Boolean, default: false },

// //   // --- CONFIG SERTIFIKAT LENGKAP ---
// //   certificateConfig: {
// //     certificateNumber: { type: String, default: '' },
// //     startNumber: { type: Number, default: 1 },
// //     executionDate: Date,
// //     city: { type: String, default: '' },
    
// //     // Field Penanda Tangan & Judul
// //     signatoryName: { type: String, default: '' },
// //     signatoryPosition: { type: String, default: '' },      // Jabatan Indo
// //     signatoryPositionEng: { type: String, default: '' },   // Jabatan Inggris
// //     executorIndo: { type: String, default: '' },           // Pejabat Indo
// //     executorEng: { type: String, default: '' },            // Pejabat Inggris
// //     courseNameIndo: { type: String, default: '' },         // Override Judul Indo
// //     courseNameEng: { type: String, default: '' },          // Judul Inggris
// //     useSignatureImage: { type: Boolean, default: false },  // Checkbox TTD
// //     signatureImageUrl: { type: String, default: '' }       // URL Gambar TTD
// //   }

// // }, { 
// //   timestamps: true 
// // });

// // export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
// // export default Course;
// import mongoose from 'mongoose';

// const lessonSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   type: { 
//     type: String, 
//     enum: ['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class'], 
//     default: 'lesson' 
//   },
//   videoUrl: String,
//   content: String, 
//   fileUrl: String,
//   jp: { type: Number, default: 0 },
//   scheduleDate: Date,
//   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
//   quizDuration: Number,
//   questions: [{
//     question: String,
//     options: [String],
//     correctIndex: Number
//   }],
//   pollQuestion: String,
//   pollOptions: [String],
//   classroomData: {
//     id: String,
//     name: String,
//     enrollmentCode: String,
//     alternateLink: String
//   },
  
//   // Field untuk link virtual meeting
//   meetingLink: String, 
  
//   // [NEW] Tambahkan field poin untuk Skema Penilaian
//   points: { type: Number, default: 0 },

//   isActive: { type: Boolean, default: true },
//   isMandatory: { type: Boolean, default: false }
// });

// const moduleSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   lessons: [lessonSchema],
//   isActive: { type: Boolean, default: true },
//   isMandatory: { type: Boolean, default: false },
//   facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
//   jp: Number,
//   scheduleDate: Date
// });

// const courseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   slug: { type: String, unique: true, sparse: true },
//   description: String,
//   price: { type: Number, default: 0 },
//   thumbnailUrl: String,
//   category: String,
//   level: String,
//   programType: { type: String, default: 'training' },
//   organizer: { type: String, default: 'PMI Pusat' },
//   isPublished: { type: Boolean, default: false },
//   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   modules: [moduleSchema],
  
//   // --- KOMPETENSI 2 BAHASA ---
//   competencies: [{
//     code: String,
//     title: String,      // Judul Unit (Bahasa Indonesia)
//     titleEng: String    // Unit Title (Bahasa Inggris)
//   }],
  
//   includeCompetenciesInCertificate: { type: Boolean, default: false },

//   // --- CONFIG SERTIFIKAT LENGKAP ---
//   certificateConfig: {
//     certificateNumber: { type: String, default: '' },
//     startNumber: { type: Number, default: 1 },
//     executionDate: Date,
//     city: { type: String, default: '' },
    
//     // Field Penanda Tangan & Judul
//     signatoryName: { type: String, default: '' },
//     signatoryPosition: { type: String, default: '' },      // Jabatan Indo
//     signatoryPositionEng: { type: String, default: '' },   // Jabatan Inggris
//     executorIndo: { type: String, default: '' },           // Pejabat Indo
//     executorEng: { type: String, default: '' },            // Pejabat Inggris
//     courseNameIndo: { type: String, default: '' },         // Override Judul Indo
//     courseNameEng: { type: String, default: '' },          // Judul Inggris
//     useSignatureImage: { type: Boolean, default: false },  // Checkbox TTD
//     signatureImageUrl: { type: String, default: '' }       // URL Gambar TTD
//   }

// }, { 
//   timestamps: true 
// });

// export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
// export default Course;


import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['video_url', 'upload_doc', 'quiz', 'essay', 'google_classroom', 'lesson', 'pdf', 'download_doc', 'image', 'slide', 'poll', 'virtual_class'], 
    default: 'lesson' 
  },
  videoUrl: String,
  content: String, 
  fileUrl: String,
  jp: { type: Number, default: 0 },
  scheduleDate: Date,
  facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  quizDuration: Number,
  questions: [{
    question: String,
    options: [String],
    correctIndex: Number
  }],
  pollQuestion: String,
  pollOptions: [String],
  classroomData: {
    id: String,
    name: String,
    enrollmentCode: String,
    alternateLink: String
  },
  meetingLink: String, 
  points: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isMandatory: { type: Boolean, default: false }
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [lessonSchema],
  isActive: { type: Boolean, default: true },
  isMandatory: { type: Boolean, default: false },
  facilitatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  jp: Number,
  scheduleDate: Date
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  description: String,
  price: { type: Number, default: 0 },
  thumbnailUrl: String,
  category: String,
  level: String,
  programType: { type: String, default: 'training' },
  organizer: { type: String, default: 'PMI Pusat' },
  isPublished: { type: Boolean, default: false },
  facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  modules: [moduleSchema],
  
  // [NEW] KONFIGURASI MODE PENDAFTARAN
  registrationMode: { 
    type: String, 
    enum: ['automatic', 'manual'], 
    default: 'manual' 
  }, // automatic = langsung aktif, manual = butuh verifikasi admin
  
  // [NEW] TEMPLATE FORMULIR (Untuk mode manual)
  // Admin mengupload file kosong di sini untuk didownload peserta
  registrationTemplates: [{
    title: String, // Nama file
    url: String    // URL file
  }],

  competencies: [{
    code: String,
    title: String,
    titleEng: String
  }],
  
  includeCompetenciesInCertificate: { type: Boolean, default: false },

  certificateConfig: {
    certificateNumber: { type: String, default: '' },
    startNumber: { type: Number, default: 1 },
    executionDate: Date,
    city: { type: String, default: '' },
    signatoryName: { type: String, default: '' },
    signatoryPosition: { type: String, default: '' },
    signatoryPositionEng: { type: String, default: '' },
    executorIndo: { type: String, default: '' },
    executorEng: { type: String, default: '' },
    courseNameIndo: { type: String, default: '' },
    courseNameEng: { type: String, default: '' },
    useSignatureImage: { type: Boolean, default: false },
    signatureImageUrl: { type: String, default: '' }
  }

}, { 
  timestamps: true 
});

export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;
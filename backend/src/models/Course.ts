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
// //   meetingLink: String, 
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
  
// //   // [BARU] Field tambahan untuk sinkronisasi dengan Frontend
// //   promoVideoUrl: { type: String, default: '' },
// //   hasCertificate: { type: Boolean, default: true },
// //   estimatedDuration: { type: Number, default: 0 },
// //   totalJp: { type: Number, default: 0 }, // Total JP level kursus
  
// //   category: String,
// //   level: String,
// //   programType: { type: String, default: 'training' },
// //   organizer: { type: String, default: 'PMI Pusat' },
// //   isPublished: { type: Boolean, default: false },
// //   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// //   modules: [moduleSchema],
  
// //   // KONFIGURASI PENDAFTARAN (LAMA - TETAP DIPERTAHANKAN)
// //   registrationMode: { 
// //     type: String, 
// //     enum: ['automatic', 'manual'], 
// //     default: 'manual' 
// //   }, 

// //   // [BARU] KONFIGURASI PENDAFTARAN (UNTUK FRONTEND BARU)
// //   registrationMethod: { type: String, default: 'auto' }, // auto / manual
  
// //   registrationConfig: {
// //     requireDocs: { type: Boolean, default: true },
// //     templates: [{
// //       title: String,
// //       url: String
// //     }]
// //   },

// //   // TEMPLATE FORMULIR (LAMA - TETAP DIPERTAHANKAN)
// //   registrationTemplates: [{
// //     title: String, 
// //     url: String    
// //   }],

// //   // PERIODE PENDAFTARAN
// //   registrationPeriod: {
// //     isForever: { type: Boolean, default: true },
// //     startDate: { type: Date },
// //     endDate: { type: Date }
// //   },

// //   // [BARU] PERIODE PELAKSANAAN
// //   executionPeriod: {
// //     isForever: { type: Boolean, default: true },
// //     startDate: { type: Date },
// //     endDate: { type: Date }
// //   },

// //   // [BARU] FASILITAS
// //   facilities: [String],

// //   // [BARU] PIC TAMBAHAN
// //   pics: [{
// //     name: String,
// //     pmiStatus: String,
// //     email: String
// //   }],

// //   // [BARU] INFO PEMBUAT
// //   creatorInfo: {
// //     name: String,
// //     email: String,
// //     contact: String
// //   },

// //   competencies: [{
// //     code: String,
// //     title: String,
// //     titleEng: String
// //   }],
  
// //   includeCompetenciesInCertificate: { type: Boolean, default: false },

// //   certificateConfig: {
// //     certificateNumber: { type: String, default: '' },
// //     startNumber: { type: Number, default: 1 },
// //     executionDate: Date,
// //     city: { type: String, default: '' },
// //     signatoryName: { type: String, default: '' },
// //     signatoryPosition: { type: String, default: '' },
// //     signatoryPositionEng: { type: String, default: '' },
// //     executorIndo: { type: String, default: '' },
// //     executorEng: { type: String, default: '' },
// //     courseNameIndo: { type: String, default: '' },
// //     courseNameEng: { type: String, default: '' },
// //     useSignatureImage: { type: Boolean, default: false },
// //     signatureImageUrl: { type: String, default: '' }
// //   }

// // }, { 
// //   timestamps: true 
// // });

// // export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
// // export default Course;




// // // PEMBAHRUAN DENGAN ROLE BARU

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
//   meetingLink: String, 
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
  
//   // Field sinkronisasi Frontend
//   promoVideoUrl: { type: String, default: '' },
//   hasCertificate: { type: Boolean, default: true },
//   estimatedDuration: { type: Number, default: 0 },
//   totalJp: { type: Number, default: 0 },
  
//   category: String,
//   level: String,
//   programType: { type: String, default: 'training' },
//   organizer: { type: String, default: 'PMI Pusat' },
//   isPublished: { type: Boolean, default: false },
//   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   modules: [moduleSchema],
  
//   // Konfigurasi Pendaftaran
//   registrationMode: { 
//     type: String, 
//     enum: ['automatic', 'manual'], 
//     default: 'manual' 
//   }, 
//   registrationMethod: { type: String, default: 'auto' },
//   registrationConfig: {
//     requireDocs: { type: Boolean, default: true },
//     templates: [{
//       title: String,
//       url: String
//     }]
//   },
//   registrationTemplates: [{
//     title: String, 
//     url: String    
//   }],

//   // Periode
//   registrationPeriod: {
//     isForever: { type: Boolean, default: true },
//     startDate: { type: Date },
//     endDate: { type: Date }
//   },
//   executionPeriod: {
//     isForever: { type: Boolean, default: true },
//     startDate: { type: Date },
//     endDate: { type: Date }
//   },

//   // [BARU] TARGET WILAYAH (Untuk Filter Admin Daerah)
//   targetProvince: { type: String }, // Kode Provinsi
//   targetRegency: { type: String },  // Kode Kabupaten

//   facilities: [String],

//   pics: [{
//     name: String,
//     pmiStatus: String,
//     email: String
//   }],

//   creatorInfo: {
//     name: String,
//     email: String,
//     contact: String
//   },

//   competencies: [{
//     code: String,
//     title: String,
//     titleEng: String
//   }],
  
//   includeCompetenciesInCertificate: { type: Boolean, default: false },

//   certificateConfig: {
//     certificateNumber: { type: String, default: '' },
//     startNumber: { type: Number, default: 1 },
//     executionDate: Date,
//     city: { type: String, default: '' },
//     signatoryName: { type: String, default: '' },
//     signatoryPosition: { type: String, default: '' },
//     signatoryPositionEng: { type: String, default: '' },
//     executorIndo: { type: String, default: '' },
//     executorEng: { type: String, default: '' },
//     courseNameIndo: { type: String, default: '' },
//     courseNameEng: { type: String, default: '' },
//     useSignatureImage: { type: Boolean, default: false },
//     signatureImageUrl: { type: String, default: '' }
//   }

// }, { 
//   timestamps: true 
// });

// export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
// export default Course;



import mongoose, { Schema, Document, Types } from 'mongoose';

// 1. Sub-Interface untuk Lesson (Pelajaran)
interface ILesson extends Document {
  title: string;
  url: string;
  duration: number;
  type: 'video' | 'quiz' | 'text' | 'document';
  isPreview: boolean;
}

// 2. Sub-Interface untuk Module
interface IModule extends Document {
  title: string;
  description: string;
  lessons: Types.DocumentArray<ILesson>; // Menggunakan DocumentArray agar method .id() bisa dipakai
}

// 3. Interface Utama Course
export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  promoVideoUrl: string; // Tambahan untuk video promosi
  
  category: string;
  level: 'Pemula' | 'Menengah' | 'Lanjutan' | 'Semua Level';
  programType: 'training' | 'course'; // Diklat vs Kursus
  
  price: number;
  estimatedDuration: number; // Dalam menit
  totalJp: number; // Jam Pelajaran
  
  rating: number;
  reviewsCount: number;
  
  // [FIELD PENTING YANG MENYEBABKAN ERROR SEBELUMNYA]
  isPublished: boolean;
  status: 'proposed' | 'draft' | 'published' | 'archived';
  
  facilitatorIds: Types.ObjectId[]; // Array ID Fasilitator
  
  // Info Pembuat (Snapshot saat dibuat)
  creatorInfo: {
    name: string;
    email: string;
    id: string;
    role: string;
    contact?: string;
  };

  // Konfigurasi Pendaftaran
  registrationPeriod: {
    startDate?: Date;
    endDate?: Date;
    isForever: boolean;
  };
  
  // Konfigurasi Pelaksanaan
  executionPeriod: {
    startDate?: Date;
    endDate?: Date;
    isForever: boolean;
  };

  organizer: string; // Pelaksana
  
  // [FIELD PENTING UNTUK MODUL]
  modules: Types.DocumentArray<IModule>; 
  
  createdAt: Date;
  updatedAt: Date;
}

// --- SCHEMA DEFINITIONS ---

const LessonSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, default: '' },
  duration: { type: Number, default: 0 },
  type: { type: String, enum: ['video', 'quiz', 'text', 'document'], default: 'video' },
  isPreview: { type: Boolean, default: false }
});

const ModuleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  lessons: [LessonSchema]
});

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true }, // Slug wajib unik
  description: { type: String, default: '' },
  
  thumbnailUrl: { type: String, default: '' },
  promoVideoUrl: { type: String, default: '' },
  
  category: { type: String, default: 'Umum' },
  level: { type: String, default: 'Semua Level' },
  programType: { type: String, enum: ['training', 'course'], default: 'training' },
  
  price: { type: Number, default: 0 },
  estimatedDuration: { type: Number, default: 0 },
  totalJp: { type: Number, default: 0 },
  
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  
  // Status & Publish
  isPublished: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['proposed', 'draft', 'published', 'archived'], 
    default: 'draft' 
  },
  
  facilitatorIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  
  creatorInfo: {
    name: String,
    email: String,
    id: String,
    role: String,
    contact: String
  },

  // Periode
  registrationPeriod: {
    startDate: Date,
    endDate: Date,
    isForever: { type: Boolean, default: false }
  },
  executionPeriod: {
    startDate: Date,
    endDate: Date,
    isForever: { type: Boolean, default: false }
  },

  organizer: { type: String, default: 'PMI Pusat' },

  // Modules (Embedded)
  modules: [ModuleSchema]

}, { timestamps: true });

// Middleware: Auto-sync isPublished dengan status
CourseSchema.pre('save', function(next) {
  if (this.isModified('isPublished')) {
    if (this.isPublished && this.status !== 'published') {
      this.status = 'published';
    } else if (!this.isPublished && this.status === 'published') {
      this.status = 'draft';
    }
  }
  next();
});

export const Course = mongoose.model<ICourse>('Course', CourseSchema);
export default Course;
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
// // // // //   meetingLink: String, 
// // // // //   points: { type: Number, default: 0 },
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
  
// // // // //   // [BARU] Field tambahan untuk sinkronisasi dengan Frontend
// // // // //   promoVideoUrl: { type: String, default: '' },
// // // // //   hasCertificate: { type: Boolean, default: true },
// // // // //   estimatedDuration: { type: Number, default: 0 },
// // // // //   totalJp: { type: Number, default: 0 }, // Total JP level kursus
  
// // // // //   category: String,
// // // // //   level: String,
// // // // //   programType: { type: String, default: 'training' },
// // // // //   organizer: { type: String, default: 'PMI Pusat' },
// // // // //   isPublished: { type: Boolean, default: false },
// // // // //   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// // // // //   modules: [moduleSchema],
  
// // // // //   // KONFIGURASI PENDAFTARAN (LAMA - TETAP DIPERTAHANKAN)
// // // // //   registrationMode: { 
// // // // //     type: String, 
// // // // //     enum: ['automatic', 'manual'], 
// // // // //     default: 'manual' 
// // // // //   }, 

// // // // //   // [BARU] KONFIGURASI PENDAFTARAN (UNTUK FRONTEND BARU)
// // // // //   registrationMethod: { type: String, default: 'auto' }, // auto / manual
  
// // // // //   registrationConfig: {
// // // // //     requireDocs: { type: Boolean, default: true },
// // // // //     templates: [{
// // // // //       title: String,
// // // // //       url: String
// // // // //     }]
// // // // //   },

// // // // //   // TEMPLATE FORMULIR (LAMA - TETAP DIPERTAHANKAN)
// // // // //   registrationTemplates: [{
// // // // //     title: String, 
// // // // //     url: String    
// // // // //   }],

// // // // //   // PERIODE PENDAFTARAN
// // // // //   registrationPeriod: {
// // // // //     isForever: { type: Boolean, default: true },
// // // // //     startDate: { type: Date },
// // // // //     endDate: { type: Date }
// // // // //   },

// // // // //   // [BARU] PERIODE PELAKSANAAN
// // // // //   executionPeriod: {
// // // // //     isForever: { type: Boolean, default: true },
// // // // //     startDate: { type: Date },
// // // // //     endDate: { type: Date }
// // // // //   },

// // // // //   // [BARU] FASILITAS
// // // // //   facilities: [String],

// // // // //   // [BARU] PIC TAMBAHAN
// // // // //   pics: [{
// // // // //     name: String,
// // // // //     pmiStatus: String,
// // // // //     email: String
// // // // //   }],

// // // // //   // [BARU] INFO PEMBUAT
// // // // //   creatorInfo: {
// // // // //     name: String,
// // // // //     email: String,
// // // // //     contact: String
// // // // //   },

// // // // //   competencies: [{
// // // // //     code: String,
// // // // //     title: String,
// // // // //     titleEng: String
// // // // //   }],
  
// // // // //   includeCompetenciesInCertificate: { type: Boolean, default: false },

// // // // //   certificateConfig: {
// // // // //     certificateNumber: { type: String, default: '' },
// // // // //     startNumber: { type: Number, default: 1 },
// // // // //     executionDate: Date,
// // // // //     city: { type: String, default: '' },
// // // // //     signatoryName: { type: String, default: '' },
// // // // //     signatoryPosition: { type: String, default: '' },
// // // // //     signatoryPositionEng: { type: String, default: '' },
// // // // //     executorIndo: { type: String, default: '' },
// // // // //     executorEng: { type: String, default: '' },
// // // // //     courseNameIndo: { type: String, default: '' },
// // // // //     courseNameEng: { type: String, default: '' },
// // // // //     useSignatureImage: { type: Boolean, default: false },
// // // // //     signatureImageUrl: { type: String, default: '' }
// // // // //   }

// // // // // }, { 
// // // // //   timestamps: true 
// // // // // });

// // // // // export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
// // // // // export default Course;




// // // // // // PEMBAHRUAN DENGAN ROLE BARU

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
// // // //   meetingLink: String, 
// // // //   points: { type: Number, default: 0 },
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
  
// // // //   // Field sinkronisasi Frontend
// // // //   promoVideoUrl: { type: String, default: '' },
// // // //   hasCertificate: { type: Boolean, default: true },
// // // //   estimatedDuration: { type: Number, default: 0 },
// // // //   totalJp: { type: Number, default: 0 },
  
// // // //   category: String,
// // // //   level: String,
// // // //   programType: { type: String, default: 'training' },
// // // //   organizer: { type: String, default: 'PMI Pusat' },
// // // //   isPublished: { type: Boolean, default: false },
// // // //   facilitatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// // // //   modules: [moduleSchema],
  
// // // //   // Konfigurasi Pendaftaran
// // // //   registrationMode: { 
// // // //     type: String, 
// // // //     enum: ['automatic', 'manual'], 
// // // //     default: 'manual' 
// // // //   }, 
// // // //   registrationMethod: { type: String, default: 'auto' },
// // // //   registrationConfig: {
// // // //     requireDocs: { type: Boolean, default: true },
// // // //     templates: [{
// // // //       title: String,
// // // //       url: String
// // // //     }]
// // // //   },
// // // //   registrationTemplates: [{
// // // //     title: String, 
// // // //     url: String    
// // // //   }],

// // // //   // Periode
// // // //   registrationPeriod: {
// // // //     isForever: { type: Boolean, default: true },
// // // //     startDate: { type: Date },
// // // //     endDate: { type: Date }
// // // //   },
// // // //   executionPeriod: {
// // // //     isForever: { type: Boolean, default: true },
// // // //     startDate: { type: Date },
// // // //     endDate: { type: Date }
// // // //   },

// // // //   // [BARU] TARGET WILAYAH (Untuk Filter Admin Daerah)
// // // //   targetProvince: { type: String }, // Kode Provinsi
// // // //   targetRegency: { type: String },  // Kode Kabupaten

// // // //   facilities: [String],

// // // //   pics: [{
// // // //     name: String,
// // // //     pmiStatus: String,
// // // //     email: String
// // // //   }],

// // // //   creatorInfo: {
// // // //     name: String,
// // // //     email: String,
// // // //     contact: String
// // // //   },

// // // //   competencies: [{
// // // //     code: String,
// // // //     title: String,
// // // //     titleEng: String
// // // //   }],
  
// // // //   includeCompetenciesInCertificate: { type: Boolean, default: false },

// // // //   certificateConfig: {
// // // //     certificateNumber: { type: String, default: '' },
// // // //     startNumber: { type: Number, default: 1 },
// // // //     executionDate: Date,
// // // //     city: { type: String, default: '' },
// // // //     signatoryName: { type: String, default: '' },
// // // //     signatoryPosition: { type: String, default: '' },
// // // //     signatoryPositionEng: { type: String, default: '' },
// // // //     executorIndo: { type: String, default: '' },
// // // //     executorEng: { type: String, default: '' },
// // // //     courseNameIndo: { type: String, default: '' },
// // // //     courseNameEng: { type: String, default: '' },
// // // //     useSignatureImage: { type: Boolean, default: false },
// // // //     signatureImageUrl: { type: String, default: '' }
// // // //   }

// // // // }, { 
// // // //   timestamps: true 
// // // // });

// // // // export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
// // // // export default Course;



// // // import mongoose, { Schema, Document, Types } from 'mongoose';

// // // // 1. Sub-Interface untuk Lesson
// // // interface ILesson extends Document {
// // //   title: string;
// // //   url: string;
// // //   duration: number;
// // //   type: 'video' | 'quiz' | 'text' | 'document' | 'video_url' | 'upload_doc' | 'essay' | 'google_classroom' | 'pdf' | 'download_doc' | 'image' | 'slide' | 'poll' | 'virtual_class';
// // //   isPreview: boolean;
// // //   // [RESTORED] Field Lama
// // //   isActive: boolean;
// // //   isMandatory: boolean;
// // //   videoUrl?: string;
// // //   content?: string;
// // //   fileUrl?: string;
// // //   jp?: number;
// // //   scheduleDate?: string;
// // //   facilitator?: string;
// // //   facilitatorId?: string;
// // //   classroomData?: any;
// // //   questions?: any[];
// // //   quizDuration?: number;
// // //   pollQuestion?: string;
// // //   pollOptions?: string[];
// // // }

// // // // 2. Sub-Interface untuk Module
// // // interface IModule extends Document {
// // //   title: string;
// // //   description: string;
// // //   lessons: Types.DocumentArray<ILesson>;
// // //   // [RESTORED] Field Lama
// // //   isActive: boolean;
// // //   isMandatory: boolean;
// // //   facilitatorId?: string;
// // //   jp?: number;
// // //   scheduleDate?: string;
// // // }

// // // // 3. Interface Utama Course
// // // export interface ICourse extends Document {
// // //   title: string;
// // //   slug: string;
// // //   description: string;
// // //   thumbnailUrl: string;
// // //   promoVideoUrl: string;
  
// // //   category: string;
// // //   level: string;
// // //   programType: string; // 'training' | 'course'
  
// // //   price: number;
// // //   estimatedDuration: number;
// // //   totalJp: number;
  
// // //   rating: number;
// // //   reviewsCount: number;
  
// // //   isPublished: boolean;
// // //   status: string; // 'proposed' | 'draft' | 'published' | 'archived'
  
// // //   facilitatorIds: Types.ObjectId[];
  
// // //   creatorInfo: {
// // //     name: string;
// // //     email: string;
// // //     id: string;
// // //     role: string;
// // //     contact?: string;
// // //   };

// // //   // [RESTORED] Field Lama yang hilang
// // //   registrationMode: string; // 'auto' | 'manual'
// // //   registrationConfig: {
// // //       requireDocs: boolean;
// // //       templates: any[];
// // //   };
  
// // //   registrationPeriod: {
// // //     startDate?: Date;
// // //     endDate?: Date;
// // //     isForever: boolean;
// // //   };
  
// // //   executionPeriod: {
// // //     startDate?: Date;
// // //     endDate?: Date;
// // //     isForever: boolean;
// // //   };

// // //   organizer: string;
  
// // //   modules: Types.DocumentArray<IModule>; 
  
// // //   // Field tambahan dari skema lama Anda (Zod)
// // //   credits?: number;
// // //   startDate?: string;
// // //   endDate?: string;
// // //   facilities?: string[];
// // //   pics?: any[];
// // //   competencies?: any[];
// // //   includeCompetenciesInCertificate?: boolean;
// // //   certificateConfig?: any;

// // //   createdAt: Date;
// // //   updatedAt: Date;
// // // }

// // // // --- SCHEMA DEFINITIONS ---

// // // const LessonSchema = new Schema({
// // //   title: { type: String, required: true },
// // //   url: { type: String, default: '' },
// // //   duration: { type: Number, default: 0 },
// // //   type: { type: String, default: 'video' },
// // //   isPreview: { type: Boolean, default: false },
// // //   // [RESTORED]
// // //   isActive: { type: Boolean, default: true },
// // //   isMandatory: { type: Boolean, default: false },
// // //   videoUrl: String,
// // //   content: String,
// // //   fileUrl: String,
// // //   jp: { type: Number, default: 0 },
// // //   scheduleDate: String,
// // //   facilitator: String,
// // //   facilitatorId: String,
// // //   classroomData: Schema.Types.Mixed,
// // //   questions: [Schema.Types.Mixed],
// // //   quizDuration: Number,
// // //   pollQuestion: String,
// // //   pollOptions: [String]
// // // });

// // // const ModuleSchema = new Schema({
// // //   title: { type: String, required: true },
// // //   description: { type: String, default: '' },
// // //   lessons: [LessonSchema],
// // //   // [RESTORED]
// // //   isActive: { type: Boolean, default: true },
// // //   isMandatory: { type: Boolean, default: false },
// // //   facilitatorId: String,
// // //   jp: Number,
// // //   scheduleDate: String
// // // });

// // // const CourseSchema: Schema = new Schema({
// // //   title: { type: String, required: true },
// // //   slug: { type: String, unique: true },
// // //   description: { type: String, default: '' },
  
// // //   thumbnailUrl: { type: String, default: '' },
// // //   promoVideoUrl: { type: String, default: '' },
  
// // //   category: { type: String, default: 'Umum' },
// // //   level: { type: String, default: 'Semua Level' },
// // //   programType: { type: String, default: 'training' },
  
// // //   price: { type: Number, default: 0 },
// // //   estimatedDuration: { type: Number, default: 0 },
// // //   totalJp: { type: Number, default: 0 },
  
// // //   rating: { type: Number, default: 0 },
// // //   reviewsCount: { type: Number, default: 0 },
  
// // //   isPublished: { type: Boolean, default: false },
// // //   status: { type: String, default: 'draft' },
  
// // //   facilitatorIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  
// // //   creatorInfo: {
// // //     name: String,
// // //     email: String,
// // //     id: String,
// // //     role: String,
// // //     contact: String
// // //   },

// // //   // [RESTORED] Config Pendaftaran
// // //   registrationMode: { type: String, default: 'auto' }, 
// // //   registrationConfig: {
// // //       requireDocs: { type: Boolean, default: true },
// // //       templates: [Schema.Types.Mixed]
// // //   },

// // //   registrationPeriod: {
// // //     startDate: Date,
// // //     endDate: Date,
// // //     isForever: { type: Boolean, default: false }
// // //   },
// // //   executionPeriod: {
// // //     startDate: Date,
// // //     endDate: Date,
// // //     isForever: { type: Boolean, default: false }
// // //   },

// // //   organizer: { type: String, default: 'PMI Pusat' },
// // //   modules: [ModuleSchema],

// // //   // Field Tambahan Lama
// // //   credits: { type: Number, default: 0 },
// // //   startDate: String,
// // //   endDate: String,
// // //   facilities: [String],
// // //   pics: [Schema.Types.Mixed],
// // //   competencies: [Schema.Types.Mixed],
// // //   includeCompetenciesInCertificate: Boolean,
// // //   certificateConfig: Schema.Types.Mixed

// // // }, { timestamps: true });

// // // // Middleware: Auto-sync isPublished dengan status
// // // CourseSchema.pre('save', function(next) {
// // //   if (this.isModified('isPublished')) {
// // //     if (this.isPublished && this.status !== 'published') {
// // //       this.status = 'published';
// // //     } else if (!this.isPublished && this.status === 'published') {
// // //       this.status = 'draft';
// // //     }
// // //   }
// // //   next();
// // // });

// // // export const Course = mongoose.model<ICourse>('Course', CourseSchema);
// // // export default Course;


// // import mongoose, { Schema, Document, Types } from 'mongoose';

// // // 1. Sub-Interface untuk Lesson
// // interface ILesson extends Document {
// //   title: string;
// //   url: string;
// //   duration: number;
// //   type: 'video' | 'quiz' | 'text' | 'document' | 'video_url' | 'upload_doc' | 'essay' | 'google_classroom' | 'pdf' | 'download_doc' | 'image' | 'slide' | 'poll' | 'virtual_class';
// //   isPreview: boolean;
// //   isActive: boolean;
// //   isMandatory: boolean;
// //   videoUrl?: string;
// //   content?: string;
// //   fileUrl?: string;
// //   jp?: number;
// //   scheduleDate?: string;
// //   facilitator?: string;
// //   facilitatorId?: string;
// //   classroomData?: any;
// //   questions?: any[];
// //   quizDuration?: number;
// //   pollQuestion?: string;
// //   pollOptions?: string[];
// // }

// // // 2. Sub-Interface untuk Module
// // interface IModule extends Document {
// //   title: string;
// //   description: string;
// //   lessons: Types.DocumentArray<ILesson>;
// //   isActive: boolean;
// //   isMandatory: boolean;
// //   facilitatorId?: string;
// //   jp?: number;
// //   scheduleDate?: string;
// // }

// // // 3. Interface Utama Course
// // export interface ICourse extends Document {
// //   title: string;
// //   slug: string;
// //   description: string;
// //   thumbnailUrl: string;
// //   promoVideoUrl: string;
  
// //   category: string;
// //   level: string;
// //   programType: string;
  
// //   price: number;
// //   estimatedDuration: number;
// //   totalJp: number;
  
// //   rating: number;
// //   reviewsCount: number;
  
// //   isPublished: boolean;
// //   status: string; // 'proposed' | 'draft' | 'published' | 'archived' | 'revision'
  
// //   // [WAJIB] Field dokumen proposal
// //   proposalDocuments: { name: string; url: string }[];

// //   facilitatorIds: Types.ObjectId[];
  
// //   creatorInfo: {
// //     name: string;
// //     email: string;
// //     id: string;
// //     role: string;
// //     contact?: string;
// //   };

// //   registrationMode: string;
// //   registrationConfig: {
// //       requireDocs: boolean;
// //       templates: any[];
// //   };
  
// //   registrationPeriod: {
// //     startDate?: Date;
// //     endDate?: Date;
// //     isForever: boolean;
// //   };
  
// //   executionPeriod: {
// //     startDate?: Date;
// //     endDate?: Date;
// //     isForever: boolean;
// //   };

// //   organizer: string;
// //   modules: Types.DocumentArray<IModule>; 
  
// //   credits?: number;
// //   startDate?: string;
// //   endDate?: string;
// //   facilities?: string[];
// //   pics?: any[];
// //   competencies?: any[];
// //   includeCompetenciesInCertificate?: boolean;
// //   certificateConfig?: any;

// //   createdAt: Date;
// //   updatedAt: Date;
// // }

// // // --- SCHEMA DEFINITIONS ---

// // const LessonSchema = new Schema({
// //   title: { type: String, required: true },
// //   url: { type: String, default: '' },
// //   duration: { type: Number, default: 0 },
// //   type: { type: String, default: 'video' },
// //   isPreview: { type: Boolean, default: false },
// //   isActive: { type: Boolean, default: true },
// //   isMandatory: { type: Boolean, default: false },
// //   videoUrl: String,
// //   content: String,
// //   fileUrl: String,
// //   jp: { type: Number, default: 0 },
// //   scheduleDate: String,
// //   facilitator: String,
// //   facilitatorId: String,
// //   classroomData: Schema.Types.Mixed,
// //   questions: [Schema.Types.Mixed],
// //   quizDuration: Number,
// //   pollQuestion: String,
// //   pollOptions: [String]
// // });

// // const ModuleSchema = new Schema({
// //   title: { type: String, required: true },
// //   description: { type: String, default: '' },
// //   lessons: [LessonSchema],
// //   isActive: { type: Boolean, default: true },
// //   isMandatory: { type: Boolean, default: false },
// //   facilitatorId: String,
// //   jp: Number,
// //   scheduleDate: String
// // });

// // const CourseSchema: Schema = new Schema({
// //   title: { type: String, required: true },
// //   slug: { type: String, unique: true },
// //   description: { type: String, default: '' },
  
// //   thumbnailUrl: { type: String, default: '' },
// //   promoVideoUrl: { type: String, default: '' },
  
// //   category: { type: String, default: 'Umum' },
// //   level: { type: String, default: 'Semua Level' },
// //   programType: { type: String, default: 'training' },
  
// //   price: { type: Number, default: 0 },
// //   estimatedDuration: { type: Number, default: 0 },
// //   totalJp: { type: Number, default: 0 },
  
// //   rating: { type: Number, default: 0 },
// //   reviewsCount: { type: Number, default: 0 },
  
// //   isPublished: { type: Boolean, default: false },
// //   status: { type: String, default: 'draft' },
  
// //   // [WAJIB] Field dokumen proposal
// //   proposalDocuments: [{
// //       name: String,
// //       url: String
// //   }],

// //   facilitatorIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  
// //   creatorInfo: {
// //     name: String,
// //     email: String,
// //     id: String,
// //     role: String,
// //     contact: String
// //   },

// //   registrationMode: { type: String, default: 'auto' }, 
// //   registrationConfig: {
// //       requireDocs: { type: Boolean, default: true },
// //       templates: [Schema.Types.Mixed]
// //   },

// //   registrationPeriod: {
// //     startDate: Date,
// //     endDate: Date,
// //     isForever: { type: Boolean, default: false }
// //   },
// //   executionPeriod: {
// //     startDate: Date,
// //     endDate: Date,
// //     isForever: { type: Boolean, default: false }
// //   },

// //   organizer: { type: String, default: 'PMI Pusat' },
// //   modules: [ModuleSchema],

// //   credits: { type: Number, default: 0 },
// //   startDate: String,
// //   endDate: String,
// //   facilities: [String],
// //   pics: [Schema.Types.Mixed],
// //   competencies: [Schema.Types.Mixed],
// //   includeCompetenciesInCertificate: Boolean,
// //   certificateConfig: Schema.Types.Mixed

// // }, { timestamps: true });

// // // Middleware: Auto-sync isPublished dengan status
// // CourseSchema.pre('save', function(next) {
// //   if (this.isModified('isPublished')) {
// //     if (this.isPublished && this.status !== 'published') {
// //       this.status = 'published';
// //     } else if (!this.isPublished && this.status === 'published') {
// //       this.status = 'draft';
// //     }
// //   }
// //   next();
// // });

// // export const Course = mongoose.model<ICourse>('Course', CourseSchema);
// // export default Course;

// import mongoose, { Schema, Document, Types } from 'mongoose';

// // 1. Sub-Interface untuk Lesson (Mencakup field lama)
// interface ILesson extends Document {
//   title: string;
//   url: string;
//   duration: number;
//   type: 'video' | 'quiz' | 'text' | 'document' | 'video_url' | 'upload_doc' | 'essay' | 'google_classroom' | 'pdf' | 'download_doc' | 'image' | 'slide' | 'poll' | 'virtual_class';
//   isPreview: boolean;
//   // [FIELD LAMA DIPERTAHANKAN]
//   isActive: boolean;
//   isMandatory: boolean;
//   videoUrl?: string;
//   content?: string;
//   fileUrl?: string;
//   jp?: number;
//   scheduleDate?: string;
//   facilitator?: string;
//   facilitatorId?: string;
//   classroomData?: any;
//   questions?: any[];
//   quizDuration?: number;
//   pollQuestion?: string;
//   pollOptions?: string[];
// }

// // 2. Sub-Interface untuk Module
// interface IModule extends Document {
//   title: string;
//   description: string;
//   lessons: Types.DocumentArray<ILesson>;
//   // [FIELD LAMA DIPERTAHANKAN]
//   isActive: boolean;
//   isMandatory: boolean;
//   facilitatorId?: string;
//   jp?: number;
//   scheduleDate?: string;
// }

// // 3. Interface Utama Course
// export interface ICourse extends Document {
//   title: string;
//   slug: string;
//   description: string;
//   thumbnailUrl: string;
//   promoVideoUrl: string;
  
//   category: string;
//   level: string;
//   programType: string;
  
//   price: number;
//   estimatedDuration: number;
//   totalJp: number;
  
//   rating: number;
//   reviewsCount: number;
  
//   isPublished: boolean;
//   status: string; // 'proposed' | 'draft' | 'published' | 'archived' | 'revision'
  
//   // [BARU] Dokumen Proposal
//   proposalDocuments: { name: string; url: string }[];

//   // [BARU] Riwayat Chat / Feedback
//   feedbackHistory: {
//       senderName: string;
//       role: string;
//       message: string;
//       createdAt: Date;
//   }[];

//   facilitatorIds: Types.ObjectId[];
  
//   creatorInfo: {
//     name: string;
//     email: string;
//     id: string;
//     role: string;
//     contact?: string;
//   };

//   registrationMode: string;
//   registrationConfig: {
//       requireDocs: boolean;
//       templates: any[];
//   };
  
//   registrationPeriod: {
//     startDate?: Date;
//     endDate?: Date;
//     isForever: boolean;
//   };
  
//   executionPeriod: {
//     startDate?: Date;
//     endDate?: Date;
//     isForever: boolean;
//   };

//   organizer: string;
//   modules: Types.DocumentArray<IModule>; 
  
//   credits?: number;
//   startDate?: string;
//   endDate?: string;
//   facilities?: string[];
//   pics?: any[];
//   competencies?: any[];
//   includeCompetenciesInCertificate?: boolean;
//   certificateConfig?: any;

//   createdAt: Date;
//   updatedAt: Date;
// }

// // --- SCHEMA DEFINITIONS ---

// const LessonSchema = new Schema({
//   title: { type: String, required: true },
//   url: { type: String, default: '' },
//   duration: { type: Number, default: 0 },
//   type: { type: String, default: 'video' },
//   isPreview: { type: Boolean, default: false },
//   // [FIELD LAMA]
//   isActive: { type: Boolean, default: true },
//   isMandatory: { type: Boolean, default: false },
//   videoUrl: String,
//   content: String,
//   fileUrl: String,
//   jp: { type: Number, default: 0 },
//   scheduleDate: String,
//   facilitator: String,
//   facilitatorId: String,
//   classroomData: Schema.Types.Mixed,
//   questions: [Schema.Types.Mixed],
//   quizDuration: Number,
//   pollQuestion: String,
//   pollOptions: [String]
// });

// const ModuleSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, default: '' },
//   lessons: [LessonSchema],
//   // [FIELD LAMA]
//   isActive: { type: Boolean, default: true },
//   isMandatory: { type: Boolean, default: false },
//   facilitatorId: String,
//   jp: Number,
//   scheduleDate: String
// });

// const CourseSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   slug: { type: String, unique: true },
//   description: { type: String, default: '' },
  
//   thumbnailUrl: { type: String, default: '' },
//   promoVideoUrl: { type: String, default: '' },
  
//   category: { type: String, default: 'Umum' },
//   level: { type: String, default: 'Semua Level' },
//   programType: { type: String, default: 'training' },
  
//   price: { type: Number, default: 0 },
//   estimatedDuration: { type: Number, default: 0 },
//   totalJp: { type: Number, default: 0 },
  
//   rating: { type: Number, default: 0 },
//   reviewsCount: { type: Number, default: 0 },
  
//   isPublished: { type: Boolean, default: false },
//   status: { type: String, default: 'draft' },
  
//   // [WAJIB] Field dokumen proposal
//   proposalDocuments: [{
//       name: String,
//       url: String
//   }],

//   // [WAJIB] Field Feedback Chat
//   feedbackHistory: [{
//       senderName: String,
//       role: String,
//       message: String,
//       createdAt: { type: Date, default: Date.now }
//   }],

//   facilitatorIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  
//   creatorInfo: {
//     name: String,
//     email: String,
//     id: String,
//     role: String,
//     contact: String
//   },

//   registrationMode: { type: String, default: 'auto' }, 
//   registrationConfig: {
//       requireDocs: { type: Boolean, default: true },
//       templates: [Schema.Types.Mixed]
//   },

//   registrationPeriod: {
//     startDate: Date,
//     endDate: Date,
//     isForever: { type: Boolean, default: false }
//   },
//   executionPeriod: {
//     startDate: Date,
//     endDate: Date,
//     isForever: { type: Boolean, default: false }
//   },

//   organizer: { type: String, default: 'PMI Pusat' },
//   modules: [ModuleSchema],

//   credits: { type: Number, default: 0 },
//   startDate: String,
//   endDate: String,
//   facilities: [String],
//   pics: [Schema.Types.Mixed],
//   competencies: [Schema.Types.Mixed],
//   includeCompetenciesInCertificate: Boolean,
//   certificateConfig: Schema.Types.Mixed

// }, { timestamps: true });

// // Middleware: Auto-sync isPublished dengan status
// CourseSchema.pre('save', function(next) {
//   if (this.isModified('isPublished')) {
//     if (this.isPublished && this.status !== 'published') {
//       this.status = 'published';
//     } else if (!this.isPublished && this.status === 'published') {
//       this.status = 'draft';
//     }
//   }
//   next();
// });

// export const Course = mongoose.model<ICourse>('Course', CourseSchema);
// export default Course;



import mongoose, { Schema, Document, Types } from 'mongoose';

// 1. Sub-Interface untuk Lesson
interface ILesson extends Document {
  title: string;
  url: string;
  duration: number;
  type: 'video' | 'quiz' | 'text' | 'document' | 'video_url' | 'upload_doc' | 'essay' | 'google_classroom' | 'pdf' | 'download_doc' | 'image' | 'slide' | 'poll' | 'virtual_class';
  isPreview: boolean;
  isActive: boolean;
  isMandatory: boolean;
  videoUrl?: string;
  content?: string;
  fileUrl?: string;
  jp?: number;
  scheduleDate?: string;
  facilitator?: string;
  facilitatorId?: string;
  classroomData?: any;
  questions?: any[];
  quizDuration?: number;
  pollQuestion?: string;
  pollOptions?: string[];
}

// 2. Sub-Interface untuk Module
interface IModule extends Document {
  title: string;
  description: string;
  lessons: Types.DocumentArray<ILesson>;
  isActive: boolean;
  isMandatory: boolean;
  facilitatorId?: string;
  jp?: number;
  scheduleDate?: string;
}

// 3. Interface Utama Course
export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  promoVideoUrl: string;
  
  category: string;
  level: string;
  programType: string;
  
  price: number;
  estimatedDuration: number;
  totalJp: number;
  
  rating: number;
  reviewsCount: number;
  
  isPublished: boolean;
  status: string; 
  
  proposalDocuments: { name: string; url: string }[];

  feedbackHistory: {
      senderName: string;
      role: string;
      message: string;
      createdAt: Date;
  }[];

  facilitatorIds: Types.ObjectId[];
  
  // [FIX] INI YANG HILANG SEBELUMNYA
  // Array ID User untuk PIC Tambahan agar Dr. Budi terdeteksi
  picIds: Types.ObjectId[]; 
  
  creatorInfo: {
    name: string;
    email: string;
    id: string;
    role: string;
    contact?: string;
  };

  registrationMode: string;
  registrationConfig: {
      requireDocs: boolean;
      templates: any[];
  };
  
  registrationPeriod: {
    startDate?: Date;
    endDate?: Date;
    isForever: boolean;
  };
  
  executionPeriod: {
    startDate?: Date;
    endDate?: Date;
    isForever: boolean;
  };

  organizer: string;
  modules: Types.DocumentArray<IModule>; 
  
  credits?: number;
  startDate?: string;
  endDate?: string;
  facilities?: string[];
  
  // pics (legacy) boleh tetap ada, tapi kita pakai picIds untuk logika sistem
  pics?: any[]; 
  
  competencies?: any[];
  includeCompetenciesInCertificate?: boolean;
  certificateConfig?: any;
  
  // [PENTING] Untuk Admin Wilayah
  regionCode?: string; 

  createdAt: Date;
  updatedAt: Date;
}

// --- SCHEMA DEFINITIONS ---

const LessonSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, default: '' },
  duration: { type: Number, default: 0 },
  type: { type: String, default: 'video' },
  isPreview: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isMandatory: { type: Boolean, default: false },
  videoUrl: String,
  content: String,
  fileUrl: String,
  jp: { type: Number, default: 0 },
  scheduleDate: String,
  facilitator: String,
  facilitatorId: String,
  classroomData: Schema.Types.Mixed,
  questions: [Schema.Types.Mixed],
  quizDuration: Number,
  pollQuestion: String,
  pollOptions: [String]
});

const ModuleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  lessons: [LessonSchema],
  isActive: { type: Boolean, default: true },
  isMandatory: { type: Boolean, default: false },
  facilitatorId: String,
  jp: Number,
  scheduleDate: String
});

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, default: '' },
  
  thumbnailUrl: { type: String, default: '' },
  promoVideoUrl: { type: String, default: '' },
  
  category: { type: String, default: 'Umum' },
  level: { type: String, default: 'Semua Level' },
  programType: { type: String, default: 'training' },
  
  price: { type: Number, default: 0 },
  estimatedDuration: { type: Number, default: 0 },
  totalJp: { type: Number, default: 0 },
  
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  
  isPublished: { type: Boolean, default: false },
  status: { type: String, default: 'draft' },
  
  proposalDocuments: [{
      name: String,
      url: String
  }],

  feedbackHistory: [{
      senderName: String,
      role: String,
      message: String,
      createdAt: { type: Date, default: Date.now }
  }],

  // Tim Fasilitator (Anggota)
  facilitatorIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  
  // [FIX UTAMA] Field ini WAJIB ADA agar data PIC tersimpan di database
  picIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  creatorInfo: {
    name: String,
    email: String,
    id: String,
    role: String,
    contact: String
  },

  registrationMode: { type: String, default: 'auto' }, 
  registrationConfig: {
      requireDocs: { type: Boolean, default: true },
      templates: [Schema.Types.Mixed]
  },

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
  modules: [ModuleSchema],

  credits: { type: Number, default: 0 },
  startDate: String,
  endDate: String,
  facilities: [String],
  
  pics: [Schema.Types.Mixed], // Legacy field (biarkan saja)
  
  competencies: [Schema.Types.Mixed],
  includeCompetenciesInCertificate: Boolean,
  certificateConfig: Schema.Types.Mixed,
  
  // [PENTING] Untuk filter wilayah Admin
  regionCode: { type: String, default: 'national' }

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
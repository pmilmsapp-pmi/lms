
// // import mongoose, { Schema, Document } from 'mongoose';

// // // --- INTERFACES ---
// // export interface ILesson {
// //   _id?: string;
// //   title: string;
// //   type: 'video' | 'pdf' | 'quiz' | 'text' | 'poll' | 'image' | 'lesson'; 
// //   content?: string; 
// //   fileUrl?: string; 
// //   videoUrl?: string;
// //   meetingLink?: string; 
// //   isActive: boolean;
// //   isMandatory: boolean;
// //   order: number;
// //   questions?: any[];
// //   quizDuration?: number; 
// //   pollQuestion?: string;
// //   pollOptions?: string[];
// //   jp?: number; 
// //   scheduleDate?: Date; // [FITUR BARU] Tanggal Materi
// // }

// // export interface IModule {
// //   _id?: string;
// //   title: string;
// //   lessons: ILesson[];
// //   order: number;
// //   isActive: boolean;
// //   isMandatory: boolean;
// //   facilitatorId?: mongoose.Types.ObjectId; 
// //   jp?: number; 
// //   scheduleDate?: Date; // [FITUR BARU] Tanggal Modul
// // }

// // export interface ICourse extends Document {
// //   title: string;
// //   description: string;
// //   price: number;
// //   category: string;
// //   programType: 'course' | 'training'; 
// //   thumbnailUrl: string;
// //   facilitatorIds: mongoose.Types.ObjectId[];
// //   modules: IModule[];
// //   isPublished: boolean;
// //   competencies?: string[]; 
// //   includeCompetenciesInCertificate?: boolean;
// //   certificateConfig?: any;
  
// //   // [FITUR BARU] Pelaksana Pelatihan
// //   organizer: 'PMI Pusat' | 'PMI Provinsi' | 'PMI Kabupaten/Kota' | 'PMI Kecamatan' | 'Unit PMR/KSR' | 'Umum/Mitra';
  
// //   createdAt: Date;
// //   updatedAt: Date;
// // }

// // // --- SCHEMAS ---
// // const LessonSchema = new Schema({
// //   title: { type: String, required: true },
// //   type: { type: String, default: 'lesson' },
// //   content: String,
// //   fileUrl: String,
// //   videoUrl: String,
// //   meetingLink: String,
// //   isActive: { type: Boolean, default: true },
// //   isMandatory: { type: Boolean, default: false },
// //   order: Number,
// //   questions: [Schema.Types.Mixed], 
// //   quizDuration: Number,
// //   pollQuestion: String,
// //   pollOptions: [String],
// //   jp: { type: Number, default: 0 },
// //   scheduleDate: { type: Date } // Field Tanggal
// // });

// // const ModuleSchema = new Schema({
// //   title: { type: String, required: true },
// //   lessons: [LessonSchema],
// //   order: Number,
// //   isActive: { type: Boolean, default: true },
// //   isMandatory: { type: Boolean, default: false },
// //   facilitatorId: { type: Schema.Types.ObjectId, ref: 'User' },
// //   jp: { type: Number, default: 0 },
// //   scheduleDate: { type: Date } // Field Tanggal
// // });

// // const CourseSchema = new Schema({
// //   title: { type: String, required: true },
// //   description: { type: String },
// //   price: { type: Number, default: 0 },
// //   category: { type: String, default: 'General' },
// //   programType: { type: String, enum: ['course', 'training'], default: 'course' },
// //   thumbnailUrl: { type: String },
// //   facilitatorIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
// //   modules: [ModuleSchema],
// //   isPublished: { type: Boolean, default: false },
// //   competencies: [String],
// //   includeCompetenciesInCertificate: { type: Boolean, default: false },
// //   certificateConfig: {
// //       certificateNumber: String,
// //       executionDate: Date,
// //       city: String,
// //       signatoryName: String,
// //       signatoryPosition: String
// //   },
// //   // Field Pelaksana
// //   organizer: { 
// //       type: String, 
// //       enum: ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota', 'PMI Kecamatan', 'Unit PMR/KSR', 'Umum/Mitra'],
// //       default: 'PMI Pusat'
// //   }
// // }, { timestamps: true });

// // export const Course = mongoose.model<ICourse>('Course', CourseSchema);
// import mongoose, { Schema, Document } from 'mongoose';

// // --- INTERFACES ---
// export interface ILesson {
//   _id?: string;
//   title: string;
//   // [UPDATE] Tambahkan 'google_classroom' ke tipe
//   type: 'video_url' | 'pdf' | 'quiz' | 'text' | 'poll' | 'image' | 'lesson' | 'upload_doc' | 'download_doc' | 'virtual_class' | 'slide' | 'google_classroom'; 
//   content?: string; 
//   fileUrl?: string; 
//   videoUrl?: string;
//   meetingLink?: string; 
  
//   // [BARU] Data untuk Google Classroom
//   classroomData?: {
//     id: string;
//     name: string;
//     alternateLink: string;
//   };

//   isActive: boolean;
//   isMandatory: boolean;
//   order: number;
//   questions?: any[];
//   quizDuration?: number; 
//   pollQuestion?: string;
//   pollOptions?: string[];
//   jp?: number; 
//   scheduleDate?: Date;
// }

// export interface IModule {
//   _id?: string;
//   title: string;
//   lessons: ILesson[];
//   order: number;
//   isActive: boolean;
//   isMandatory: boolean;
//   facilitatorId?: mongoose.Types.ObjectId; 
//   jp?: number; 
//   scheduleDate?: Date;
// }

// export interface ICourse extends Document {
//   title: string;
//   description: string;
//   price: number;
//   category: string;
//   programType: 'course' | 'training'; 
//   thumbnailUrl: string;
//   facilitatorIds: mongoose.Types.ObjectId[];
//   modules: IModule[];
//   isPublished: boolean;
//   competencies?: string[]; 
//   includeCompetenciesInCertificate?: boolean;
//   certificateConfig?: any;
//   organizer: 'PMI Pusat' | 'PMI Provinsi' | 'PMI Kabupaten/Kota' | 'PMI Kecamatan' | 'Unit PMR/KSR' | 'Umum/Mitra';
//   createdAt: Date;
//   updatedAt: Date;
// }

// // --- SCHEMAS ---
// const LessonSchema = new Schema({
//   title: { type: String, required: true },
//   type: { 
//     type: String, 
//     // [UPDATE] Enum diperbarui
//     enum: ['lesson', 'video_url', 'image', 'quiz', 'upload_doc', 'download_doc', 'virtual_class', 'poll', 'slide', 'google_classroom'],
//     default: 'lesson' 
//   },
//   content: String,
//   fileUrl: String,
//   videoUrl: String,
//   meetingLink: String,
  
//   // [BARU] Field Classroom
//   classroomData: {
//     id: String,
//     name: String,
//     alternateLink: String
//   },

//   isActive: { type: Boolean, default: true },
//   isMandatory: { type: Boolean, default: false },
//   order: Number,
//   questions: [Schema.Types.Mixed], 
//   quizDuration: Number,
//   pollQuestion: String,
//   pollOptions: [String],
//   jp: { type: Number, default: 0 },
//   scheduleDate: { type: Date }
// });

// const ModuleSchema = new Schema({
//   title: { type: String, required: true },
//   lessons: [LessonSchema],
//   order: Number,
//   isActive: { type: Boolean, default: true },
//   isMandatory: { type: Boolean, default: false },
//   facilitatorId: { type: Schema.Types.ObjectId, ref: 'User' },
//   jp: { type: Number, default: 0 },
//   scheduleDate: { type: Date }
// });

// const CourseSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   price: { type: Number, default: 0 },
//   category: { type: String, default: 'General' },
//   programType: { type: String, enum: ['course', 'training'], default: 'course' },
//   thumbnailUrl: { type: String },
//   facilitatorIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//   modules: [ModuleSchema],
//   isPublished: { type: Boolean, default: false },
//   competencies: [String],
//   includeCompetenciesInCertificate: { type: Boolean, default: false },
//   certificateConfig: {
//       certificateNumber: String,
//       executionDate: Date,
//       city: String,
//       signatoryName: String,
//       signatoryPosition: String
//   },
//   organizer: { 
//       type: String, 
//       enum: ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota', 'PMI Kecamatan', 'Unit PMR/KSR', 'Umum/Mitra'],
//       default: 'PMI Pusat'
//   }
// }, { timestamps: true });

// export const Course = mongoose.model<ICourse>('Course', CourseSchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface ILesson {
  _id?: string;
  title: string;
  slug?: string;
  type: 'video_url' | 'quiz' | 'pdf' | 'ppt' | 'download_doc' | 'zoom' | 'google_classroom' | 'essay' | 'upload_doc';
  content?: string;
  url?: string;
  videoUrl?: string;
  meetingLink?: string;
  fileUrl?: string;
  duration?: number;
  isMandatory: boolean;
  isActive: boolean;
  order: number;
  
  // Quiz / Essay / Poll fields
  questions?: any[];
  quizDuration?: number;
  pollQuestion?: string;
  pollOptions?: string[];

  // Google Classroom
  classroomData?: {
    id: string;
    name: string;
    alternateLink: string;
    enrollmentCode?: string;
  };
}

export interface IModule {
  _id?: string;
  title: string;
  lessons: ILesson[];
  isMandatory: boolean;
  isActive: boolean;
  order: number;
  jp?: number;
  scheduleDate?: Date;
  facilitatorId?: mongoose.Types.ObjectId;
}

export interface ICourse extends Document {
  title: string;
  slug: string;
  description?: string;
  price: number;
  thumbnailUrl?: string;
  category: string;
  programType: string;
  organizer: string;
  facilitatorIds: mongoose.Types.ObjectId[];
  modules: IModule[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  certificateConfig?: any;
  competencies?: any[];
}

const LessonSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String },
  type: { 
    type: String, 
    enum: [
      'video_url', 'quiz', 'pdf', 'ppt', 'download_doc', 'zoom', 
      'google_classroom', 'essay', 'upload_doc', 'lesson', 'image', 'slide', 'poll'
    ], 
    required: true,
    default: 'lesson'
  },
  content: { type: String },
  url: { type: String },
  videoUrl: { type: String },
  meetingLink: { type: String },
  fileUrl: { type: String },
  duration: { type: Number, default: 0 },
  isMandatory: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  
  // Quiz & Essay
  questions: [{
    question: String,
    options: [String],
    correctIndex: Number,
  }],
  quizDuration: { type: Number },

  // Poll
  pollQuestion: { type: String },
  pollOptions: [{ type: String }],

  // Classroom
  classroomData: {
    id: String,
    name: String,
    alternateLink: String,
    enrollmentCode: String,
  }
});

const ModuleSchema = new Schema({
  title: { type: String, required: true },
  lessons: [LessonSchema],
  isMandatory: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  jp: { type: Number, default: 0 },
  scheduleDate: { type: Date },
  facilitatorId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const CourseSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String },
  price: { type: Number, default: 0 },
  thumbnailUrl: { type: String },
  category: { type: String },
  programType: { type: String, default: 'course' },
  organizer: { type: String },
  facilitatorIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  modules: [ModuleSchema],
  isPublished: { type: Boolean, default: false },
  certificateConfig: { type: Schema.Types.Mixed },
  competencies: [{ type: Schema.Types.Mixed }]
}, { timestamps: true });

// Pre-save slug generator
CourseSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().split(' ').join('-').replace(/[^\w-]+/g, '');
  }
  next();
});

export const Course = mongoose.model<ICourse>('Course', CourseSchema);
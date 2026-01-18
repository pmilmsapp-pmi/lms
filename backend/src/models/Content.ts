
// // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // // Interface
// // // // export interface IContent {
// // // //   _id: string;
// // // //   heroTitle: string;
// // // //   heroDescription: string;
// // // //   heroBgUrl: string;
// // // //   faviconUrl: string; // <--- TAMBAHAN BARU
// // // //   slides: string[];
// // // //   features: { title: string; description: string }[];
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
// // // //   forumCategories: { name: string; iconUrl: string }[];
// // // //   courseCategories: string[];
// // // //   libraryCategories: string[];
// // // // }

// // // // const ContentSchema: Schema = new Schema({
// // // //   _id: { type: String, default: 'site_content' },

// // // //   // HERO
// // // //   heroTitle: { type: String, default: '' },
// // // //   heroDescription: { type: String, default: '' },
// // // //   heroBgUrl: { type: String, default: '' },
// // // //   faviconUrl: { type: String, default: '' }, // <--- TAMBAHAN BARU DI SCHEMA

// // // //   // SLIDES & FEATURES
// // // //   slides: { type: [String], default: [] }, 
// // // //   features: [{
// // // //     title: { type: String, default: '' },
// // // //     description: { type: String, default: '' }
// // // //   }],

// // // //   // FOOTER
// // // //   footer: {
// // // //     about: { type: String, default: '' },
// // // //     address: { type: String, default: '' },
// // // //     phone: { type: String, default: '' },
// // // //     email: { type: String, default: '' },
// // // //     website: { type: String, default: '' },
// // // //     copyright: { type: String, default: '' },
// // // //     logoUrl: { type: String, default: '' },
// // // //     socials: {
// // // //       facebook: { type: String, default: '' },
// // // //       instagram: { type: String, default: '' },
// // // //       twitter: { type: String, default: '' },
// // // //       youtube: { type: String, default: '' }
// // // //     }
// // // //   },

// // // //   // CATEGORIES
// // // //   forumCategories: [{
// // // //     name: { type: String, required: true },
// // // //     iconUrl: { type: String, default: '' }
// // // //   }],
// // // //   courseCategories: { type: [String], default: [] },
// // // //   libraryCategories: { type: [String], default: [] }

// // // // }, { timestamps: true });

// // // // // Gabungkan Interface & Document
// // // // export const Content = mongoose.model<IContent & Document>('Content', ContentSchema);
// // // import mongoose, { Schema, Document } from 'mongoose';

// // // // [FIX] Menggunakan Omit<Document, '_id'> untuk menghindari konflik tipe ObjectId vs String
// // // export interface IContent extends Omit<Document, '_id'> {
// // //   _id: string; // Kita override _id menjadi string
  
// // //   // --- HALAMAN DEPAN (HOME) ---
// // //   heroTitle: string;
// // //   heroDescription: string;
// // //   heroBgUrl: string;
// // //   faviconUrl: string;
// // //   slides: string[]; 
// // //   features: { title: string; description: string }[];
  
// // //   // --- HALAMAN KATALOG KELAS ---
// // //   coursesPage: {
// // //     title: string;
// // //     description: string;
// // //     slides: string[];
// // //   };

// // //   // --- HALAMAN BLOG / CERITA RELAWAN ---
// // //   blogPage: {
// // //     title: string;
// // //     description: string;
// // //     slides: string[];
// // //   };

// // //   // --- FOOTER & KATEGORI ---
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
// // //   forumCategories: { name: string; iconUrl: string }[];
// // //   courseCategories: string[];
// // //   libraryCategories: string[];
// // // }

// // // const ContentSchema: Schema = new Schema({
// // //   _id: { type: String, default: 'site_content' }, // ID manual string

// // //   // --- HOME (DEFAULT) ---
// // //   heroTitle: { type: String, default: '' },
// // //   heroDescription: { type: String, default: '' },
// // //   heroBgUrl: { type: String, default: '' },
// // //   faviconUrl: { type: String, default: '' },
// // //   slides: { type: [String], default: [] }, 
// // //   features: [{
// // //     title: { type: String, default: '' },
// // //     description: { type: String, default: '' }
// // //   }],

// // //   // --- CONFIG KATALOG KELAS ---
// // //   coursesPage: {
// // //     title: { type: String, default: 'Katalog Pelatihan & Kursus' },
// // //     description: { type: String, default: 'Tingkatkan kompetensi Anda dengan materi berkualitas dari PMI.' },
// // //     slides: { type: [String], default: [] }
// // //   },

// // //   // --- CONFIG BLOG ---
// // //   blogPage: {
// // //     title: { type: String, default: 'Cerita Relawan' },
// // //     description: { type: String, default: 'Berita terbaru, kisah inspiratif, dan wawasan dari lapangan.' },
// // //     slides: { type: [String], default: [] }
// // //   },

// // //   // --- FOOTER ---
// // //   footer: {
// // //     about: { type: String, default: '' },
// // //     address: { type: String, default: '' },
// // //     phone: { type: String, default: '' },
// // //     email: { type: String, default: '' },
// // //     website: { type: String, default: '' },
// // //     copyright: { type: String, default: '' },
// // //     logoUrl: { type: String, default: '' },
// // //     socials: {
// // //       facebook: { type: String, default: '' },
// // //       instagram: { type: String, default: '' },
// // //       twitter: { type: String, default: '' },
// // //       youtube: { type: String, default: '' }
// // //     }
// // //   },

// // //   // --- CATEGORIES ---
// // //   forumCategories: [{
// // //     name: { type: String, required: true },
// // //     iconUrl: { type: String, default: '' }
// // //   }],
// // //   courseCategories: { type: [String], default: [] },
// // //   libraryCategories: { type: [String], default: [] }

// // // }, { timestamps: true });

// // // export const Content = mongoose.model<IContent>('Content', ContentSchema);
// // // export default Content;

// // import mongoose, { Schema, Document } from 'mongoose';

// // // [FIX] Menggunakan Omit<Document, '_id'> untuk menghindari konflik tipe ObjectId vs String
// // export interface IContent extends Omit<Document, '_id'> {
// //   _id: string; // Kita override _id menjadi string
  
// //   // --- HALAMAN DEPAN (HOME) ---
// //   heroTitle: string;
// //   heroDescription: string;
// //   heroBgUrl: string;
// //   faviconUrl: string;
// //   slides: string[]; 
// //   features: { title: string; description: string }[];
  
// //   // --- HALAMAN KATALOG KELAS ---
// //   coursesPage: {
// //     title: string;
// //     description: string;
// //     slides: string[];
// //   };

// //   // --- HALAMAN BLOG / CERITA RELAWAN ---
// //   blogPage: {
// //     title: string;
// //     description: string;
// //     slides: string[];
// //   };

// //   // --- HALAMAN FORUM (BARU) ---
// //   forumPage: {
// //     title: string;
// //     description: string;
// //     slides: string[];
// //   };

// //   // --- FOOTER & KATEGORI ---
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
// //   forumCategories: { name: string; iconUrl: string }[];
// //   courseCategories: string[];
// //   libraryCategories: string[];
// // }

// // const ContentSchema: Schema = new Schema({
// //   _id: { type: String, default: 'site_content' }, // ID manual string

// //   // --- HOME (DEFAULT) ---
// //   heroTitle: { type: String, default: '' },
// //   heroDescription: { type: String, default: '' },
// //   heroBgUrl: { type: String, default: '' },
// //   faviconUrl: { type: String, default: '' },
// //   slides: { type: [String], default: [] }, 
// //   features: [{
// //     title: { type: String, default: '' },
// //     description: { type: String, default: '' }
// //   }],

// //   // --- CONFIG KATALOG KELAS ---
// //   coursesPage: {
// //     title: { type: String, default: 'Katalog Pelatihan & Kursus' },
// //     description: { type: String, default: 'Tingkatkan kompetensi Anda dengan materi berkualitas dari PMI.' },
// //     slides: { type: [String], default: [] }
// //   },

// //   // --- CONFIG BLOG ---
// //   blogPage: {
// //     title: { type: String, default: 'Cerita Relawan' },
// //     description: { type: String, default: 'Berita terbaru, kisah inspiratif, dan wawasan dari lapangan.' },
// //     slides: { type: [String], default: [] }
// //   },

// //   // --- CONFIG FORUM (BARU) ---
// //   forumPage: {
// //     title: { type: String, default: 'Forum Diskusi Komunitas' },
// //     description: { type: String, default: 'Tempat berbagi ilmu, bertanya, dan berkolaborasi dengan relawan PMI lainnya.' },
// //     slides: { type: [String], default: [] }
// //   },

// //   // --- FOOTER ---
// //   footer: {
// //     about: { type: String, default: '' },
// //     address: { type: String, default: '' },
// //     phone: { type: String, default: '' },
// //     email: { type: String, default: '' },
// //     website: { type: String, default: '' },
// //     copyright: { type: String, default: '' },
// //     logoUrl: { type: String, default: '' },
// //     socials: {
// //       facebook: { type: String, default: '' },
// //       instagram: { type: String, default: '' },
// //       twitter: { type: String, default: '' },
// //       youtube: { type: String, default: '' }
// //     }
// //   },

// //   // --- CATEGORIES ---
// //   forumCategories: [{
// //     name: { type: String, required: true },
// //     iconUrl: { type: String, default: '' }
// //   }],
// //   courseCategories: { type: [String], default: [] },
// //   libraryCategories: { type: [String], default: [] }

// // }, { timestamps: true });

// // export const Content = mongoose.model<IContent>('Content', ContentSchema);
// // export default Content;
// import mongoose, { Schema, Document } from 'mongoose';

// // [FIX] Menggunakan Omit<Document, '_id'> untuk menghindari konflik tipe ObjectId vs String
// export interface IContent extends Omit<Document, '_id'> {
//   _id: string; // Kita override _id menjadi string
  
//   // --- HALAMAN DEPAN (HOME) ---
//   heroTitle: string;
//   heroDescription: string;
//   heroBgUrl: string;
//   faviconUrl: string;
//   slides: string[]; 
//   features: { title: string; description: string }[];
  
//   // --- HALAMAN KATALOG KELAS ---
//   coursesPage: {
//     title: string;
//     description: string;
//     slides: string[];
//   };

//   // --- HALAMAN BLOG / CERITA RELAWAN ---
//   blogPage: {
//     title: string;
//     description: string;
//     slides: string[];
//   };

//   // --- HALAMAN FORUM ---
//   forumPage: {
//     title: string;
//     description: string;
//     slides: string[];
//   };

//   // --- HALAMAN PERPUSTAKAAN (BARU) ---
//   libraryPage: {
//     title: string;
//     description: string;
//     slides: string[];
//   };

//   // --- FOOTER & KATEGORI ---
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
//   forumCategories: { name: string; iconUrl: string }[];
//   courseCategories: string[];
//   libraryCategories: string[];
// }

// const ContentSchema: Schema = new Schema({
//   _id: { type: String, default: 'site_content' }, // ID manual string

//   // --- HOME (DEFAULT) ---
//   heroTitle: { type: String, default: '' },
//   heroDescription: { type: String, default: '' },
//   heroBgUrl: { type: String, default: '' },
//   faviconUrl: { type: String, default: '' },
//   slides: { type: [String], default: [] }, 
//   features: [{
//     title: { type: String, default: '' },
//     description: { type: String, default: '' }
//   }],

//   // --- CONFIG KATALOG KELAS ---
//   coursesPage: {
//     title: { type: String, default: 'Katalog Pelatihan & Kursus' },
//     description: { type: String, default: 'Tingkatkan kompetensi Anda dengan materi berkualitas dari PMI.' },
//     slides: { type: [String], default: [] }
//   },

//   // --- CONFIG BLOG ---
//   blogPage: {
//     title: { type: String, default: 'Cerita Relawan' },
//     description: { type: String, default: 'Berita terbaru, kisah inspiratif, dan wawasan dari lapangan.' },
//     slides: { type: [String], default: [] }
//   },

//   // --- CONFIG FORUM ---
//   forumPage: {
//     title: { type: String, default: 'Forum Diskusi Komunitas' },
//     description: { type: String, default: 'Tempat berbagi ilmu, bertanya, dan berkolaborasi dengan relawan PMI lainnya.' },
//     slides: { type: [String], default: [] }
//   },

//   // --- CONFIG LIBRARY (BARU) ---
//   libraryPage: {
//     title: { type: String, default: 'Perpustakaan Digital' },
//     description: { type: String, default: 'Kumpulan modul, referensi, dan panduan resmi PMI.' },
//     slides: { type: [String], default: [] }
//   },

//   // --- FOOTER ---
//   footer: {
//     about: { type: String, default: '' },
//     address: { type: String, default: '' },
//     phone: { type: String, default: '' },
//     email: { type: String, default: '' },
//     website: { type: String, default: '' },
//     copyright: { type: String, default: '' },
//     logoUrl: { type: String, default: '' },
//     socials: {
//       facebook: { type: String, default: '' },
//       instagram: { type: String, default: '' },
//       twitter: { type: String, default: '' },
//       youtube: { type: String, default: '' }
//     }
//   },

//   // --- CATEGORIES ---
//   forumCategories: [{
//     name: { type: String, required: true },
//     iconUrl: { type: String, default: '' }
//   }],
//   courseCategories: { type: [String], default: [] },
//   libraryCategories: { type: [String], default: [] }

// }, { timestamps: true });

// export const Content = mongoose.model<IContent>('Content', ContentSchema);
// export default Content;


import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Omit<Document, '_id'> {
  _id: string;
  
  // ... (Field Home, Courses, Blog, Forum, Library, Footer tetap sama) ...
  heroTitle: string;
  heroDescription: string;
  heroBgUrl: string;
  faviconUrl: string;
  slides: string[]; 
  features: { title: string; description: string }[];
  coursesPage: { title: string; description: string; slides: string[]; };
  blogPage: { title: string; description: string; slides: string[]; };
  forumPage: { title: string; description: string; slides: string[]; };
  libraryPage: { title: string; description: string; slides: string[]; };
  footer: {
    about: string; address: string; phone: string; email: string; website: string; copyright: string; logoUrl: string; 
    socials: { facebook: string; instagram: string; twitter: string; youtube: string; [key: string]: string; };
  };
  forumCategories: { name: string; iconUrl: string }[];
  courseCategories: string[];
  libraryCategories: string[];

  // --- KONFIGURASI PELATIHAN ---
  organizerCategories: string[]; 
  trainingRequirements: string[]; // Syarat Diklat Resmi
  courseRequirements: string[];   // [BARU] Syarat Kursus Mandiri
}

const ContentSchema: Schema = new Schema({
  _id: { type: String, default: 'site_content' },

  // ... (Schema lain tetap sama) ...
  heroTitle: { type: String, default: '' },
  heroDescription: { type: String, default: '' },
  heroBgUrl: { type: String, default: '' },
  faviconUrl: { type: String, default: '' },
  slides: { type: [String], default: [] }, 
  features: [{ title: { type: String, default: '' }, description: { type: String, default: '' } }],
  coursesPage: { title: { type: String, default: 'Katalog Pelatihan & Kursus' }, description: { type: String, default: '...' }, slides: { type: [String], default: [] } },
  blogPage: { title: { type: String, default: 'Cerita Relawan' }, description: { type: String, default: '...' }, slides: { type: [String], default: [] } },
  forumPage: { title: { type: String, default: 'Forum Diskusi Komunitas' }, description: { type: String, default: '...' }, slides: { type: [String], default: [] } },
  libraryPage: { title: { type: String, default: 'Perpustakaan Digital' }, description: { type: String, default: '...' }, slides: { type: [String], default: [] } },
  footer: {
    about: { type: String, default: '' }, address: { type: String, default: '' }, phone: { type: String, default: '' }, email: { type: String, default: '' }, website: { type: String, default: '' }, copyright: { type: String, default: '' }, logoUrl: { type: String, default: '' },
    socials: { facebook: { type: String, default: '' }, instagram: { type: String, default: '' }, twitter: { type: String, default: '' }, youtube: { type: String, default: '' } }
  },
  forumCategories: [{ name: { type: String, required: true }, iconUrl: { type: String, default: '' } }],
  courseCategories: { type: [String], default: [] },
  libraryCategories: { type: [String], default: [] },

  // --- [BARU] PELATIHAN CONFIG ---
  organizerCategories: { type: [String], default: ['PMI Pusat', 'PMI Provinsi', 'PMI Kabupaten/Kota'] },
  trainingRequirements: { type: [String], default: ['Kerangka Acuan Kerja (KAK)', 'Rencana Anggaran Biaya (RAB)', 'Jadwal Kegiatan'] },
  courseRequirements: { type: [String], default: ['Outline Materi', 'Profil Pengajar'] } // [BARU]

}, { timestamps: true });

export const Content = mongoose.model<IContent>('Content', ContentSchema);
export default Content;
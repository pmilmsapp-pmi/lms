// // // // // // // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // // // // // // export interface IContent extends Document {
// // // // // // // // //   heroTitle: string;
// // // // // // // // //   heroDescription: string;
// // // // // // // // //   features: { title: string; description: string }[];
// // // // // // // // // }

// // // // // // // // // const ContentSchema = new Schema({
// // // // // // // // //   heroTitle: { type: String, default: "LMS Manajemen - Palang Merah Indonesia" },
// // // // // // // // //   heroDescription: { type: String, default: "Platform pembelajaran..." },
// // // // // // // // //   features: [{
// // // // // // // // //     title: { type: String },
// // // // // // // // //     description: { type: String }
// // // // // // // // //   }]
// // // // // // // // // });

// // // // // // // // // export const Content = mongoose.model<IContent>('Content', ContentSchema);
// // // // // // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // // // // // export interface IContent extends Document {
// // // // // // // //   heroTitle: string;
// // // // // // // //   heroDescription: string;
// // // // // // // //   // Tambahkan slides untuk menyimpan array URL gambar
// // // // // // // //   slides: string[]; 
// // // // // // // //   features: { title: string; description: string }[];
// // // // // // // // }

// // // // // // // // const ContentSchema = new Schema({
// // // // // // // //   heroTitle: { type: String, default: "LMS Manajemen - Palang Merah Indonesia" },
// // // // // // // //   heroDescription: { type: String, default: "Platform pembelajaran..." },
// // // // // // // //   slides: { type: [String], default: [] }, // Default array kosong
// // // // // // // //   features: [{
// // // // // // // //     title: { type: String },
// // // // // // // //     description: { type: String }
// // // // // // // //   }]
// // // // // // // // });

// // // // // // // // export const Content = mongoose.model<IContent>('Content', ContentSchema);
// // // // // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // // // // export interface IContent extends Document {
// // // // // // //   heroTitle: string;
// // // // // // //   heroDescription: string;
// // // // // // //   heroBgUrl: string; // <--- TAMBAHAN BARU
// // // // // // //   // Menambahkan slides untuk menyimpan array URL gambar
// // // // // // //   slides: string[]; 
// // // // // // //   features: { title: string; description: string }[];
// // // // // // // }

// // // // // // // const ContentSchema = new Schema({
// // // // // // //   heroTitle: { type: String, default: "LMS Manajemen - Palang Merah Indonesia" },
// // // // // // //   heroDescription: { type: String, default: "Platform pembelajaran..." },
// // // // // // //   heroBgUrl: { type: String, default: "" }, // <--- TAMBAHAN BARU
// // // // // // //   // Default array kosong untuk slides
// // // // // // //   slides: { type: [String], default: [] }, 
// // // // // // //   features: [{
// // // // // // //     title: { type: String },
// // // // // // //     description: { type: String }
// // // // // // //   }]
// // // // // // // });

// // // // // // // export const Content = mongoose.model<IContent>('Content', ContentSchema);
// // // // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // // // export interface IContent extends Document {
// // // // // //   heroTitle: string;
// // // // // //   heroDescription: string;
// // // // // //   heroBgUrl: string; // <--- FIELD BARU UNTUK BACKGROUND
// // // // // //   slides: string[]; 
// // // // // //   features: { title: string; description: string }[];
// // // // // // }

// // // // // // const ContentSchema = new Schema({
// // // // // //   heroTitle: { type: String, default: "LMS Manajemen - Palang Merah Indonesia" },
// // // // // //   heroDescription: { type: String, default: "Platform pembelajaran..." },
// // // // // //   heroBgUrl: { type: String, default: "" }, // <--- FIELD BARU
// // // // // //   slides: { type: [String], default: [] }, 
// // // // // //   features: [{
// // // // // //     title: { type: String },
// // // // // //     description: { type: String }
// // // // // //   }]
// // // // // // });

// // // // // // export const Content = mongoose.model<IContent>('Content', ContentSchema);
// // // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // // export interface IContent extends Document {
// // // // //   heroTitle: string;
// // // // //   heroDescription: string;
// // // // //   heroBgUrl: string;
// // // // //   slides: string[]; 
// // // // //   features: { title: string; description: string }[];
// // // // //   // Data Footer
// // // // //   footer: {
// // // // //     about: string;
// // // // //     address: string;
// // // // //     phone: string;
// // // // //     email: string;
// // // // //     copyright: string;
// // // // //     socials: {
// // // // //         facebook: string;
// // // // //         instagram: string;
// // // // //         twitter: string;
// // // // //         youtube: string;
// // // // //     };
// // // // //   };
// // // // // }

// // // // // const ContentSchema = new Schema({
// // // // //   heroTitle: { type: String, default: "LMS Manajemen - Palang Merah Indonesia" },
// // // // //   heroDescription: { type: String, default: "Platform pembelajaran..." },
// // // // //   heroBgUrl: { type: String, default: "" },
// // // // //   slides: { type: [String], default: [] }, 
// // // // //   features: [{ title: String, description: String }],
  
// // // // //   // Default Value untuk Footer
// // // // //   footer: {
// // // // //     about: { type: String, default: "Humanis adalah platform pembelajaran digital resmi Palang Merah Indonesia." },
// // // // //     address: { type: String, default: "Jl. Jendral Gatot Subroto Kav. 96, Jakarta Selatan 12790" },
// // // // //     phone: { type: String, default: "(021) 7992325" },
// // // // //     email: { type: String, default: "pmi@pmi.or.id" },
// // // // //     copyright: { type: String, default: "© 2025 Palang Merah Indonesia. All rights reserved." },
// // // // //     socials: {
// // // // //         facebook: { type: String, default: "" },
// // // // //         instagram: { type: String, default: "" },
// // // // //         twitter: { type: String, default: "" },
// // // // //         youtube: { type: String, default: "" }
// // // // //     }
// // // // //   }
// // // // // });

// // // // // export const Content = mongoose.model<IContent>('Content', ContentSchema);
// // // // import mongoose, { Schema, Document } from 'mongoose';

// // // // export interface IContent extends Document {
// // // //   heroTitle: string;
// // // //   heroDescription: string;
// // // //   heroBgUrl: string;
// // // //   slides: string[]; 
// // // //   features: { title: string; description: string }[];
// // // //   footer: {
// // // //     about: string;
// // // //     address: string;
// // // //     phone: string;
// // // //     email: string;
// // // //     copyright: string;
// // // //     socials: { facebook: string; instagram: string; twitter: string; youtube: string; };
// // // //   };
// // // //   // --- TAMBAHAN BARU: KATEGORI ---
// // // //   forumCategories: { name: string; iconUrl: string }[];
// // // //   courseCategories: string[];
// // // //   libraryCategories: string[];
// // // // }

// // // // const ContentSchema = new Schema({
// // // //   heroTitle: { type: String, default: "LMS Manajemen - Palang Merah Indonesia" },
// // // //   heroDescription: { type: String, default: "Platform pembelajaran..." },
// // // //   heroBgUrl: { type: String, default: "" },
// // // //   slides: { type: [String], default: [] }, 
// // // //   features: [{ title: String, description: String }],
  
// // // //   footer: {
// // // //     about: { type: String, default: "Humanis adalah platform pembelajaran digital resmi Palang Merah Indonesia." },
// // // //     address: { type: String, default: "Jl. Jendral Gatot Subroto Kav. 96, Jakarta Selatan 12790" },
// // // //     phone: { type: String, default: "(021) 7992325" },
// // // //     email: { type: String, default: "pmi@pmi.or.id" },
// // // //     copyright: { type: String, default: "© 2025 Palang Merah Indonesia. All rights reserved." },
// // // //     socials: { facebook: String, instagram: String, twitter: String, youtube: String }
// // // //   },

// // // //   // --- DEFINISI KATEGORI ---
// // // //   forumCategories: [{ 
// // // //     name: { type: String }, 
// // // //     iconUrl: { type: String } 
// // // //   }],
// // // //   courseCategories: { type: [String], default: ["Health", "Safety", "Disaster Management", "General"] },
// // // //   libraryCategories: { type: [String], default: ["Flyer", "Booklet", "Kebijakan", "Panduan Pelatihan", "Modul"] }
// // // // });

// // // // export const Content = mongoose.model<IContent>('Content', ContentSchema);
// // // import mongoose, { Schema, Document } from 'mongoose';

// // // export interface IContent extends Document {
// // //   _id: string;
// // //   // Hero Section (Flat Structure sesuai frontend)
// // //   heroTitle: string;
// // //   heroDescription: string;
// // //   heroBgUrl: string;
  
// // //   // Slides & Features
// // //   slides: string[];
// // //   features: { title: string; description: string }[];

// // //   // Footer (Nested Structure)
// // //   footer: {
// // //     about: string;
// // //     address: string;
// // //     phone: string;
// // //     email: string;
// // //     copyright: string;
// // //     socials: {
// // //       facebook: string;
// // //       instagram: string;
// // //       twitter: string;
// // //       youtube: string;
// // //       [key: string]: string;
// // //     };
// // //   };

// // //   // Categories
// // //   forumCategories: { name: string; iconUrl: string }[];
// // //   courseCategories: string[];
// // //   libraryCategories: string[];
// // // }

// // // const ContentSchema: Schema = new Schema({
// // //   // Gunakan ID statis agar hanya ada satu pengaturan di database (Singleton)
// // //   _id: { type: String, default: 'site_content' },

// // //   // --- 1. HERO SECTION ---
// // //   heroTitle: { type: String, default: '' },
// // //   heroDescription: { type: String, default: '' },
// // //   heroBgUrl: { type: String, default: '' },

// // //   // --- 2. SLIDES & FEATURES ---
// // //   slides: { type: [String], default: [] }, // Array of Image URLs
// // //   features: [{
// // //     title: { type: String, default: '' },
// // //     description: { type: String, default: '' }
// // //   }],

// // //   // --- 3. FOOTER ---
// // //   footer: {
// // //     about: { type: String, default: '' },
// // //     address: { type: String, default: '' },
// // //     phone: { type: String, default: '' },
// // //     email: { type: String, default: '' },
// // //     copyright: { type: String, default: '' },
// // //     socials: {
// // //       facebook: { type: String, default: '' },
// // //       instagram: { type: String, default: '' },
// // //       twitter: { type: String, default: '' },
// // //       youtube: { type: String, default: '' }
// // //     }
// // //   },

// // //   // --- 4. CATEGORIES ---
// // //   forumCategories: [{
// // //     name: { type: String, required: true },
// // //     iconUrl: { type: String, default: '' }
// // //   }],
// // //   courseCategories: { type: [String], default: [] },
// // //   libraryCategories: { type: [String], default: [] }

// // // }, { timestamps: true });

// // // export const Content = mongoose.model<IContent>('Content', ContentSchema);
// // import mongoose, { Schema, Document } from 'mongoose';

// // // PERBAIKAN: Hapus 'extends Document' di sini agar tidak konflik tipe _id
// // export interface IContent {
// //   _id: string;
// //   // Hero Section
// //   heroTitle: string;
// //   heroDescription: string;
// //   heroBgUrl: string;
  
// //   // Slides & Features
// //   slides: string[];
// //   features: { title: string; description: string }[];

// //   // Footer
// //   footer: {
// //     about: string;
// //     address: string;
// //     phone: string;
// //     email: string;
// //     copyright: string;
// //     socials: {
// //       facebook: string;
// //       instagram: string;
// //       twitter: string;
// //       youtube: string;
// //       [key: string]: string;
// //     };
// //   };

// //   // Categories
// //   forumCategories: { name: string; iconUrl: string }[];
// //   courseCategories: string[];
// //   libraryCategories: string[];
// // }

// // const ContentSchema: Schema = new Schema({
// //   // Kita gunakan ID statis string agar hanya ada satu pengaturan
// //   _id: { type: String, default: 'site_content' },

// //   // --- 1. HERO SECTION ---
// //   heroTitle: { type: String, default: '' },
// //   heroDescription: { type: String, default: '' },
// //   heroBgUrl: { type: String, default: '' },

// //   // --- 2. SLIDES & FEATURES ---
// //   slides: { type: [String], default: [] }, 
// //   features: [{
// //     title: { type: String, default: '' },
// //     description: { type: String, default: '' }
// //   }],

// //   // --- 3. FOOTER ---
// //   footer: {
// //     about: { type: String, default: '' },
// //     address: { type: String, default: '' },
// //     phone: { type: String, default: '' },
// //     email: { type: String, default: '' },
// //     copyright: { type: String, default: '' },
// //     socials: {
// //       facebook: { type: String, default: '' },
// //       instagram: { type: String, default: '' },
// //       twitter: { type: String, default: '' },
// //       youtube: { type: String, default: '' }
// //     }
// //   },

// //   // --- 4. CATEGORIES ---
// //   forumCategories: [{
// //     name: { type: String, required: true },
// //     iconUrl: { type: String, default: '' }
// //   }],
// //   courseCategories: { type: [String], default: [] },
// //   libraryCategories: { type: [String], default: [] }

// // }, { timestamps: true });

// // // PERBAIKAN: Gabungkan IContent & Document di sini
// // export const Content = mongoose.model<IContent & Document>('Content', ContentSchema);
// import mongoose, { Schema, Document } from 'mongoose';

// // Interface
// export interface IContent {
//   _id: string;
//   heroTitle: string;
//   heroDescription: string;
//   heroBgUrl: string;
//   slides: string[];
//   features: { title: string; description: string }[];
//   footer: {
//     about: string;
//     address: string;
//     phone: string;
//     email: string;
//     website: string; // Tambahan field website
//     copyright: string;
//     logoUrl: string; // <--- FIELD BARU UNTUK LOGO FOOTER
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
//   _id: { type: String, default: 'site_content' },

//   // HERO
//   heroTitle: { type: String, default: '' },
//   heroDescription: { type: String, default: '' },
//   heroBgUrl: { type: String, default: '' },

//   // SLIDES & FEATURES
//   slides: { type: [String], default: [] }, 
//   features: [{
//     title: { type: String, default: '' },
//     description: { type: String, default: '' }
//   }],

//   // FOOTER
//   footer: {
//     about: { type: String, default: '' },
//     address: { type: String, default: '' },
//     phone: { type: String, default: '' },
//     email: { type: String, default: '' },
//     website: { type: String, default: '' },
//     copyright: { type: String, default: '' },
//     logoUrl: { type: String, default: '' }, // <--- DI SINI
//     socials: {
//       facebook: { type: String, default: '' },
//       instagram: { type: String, default: '' },
//       twitter: { type: String, default: '' },
//       youtube: { type: String, default: '' }
//     }
//   },

//   // CATEGORIES
//   forumCategories: [{
//     name: { type: String, required: true },
//     iconUrl: { type: String, default: '' }
//   }],
//   courseCategories: { type: [String], default: [] },
//   libraryCategories: { type: [String], default: [] }

// }, { timestamps: true });

// // Gabungkan Interface & Document
// export const Content = mongoose.model<IContent & Document>('Content', ContentSchema);


import mongoose, { Schema, Document } from 'mongoose';

// Interface
export interface IContent {
  _id: string;
  heroTitle: string;
  heroDescription: string;
  heroBgUrl: string;
  faviconUrl: string; // <--- TAMBAHAN BARU
  slides: string[];
  features: { title: string; description: string }[];
  footer: {
    about: string;
    address: string;
    phone: string;
    email: string;
    website: string; 
    copyright: string;
    logoUrl: string; 
    socials: {
      facebook: string;
      instagram: string;
      twitter: string;
      youtube: string;
      [key: string]: string;
    };
  };
  forumCategories: { name: string; iconUrl: string }[];
  courseCategories: string[];
  libraryCategories: string[];
}

const ContentSchema: Schema = new Schema({
  _id: { type: String, default: 'site_content' },

  // HERO
  heroTitle: { type: String, default: '' },
  heroDescription: { type: String, default: '' },
  heroBgUrl: { type: String, default: '' },
  faviconUrl: { type: String, default: '' }, // <--- TAMBAHAN BARU DI SCHEMA

  // SLIDES & FEATURES
  slides: { type: [String], default: [] }, 
  features: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  }],

  // FOOTER
  footer: {
    about: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    website: { type: String, default: '' },
    copyright: { type: String, default: '' },
    logoUrl: { type: String, default: '' },
    socials: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
      youtube: { type: String, default: '' }
    }
  },

  // CATEGORIES
  forumCategories: [{
    name: { type: String, required: true },
    iconUrl: { type: String, default: '' }
  }],
  courseCategories: { type: [String], default: [] },
  libraryCategories: { type: [String], default: [] }

}, { timestamps: true });

// Gabungkan Interface & Document
export const Content = mongoose.model<IContent & Document>('Content', ContentSchema);
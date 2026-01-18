import mongoose, { Schema, Document } from 'mongoose';

// Hapus 'extends Document' di sini agar tidak konflik tipe _id
export interface IForumConfig {
  _id: string;
  categories: string[];
  avatars: string[];
}

const ForumConfigSchema = new Schema({
  // Kita gunakan ID statis string
  _id: { type: String, default: 'forum_settings' },
  
  categories: { 
    type: [String], 
    default: ["General", "Health", "Safety", "Materi Kelas", "Saran & Masukan"] 
  },
  
  avatars: { 
    type: [String], 
    default: [] 
  }
});

// Gabungkan IForumConfig & Document di sini menggunakan '&'
export const ForumConfig = mongoose.model<IForumConfig & Document>('ForumConfig', ForumConfigSchema);
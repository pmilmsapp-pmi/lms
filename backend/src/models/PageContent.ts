import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
  page: { 
    type: String, 
    required: true, 
    unique: true, 
    enum: ['courses', 'blog', 'home'] // Halaman yang bisa diedit
  },
  heroTitle: { type: String, default: '' },
  heroDescription: { type: String, default: '' },
  heroImages: [{ type: String }], // Array URL gambar slide
  
  // Opsional: Jika ingin menambah konfigurasi lain di masa depan
  isActive: { type: Boolean, default: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { 
  timestamps: true 
});

export const PageContent = mongoose.model('PageContent', PageContentSchema);
export default PageContent;
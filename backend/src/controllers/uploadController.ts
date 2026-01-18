import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary';
import { createClient } from '@supabase/supabase-js';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';



// --- CONFIGURATION ---
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || 'materials';

// FIX: Jangan langsung crash jika key tidak ada.
// Inisialisasi Supabase hanya jika variabel environment tersedia.
let supabase: any = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
}

// --- HELPER FUNCTIONS ---

const saveLocal = async (file: Express.Multer.File): Promise<string> => {
  const uploadDir = path.join('public', 'uploads', 'materials');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
  const filepath = path.join(uploadDir, filename);
  fs.writeFileSync(filepath, file.buffer);
  return `/uploads/materials/${filename}`;
};

const saveCloudinary = async (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "lms_materials",
        resource_type: "auto",
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed"));
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

const saveSupabase = async (file: Express.Multer.File): Promise<string> => {
  // Cek apakah supabase berhasil di-init
  if (!supabase) {
    throw new Error("Supabase credentials (URL/KEY) not found in .env");
  }

  const filename = `docs/${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`;
  
  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (error) throw error;

  const { data: publicData } = supabase.storage
    .from(SUPABASE_BUCKET)
    .getPublicUrl(filename);

  return publicData.publicUrl;
};

// --- MAIN CONTROLLER ---

export const uploadMaterial = async (req: Request, res: Response) => {
  try {
    const file = req.file; 
    
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const mode = process.env.UPLOAD_MODE || 'CLOUDINARY';
    let finalUrl = '';

    console.log(`[Upload System] Processing file using mode: ${mode}`);

    switch (mode.toUpperCase()) {
      case 'LOCAL':
        finalUrl = await saveLocal(file);
        break;
        
      case 'HYBRID':
        const isDocument = file.mimetype.match(/pdf|msword|wordprocessing|text|presentation/);
        if (isDocument) {
           // Pastikan supabase ada sebelum panggil fungsi saveSupabase
           if (!supabase) {
             console.warn("⚠️ Supabase credentials missing. Fallback to Cloudinary.");
             finalUrl = await saveCloudinary(file);
           } else {
             finalUrl = await saveSupabase(file);
           }
        } else {
           finalUrl = await saveCloudinary(file);
        }
        break;

      case 'CLOUDINARY':
        finalUrl = await saveCloudinary(file);
        break;

      default:
        throw new Error("Invalid UPLOAD_MODE in .env");
    }

    return res.status(200).json({
      success: true,
      mode: mode,
      data: {
        url: finalUrl,
        type: file.mimetype,
        originalName: file.originalname
      }
    });

  } catch (error: any) {
    console.error("Upload Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to upload material", 
      error: error.message || "Internal Server Error"
    });
  }
};
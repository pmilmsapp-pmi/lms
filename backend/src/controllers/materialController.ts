// import { createClient } from '@supabase/supabase-js';
// import cloudinary from '../config/cloudinary'; // Config cloudinary anda
// import streamifier from 'streamifier';

// // Init Supabase
// const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// export const uploadMaterialHybrid = async (req: Request, res: Response) => {
//   try {
//     const file = req.file;
//     if (!file) throw new Error("No file uploaded");

//     let finalUrl = "";
//     const isDocument = file.mimetype.match(/(pdf|msword|document|text)/);

//     // --- SKEMA 2 LOGIC ---
//     if (isDocument) {
//       // A. UPLOAD KE SUPABASE (Dokumen)
//       const fileName = `docs/${Date.now()}_${file.originalname}`;
      
//       const { data, error } = await supabase.storage
//         .from(process.env.SUPABASE_BUCKET_NAME!)
//         .upload(fileName, file.buffer, {
//           contentType: file.mimetype
//         });

//       if (error) throw error;
      
//       // Get Public URL
//       const { data: publicData } = supabase.storage
//         .from(process.env.SUPABASE_BUCKET_NAME!)
//         .getPublicUrl(fileName);
        
//       finalUrl = publicData.publicUrl;

//     } else {
//       // B. UPLOAD KE CLOUDINARY (Foto/Video)
//       // Menggunakan Promise wrapper untuk stream upload
//       finalUrl = await new Promise((resolve, reject) => {
//         const stream = cloudinary.v2.uploader.upload_stream(
//           { 
//             folder: "lms_materials", 
//             resource_type: "auto" // Auto detect image/video
//           },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result?.secure_url || "");
//           }
//         );
//         streamifier.createReadStream(file.buffer).pipe(stream);
//       });
//     }

//     // Simpan finalUrl ke MongoDB di sini...
//     return res.status(200).json({ url: finalUrl, type: file.mimetype });

//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
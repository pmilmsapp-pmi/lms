// import { Request, Response, NextFunction } from 'express';

// // Extend interface Request agar TypeScript tidak marah
// declare global {
//   namespace Express {
//     interface Request {
//       filterQuery?: any;
//     }
//   }
// }

// export const applyRegionScope = (req: Request, res: Response, next: NextFunction) => {
//   const user = (req as any).user;

//   // Default: Tidak ada filter (untuk Superadmin/Nasional)
//   req.filterQuery = {};

//   if (!user) return next();

//   if (user.role === 'admin') {
//     if (user.regionScope === 'province') {
//       // Filter data yang punya field 'provinceCode' sesuai managedProvinces
//       // ATAU data user yang address.provinceCode sesuai
//       req.filterQuery = { 
//         $or: [
//            { 'provinceCode': { $in: user.managedProvinces } },
//            { 'address.provinceCode': { $in: user.managedProvinces } }
//         ]
//       };
//     } 
//     else if (user.regionScope === 'regency') {
//       req.filterQuery = { 
//         $or: [
//            { 'regencyCode': { $in: user.managedRegencies } },
//            { 'address.regencyCode': { $in: user.managedRegencies } }
//         ]
//       };
//     }
//   }

//   next();
// };


// backend/src/middleware/scope.ts
import { Request, Response, NextFunction } from 'express';
import { AuthedRequest } from './auth'; // Pastikan path import benar

// Middleware ini menyuntikkan filter ke req.filterQuery
export const applyCourseScope = (req: AuthedRequest, res: Response, next: NextFunction) => {
  const user = req.user;
  
  // Inisialisasi filterQuery
  (req as any).filterQuery = {};

  if (!user) return next();

  // 1. SUPER ADMIN: Lihat Semua (Filter Kosong)
  if (user.role === 'SUPER_ADMIN') {
      return next();
  }

  // 2. FASILITATOR: Hanya lihat kursus buatan sendiri
  if (user.role === 'FACILITATOR') {
      (req as any).filterQuery = { facilitatorIds: user.id };
      return next();
  }

  // 3. ADMIN WILAYAH (Provinsi/Kabupaten)
  if (user.role === 'ADMIN') {
      // Jika Admin Provinsi
      if (user.regionScope === 'province' && user.managedProvinces?.length) {
          // Asumsi di Course ada field 'regionCode' yang menyimpan kode provinsi
          (req as any).filterQuery = { 
              regionCode: { $in: user.managedProvinces } 
          };
      }
      // Jika Admin Kabupaten
      else if (user.regionScope === 'regency' && user.managedRegencies?.length) {
          (req as any).filterQuery = { 
              regionCode: { $in: user.managedRegencies } 
          };
      }
      // Jika Nasional (tapi bukan super admin)
      else if (user.regionScope === 'national') {
          // Bisa lihat semua, atau filter tertentu jika perlu
      }
  }

  next();
};
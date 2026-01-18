import { Request, Response, NextFunction } from 'express';

// Extend interface Request agar TypeScript tidak marah
declare global {
  namespace Express {
    interface Request {
      filterQuery?: any;
    }
  }
}

export const applyRegionScope = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  // Default: Tidak ada filter (untuk Superadmin/Nasional)
  req.filterQuery = {};

  if (!user) return next();

  if (user.role === 'admin') {
    if (user.regionScope === 'province') {
      // Filter data yang punya field 'provinceCode' sesuai managedProvinces
      // ATAU data user yang address.provinceCode sesuai
      req.filterQuery = { 
        $or: [
           { 'provinceCode': { $in: user.managedProvinces } },
           { 'address.provinceCode': { $in: user.managedProvinces } }
        ]
      };
    } 
    else if (user.regionScope === 'regency') {
      req.filterQuery = { 
        $or: [
           { 'regencyCode': { $in: user.managedRegencies } },
           { 'address.regencyCode': { $in: user.managedRegencies } }
        ]
      };
    }
  }

  next();
};
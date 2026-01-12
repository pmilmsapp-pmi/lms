
// src/types/express.d.ts
import type { Role } from '../middleware/auth';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; role: Role; name?: string; avatarUrl?: string };
    }
  }
}

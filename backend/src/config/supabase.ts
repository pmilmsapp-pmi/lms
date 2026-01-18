import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('⚠️ WARNING: Supabase URL or Key is missing in .env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export const BACKUP_BUCKET = 'backups';
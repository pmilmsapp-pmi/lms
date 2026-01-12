
'use client';
import { AuthProvider } from '@/lib/AuthProvider';
export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

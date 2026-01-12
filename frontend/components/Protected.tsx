
'use client';
import { useEffect } from 'react';
import { useAuth } from '@/lib/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Protected({ children, roles }: { children: React.ReactNode; roles?: ('STUDENT'|'FACILITATOR'|'SUPER_ADMIN')[] }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace('/login');
      else if (roles && !roles.includes(user.role)) router.replace('/courses');
    }
  }, [user, loading, roles, router]);

  if (loading) return <div>Memuat...</div>;
  if (!user) return null;
  if (roles && !roles.includes(user.role)) return null;
  return <>{children}</>;
}

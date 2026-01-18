import { useAuth } from '@/lib/AuthProvider';

export const usePermission = () => {
    const { user } = useAuth();

    const hasPermission = (requiredPermission: string) => {
        if (!user) return false;
        
        // 1. Super Admin bisa segalanya
        if (user.role === 'SUPER_ADMIN') return true;

        // 2. Cek array permissions user
        // user.permissions didapat dari respon login backend
        if (user.permissions && user.permissions.includes(requiredPermission)) {
            return true;
        }

        return false;
    };

    const hasRole = (role: string) => {
        return user?.role === role;
    };

    return { user, hasPermission, hasRole };
};
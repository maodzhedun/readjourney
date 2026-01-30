'use client';

import { useEffect } from 'react';
import { authApi } from '@/services/clientApi';
import { useAuthStore } from '@/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore(state => state.setUser);
  const clearAuth = useAuthStore(state => state.clearAuth);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await authApi.getSession();
        if (data.success) {
          const { data: user } = await authApi.getCurrentUser();
          if (user) setUser(user);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      }
    };

    checkSession();
  }, [setUser, clearAuth]);

  return <>{children}</>;
}

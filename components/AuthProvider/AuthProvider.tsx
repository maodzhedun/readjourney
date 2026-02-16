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
        const { data: sessionData } = await authApi.getSession();
        if (sessionData.success) {
          const { data: userData } = await authApi.getCurrentUser();
          // API may return { user: {...} } or {...} directly
          const user = userData?.user || userData;
          if (user && user.name) {
            setUser(user);
          } else {
            clearAuth();
          }
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

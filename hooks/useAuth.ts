import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { authApi } from '@/services/clientApi';
import { useAuthStore } from '@/store/authStore';
import { RegisterCredentials, AuthCredentials } from '@/types';

// ============ Register ============
export function useRegister() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const { data } = await authApi.register(credentials);
      return data;
    },
    onSuccess: data => {
      setUser(data);
      toast.success('Registration successful!');
      router.push('/recommended');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Registration failed');
    },
  });
}

// ============ Login ============
export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      const { data } = await authApi.login(credentials);
      return data;
    },
    onSuccess: data => {
      setUser(data);
      toast.success('Welcome back!');
      router.push('/recommended');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Login failed');
    },
  });
}

// ============ Logout ============
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore(state => state.clearAuth);

  return useMutation({
    mutationFn: async () => {
      await authApi.logout();
    },
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      toast.success('Logged out successfully');
      router.push('/login');
    },
  });
}

// ============ useAuth Hook ============
export function useAuth() {
  const { user, isAuthenticated } = useAuthStore();

  return {
    user,
    isAuthenticated,
  };
}

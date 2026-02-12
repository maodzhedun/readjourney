//components/forms/LoginForm.tsx

'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLogin } from '@/hooks/useAuth';
import { loginSchema } from '@/utils/validationSchemas';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: FormData) => {
    login(data);
  };

  return (
    <div className="flex h-full flex-col">
      <h1 className="mb-5 text-[32px] font-bold leading-tight text-[#f9f9f9] md:mb-10 md:text-[64px]">
        Expand your mind, reading <span className="text-[#686868]">a book</span>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-4">
        <Input
          {...register('email')}
          type="email"
          label="Mail:"
          placeholder="Your@email.com"
          error={errors.email?.message}
        />

        <Input
          {...register('password')}
          type="password"
          label="Password:"
          placeholder="Enterpassword"
          showPasswordToggle
          error={errors.password?.message}
        />

        <div className="flex items-center gap-4 pt-2">
          <Button type="submit" isLoading={isPending}>
            Log In
          </Button>
          <Link
            href="/register"
            className="text-sm text-[#686868] underline underline-offset-2 hover:text-[#f9f9f9]"
          >
            Don&apos;t have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}

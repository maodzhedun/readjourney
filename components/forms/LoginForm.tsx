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

  return (
    <div>
      <h1
        className="
          mb-6
          max-w-[295px] md:max-w-[444px]
          font-bold leading-[1.06] tracking-[-0.02em] text-[#f9f9f9]
          text-[clamp(32px,8vw,40px)]
          md:text-[clamp(40px,5.5vw,48px)]
          2xl:text-[64px]
        "
      >
        Expand your mind, reading{' '}
        <span className="text-[#686868]">a book</span>
      </h1>

      <form
        onSubmit={handleSubmit(data => login(data))}
        className="flex w-full flex-col gap-[14px] md:max-w-[472px]"
      >
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
          placeholder="Yourpasswordhere"
          showPasswordToggle
          error={errors.password?.message}
        />

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Button
            type="submit"
            variant="primary"
            isLoading={isPending}
            className="!w-[140px] !h-[42px] md:!w-[225px] md:!h-[52px]"
          >
            Log In
          </Button>
          <Link
            href="/register"
            className="text-sm leading-[18px] text-[#686868] no-underline transition-colors hover:text-[#f9f9f9]"
          >
            Don&apos;t have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}

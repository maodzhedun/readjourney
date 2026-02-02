'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRegister } from '@/hooks/useAuth';
import { registerSchema } from '@/utils/validationSchemas';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const { mutate: register, isPending } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: FormData) => {
    register(data);
  };

  return (
    <div className="flex h-full flex-col">
      <h1 className="mb-5 text-[32px] font-bold leading-tight text-[#f9f9f9] md:mb-10 md:text-[64px]">
        Expand your mind, reading{' '}
        <span className="rounded-lg bg-[#f9f9f9]/5 px-2">a book</span>
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-4">
        <Input
          {...registerField('name')}
          label="Name:"
          placeholder="Ilona Ratushniak"
          error={errors.name?.message}
        />

        <Input
          {...registerField('email')}
          type="email"
          label="Mail:"
          placeholder="Your@email.com"
          error={errors.email?.message}
        />

        <Input
          {...registerField('password')}
          type="password"
          label="Password:"
          placeholder="Enterpassword"
          showPasswordToggle
          error={errors.password?.message}
        />

        <div className="flex items-center gap-4 pt-2">
          <Button type="submit" isLoading={isPending}>
            Registration
          </Button>
          <Link
            href="/login"
            className="text-sm text-[#686868] underline underline-offset-2 hover:text-[#f9f9f9]"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}

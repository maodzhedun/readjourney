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
    <>
      <h1
        className="text-[32px] font-bold leading-tight tracking-[0.02em] md:text-[64px]"
        style={{ color: '#f9f9f9', marginTop: '40px', marginBottom: '40px' }}
      >
        Expand your mind, reading{' '}
        <span style={{ color: '#686868' }}>a book</span>
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
        style={{ gap: '14px' }}
      >
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
          placeholder="Yourpasswordhere"
          showPasswordToggle
          error={errors.password?.message}
        />

        <div
          className="flex items-center"
          style={{ gap: '14px', marginTop: '8px' }}
        >
          <Button type="submit" variant="primary" isLoading={isPending}>
            Registration
          </Button>
          <Link
            href="/login"
            className="text-sm no-underline transition-colors hover:underline hover:underline-offset-2"
            style={{ color: '#686868' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f9f9f9')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#686868')}
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </>
  );
}

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
    register: rf,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });

  return (
    <div>
      <h1
        style={{
          fontSize: '64px',
          fontWeight: 700,
          lineHeight: 1.06,
          letterSpacing: '-0.02em',
          color: '#f9f9f9',
          marginBottom: '32px',

          maxWidth: '444px',
        }}
      >
        Expand your mind, reading{' '}
        <span style={{ color: '#686868' }}>a book</span>
      </h1>

      <form
        onSubmit={handleSubmit(data => register(data))}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',

          width: '472px',
        }}
      >
        <Input
          {...rf('name')}
          label="Name:"
          placeholder="Ilona Ratushniak"
          error={errors.name?.message}
        />
        <Input
          {...rf('email')}
          type="email"
          label="Mail:"
          placeholder="Your@email.com"
          error={errors.email?.message}
        />
        <Input
          {...rf('password')}
          type="password"
          label="Password:"
          placeholder="Yourpasswordhere"
          showPasswordToggle
          error={errors.password?.message}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          <Button
            type="submit"
            variant="primary"
            isLoading={isPending}
            style={{ width: '225px', height: '52px', flexShrink: 0 }}
          >
            Registration
          </Button>
          <Link
            href="/login"
            style={{
              color: '#686868',
              fontSize: '14px',
              lineHeight: '18px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f9f9f9')}
            onMouseLeave={e => (e.currentTarget.style.color = '#686868')}
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}

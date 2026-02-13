//app/(auth)/login/page.tsx

import { Metadata } from 'next';
import LoginForm from '@/components/forms/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to your Read Journey account to continue your reading journey.',
};

export default function LoginPage() {
  return <LoginForm />;
}
//app/(auth)/register/page.tsx

import { Metadata } from 'next';
import RegisterForm from '@/components/forms/RegisterForm';

export const metadata: Metadata = {
  title: 'Create Account',
  description:
    'Create your Read Journey account and start tracking your reading.',
};

export default function RegisterPage() {
  return <RegisterForm />;
}

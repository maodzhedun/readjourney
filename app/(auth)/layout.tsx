//app/(auth)/layout.tsx

import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#141414] p-5 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-[1280px] flex-col gap-4 md:min-h-[calc(100vh-64px)] lg:flex-row">
        {/* Form Section - 600px on desktop */}
        <div className="w-full rounded-[30px] bg-[#1f1f1f] p-5 md:p-12 lg:w-[600px] lg:shrink-0 lg:p-16">
          {/* Logo */}
          <Link
            href="/"
            className="mb-10 flex items-center gap-2 md:mb-12 lg:mb-16"
          >
            <Image
              src="/images/logo.svg"
              alt="Read Journey"
              width={42}
              height={17}
              className="h-auto w-auto"
            />
            <span className="hidden text-lg font-bold uppercase tracking-[0.02em] text-white md:inline">
              Read Journey
            </span>
          </Link>

          {children}
        </div>

        {/* Image Section - fills remaining space */}
        <div className="hidden flex-1 items-center justify-center rounded-[30px] bg-[#1f1f1f] lg:flex">
          <Image
            src="/images/auth-phone.png"
            alt="Read Journey App"
            width={405}
            height={656}
            className="h-auto w-auto object-contain"
            priority
          />
        </div>
      </div>
    </main>
  );
}

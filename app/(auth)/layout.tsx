import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#141414]" style={{ padding: '32px' }}>
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[1280px] flex-col gap-4 lg:flex-row">
        {/* Form Section - 600px on desktop */}
        <div
          className="flex w-full flex-col rounded-[30px] bg-[#1f1f1f] lg:w-[600px] lg:shrink-0"
          style={{ padding: '40px 64px' }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/images/logo.svg"
              alt="Read Journey"
              width={42}
              height={17}
              className="h-auto w-auto"
            />
            <span className="text-lg font-bold uppercase tracking-[0.02em] text-white">
              Read Journey
            </span>
          </Link>

          {children}
        </div>

        {/* Image Section - fills remaining space */}
        <div className="relative hidden flex-1 items-center justify-center overflow-hidden rounded-[30px] bg-[#1f1f1f] lg:flex">
          {/* Fixing size phone */}
          <div className="relative h-[548px] w-[365px]">
            <Image
              src="/images/iPhone 15 Black.png"
              alt="Read Journey App"
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 365px, 0px"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}

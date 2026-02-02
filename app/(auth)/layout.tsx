//app/(auth)/layout.tsx

import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#141414] p-4 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-32px)] max-w-[1280px] flex-col gap-4 lg:flex-row lg:gap-4">
        {/* Form Section */}
        <div className="flex-1 rounded-[30px] bg-[#1f1f1f] p-5 md:p-12 lg:p-16">
          {children}
        </div>

        {/* Image Section - Hidden on mobile */}
        <div className="hidden flex-1 items-center justify-center rounded-[30px] bg-[#1f1f1f] lg:flex">
          <div className="relative h-[560px] w-[405px]">
            <Image
              src="/images/auth-phone.png"
              alt="Read Journey App"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
